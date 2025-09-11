import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../../../models/models.dart';
import '../../../api/dio_client.dart';
import '../../../api/cart_repository.dart';

class CartNotifier extends StateNotifier<List<CartItem>> {
  final CartRepository _cartRepository;
  final DioClient _dioClient;

  CartNotifier(this._cartRepository, this._dioClient) : super([]) {
    _loadCartFromDatabase();
  }

  // 从数据库加载购物车数据
  Future<void> _loadCartFromDatabase() async {
    try {
      final response = await _cartRepository.getCart();
      if (response.code == 200 && response.data != null) {
        final cartData = response.data!;
        final items = cartData['items'] as List<dynamic>? ?? [];
        final cartItems = items.map((item) => CartItem(
          product: Product.fromJson(item['product']),
          quantity: item['quantity'],
        )).toList();
        state = cartItems;
      }
    } catch (e) {
      print('Error loading cart from database: $e');
      // 如果数据库加载失败，尝试从本地存储加载
      await _loadCartFromStorage();
    }
  }

  // 从本地存储加载购物车数据（备用方案）
  Future<void> _loadCartFromStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final cartData = prefs.getString('cart_items');
      if (cartData != null) {
        final List<dynamic> jsonList = json.decode(cartData);
        final cartItems = jsonList.map((json) => CartItem.fromJson(json)).toList();
        state = cartItems;
      }
    } catch (e) {
      print('Error loading cart from storage: $e');
    }
  }

  // 保存购物车数据到本地存储（备用方案）
  Future<void> _saveCartToStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final cartData = json.encode(state.map((item) => item.toJson()).toList());
      await prefs.setString('cart_items', cartData);
    } catch (e) {
      print('Error saving cart to storage: $e');
    }
  }

  // 添加商品到购物车
  Future<void> addItem(Product product, {int quantity = 1}) async {
    try {
      // 先更新本地状态
      final existingIndex = state.indexWhere((item) => item.product.id == product.id);
      
      if (existingIndex >= 0) {
        // 如果商品已存在，增加数量
        final existingItem = state[existingIndex];
        final newQuantity = existingItem.quantity + quantity;
        
        state = [
          ...state.sublist(0, existingIndex),
          existingItem.copyWith(quantity: newQuantity),
          ...state.sublist(existingIndex + 1),
        ];
      } else {
        // 如果商品不存在，添加新商品
        state = [...state, CartItem(product: product, quantity: quantity)];
      }
      
      // 同步到数据库
      await _cartRepository.addItem(
        productId: product.id,
        quantity: quantity,
      );
      
      // 保存到本地存储作为备用
      await _saveCartToStorage();
    } catch (e) {
      print('Error adding item to cart: $e');
      // 如果数据库同步失败，至少保存到本地存储
      await _saveCartToStorage();
      // 不重新抛出异常，让用户知道商品已添加到本地购物车
    }
  }

  // 更新商品数量
  Future<void> updateQuantity(int productId, int quantity) async {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      // 先更新本地状态
      final existingIndex = state.indexWhere((item) => item.product.id == productId);
      if (existingIndex >= 0) {
        final existingItem = state[existingIndex];
        state = [
          ...state.sublist(0, existingIndex),
          existingItem.copyWith(quantity: quantity),
          ...state.sublist(existingIndex + 1),
        ];
        
        // 同步到数据库
        await _cartRepository.updateItemQuantity(
          productId: productId,
          quantity: quantity,
        );
        
        // 保存到本地存储作为备用
        await _saveCartToStorage();
      }
    } catch (e) {
      print('Error updating quantity: $e');
      // 如果数据库同步失败，至少保存到本地存储
      await _saveCartToStorage();
    }
  }

  // 移除商品
  Future<void> removeItem(int productId) async {
    try {
      // 先更新本地状态
      state = state.where((item) => item.product.id != productId).toList();
      
      // 同步到数据库
      await _cartRepository.removeItem(productId);
      
      // 保存到本地存储作为备用
      await _saveCartToStorage();
    } catch (e) {
      print('Error removing item: $e');
      // 如果数据库同步失败，至少保存到本地存储
      await _saveCartToStorage();
    }
  }

  // 清空购物车
  Future<void> clear() async {
    try {
      // 先更新本地状态
      state = [];
      
      // 同步到数据库
      await _cartRepository.clearCart();
      
      // 保存到本地存储作为备用
      await _saveCartToStorage();
    } catch (e) {
      print('Error clearing cart: $e');
      // 如果数据库同步失败，至少保存到本地存储
      await _saveCartToStorage();
    }
  }

  // 获取总价
  int get totalPrice {
    return state.fold(0, (sum, item) => sum + item.totalPrice);
  }

  // 获取总数量
  int get totalQuantity {
    return state.fold(0, (sum, item) => sum + item.quantity);
  }

  // 从后端加载购物车数据
  Future<void> loadCart() async {
    try {
      final dioClient = DioClient();
      final response = await dioClient.dio.get('/api/cart');
      
      if (response.statusCode == 200) {
        final data = response.data['data'];
        final items = (data['items'] as List).map((item) => CartItem(
          product: Product.fromJson(item['product']),
          quantity: item['quantity'],
        )).toList();
        
        state = items;
      }
    } catch (e) {
      print('Error loading cart: $e');
    }
  }
}

// 购物车Repository Provider
final cartRepositoryProvider = Provider<CartRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return CartRepository(dioClient);
});

// 购物车Provider
final cartProvider = StateNotifierProvider<CartNotifier, List<CartItem>>((ref) {
  final cartRepository = ref.watch(cartRepositoryProvider);
  final dioClient = ref.watch(dioClientProvider);
  return CartNotifier(cartRepository, dioClient);
});

// 便捷访问方法
final cartItemCountProvider = Provider<int>((ref) {
  final cartItems = ref.watch(cartProvider);
  return cartItems.fold(0, (sum, item) => sum + item.quantity);
});

final cartTotalPriceProvider = Provider<int>((ref) {
  final cartItems = ref.watch(cartProvider);
  return cartItems.fold(0, (sum, item) => sum + item.totalPrice);
});

final cartIsEmptyProvider = Provider<bool>((ref) {
  final cartItems = ref.watch(cartProvider);
  return cartItems.isEmpty;
});

// 兼容性别名
final cartItemsProvider = cartProvider;
final cartTotalCostProvider = cartTotalPriceProvider;
