import 'package:json_annotation/json_annotation.dart';

part 'address.g.dart';

@JsonSerializable()
class Address {
  final int id;
  final int userId;
  @JsonKey(name: 'receiverName')
  final String receiverName;
  final String phone;
  final String province;
  final String city;
  final String? district;
  final String detail;
  final String? zip;
  @JsonKey(name: 'isDefault')
  final bool isDefault;
  @JsonKey(name: 'createdAt')
  final DateTime createdAt;
  @JsonKey(name: 'updatedAt')
  final DateTime updatedAt;

  const Address({
    required this.id,
    required this.userId,
    required this.receiverName,
    required this.phone,
    required this.province,
    required this.city,
    this.district,
    required this.detail,
    this.zip,
    required this.isDefault,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Address.fromJson(Map<String, dynamic> json) => _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);

  Address copyWith({
    int? id,
    int? userId,
    String? receiverName,
    String? phone,
    String? province,
    String? city,
    String? district,
    String? detail,
    String? zip,
    bool? isDefault,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Address(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      receiverName: receiverName ?? this.receiverName,
      phone: phone ?? this.phone,
      province: province ?? this.province,
      city: city ?? this.city,
      district: district ?? this.district,
      detail: detail ?? this.detail,
      zip: zip ?? this.zip,
      isDefault: isDefault ?? this.isDefault,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  String get fullAddress {
    final parts = [province, city];
    if (district != null && district!.isNotEmpty) {
      parts.add(district!);
    }
    parts.add(detail);
    return parts.join(' ');
  }

  String get shortAddress {
    return '$province $city $detail';
  }
}
