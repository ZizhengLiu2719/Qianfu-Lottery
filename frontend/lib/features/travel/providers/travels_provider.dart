import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../api/travel_packages_repository.dart';
import '../../../api/dio_client.dart';
import '../../../models/travel_package.dart';

// 旅游预约项目模型
class TravelItem {
  final String id; // packageId
  final String registrationId; // 注册记录ID
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;
  final String type; // 'travel'
  final DateTime registeredAt;
  final TravelPackage? package;

  TravelItem({
    required this.id,
    required this.registrationId,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
    required this.type,
    required this.registeredAt,
    this.package,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'registrationId': registrationId,
      'title': title,
      'subtitle': subtitle,
      'category': category,
      'type': type,
      'registeredAt': registeredAt.toIso8601String(),
    };
  }

  factory TravelItem.fromJson(Map<String, dynamic> json) {
    return TravelItem(
      id: json['packageId']?.toString() ?? json['id']?.toString() ?? '',  // 使用 packageId 作为 id
      registrationId: json['id']?.toString() ?? '',  // 使用 id 作为 registrationId
      title: json['title'] ?? '',
      subtitle: json['subtitle'] ?? '',
      category: json['category'] ?? '',
      icon: _getIconFromString(json['icon'] ?? 'map'),
      type: json['type'] ?? 'travel',
      registeredAt: json['registeredAt'] != null 
          ? DateTime.parse(json['registeredAt'])
          : DateTime.now(),
      package: null, // 暂时设为 null 避免解析问题
    );
  }

  static IconData _getIconFromString(String iconName) {
    switch (iconName) {
      case 'map':
        return FeatherIcons.map;
      case 'mapPin':
        return FeatherIcons.mapPin;
      case 'globe':
        return FeatherIcons.globe;
      case 'camera':
        return FeatherIcons.camera;
      case 'heart':
        return FeatherIcons.heart;
      case 'sun':
        return FeatherIcons.sun;
      case 'flower':
        return FeatherIcons.heart;
      case 'bookOpen':
        return FeatherIcons.bookOpen;
      default:
        return FeatherIcons.map;
    }
  }
}

// 旅游预约状态管理
class TravelsNotifier extends StateNotifier<List<TravelItem>> {
  final TravelPackagesRepository _travelPackagesRepository;
  
  TravelsNotifier(this._travelPackagesRepository) : super([]);

  // 添加旅游预约
  void addTravel(TravelItem travel) {
    if (!state.any((item) => item.id == travel.id)) {
      state = [...state, travel];
      _saveTravelToBackend(travel);
    }
  }

  // 移除旅游预约
  void removeTravel(String travelId) {
    print('Removing travel with ID: $travelId');
    print('Current state length: ${state.length}');
    print('Current state items: ${state.map((item) => '${item.id}:${item.registrationId}').join(', ')}');
    
    final travel = state.firstWhere((item) => item.id == travelId);
    print('Found travel to remove: ${travel.title}, registrationId: ${travel.registrationId}');
    
    if (travel.registrationId.isEmpty) {
      print('ERROR: registrationId is empty! Cannot delete from backend.');
      // 仍然更新本地状态，但跳过后端删除
      state = state.where((item) => item.id != travelId).toList();
      return;
    }
    
    state = state.where((item) => item.id != travelId).toList();
    _removeTravelFromBackend(travel.registrationId);
  }

  // 清空所有旅游预约
  void clearAllTravels() {
    state = [];
    _clearAllTravelsFromBackend();
  }

  // 检查是否已预约
  bool isTravelRegistered(String travelId) {
    return state.any((item) => item.id == travelId);
  }

  // 获取预约统计
  Map<String, int> getTravelStats() {
    int domesticCount = state.where((item) => item.category == 'DOMESTIC').length;
    int internationalCount = state.where((item) => item.category == 'INTERNATIONAL').length;
    
    return {
      'domestic': domesticCount,
      'international': internationalCount,
      'total': state.length,
    };
  }

  // 保存预约到后端
  Future<void> _saveTravelToBackend(TravelItem travel) async {
    try {
      final response = await _travelPackagesRepository.registerTravelPackage(
        packageId: travel.id,
        title: travel.title,
        subtitle: travel.subtitle,
        category: travel.category,
      );
      
      // 更新 TravelItem 的 registrationId
      final updatedTravel = TravelItem(
        id: travel.id,
        registrationId: response['data']?['id']?.toString() ?? '',
        title: travel.title,
        subtitle: travel.subtitle,
        category: travel.category,
        icon: travel.icon,
        type: travel.type,
        registeredAt: travel.registeredAt,
        package: travel.package,
      );
      
      // 更新状态中的 TravelItem
      state = state.map((item) => item.id == travel.id ? updatedTravel : item).toList();
      
      print('Successfully saved travel to backend: ${travel.id}, registrationId: ${updatedTravel.registrationId}');
    } catch (e) {
      print('Error saving travel: $e');
      // 如果保存失败，从本地状态中移除
      state = state.where((item) => item.id != travel.id).toList();
    }
  }

  // 从后端移除预约
  Future<void> _removeTravelFromBackend(String registrationId) async {
    try {
      print('Attempting to delete travel registration with ID: $registrationId');
      await _travelPackagesRepository.deleteTravelRegistration(registrationId);
      print('Successfully deleted travel from backend: $registrationId');
    } catch (e) {
      print('Error deleting travel: $e');
      print('Stack trace: ${StackTrace.current}');
    }
  }

  // 从后端清空所有预约
  Future<void> _clearAllTravelsFromBackend() async {
    try {
      await _travelPackagesRepository.clearAllTravelRegistrations();
      print('Successfully cleared all travels from backend');
    } catch (e) {
      print('Error clearing travels: $e');
    }
  }

  // 从后端加载用户预约
  Future<void> loadUserTravels() async {
    try {
      print('Loading user travels...');
      final registrations = await _travelPackagesRepository.getUserTravelRegistrations();
      print('Received ${registrations.length} registrations from API');
      
      final travels = registrations.map((data) {
        print('Processing registration data: $data');
        final travel = TravelItem.fromJson(data);
        print('Created TravelItem: id=${travel.id}, registrationId=${travel.registrationId}, title=${travel.title}');
        return travel;
      }).toList();
      
      state = travels;
      print('Successfully loaded ${travels.length} travels from backend');
      print('Final state: ${state.map((item) => '${item.id}:${item.registrationId}').join(', ')}');
    } catch (e) {
      print('Error loading travels: $e');
      print('Stack trace: ${StackTrace.current}');
    }
  }
}

// 提供者
final travelsProvider = StateNotifierProvider<TravelsNotifier, List<TravelItem>>(
  (ref) {
    // 使用 ref.read 而不是 ref.watch 来避免重复创建
    final dioClient = ref.read(dioClientProvider);
    final travelPackagesRepository = TravelPackagesRepository(dioClient);
    return TravelsNotifier(travelPackagesRepository);
  },
);

// 旅游预约统计提供者
final travelStatsProvider = Provider<Map<String, int>>((ref) {
  final travels = ref.watch(travelsProvider);
  final notifier = ref.read(travelsProvider.notifier);
  return notifier.getTravelStats();
});
