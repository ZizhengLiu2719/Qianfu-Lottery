import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../api/dio_client.dart';
import '../../../api/feedback_repository.dart';
import '../../../models/feedback.dart';

// 反馈Repository Provider
final feedbackRepositoryProvider = Provider<FeedbackRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return FeedbackRepository(dioClient);
});

// 用户反馈列表Provider
final userFeedbackProvider = StateNotifierProvider<UserFeedbackNotifier, List<Feedback>>((ref) {
  final feedbackRepository = ref.watch(feedbackRepositoryProvider);
  return UserFeedbackNotifier(feedbackRepository);
});

class UserFeedbackNotifier extends StateNotifier<List<Feedback>> {
  final FeedbackRepository _feedbackRepository;

  UserFeedbackNotifier(this._feedbackRepository) : super([]);

  // 加载用户反馈列表
  Future<void> loadUserFeedback({int page = 1, int limit = 20}) async {
    try {
      final response = await _feedbackRepository.getUserFeedback(page: page, limit: limit);
      if (response.code == 200 && response.data != null) {
        if (page == 1) {
          state = response.data!;
        } else {
          state = [...state, ...response.data!];
        }
      }
    } catch (e) {
      print('Error loading user feedback: $e');
    }
  }

  // 创建反馈
  Future<bool> createFeedback(CreateFeedbackRequest request) async {
    try {
      final response = await _feedbackRepository.createFeedback(request);
      if (response.code == 200 && response.data != null) {
        state = [response.data!, ...state];
        return true;
      }
      return false;
    } catch (e) {
      print('Error creating feedback: $e');
      return false;
    }
  }

  // 更新反馈
  Future<bool> updateFeedback(int feedbackId, CreateFeedbackRequest request) async {
    try {
      final response = await _feedbackRepository.updateFeedback(feedbackId, request);
      if (response.code == 200 && response.data != null) {
        final updatedFeedback = response.data!;
        state = state.map((feedback) {
          return feedback.id == feedbackId ? updatedFeedback : feedback;
        }).toList();
        return true;
      }
      return false;
    } catch (e) {
      print('Error updating feedback: $e');
      return false;
    }
  }

  // 删除反馈
  Future<bool> deleteFeedback(int feedbackId) async {
    try {
      final response = await _feedbackRepository.deleteFeedback(feedbackId);
      if (response.code == 200) {
        state = state.where((feedback) => feedback.id != feedbackId).toList();
        return true;
      }
      return false;
    } catch (e) {
      print('Error deleting feedback: $e');
      return false;
    }
  }

  // 清空反馈列表
  void clearFeedback() {
    state = [];
  }
}
