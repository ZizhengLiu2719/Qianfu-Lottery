import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../models/models.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../../auth/providers/auth_provider.dart';
import '../providers/cart_provider.dart';

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
          IconButton(
            icon: const Icon(FeatherIcons.shoppingCart, color: AppTheme.textPrimary),
            onPressed: () {
              // TODO: 跳转到购物车
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
                    '商品不存在或加载失败',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  SizedBox(height: 16.h),
                  ElevatedButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('返回'),
                  ),
                ],
              ),
            );
          }

          final product = snapshot.data!;
          return Column(
            children: [
              Expanded(child: _buildProductDetail(context, product, qiancaiDouBalance, isLoggedIn)),
              _buildBottomActions(context, product, isLoggedIn),
            ],
          );
        },
      ),
    );
  }

  Widget _buildProductDetail(BuildContext context, Product product, int balance, bool isLoggedIn) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 商品图片
          AspectRatio(
            aspectRatio: 1.2,
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
                        '库存: ${product.stock}',
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
                    '数量',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: 12.h),
                  Row(
                    children: [
                      // 减少按钮
                      GestureDetector(
                        onTap: _quantity > 1 ? () => setState(() => _quantity--) : null,
                        child: Container(
                          width: 40.w,
                          height: 40.w,
                          decoration: BoxDecoration(
                            color: _quantity > 1 ? AppTheme.primaryColor : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Icon(
                            FeatherIcons.minus,
                            color: Colors.white,
                            size: 20.sp,
                          ),
                        ),
                      ),
                      SizedBox(width: 16.w),
                      // 数量显示
                      Container(
                        width: 60.w,
                        child: Text(
                          '$_quantity',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(width: 16.w),
                      // 增加按钮
                      GestureDetector(
                        onTap: _quantity < product.stock ? () => setState(() => _quantity++) : null,
                        child: Container(
                          width: 40.w,
                          height: 40.w,
                          decoration: BoxDecoration(
                            color: _quantity < product.stock ? AppTheme.primaryColor : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Icon(
                            FeatherIcons.plus,
                            color: Colors.white,
                            size: 20.sp,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 32.h),
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
                          '我的千彩豆余额: ',
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

  Widget _buildBottomActions(BuildContext context, Product product, bool isLoggedIn) {
    if (!isLoggedIn) {
      return Container(
        padding: EdgeInsets.all(20.w),
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
              padding: EdgeInsets.symmetric(vertical: 16.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.r),
              ),
            ),
            child: Text(
              '登录后购买',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      );
    }

    final totalPrice = product.priceInQiancaiDou * _quantity;
    final canAfford = ref.watch(qiancaiDouBalanceProvider) >= totalPrice;

    return Container(
      padding: EdgeInsets.all(20.w),
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
                padding: EdgeInsets.symmetric(vertical: 16.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FeatherIcons.shoppingCart, size: 20.sp, color: AppTheme.primaryColor),
                  SizedBox(width: 8.w),
                  Text(
                    '加购物车',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(width: 12.w),
          // 立即购买按钮
          Expanded(
            flex: 2,
            child: ElevatedButton(
              onPressed: product.isInStock && canAfford ? () => _buyNow(product) : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: product.isInStock && canAfford ? AppTheme.primaryColor : AppTheme.textTertiary,
                padding: EdgeInsets.symmetric(vertical: 16.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '立即购买',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 2.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '$totalPrice',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(width: 4.w),
                      QiancaiDouIcon(size: 14.0),
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

  void _addToCart(Product product) {
    ref.read(cartProvider.notifier).addItem(product, quantity: _quantity);
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${product.title} x$_quantity 已添加到购物车'),
        backgroundColor: AppTheme.successColor,
        behavior: SnackBarBehavior.floating,
        action: SnackBarAction(
          label: '查看购物车',
          textColor: Colors.white,
          onPressed: () {
            // TODO: 跳转到购物车
          },
        ),
      ),
    );
  }

  void _buyNow(Product product) {
    if (!ref.read(isAuthenticatedProvider)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('请先登录'),
          backgroundColor: AppTheme.errorColor,
        ),
      );
      return;
    }

    // TODO: 直接购买逻辑
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('直接购买功能开发中...'),
        backgroundColor: AppTheme.primaryColor,
      ),
    );
  }
}
