import 'package:dio/dio.dart';
import '../models/api_response.dart';
import '../models/feedback.dart' as models;
import 'dio_client.dart';

class FeedbackRepository {
  final DioClient _dioClient;

  FeedbackRepository(this._dioClient);

  // 创建反馈
  Future<ApiResponse<models.Feedback>> createFeedback(models.CreateFeedbackRequest request) async {
    try {
      final response = await _dioClient.dio.post('/api/feedback', data: request.toJson());
      return ApiResponse.fromJson(
        response.data,
        (json) => models.Feedback.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('提交反馈失败: ${e.message}');
    }
  }

  // 获取用户的反馈列表
  Future<ApiResponse<List<models.Feedback>>> getUserFeedback({
    int page = 1,
    int limit = 20,
  }) async {
    try {
      final response = await _dioClient.dio.get('/api/feedback', queryParameters: {
        'page': page,
        'limit': limit,
      });
      return ApiResponse.fromJson(
        response.data,
        (json) => (json as List<dynamic>).map((item) => models.Feedback.fromJson(item as Map<String, dynamic>)).toList(),
      );
    } on DioException catch (e) {
      throw Exception('获取反馈列表失败: ${e.message}');
    }
  }

  // 获取单个反馈详情
  Future<ApiResponse<models.Feedback>> getFeedback(int feedbackId) async {
    try {
      final response = await _dioClient.dio.get('/api/feedback/$feedbackId');
      return ApiResponse.fromJson(
        response.data,
        (json) => models.Feedback.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('获取反馈详情失败: ${e.message}');
    }
  }

  // 更新反馈
  Future<ApiResponse<models.Feedback>> updateFeedback(int feedbackId, models.CreateFeedbackRequest request) async {
    try {
      final response = await _dioClient.dio.put('/api/feedback/$feedbackId', data: request.toJson());
      return ApiResponse.fromJson(
        response.data,
        (json) => models.Feedback.fromJson(json as Map<String, dynamic>),
      );
    } on DioException catch (e) {
      throw Exception('更新反馈失败: ${e.message}');
    }
  }

  // 删除反馈
  Future<ApiResponse<void>> deleteFeedback(int feedbackId) async {
    try {
      final response = await _dioClient.dio.delete('/api/feedback/$feedbackId');
      return ApiResponse.fromJson(
        response.data,
        (json) => null,
      );
    } on DioException catch (e) {
      throw Exception('删除反馈失败: ${e.message}');
    }
  }
}
