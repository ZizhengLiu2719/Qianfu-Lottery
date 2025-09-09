import 'package:dio/dio.dart';
import '../models/order.dart';
import '../models/api_response.dart';
import 'dio_client.dart';

class OrderRepository {
  final DioClient _dioClient;

  OrderRepository(this._dioClient);

  // 获取订单列表
  Future<ApiResponse<OrderListResponse>> getOrders({
    int page = 1,
    int limit = 10,
    String? status,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'page': page,
        'limit': limit,
      };
      if (status != null) {
        queryParams['status'] = status;
      }

      final response = await _dioClient.dio.get('/api/orders', queryParameters: queryParams);
      return ApiResponse.fromJson(
        response.data,
        (json) => OrderListResponse.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('获取订单列表失败: ${e.message}');
    }
  }

  // 获取订单详情
  Future<ApiResponse<Order>> getOrder(int id) async {
    try {
      final response = await _dioClient.dio.get('/api/orders/$id');
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('获取订单详情失败: ${e.message}');
    }
  }

  // 从购物车创建订单
  Future<ApiResponse<Order>> createOrderFromCart({
    required int shippingAddressId,
    String? note,
  }) async {
    try {
      final response = await _dioClient.dio.post('/api/orders/from-cart', data: {
        'shippingAddressId': shippingAddressId,
        'note': note,
      });
      
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('创建订单失败: ${e.message}');
    }
  }

  // 支付订单
  Future<ApiResponse<Order>> payOrder(int id) async {
    try {
      final response = await _dioClient.dio.post('/api/orders/$id/pay');
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('支付订单失败: ${e.message}');
    }
  }

  // 取消订单
  Future<ApiResponse<Order>> cancelOrder(int id) async {
    try {
      final response = await _dioClient.dio.post('/api/orders/$id/cancel');
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('取消订单失败: ${e.message}');
    }
  }

  // 确认收货
  Future<ApiResponse<Order>> confirmDelivery(int id) async {
    try {
      final response = await _dioClient.dio.post('/api/orders/$id/confirm-delivery');
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('确认收货失败: ${e.message}');
    }
  }

  // 获取物流跟踪
  Future<ApiResponse<Order>> getTracking(int id) async {
    try {
      final response = await _dioClient.dio.get('/api/orders/$id/tracking');
      return ApiResponse.fromJson(
        response.data,
        (json) => Order.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('获取物流信息失败: ${e.message}');
    }
  }
}

class OrderListResponse {
  final List<Order> orders;
  final OrderPagination pagination;

  const OrderListResponse({
    required this.orders,
    required this.pagination,
  });

  factory OrderListResponse.fromJson(Map<String, dynamic> json) {
    return OrderListResponse(
      orders: (json['orders'] as List)
          .map((e) => Order.fromJson(e))
          .toList(),
      pagination: OrderPagination.fromJson(json['pagination']),
    );
  }
}

class OrderPagination {
  final int page;
  final int limit;
  final int total;
  final int totalPages;

  const OrderPagination({
    required this.page,
    required this.limit,
    required this.total,
    required this.totalPages,
  });

  factory OrderPagination.fromJson(Map<String, dynamic> json) {
    return OrderPagination(
      page: json['page'],
      limit: json['limit'],
      total: json['total'],
      totalPages: json['totalPages'],
    );
  }
}
