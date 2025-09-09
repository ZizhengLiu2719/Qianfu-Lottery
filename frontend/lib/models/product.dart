import 'package:json_annotation/json_annotation.dart';

part 'product.g.dart';

@JsonSerializable()
class Product {
  final int id;
  final String title;
  final String description;
  final List<String> images;
  final int priceInQiancaiDou;
  final int stock;
  final String category;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Product({
    required this.id,
    required this.title,
    required this.description,
    required this.images,
    required this.priceInQiancaiDou,
    required this.stock,
    required this.category,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Product.fromJson(Map<String, dynamic> json) => _$ProductFromJson(json);
  
  Map<String, dynamic> toJson() => _$ProductToJson(this);

  bool get isInStock => stock > 0;
  
  String get mainImage => images.isNotEmpty ? images.first : '';
  String get imageUrl => mainImage;
}

@JsonSerializable()
class Order {
  final int id;
  final int userId;
  final int totalCost;
  final String status;
  final String? shippingAddress;
  final String? note;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<OrderItem> items;

  const Order({
    required this.id,
    required this.userId,
    required this.totalCost,
    required this.status,
    this.shippingAddress,
    this.note,
    required this.createdAt,
    required this.updatedAt,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) => _$OrderFromJson(json);
  
  Map<String, dynamic> toJson() => _$OrderToJson(this);

  String get statusDisplay {
    switch (status) {
      case 'PENDING':
        return '待处理';
      case 'PROCESSING':
        return '处理中';
      case 'SHIPPED':
        return '已发货';
      case 'COMPLETED':
        return '已完成';
      case 'CANCELLED':
        return '已取消';
      default:
        return status;
    }
  }

  bool get canCancel => status == 'PENDING';
}

@JsonSerializable()
class OrderItem {
  final int id;
  final int orderId;
  final int productId;
  final int quantity;
  final int unitPrice;
  final int totalPrice;
  final Product? product;

  const OrderItem({
    required this.id,
    required this.orderId,
    required this.productId,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
    this.product,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) => _$OrderItemFromJson(json);
  
  Map<String, dynamic> toJson() => _$OrderItemToJson(this);
}

@JsonSerializable()
class CartItem {
  final Product product;
  final int quantity;

  const CartItem({
    required this.product,
    required this.quantity,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) => _$CartItemFromJson(json);
  
  Map<String, dynamic> toJson() => _$CartItemToJson(this);

  int get totalPrice => product.priceInQiancaiDou * quantity;

  CartItem copyWith({
    Product? product,
    int? quantity,
  }) {
    return CartItem(
      product: product ?? this.product,
      quantity: quantity ?? this.quantity,
    );
  }
}
