import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:cached_network_image/cached_network_image.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../../../models/order.dart';
import '../providers/order_provider.dart';

class OrdersScreen extends ConsumerStatefulWidget {
  const OrdersScreen({super.key});

  @override
  ConsumerState<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends ConsumerState<OrdersScreen> {
  String _selectedStatus = 'all';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(ordersProvider.notifier).loadOrders();
    });
  }

  @override
  Widget build(BuildContext context) {
    final orders = ref.watch(ordersProvider);

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          '我的订单',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        leading: IconButton(
          icon: Icon(FeatherIcons.arrowLeft, color: AppTheme.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          PopupMenuButton<String>(
            onSelected: (status) {
              setState(() {
                _selectedStatus = status;
              });
              if (status == 'all') {
                ref.read(ordersProvider.notifier).loadOrders();
              } else {
                ref.read(ordersProvider.notifier).loadOrders(status: status);
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'all',
                child: Text('全部订单'),
              ),
              const PopupMenuItem(
                value: 'PENDING',
                child: Text('待支付'),
              ),
              const PopupMenuItem(
                value: 'PAID',
                child: Text('已支付'),
              ),
              const PopupMenuItem(
                value: 'SHIPPED',
                child: Text('已发货'),
              ),
              const PopupMenuItem(
                value: 'DELIVERED',
                child: Text('已送达'),
              ),
              const PopupMenuItem(
                value: 'CANCELLED',
                child: Text('已取消'),
              ),
            ],
            child: Padding(
              padding: EdgeInsets.all(16.w),
              child: Icon(FeatherIcons.filter, color: AppTheme.textPrimary),
            ),
          ),
        ],
      ),
      body: orders.isEmpty
          ? _buildEmptyState()
          : ListView.builder(
              padding: EdgeInsets.all(16.w),
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final order = orders[index];
                return _buildOrderCard(order);
              },
            ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            FeatherIcons.package,
            size: 80.sp,
            color: AppTheme.textTertiary,
          ),
          SizedBox(height: 16.h),
          Text(
            '暂无订单',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.textTertiary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '快去购买心仪的商品吧',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.textTertiary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOrderCard(Order order) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  '订单 #${order.id}',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                _buildStatusChip(order.status),
              ],
            ),
            SizedBox(height: 12.h),
            if (order.items.isNotEmpty) ...[
              ...order.items.map((item) => _buildOrderItem(item)),
              SizedBox(height: 12.h),
            ],
            Row(
              children: [
                Text(
                  '总计：',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(width: 4.w),
                Row(
                  children: [
                    QiancaiDouIcon(size: 16.sp),
                    SizedBox(width: 4.w),
                    Text(
                      '${order.totalCost}',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                  ],
                ),
                const Spacer(),
                Text(
                  '${order.createdAt.day}/${order.createdAt.month}/${order.createdAt.year}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.textTertiary,
                  ),
                ),
              ],
            ),
            if (order.status == 'PENDING') ...[
              SizedBox(height: 12.h),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => _cancelOrder(order.id),
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(color: AppTheme.errorColor),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.r),
                        ),
                      ),
                      child: Text(
                        '取消订单',
                        style: TextStyle(color: AppTheme.errorColor),
                      ),
                    ),
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => _payOrder(order.id),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.r),
                        ),
                      ),
                      child: const Text(
                        '立即支付',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildOrderItem(OrderItem item) {
    return Container(
      margin: EdgeInsets.only(bottom: 8.h),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8.r),
            child: CachedNetworkImage(
              imageUrl: item.product.imageUrl,
              width: 60.w,
              height: 60.w,
              fit: BoxFit.cover,
              placeholder: (context, url) => Container(
                width: 60.w,
                height: 60.w,
                color: AppTheme.backgroundColor,
                child: Icon(
                  FeatherIcons.image,
                  color: AppTheme.textTertiary,
                  size: 24.sp,
                ),
              ),
              errorWidget: (context, url, error) => Container(
                width: 60.w,
                height: 60.w,
                color: AppTheme.backgroundColor,
                child: Icon(
                  FeatherIcons.image,
                  color: AppTheme.textTertiary,
                  size: 24.sp,
                ),
              ),
            ),
          ),
          SizedBox(width: 12.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.product.title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 4.h),
                Text(
                  '数量: ${item.quantity}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: 4.h),
                Row(
                  children: [
                    QiancaiDouIcon(size: 14.sp),
                    SizedBox(width: 4.w),
                    Text(
                      '${item.totalPrice}',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusChip(String status) {
    Color color;
    String text;
    
    switch (status) {
      case 'PENDING':
        color = AppTheme.warningColor;
        text = '待支付';
        break;
      case 'PAID':
        color = AppTheme.primaryColor;
        text = '已支付';
        break;
      case 'SHIPPED':
        color = AppTheme.infoColor;
        text = '已发货';
        break;
      case 'DELIVERED':
        color = AppTheme.successColor;
        text = '已送达';
        break;
      case 'CANCELLED':
        color = AppTheme.errorColor;
        text = '已取消';
        break;
      default:
        color = AppTheme.textTertiary;
        text = status;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(4.r),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Future<void> _payOrder(int orderId) async {
    final success = await ref.read(ordersProvider.notifier).payOrder(orderId);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(success ? '支付成功' : '支付失败'),
          backgroundColor: success ? AppTheme.successColor : AppTheme.errorColor,
        ),
      );
    }
  }

  Future<void> _cancelOrder(int orderId) async {
    final success = await ref.read(ordersProvider.notifier).cancelOrder(orderId);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(success ? '订单已取消' : '取消失败'),
          backgroundColor: success ? AppTheme.successColor : AppTheme.errorColor,
        ),
      );
    }
  }
}