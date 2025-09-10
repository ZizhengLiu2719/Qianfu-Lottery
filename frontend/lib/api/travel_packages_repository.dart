import '../models/travel_package.dart';
import 'dio_client.dart';

class TravelPackagesRepository {
  final DioClient _dioClient;

  TravelPackagesRepository(this._dioClient);

  // 获取旅游套餐列表
  Future<TravelPackageListResponse> getTravelPackages({
    String? category,
    String? subcategory,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _dioClient.get<TravelPackageListResponse>(
      '/api/travel/packages',
      queryParameters: {
        if (category != null) 'category': category,
        if (subcategory != null) 'subcategory': subcategory,
        'page': page,
        'limit': limit,
      },
      fromJson: (json) => TravelPackageListResponse.fromJson(json),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '获取旅游套餐失败',
      );
    }

    return response.data!;
  }

  // 获取旅游套餐详情
  Future<TravelPackage> getTravelPackage(int packageId) async {
    final response = await _dioClient.get<TravelPackage>(
      '/api/travel/packages/$packageId',
      fromJson: (json) => TravelPackage.fromJson(json['package']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 404,
        message: '未找到旅游套餐',
      );
    }

    return response.data!;
  }

  // 注册旅游套餐
  Future<Map<String, dynamic>> registerTravelPackage({
    required String packageId,
    required String title,
    String? subtitle,
    required String category,
  }) async {
    final response = await _dioClient.post<Map<String, dynamic>>(
      '/api/travel/packages/register',
      data: {
        'packageId': packageId,
        'title': title,
        'subtitle': subtitle,
        'category': category,
      },
      fromJson: (json) => json as Map<String, dynamic>,
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '注册旅游套餐失败',
      );
    }

    return response.data!;
  }

  // 取消旅游注册
  Future<void> cancelTravelRegistration(String registrationId) async {
    await _dioClient.delete(
      '/api/travel/registrations/$registrationId',
    );
  }

  // 获取用户旅游注册列表
  Future<List<TravelRegistration>> getUserTravelRegistrations() async {
    final response = await _dioClient.get<List<TravelRegistration>>(
      '/api/travel/registrations',
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final registrations = data['registrations'] as List;
        return registrations.map((reg) => TravelRegistration.fromJson(reg)).toList();
      },
    );

    return response.data ?? [];
  }

  // 清空所有旅游注册
  Future<void> clearAllTravelRegistrations() async {
    await _dioClient.delete('/api/travel/registrations/clear');
  }
}
