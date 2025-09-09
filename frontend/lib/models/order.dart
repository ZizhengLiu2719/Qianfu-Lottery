import 'package:json_annotation/json_annotation.dart';
import 'product.dart';
import 'address.dart';

part 'order.g.dart';

@JsonSerializable()
class Order {
  final int id;
  final int userId;
  final int totalCost;
  final OrderStatus status;
  final String payMethod;
  final int? shippingAddressId;
  final String? trackingNumber;
  final DateTime? estimatedDelivery;
  final String? note;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? paidAt;
  final DateTime? cancelledAt;
  final DateTime? fulfilledAt;
  final DateTime? refundedAt;
  final List<OrderItem> items;
  final Address? shippingAddress;
  final Shipment? shipment;
  final List<ShippingTrack>? shippingTracks;

  const Order({
    required this.id,
    required this.userId,
    required this.totalCost,
    required this.status,
    required this.payMethod,
    this.shippingAddressId,
    this.trackingNumber,
    this.estimatedDelivery,
    this.note,
    required this.createdAt,
    required this.updatedAt,
    this.paidAt,
    this.cancelledAt,
    this.fulfilledAt,
    this.refundedAt,
    required this.items,
    this.shippingAddress,
    this.shipment,
    this.shippingTracks,
  });

  factory Order.fromJson(Map<String, dynamic> json) => _$OrderFromJson(json);
  Map<String, dynamic> toJson() => _$OrderToJson(this);

  String get statusText {
    switch (status) {
      case OrderStatus.pending:
        return '待支付';
      case OrderStatus.paid:
        return '已支付';
      case OrderStatus.processing:
        return '处理中';
      case OrderStatus.shipped:
        return '已发货';
      case OrderStatus.delivered:
        return '已送达';
      case OrderStatus.cancelled:
        return '已取消';
      case OrderStatus.refunded:
        return '已退款';
    }
  }

  bool get canCancel {
    return status == OrderStatus.pending || status == OrderStatus.paid;
  }

  bool get canConfirmDelivery {
    return status == OrderStatus.shipped;
  }

  bool get isPaid {
    return status == OrderStatus.paid || 
           status == OrderStatus.processing || 
           status == OrderStatus.shipped || 
           status == OrderStatus.delivered;
  }
}

@JsonSerializable()
class OrderItem {
  final int id;
  final int orderId;
  final int productId;
  final Product product;
  final int quantity;
  final int unitPrice;
  final int totalPrice;

  const OrderItem({
    required this.id,
    required this.orderId,
    required this.productId,
    required this.product,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) => _$OrderItemFromJson(json);
  Map<String, dynamic> toJson() => _$OrderItemToJson(this);
}

@JsonSerializable()
class Shipment {
  final int id;
  final int orderId;
  final String? carrier;
  final String? trackingNo;
  final ShipmentStatus status;
  final DateTime? shippedAt;
  final DateTime? deliveredAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Shipment({
    required this.id,
    required this.orderId,
    this.carrier,
    this.trackingNo,
    required this.status,
    this.shippedAt,
    this.deliveredAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Shipment.fromJson(Map<String, dynamic> json) => _$ShipmentFromJson(json);
  Map<String, dynamic> toJson() => _$ShipmentToJson(this);

  String get statusText {
    switch (status) {
      case ShipmentStatus.pending:
        return '待发货';
      case ShipmentStatus.shipped:
        return '已发货';
      case ShipmentStatus.delivered:
        return '已送达';
    }
  }
}

@JsonSerializable()
class ShippingTrack {
  final int id;
  final int orderId;
  final String status;
  final String? description;
  final String? location;
  final DateTime timestamp;

  const ShippingTrack({
    required this.id,
    required this.orderId,
    required this.status,
    this.description,
    this.location,
    required this.timestamp,
  });

  factory ShippingTrack.fromJson(Map<String, dynamic> json) => _$ShippingTrackFromJson(json);
  Map<String, dynamic> toJson() => _$ShippingTrackToJson(this);
}

enum OrderStatus {
  @JsonValue('PENDING')
  pending,
  @JsonValue('PAID')
  paid,
  @JsonValue('PROCESSING')
  processing,
  @JsonValue('SHIPPED')
  shipped,
  @JsonValue('DELIVERED')
  delivered,
  @JsonValue('CANCELLED')
  cancelled,
  @JsonValue('REFUNDED')
  refunded,
}

enum ShipmentStatus {
  @JsonValue('PENDING')
  pending,
  @JsonValue('SHIPPED')
  shipped,
  @JsonValue('DELIVERED')
  delivered,
}
