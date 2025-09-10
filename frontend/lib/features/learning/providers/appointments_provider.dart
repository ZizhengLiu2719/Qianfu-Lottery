import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../api/learning_repository.dart';
import '../../../api/dio_client.dart';

// 预约项目模型
class AppointmentItem {
  final String id;
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;
  final String type; // 'course', 'service', 'camp'
  final DateTime registeredAt;

  AppointmentItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
    required this.type,
    required this.registeredAt,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'category': category,
      'type': type,
      'registeredAt': registeredAt.toIso8601String(),
    };
  }

  factory AppointmentItem.fromJson(Map<String, dynamic> json) {
    return AppointmentItem(
      id: json['id'] ?? json['courseId'] ?? json['serviceId'] ?? json['campId'] ?? '',
      title: json['title'] ?? '',
      subtitle: json['subtitle'] ?? '',
      category: json['category'] ?? '',
      icon: _getIconFromString(json['icon'] ?? 'helpCircle'),
      type: json['type'] ?? 'course',
      registeredAt: json['registeredAt'] != null 
          ? DateTime.parse(json['registeredAt'])
          : DateTime.now(),
    );
  }

  static IconData _getIconFromString(String iconName) {
    switch (iconName) {
      case 'cpu':
        return FeatherIcons.cpu;
      case 'layers':
        return FeatherIcons.layers;
      case 'mic':
        return FeatherIcons.mic;
      case 'edit':
        return FeatherIcons.edit;
      case 'award':
        return FeatherIcons.award;
      case 'crosshair':
        return FeatherIcons.crosshair;
      case 'bookOpen':
        return FeatherIcons.bookOpen;
      case 'messageSquare':
        return FeatherIcons.messageSquare;
      case 'mapPin':
        return FeatherIcons.mapPin;
      case 'heart':
        return FeatherIcons.heart;
      default:
        return FeatherIcons.helpCircle;
    }
  }
}

// 预约状态管理
class AppointmentsNotifier extends StateNotifier<List<AppointmentItem>> {
  final LearningRepository _learningRepository;
  
  AppointmentsNotifier(this._learningRepository) : super([]);

  // 添加预约
  void addAppointment(AppointmentItem appointment) {
    if (!state.any((item) => item.id == appointment.id)) {
      state = [...state, appointment];
      _saveAppointmentToBackend(appointment);
    }
  }

  // 移除预约
  void removeAppointment(String appointmentId) {
    state = state.where((item) => item.id != appointmentId).toList();
    _removeAppointmentFromBackend(appointmentId);
  }

  // 清空所有预约
  void clearAllAppointments() {
    state = [];
    _clearAllAppointmentsFromBackend();
  }

  // 检查是否已预约
  bool isAppointed(String appointmentId) {
    return state.any((item) => item.id == appointmentId);
  }

  // 获取预约统计
  Map<String, int> getAppointmentStats() {
    int courseCount = state.where((item) => item.type == 'course').length;
    int serviceCount = state.where((item) => item.type == 'service').length;
    int campCount = state.where((item) => item.type == 'camp').length;
    
    return {
      'course': courseCount,
      'service': serviceCount,
      'camp': campCount,
    };
  }

  // 保存预约到后端
  Future<void> _saveAppointmentToBackend(AppointmentItem appointment) async {
    try {
      switch (appointment.type) {
        case 'course':
          await _learningRepository.registerCourse(
            courseId: appointment.id,
            title: appointment.title,
            subtitle: appointment.subtitle,
            category: appointment.category,
          );
          break;
        case 'service':
          await _learningRepository.registerStudyAbroadService(
            serviceId: appointment.id,
            title: appointment.title,
            subtitle: appointment.subtitle,
            category: appointment.category,
          );
          break;
        case 'camp':
          await _learningRepository.registerSummerCamp(
            campId: appointment.id,
            title: appointment.title,
            subtitle: appointment.subtitle,
            category: appointment.category,
          );
          break;
      }
      print('Successfully saved appointment to backend: ${appointment.id}');
    } catch (e) {
      print('Error saving appointment: $e');
      // 如果保存失败，从本地状态中移除
      state = state.where((item) => item.id != appointment.id).toList();
    }
  }

  // 从后端移除预约
  Future<void> _removeAppointmentFromBackend(String appointmentId) async {
    try {
      // 找到要删除的预约项
      final appointment = state.firstWhere((item) => item.id == appointmentId);
      
      await _learningRepository.deleteRegistration(
        registrationId: appointmentId,
        type: appointment.type,
      );
      print('Successfully deleted appointment from backend: $appointmentId');
    } catch (e) {
      print('Error deleting appointment: $e');
    }
  }

  // 从后端清空所有预约
  Future<void> _clearAllAppointmentsFromBackend() async {
    try {
      await _learningRepository.clearAllLearningRegistrations();
      print('Successfully cleared all appointments from backend');
    } catch (e) {
      print('Error clearing appointments: $e');
    }
  }

  // 从后端加载用户预约
  Future<void> loadUserAppointments() async {
    try {
      final registrations = await _learningRepository.getUserLearningRegistrations();
      final appointments = registrations.map((data) => AppointmentItem.fromJson(data)).toList();
      state = appointments;
      print('Successfully loaded ${appointments.length} appointments from backend');
    } catch (e) {
      print('Error loading appointments: $e');
    }
  }
}

// 提供者
final appointmentsProvider = StateNotifierProvider<AppointmentsNotifier, List<AppointmentItem>>(
  (ref) {
    final dioClient = ref.watch(dioClientProvider);
    final learningRepository = LearningRepository(dioClient);
    return AppointmentsNotifier(learningRepository);
  },
);

// 预约统计提供者
final appointmentStatsProvider = Provider<Map<String, int>>((ref) {
  final appointments = ref.watch(appointmentsProvider);
  final notifier = ref.read(appointmentsProvider.notifier);
  return notifier.getAppointmentStats();
});
