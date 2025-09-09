import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../models/models.dart';

class CartNotifier extends StateNotifier<List<CartItem>> {
  CartNotifier() : super([]);

  // 添加商品到购物车
  void addItem(Product product, {int quantity = 1}) {
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
  }

  // 更新商品数量
  void updateQuantity(int productId, int quantity) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    final existingIndex = state.indexWhere((item) => item.product.id == productId);
    if (existingIndex >= 0) {
      final existingItem = state[existingIndex];
      state = [
        ...state.sublist(0, existingIndex),
        existingItem.copyWith(quantity: quantity),
        ...state.sublist(existingIndex + 1),
      ];
    }
  }

  // 移除商品
  void removeItem(int productId) {
    state = state.where((item) => item.product.id != productId).toList();
  }

  // 清空购物车
  void clear() {
    state = [];
  }

  // 获取总价
  int get totalPrice {
    return state.fold(0, (sum, item) => sum + item.totalPrice);
  }

  // 获取总数量
  int get totalQuantity {
    return state.fold(0, (sum, item) => sum + item.quantity);
  }
}

// 购物车Provider
final cartProvider = StateNotifierProvider<CartNotifier, List<CartItem>>((ref) {
  return CartNotifier();
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
