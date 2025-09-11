import 'package:dio/dio.dart';
import '../models/api_response.dart';
import '../models/product.dart';
import 'dio_client.dart';

class CartRepository {
  final DioClient _dioClient;

  CartRepository(this._dioClient);

  // 获取用户的购物车
  Future<ApiResponse<Map<String, dynamic>>> getCart() async {
    try {
      final response = await _dioClient.dio.get('/api/cart');
      return ApiResponse.fromJson(
        response.data,
        (json) => json as Map<String, dynamic>,
      );
    } on DioException catch (e) {
      throw Exception('获取购物车失败: ${e.message}');
    }
  }

  // 添加商品到购物车
  Future<ApiResponse<Map<String, dynamic>>> addItem({
    required int productId,
    required int quantity,
  }) async {
    try {
      final response = await _dioClient.dio.post('/api/cart/items', data: {
        'productId': productId,
        'quantity': quantity,
      });
      return ApiResponse.fromJson(
        response.data,
        (json) => json as Map<String, dynamic>,
      );
    } on DioException catch (e) {
      throw Exception('添加商品到购物车失败: ${e.message}');
    }
  }

  // 更新购物车商品数量
  Future<ApiResponse<Map<String, dynamic>>> updateItemQuantity({
    required int productId,
    required int quantity,
  }) async {
    try {
      final response = await _dioClient.dio.put('/api/cart/items/$productId', data: {
        'quantity': quantity,
      });
      return ApiResponse.fromJson(
        response.data,
        (json) => json as Map<String, dynamic>,
      );
    } on DioException catch (e) {
      throw Exception('更新商品数量失败: ${e.message}');
    }
  }

  // 从购物车删除商品
  Future<ApiResponse<void>> removeItem(int productId) async {
    try {
      final response = await _dioClient.dio.delete('/api/cart/items/$productId');
      return ApiResponse.fromJson(
        response.data,
        (json) => null,
      );
    } on DioException catch (e) {
      throw Exception('删除商品失败: ${e.message}');
    }
  }

  // 清空购物车
  Future<ApiResponse<void>> clearCart() async {
    try {
      final response = await _dioClient.dio.delete('/api/cart');
      return ApiResponse.fromJson(
        response.data,
        (json) => null,
      );
    } on DioException catch (e) {
      throw Exception('清空购物车失败: ${e.message}');
    }
  }
}
