import 'package:dio/dio.dart';
import '../models/address.dart';
import '../models/api_response.dart';
import 'dio_client.dart';

class AddressRepository {
  final DioClient _dioClient;

  AddressRepository(this._dioClient);

  // 获取地址列表
  Future<ApiResponse<List<Address>>> getAddresses() async {
    try {
      final response = await _dioClient.dio.get('/addresses');
      return ApiResponse.fromJson(
        response.data,
        (json) => (json as List).map((e) => Address.fromJson(e)).toList(),
      );
    } on DioException catch (e) {
      throw Exception('获取地址列表失败: ${e.message}');
    }
  }

  // 创建地址
  Future<ApiResponse<Address>> createAddress({
    required String receiverName,
    required String phone,
    required String province,
    required String city,
    String? district,
    required String detail,
    String? zip,
    bool isDefault = false,
  }) async {
    try {
      final response = await _dioClient.dio.post('/addresses', data: {
        'receiverName': receiverName,
        'phone': phone,
        'province': province,
        'city': city,
        'district': district,
        'detail': detail,
        'zip': zip,
        'isDefault': isDefault,
      });
      return ApiResponse.fromJson(
        response.data,
        (json) => Address.fromJson(json),
      );
    } on DioException catch (e) {
      throw Exception('创建地址失败: ${e.message}');
    }
  }

  // 更新地址
  Future<ApiResponse<Address>> updateAddress({
    required int id,
    String? receiverName,
    String? phone,
    String? province,
    String? city,
    String? district,
    String? detail,
    String? zip,
    bool? isDefault,
  }) async {
    try {
      final response = await _dioClient.dio.put('/addresses/$id', data: {
        if (receiverName != null) 'receiverName': receiverName,
        if (phone != null) 'phone': phone,
        if (province != null) 'province': province,
        if (city != null) 'city': city,
        if (district != null) 'district': district,
        if (detail != null) 'detail': detail,
        if (zip != null) 'zip': zip,
        if (isDefault != null) 'isDefault': isDefault,
      });
      return ApiResponse.fromJson(
        response.data,
        (json) => Address.fromJson(json),
      );
    } on DioException catch (e) {
      throw Exception('更新地址失败: ${e.message}');
    }
  }

  // 删除地址
  Future<ApiResponse<void>> deleteAddress(int id) async {
    try {
      final response = await _dioClient.dio.delete('/addresses/$id');
      return ApiResponse.fromJson(
        response.data,
        (json) => null,
      );
    } on DioException catch (e) {
      throw Exception('删除地址失败: ${e.message}');
    }
  }

  // 设为默认地址
  Future<ApiResponse<Address>> setDefaultAddress(int id) async {
    try {
      final response = await _dioClient.dio.put('/addresses/$id/default');
      return ApiResponse.fromJson(
        response.data,
        (json) => Address.fromJson(json),
      );
    } on DioException catch (e) {
      throw Exception('设置默认地址失败: ${e.message}');
    }
  }
}
