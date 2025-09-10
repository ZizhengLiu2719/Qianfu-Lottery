import '../models/models.dart';
import 'dio_client.dart';

class LearningRepository {
  final DioClient _dioClient;

  LearningRepository(this._dioClient);

  // 注册课程
  Future<Map<String, dynamic>> registerCourse({
    required String courseId,
    required String title,
    required String subtitle,
    required String category,
  }) async {
    final response = await _dioClient.post<Map<String, dynamic>>(
      '/api/learning/courses/register',
      data: {
        'courseId': courseId,
        'title': title,
        'subtitle': subtitle,
        'category': category,
        'type': 'course',
      },
      fromJson: (json) => json as Map<String, dynamic>,
    );

    return response.data ?? {};
  }

  // 注册留学咨询服务
  Future<Map<String, dynamic>> registerStudyAbroadService({
    required String serviceId,
    required String title,
    required String subtitle,
    required String category,
  }) async {
    final response = await _dioClient.post<Map<String, dynamic>>(
      '/api/learning/study-abroad/register',
      data: {
        'serviceId': serviceId,
        'title': title,
        'subtitle': subtitle,
        'category': category,
        'type': 'service',
      },
      fromJson: (json) => json as Map<String, dynamic>,
    );

    return response.data ?? {};
  }

  // 注册夏令营
  Future<Map<String, dynamic>> registerSummerCamp({
    required String campId,
    required String title,
    required String subtitle,
    required String category,
  }) async {
    final response = await _dioClient.post<Map<String, dynamic>>(
      '/api/learning/summer-camps/register',
      data: {
        'campId': campId,
        'title': title,
        'subtitle': subtitle,
        'category': category,
        'type': 'camp',
      },
      fromJson: (json) => json as Map<String, dynamic>,
    );

    return response.data ?? {};
  }

  // 取消注册
  Future<void> cancelRegistration({
    required String registrationId,
    required String type, // 'course', 'service', 'camp'
  }) async {
    await _dioClient.delete<void>(
      '/api/learning/$type/cancel/$registrationId',
      fromJson: (json) => null,
    );
  }

  // 删除注册记录
  Future<void> deleteRegistration({
    required String registrationId,
    required String type, // 'course', 'service', 'camp'
  }) async {
    await _dioClient.delete<void>(
      '/api/learning/$type/delete/$registrationId',
      fromJson: (json) => null,
    );
  }

  // 获取用户的学习彩注册列表
  Future<List<Map<String, dynamic>>> getUserLearningRegistrations() async {
    final response = await _dioClient.get<List<Map<String, dynamic>>>(
      '/api/learning/registrations',
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final registrations = data['data']['registrations'] as List;
        return registrations.cast<Map<String, dynamic>>();
      },
    );

    return response.data ?? [];
  }

  // 清空所有学习彩注册
  Future<void> clearAllLearningRegistrations() async {
    await _dioClient.delete<void>(
      '/api/learning/registrations/clear',
      fromJson: (json) => null,
    );
  }
}
