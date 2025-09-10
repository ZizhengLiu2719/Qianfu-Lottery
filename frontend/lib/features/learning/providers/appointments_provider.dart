import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

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
      id: json['id'],
      title: json['title'],
      subtitle: json['subtitle'],
      category: json['category'],
      icon: _getIconFromString(json['icon'] ?? 'helpCircle'),
      type: json['type'],
      registeredAt: DateTime.parse(json['registeredAt']),
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
  AppointmentsNotifier() : super([]);

  // 添加预约
  void addAppointment(AppointmentItem appointment) {
    if (!state.any((item) => item.id == appointment.id)) {
      state = [...state, appointment];
    }
  }

  // 移除预约
  void removeAppointment(String appointmentId) {
    state = state.where((item) => item.id != appointmentId).toList();
  }

  // 清空所有预约
  void clearAllAppointments() {
    state = [];
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
}

// 提供者
final appointmentsProvider = StateNotifierProvider<AppointmentsNotifier, List<AppointmentItem>>(
  (ref) => AppointmentsNotifier(),
);

// 预约统计提供者
final appointmentStatsProvider = Provider<Map<String, int>>((ref) {
  final appointments = ref.watch(appointmentsProvider);
  final notifier = ref.read(appointmentsProvider.notifier);
  return notifier.getAppointmentStats();
});
