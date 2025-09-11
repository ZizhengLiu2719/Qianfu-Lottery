import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:go_router/go_router.dart';

import '../../../models/models.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import 'checkout_screen.dart';

class ProductDetailScreen extends ConsumerStatefulWidget {
  final int productId;

  const ProductDetailScreen({super.key, required this.productId});

  @override
  ConsumerState<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends ConsumerState<ProductDetailScreen> {
  int _quantity = 1;
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final productsRepository = ref.watch(productsRepositoryProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);
    final isLoggedIn = ref.watch(isAuthenticatedProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(FeatherIcons.arrowLeft, color: AppTheme.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          Consumer(
            builder: (context, ref, child) {
              final cartItemCount = ref.watch(cartItemCountProvider);
              return Stack(
                children: [
                  IconButton(
                    icon: const Icon(FeatherIcons.shoppingCart, color: AppTheme.textPrimary),
                    onPressed: () {
                      context.go(AppRoutes.cart);
                    },
                  ),
                  if (cartItemCount > 0)
                    Positioned(
                      right: 6,
                      top: 6,
                      child: Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryColor,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        constraints: const BoxConstraints(minWidth: 16, minHeight: 16),
                        child: Text(
                          cartItemCount > 99 ? '99+' : cartItemCount.toString(),
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              );
            },
          ),
        ],
      ),
      body: FutureBuilder<Product>(
        future: productsRepository.getProduct(widget.productId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError || !snapshot.hasData) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    FeatherIcons.alertCircle,
                    size: 64.sp,
                    color: AppTheme.errorColor,
                  ),
                  SizedBox(height: 16.h),
                  Text(
                    AppLocalizations.of(context)!.common_error,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  SizedBox(height: 16.h),
                  ElevatedButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: Text(AppLocalizations.of(context)!.common_cancel),
                  ),
                ],
              ),
            );
          }

          final product = snapshot.data!;
          return Column(
            children: [
              Expanded(child: _buildProductDetail(context, product, qiancaiDouBalance, isLoggedIn, isDesktop)),
              _buildBottomActions(context, product, isLoggedIn, isDesktop),
            ],
          );
        },
      ),
    );
  }

  Widget _buildProductDetail(BuildContext context, Product product, int balance, bool isLoggedIn, bool isDesktop) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 商品图片 - 电脑端限制最大高度
          Container(
            constraints: BoxConstraints(
              maxHeight: isDesktop ? 400.h : double.infinity,
            ),
            child: AspectRatio(
              aspectRatio: isDesktop ? 1.5 : 1.2,
              child: CachedNetworkImage(
                imageUrl: product.mainImage,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  color: AppTheme.backgroundColor,
                  child: const Center(child: CircularProgressIndicator()),
                ),
                errorWidget: (context, url, error) => Container(
                  color: AppTheme.backgroundColor,
                  child: Icon(
                    FeatherIcons.image,
                    size: 64.sp,
                    color: AppTheme.textTertiary,
                  ),
                ),
              ),
            ),
          ),

          // 商品信息
          Padding(
            padding: EdgeInsets.all(20.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 商品标题
                Text(
                  product.title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    height: 1.3,
                  ),
                ),
                SizedBox(height: 12.h),

                // 商品描述
                Text(
                  product.description,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: AppTheme.textSecondary,
                    height: 1.5,
                  ),
                ),
                SizedBox(height: 20.h),

                // 价格和库存
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // 价格
                    Row(
                      children: [
                        Text(
                          '${product.priceInQiancaiDou}',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: AppTheme.primaryColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(width: 8.w),
                        QiancaiDouIcon(size: 24.0),
                      ],
                    ),
                    // 库存
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
                      decoration: BoxDecoration(
                        color: product.isInStock ? AppTheme.successColor.withOpacity(0.1) : AppTheme.errorColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                      child: Text(
                        '${AppLocalizations.of(context)!.products_stock}: ${product.stock}',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: product.isInStock ? AppTheme.successColor : AppTheme.errorColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 24.h),

                // 数量选择
                if (isLoggedIn) ...[
                  Text(
                    AppLocalizations.of(context)!.products_quantity,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      fontSize: isDesktop ? 12.sp : 14.sp,
                    ),
                  ),
                  SizedBox(height: isDesktop ? 6.h : 8.h),
                  Row(
                    children: [
                      // 减少按钮
                      GestureDetector(
                        onTap: _quantity > 1 ? () => setState(() => _quantity--) : null,
                        child: Container(
                          width: isDesktop ? 20.w : 30.w,
                          height: isDesktop ? 20.w : 30.w,
                          decoration: BoxDecoration(
                            color: _quantity > 1 ? AppTheme.primaryColor : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(4.r),
                          ),
                          child: Icon(
                            FeatherIcons.minus,
                            color: Colors.white,
                            size: isDesktop ? 10.sp : 14.sp,
                          ),
                        ),
                      ),
                      SizedBox(width: isDesktop ? 8.w : 12.w),
                      // 数量显示
                      Container(
                        width: isDesktop ? 30.w : 40.w,
                        child: Text(
                          '$_quantity',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                            fontSize: isDesktop ? 14.sp : 16.sp,
                          ),
                        ),
                      ),
                      SizedBox(width: isDesktop ? 8.w : 12.w),
                      // 增加按钮
                      GestureDetector(
                        onTap: _quantity < product.stock ? () => setState(() => _quantity++) : null,
                        child: Container(
                          width: isDesktop ? 20.w : 30.w,
                          height: isDesktop ? 20.w : 30.w,
                          decoration: BoxDecoration(
                            color: _quantity < product.stock ? AppTheme.primaryColor : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(4.r),
                          ),
                          child: Icon(
                            FeatherIcons.plus,
                            color: Colors.white,
                            size: isDesktop ? 10.sp : 14.sp,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: isDesktop ? 16.h : 24.h),
                ],

                // 用户余额显示
                if (isLoggedIn) ...[
                  Container(
                    padding: EdgeInsets.all(16.w),
                    decoration: BoxDecoration(
                      color: AppTheme.backgroundColor,
                      borderRadius: BorderRadius.circular(12.r),
                    ),
                    child: Row(
                      children: [
                        Icon(FeatherIcons.creditCard, color: AppTheme.primaryColor, size: 20.sp),
                        SizedBox(width: 8.w),
                        Text(
                          '${AppLocalizations.of(context)!.qiancaidou_balance}: ',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        Text(
                          '$balance',
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: AppTheme.primaryColor,
                          ),
                        ),
                        SizedBox(width: 4.w),
                        QiancaiDouIcon(size: 16.0),
                      ],
                    ),
                  ),
                  SizedBox(height: 24.h),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomActions(BuildContext context, Product product, bool isLoggedIn, bool isDesktop) {
    if (!isLoggedIn) {
      return Container(
        padding: EdgeInsets.all(isDesktop ? 16.w : 20.w),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () {
              // TODO: 跳转到登录页
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryColor,
              padding: EdgeInsets.symmetric(vertical: isDesktop ? 12.h : 16.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.r),
              ),
            ),
            child: Text(
              AppLocalizations.of(context)!.products_login_to_buy,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: isDesktop ? 14.sp : 16.sp,
              ),
            ),
          ),
        ),
      );
    }

    final totalPrice = product.priceInQiancaiDou * _quantity;
    final canAfford = ref.watch(qiancaiDouBalanceProvider) >= totalPrice;

    return Container(
      padding: EdgeInsets.all(isDesktop ? 4.w : 6.w),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          // 加购物车按钮
          Expanded(
            flex: 1,
            child: OutlinedButton(
              onPressed: product.isInStock ? () => _addToCart(product) : null,
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: AppTheme.primaryColor),
                padding: EdgeInsets.symmetric(vertical: isDesktop ? 3.h : 4.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.r),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FeatherIcons.shoppingCart, size: isDesktop ? 10.sp : 12.sp, color: AppTheme.primaryColor),
                  SizedBox(width: 2.w),
                  Text(
                    AppLocalizations.of(context)!.products_add_to_cart,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w600,
                      fontSize: isDesktop ? 10.sp : 12.sp,
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(width: 4.w),
          // 立即购买按钮
          Expanded(
            flex: 2,
            child: ElevatedButton(
              onPressed: product.isInStock && canAfford ? () => _buyNow(product) : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: product.isInStock && canAfford ? AppTheme.primaryColor : AppTheme.textTertiary,
                padding: EdgeInsets.symmetric(vertical: isDesktop ? 3.h : 4.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.r),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    AppLocalizations.of(context)!.products_buy_now,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: isDesktop ? 10.sp : 12.sp,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '$totalPrice',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.white,
                          fontSize: isDesktop ? 8.sp : 10.sp,
                        ),
                      ),
                      SizedBox(width: 1.w),
                      QiancaiDouIcon(size: isDesktop ? 6.0 : 8.0),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _addToCart(Product product) async {
    try {
      await ref.read(cartProvider.notifier).addItem(product, quantity: _quantity);
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppLocalizations.of(context)!.success_add_to_cart),
            backgroundColor: AppTheme.successColor,
            behavior: SnackBarBehavior.floating,
            action: SnackBarAction(
              label: AppLocalizations.of(context)!.cart_title,
              textColor: Colors.white,
              onPressed: () {
                // TODO: 跳转到购物车
              },
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppLocalizations.of(context)!.common_failed),
            backgroundColor: AppTheme.errorColor,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  Future<void> _buyNow(Product product) async {
    if (!ref.read(isAuthenticatedProvider)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(AppLocalizations.of(context)!.products_please_login),
          backgroundColor: AppTheme.errorColor,
        ),
      );
      return;
    }

    try {
      // 先添加到购物车
      await ref.read(cartProvider.notifier).addItem(product, quantity: _quantity);
      
      // 跳转到结账页面
      if (mounted) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => const CheckoutScreen(),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppLocalizations.of(context)!.common_failed),
            backgroundColor: AppTheme.errorColor,
          ),
        );
      }
    }
  }
}
