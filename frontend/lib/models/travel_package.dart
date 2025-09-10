import 'package:json_annotation/json_annotation.dart';

part 'travel_package.g.dart';

@JsonSerializable()
class TravelPackage {
  final int id;
  final String title;
  final String? description;
  final String category; // DOMESTIC, INTERNATIONAL
  final String? subcategory; // 文化体验, 自然风光, 城市探索 等
  final int? durationDays; // 行程天数
  final int priceInQiancaiDou; // 仟彩豆价格
  final int maxParticipants; // 最大参与人数
  final int currentParticipants; // 当前参与人数
  final DateTime? startDate; // 出发日期
  final DateTime? endDate; // 结束日期
  final String? location; // 目的地
  final String? imageUrl; // 主图片
  final List<String> images; // 图片数组
  final List<String> tags; // 标签数组
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const TravelPackage({
    required this.id,
    required this.title,
    this.description,
    required this.category,
    this.subcategory,
    this.durationDays,
    required this.priceInQiancaiDou,
    required this.maxParticipants,
    required this.currentParticipants,
    this.startDate,
    this.endDate,
    this.location,
    this.imageUrl,
    required this.images,
    required this.tags,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory TravelPackage.fromJson(Map<String, dynamic> json) => _$TravelPackageFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelPackageToJson(this);

  String get categoryDisplay {
    switch (category) {
      case 'DOMESTIC':
        return '国内旅游';
      case 'INTERNATIONAL':
        return '国外旅游';
      default:
        return category;
    }
  }

  String get mainImage => imageUrl ?? (images.isNotEmpty ? images.first : '');

  String get durationDisplay {
    if (durationDays == null) return '';
    if (durationDays == 1) return '1日游';
    return '${durationDays}日游';
  }

  String get participantsDisplay {
    return '${currentParticipants}/${maxParticipants}人';
  }

  bool get isFullyBooked => currentParticipants >= maxParticipants;

  String get priceDisplay {
    return '${priceInQiancaiDou}仟彩豆';
  }
}

@JsonSerializable()
class TravelRegistration {
  final int id;
  final int userId;
  final int packageId;
  final String title;
  final String? subtitle;
  final String category;
  final String status; // REGISTERED, CANCELLED, COMPLETED
  final DateTime createdAt;
  final DateTime updatedAt;
  final TravelPackage? package;

  const TravelRegistration({
    required this.id,
    required this.userId,
    required this.packageId,
    required this.title,
    this.subtitle,
    required this.category,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    this.package,
  });

  factory TravelRegistration.fromJson(Map<String, dynamic> json) => _$TravelRegistrationFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelRegistrationToJson(this);

  String get statusDisplay {
    switch (status) {
      case 'REGISTERED':
        return '已注册';
      case 'CANCELLED':
        return '已取消';
      case 'COMPLETED':
        return '已完成';
      default:
        return status;
    }
  }

  bool get isRegistered => status == 'REGISTERED';
  bool get isCancelled => status == 'CANCELLED';
  bool get isCompleted => status == 'COMPLETED';
}

@JsonSerializable()
class TravelPackageListResponse {
  final List<TravelPackage> packages;
  final Pagination pagination;

  const TravelPackageListResponse({
    required this.packages,
    required this.pagination,
  });

  factory TravelPackageListResponse.fromJson(Map<String, dynamic> json) => _$TravelPackageListResponseFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelPackageListResponseToJson(this);
}

@JsonSerializable()
class TravelRegistrationListResponse {
  final List<TravelRegistration> registrations;

  const TravelRegistrationListResponse({
    required this.registrations,
  });

  factory TravelRegistrationListResponse.fromJson(Map<String, dynamic> json) => _$TravelRegistrationListResponseFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelRegistrationListResponseToJson(this);
}

@JsonSerializable()
class Pagination {
  final int page;
  final int limit;
  final int total;
  final int totalPages;

  const Pagination({
    required this.page,
    required this.limit,
    required this.total,
    required this.totalPages,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) => _$PaginationFromJson(json);
  
  Map<String, dynamic> toJson() => _$PaginationToJson(this);

  bool get hasNext => page < totalPages;
  bool get hasPrevious => page > 1;
}
