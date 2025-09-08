import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../core/theme/app_theme.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../models/product.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import '../../../core/widgets/qc_coin.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartItems = ref.watch(cartProvider);
    final totalPrice = ref.watch(cartTotalPriceProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);
    final isEmpty = ref.watch(cartIsEmptyProvider);

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.cart_title),
        backgroundColor: Colors.white,
        actions: [
          if (!isEmpty)
            TextButton(
              onPressed: () => _showClearCartDialog(context, ref),
              child: Text('清空'),
            ),
        ],
      ),
      body: isEmpty
          ? _buildEmptyState(context)
          : Column(
              children: [
                // 购物车列表
                Expanded(
                  child: ListView.builder(
                    padding: EdgeInsets.all(16.w),
                    itemCount: cartItems.length,
                    itemBuilder: (context, index) {
                      return _buildCartItem(context, ref, cartItems[index]);
                    },
                  ),
                ),
                
                // 底部结算区域
                _buildCheckoutSection(context, ref, totalPrice, qiancaiDouBalance),
              ],
            ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            FeatherIcons.shoppingCart,
            size: 80.sp,
            color: AppTheme.textTertiary,
          ),
          SizedBox(height: 16.h),
          Text(
            AppLocalizations.of(context)!.cart_empty,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.textTertiary,
            ),
          ),
          SizedBox(height: 24.h),
          ElevatedButton(
            onPressed: () => context.go(AppRoutes.products),
            child: const Text('去购物'),
          ),
        ],
      ),
    );
  }

  Widget _buildCartItem(BuildContext context, WidgetRef ref, CartItem item) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.h),
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.borderRadiusMedium),
        boxShadow: [AppTheme.cardShadow],
      ),
      child: Row(
        children: [
          // 商品图片
          ClipRRect(
            borderRadius: BorderRadius.circular(8.r),
            child: SizedBox(
              width: 60.w,
              height: 60.w,
              child: item.product.mainImage.isNotEmpty
                  ? CachedNetworkImage(
                      imageUrl: item.product.mainImage,
                      fit: BoxFit.cover,
                    )
                  : Container(
                      color: AppTheme.backgroundColor,
                      child: Icon(
                        FeatherIcons.image,
                        size: 24.sp,
                        color: AppTheme.textTertiary,
                      ),
                    ),
            ),
          ),
          
          SizedBox(width: 12.w),
          
          // 商品信息
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.product.title,
                  style: Theme.of(context).textTheme.titleMedium,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 4.h),
                Row(
                  children: [
                    const QcCoin(size: 14),
                    SizedBox(width: 4.w),
                    Text(
                      '${item.product.priceInQiancaiDou}',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppTheme.primaryColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          
          // 数量控制
          Row(
            children: [
              IconButton(
                onPressed: () {
                  if (item.quantity > 1) {
                    ref.read(cartProvider.notifier).updateQuantity(
                      item.product.id,
                      item.quantity - 1,
                    );
                  } else {
                    ref.read(cartProvider.notifier).removeItem(item.product.id);
                  }
                },
                icon: Icon(
                  item.quantity > 1 ? FeatherIcons.minus : FeatherIcons.trash2,
                  size: 16.sp,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 4.h),
                decoration: BoxDecoration(
                  border: Border.all(color: AppTheme.dividerColor),
                  borderRadius: BorderRadius.circular(4.r),
                ),
                child: Text(
                  '${item.quantity}',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ),
              IconButton(
                onPressed: () {
                  ref.read(cartProvider.notifier).updateQuantity(
                    item.product.id,
                    item.quantity + 1,
                  );
                },
                icon: Icon(FeatherIcons.plus, size: 16.sp),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCheckoutSection(BuildContext context, WidgetRef ref, int totalPrice, int balance) {
    final canCheckout = balance >= totalPrice;

    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20.r)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  AppLocalizations.of(context)!.cart_total,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                Row(
                  children: [
                    const QcCoin(size: 20),
                    SizedBox(width: 4.w),
                    Text(
                      '$totalPrice',
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        color: AppTheme.primaryColor,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            
            if (!canCheckout) ...[
              SizedBox(height: 8.h),
              Text(
                AppLocalizations.of(context)!.error_insufficient_balance,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppTheme.errorColor,
                ),
              ),
            ],
            
            SizedBox(height: 16.h),
            
            SizedBox(
              width: double.infinity,
              height: 48.h,
              child: ElevatedButton(
                onPressed: canCheckout ? () => _checkout(context, ref) : null,
                child: Text(AppLocalizations.of(context)!.cart_checkout),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showClearCartDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('清空购物车'),
        content: Text('确定要清空购物车吗？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(AppLocalizations.of(context)!.common_cancel),
          ),
          TextButton(
            onPressed: () {
              ref.read(cartProvider.notifier).clear();
              Navigator.pop(context);
            },
            child: Text(AppLocalizations.of(context)!.common_confirm),
          ),
        ],
      ),
    );
  }

  Future<void> _checkout(BuildContext context, WidgetRef ref) async {
    try {
      final cartItems = ref.read(cartProvider);
      final repository = ref.read(productsRepositoryProvider);
      
      await repository.createOrder(items: cartItems);
      
      // 清空购物车
      ref.read(cartProvider.notifier).clear();
      
      // 刷新用户信息（更新余额）
      await ref.read(authProvider.notifier).refreshUser();
      
      // 显示成功消息
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppLocalizations.of(context)!.orders_create_success),
            backgroundColor: AppTheme.successColor,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        );
        
        context.go(AppRoutes.orders);
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: AppTheme.errorColor,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        );
      }
    }
  }
}
