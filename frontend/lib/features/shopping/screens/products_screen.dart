import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../models/models.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../routing/app_router.dart';
import '../../../core/theme/app_theme.dart';
import '../../auth/providers/auth_provider.dart';
import '../providers/cart_provider.dart';
import '../../../core/widgets/segmented_tabs.dart';
import '../../../core/widgets/qc_coin.dart';

// 产品列表 Provider
final productsRepositoryProvider = Provider<ProductsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return ProductsRepository(dioClient);
});

final productsProvider = FutureProvider<List<Product>>((ref) async {
  final repository = ref.watch(productsRepositoryProvider);
  return repository.getProducts();
});

class ProductsScreen extends ConsumerStatefulWidget {
  const ProductsScreen({super.key});

  @override
  ConsumerState<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends ConsumerState<ProductsScreen> {
  String? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    final productsAsync = ref.watch(productsProvider);
    final cartItemCount = ref.watch(cartItemCountProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 顶部一行：左侧横向标签，右侧购物车
          _buildTopFilterBar(context, cartItemCount),
          
          // 产品网格
          productsAsync.when(
            data: (products) => _buildProductGrid(context, products),
            loading: () => SliverToBoxAdapter(
              child: _buildLoadingState(context),
            ),
            error: (error, stack) => SliverToBoxAdapter(
              child: _buildErrorState(context, error),
            ),
          ),
        ],
      ),
    );
  }

  int _selectedTabIndex = 0;

  Widget _buildTopFilterBar(BuildContext context, int cartCount) {
    return SliverToBoxAdapter(
      child: Container(
        color: Colors.white,
        padding: EdgeInsets.only(left: 12.w, right: 8.w, top: 12.h, bottom: 8.h),
        child: Row(
          children: [
            // 横向标签
            Expanded(child: _buildCategoryTabs(context)),
            // 购物车
            Stack(
              children: [
                IconButton(
                  icon: const Icon(FeatherIcons.shoppingCart, color: AppTheme.textPrimary),
                  onPressed: () => context.go(AppRoutes.cart),
                ),
                if (cartCount > 0)
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
                        cartCount > 99 ? '99+' : cartCount.toString(),
                        style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryTabs(BuildContext context) {
    final tabs = [
      AppLocalizations.of(context)!.products_category_all,
      '数码', '服装', '食品', '图书', '运动',
    ];
    final values = [null, 'electronics', 'clothing', 'food', 'books', 'sports'];
    return SegmentedTabs(
      tabs: tabs,
      selectedIndex: _selectedTabIndex,
      onChanged: (i) {
        setState(() {
          _selectedTabIndex = i;
          _selectedCategory = values[i] as String?;
        });
      },
    );
  }

  Widget _buildProductGrid(BuildContext context, List<Product> products) {
    // 根据选中的分类过滤产品
    final filteredProducts = _selectedCategory == null
        ? products
        : products.where((p) => p.category == _selectedCategory).toList();

    if (filteredProducts.isEmpty) {
      // 空态：无占位图片，给出清晰提示
      return SliverToBoxAdapter(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 60.h),
          child: Center(
            child: Column(
              children: [
                Icon(FeatherIcons.image, size: 40.sp, color: AppTheme.textTertiary),
                SizedBox(height: 12.h),
                Text(
                  AppLocalizations.of(context)!.common_empty,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ],
            ),
          ),
        ),
      );
    }

    // Instagram 风格：三列等高网格，纯白背景
    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 8.w),
      sliver: SliverGrid(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisSpacing: 8.w,
          crossAxisSpacing: 8.w,
          childAspectRatio: 1,
        ),
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final product = filteredProducts[index];
            return GestureDetector(
              onTap: () => context.go('/products/${product.id}'),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8.r),
                child: product.mainImage.isNotEmpty
                    ? CachedNetworkImage(
                        imageUrl: product.mainImage,
                        fit: BoxFit.cover,
                      )
                    : Container(
                        color: AppTheme.backgroundColor,
                        child: Icon(
                          FeatherIcons.image,
                          size: 20.sp,
                          color: AppTheme.textTertiary,
                        ),
                      ),
              ),
            );
          },
          childCount: filteredProducts.length,
        ),
      ),
    );
  }

  Widget _buildProductCard(BuildContext context, Product product) {
    return GestureDetector(
      onTap: () => context.go('/products/${product.id}'),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 产品图片
            ClipRRect(
              borderRadius: BorderRadius.vertical(
                top: Radius.circular(AppTheme.borderRadiusMedium),
              ),
              child: AspectRatio(
                aspectRatio: 1,
                child: product.mainImage.isNotEmpty
                    ? CachedNetworkImage(
                        imageUrl: product.mainImage,
                        fit: BoxFit.cover,
                        placeholder: (context, url) => Container(
                          color: AppTheme.backgroundColor,
                          child: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        ),
                        errorWidget: (context, url, error) => Container(
                          color: AppTheme.backgroundColor,
                          child: Icon(
                            FeatherIcons.image,
                            size: 32.sp,
                            color: AppTheme.textTertiary,
                          ),
                        ),
                      )
                    : Container(
                        color: AppTheme.backgroundColor,
                        child: Icon(
                          FeatherIcons.image,
                          size: 32.sp,
                          color: AppTheme.textTertiary,
                        ),
                      ),
              ),
            ),
            
            // 产品信息
            Padding(
              padding: EdgeInsets.all(12.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  
                  SizedBox(height: 8.h),
                  
                  Row(
                    children: [
                      const QcCoin(size: 16),
                      SizedBox(width: 4.w),
                      Text(
                        '${product.priceInQiancaiDou}',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  
                  SizedBox(height: 8.h),
                  
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '${AppLocalizations.of(context)!.products_stock}: ${product.stock}',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: product.isInStock ? AppTheme.successColor : AppTheme.errorColor,
                        ),
                      ),
                      GestureDetector(
                        onTap: product.isInStock 
                            ? () => _addToCart(product)
                            : null,
                        child: Container(
                          padding: EdgeInsets.all(8.w),
                          decoration: BoxDecoration(
                            color: product.isInStock 
                                ? AppTheme.primaryColor 
                                : AppTheme.textTertiary,
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Icon(
                            FeatherIcons.plus,
                            size: 16.sp,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLoadingState(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(40.w),
      child: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget _buildErrorState(BuildContext context, Object error) {
    return Padding(
      padding: EdgeInsets.all(40.w),
      child: Center(
        child: Column(
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
            SizedBox(height: 8.h),
            ElevatedButton(
              onPressed: () => ref.invalidate(productsProvider),
              child: Text(AppLocalizations.of(context)!.common_retry),
            ),
          ],
        ),
      ),
    );
  }

  void _addToCart(Product product) {
    ref.read(cartProvider.notifier).addItem(product);
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${product.title} 已添加到购物车'),
        backgroundColor: AppTheme.successColor,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        action: SnackBarAction(
          label: '查看',
          textColor: Colors.white,
          onPressed: () => context.go(AppRoutes.cart),
        ),
      ),
    );
  }
}
