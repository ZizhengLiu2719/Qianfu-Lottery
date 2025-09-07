import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';
import 'dio_client.dart';

final productsRepositoryProvider = Provider<ProductsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return ProductsRepository(dioClient);
});

class ProductsRepository {
  final DioClient _dioClient;

  ProductsRepository(this._dioClient);

  // 获取商品列表
  Future<List<Product>> getProducts({
    int page = 1,
    int limit = 20,
    String? category,
  }) async {
    final response = await _dioClient.get<List<Product>>(
      '/api/products',
      queryParameters: {
        'page': page,
        'limit': limit,
        if (category != null) 'category': category,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final products = data['products'] as List;
        return products.map((product) => Product.fromJson(product)).toList();
      },
    );

    return response.data ?? [];
  }

  // 获取商品详情
  Future<Product> getProduct(int productId) async {
    final response = await _dioClient.get<Product>(
      '/api/products/$productId',
      fromJson: (json) => Product.fromJson(json['product']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 404,
        message: '商品不存在',
      );
    }

    return response.data!;
  }

  // 创建订单
  Future<Order> createOrder({
    required List<CartItem> items,
    String? shippingAddress,
    String? note,
  }) async {
    final orderItems = items.map((item) => {
      'productId': item.product.id,
      'quantity': item.quantity,
    }).toList();

    final response = await _dioClient.post<Order>(
      '/api/orders',
      data: {
        'items': orderItems,
        if (shippingAddress != null) 'shippingAddress': shippingAddress,
        if (note != null) 'note': note,
      },
      fromJson: (json) => Order.fromJson(json['order']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '创建订单失败',
      );
    }

    return response.data!;
  }

  // 获取用户订单列表
  Future<List<Order>> getUserOrders({
    int page = 1,
    int limit = 10,
  }) async {
    final response = await _dioClient.get<List<Order>>(
      '/api/me/orders',
      queryParameters: {
        'page': page,
        'limit': limit,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final orders = data['orders'] as List;
        return orders.map((order) => Order.fromJson(order)).toList();
      },
    );

    return response.data ?? [];
  }
}
