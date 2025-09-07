import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
  final String email;
  final String? firstName;
  final String? lastName;
  final int qiancaiDouBalance;
  final String language;
  final String? avatarUrl;
  final DateTime createdAt;
  final DateTime? updatedAt;

  const User({
    required this.id,
    required this.email,
    this.firstName,
    this.lastName,
    required this.qiancaiDouBalance,
    required this.language,
    this.avatarUrl,
    required this.createdAt,
    this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  
  Map<String, dynamic> toJson() => _$UserToJson(this);

  User copyWith({
    int? id,
    String? email,
    String? firstName,
    String? lastName,
    int? qiancaiDouBalance,
    String? language,
    String? avatarUrl,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      qiancaiDouBalance: qiancaiDouBalance ?? this.qiancaiDouBalance,
      language: language ?? this.language,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  String get displayName {
    if (firstName != null && lastName != null) {
      // 中国姓名习惯：姓在前（无空格）
      return '${lastName!}${firstName!}';
    }
    if (firstName != null) {
      return firstName!;
    }
    return email.split('@').first;
  }
}

@JsonSerializable()
class AuthResponse {
  final String token;
  final User user;

  const AuthResponse({
    required this.token,
    required this.user,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) => _$AuthResponseFromJson(json);
  
  Map<String, dynamic> toJson() => _$AuthResponseToJson(this);
}

@JsonSerializable()
class QiancaiDouTransaction {
  final int id;
  final int userId;
  final int amount;
  final int newBalance;
  final String reason;
  final String? description;
  final String? refTable;
  final String? refId;
  final DateTime createdAt;

  const QiancaiDouTransaction({
    required this.id,
    required this.userId,
    required this.amount,
    required this.newBalance,
    required this.reason,
    this.description,
    this.refTable,
    this.refId,
    required this.createdAt,
  });

  factory QiancaiDouTransaction.fromJson(Map<String, dynamic> json) => 
      _$QiancaiDouTransactionFromJson(json);
  
  Map<String, dynamic> toJson() => _$QiancaiDouTransactionToJson(this);

  bool get isCredit => amount > 0;
  bool get isDebit => amount < 0;
  
  String get reasonDisplay {
    switch (reason) {
      case 'ADMIN_ADJUSTMENT':
        return '管理员调整';
      case 'PRODUCT_REDEMPTION':
        return '商品兑换';
      case 'APPOINTMENT_FEE':
        return '预约费用';
      case 'TASK_REWARD':
        return '任务奖励';
      case 'REFUND':
        return '退款';
      default:
        return reason;
    }
  }
}
