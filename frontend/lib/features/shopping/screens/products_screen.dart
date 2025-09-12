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
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../../../core/widgets/responsive_tag.dart';
import '../../auth/providers/auth_provider.dart';
import '../providers/cart_provider.dart';

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
          // 顶部标题栏
          SliverAppBar(
            title: Text(AppLocalizations.of(context)!.nav_life),
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textPrimary,
            elevation: 0,
            pinned: true,
            actions: [
              Stack(
                children: [
                  IconButton(
                    icon: const Icon(FeatherIcons.shoppingCart, color: AppTheme.textPrimary),
                    onPressed: () => context.go(AppRoutes.cart),
                    tooltip: AppLocalizations.of(context)!.common_cart,
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
              ),
            ],
          ),
          // 标签栏
          SliverToBoxAdapter(
            child: _buildCategoryFilter(context),
          ),
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


  Widget _buildCategoryFilter(BuildContext context) {
    final categories = [
      ResponsiveTagData(
        key: null,
        text: AppLocalizations.of(context)!.products_category_all,
        mobileText: AppLocalizations.of(context)!.products_category_all_mobile,
        icon: FeatherIcons.grid,
      ),
      ResponsiveTagData(
        key: 'electronics',
        text: AppLocalizations.of(context)!.products_category_electronics,
        mobileText: AppLocalizations.of(context)!.products_category_electronics_mobile,
        icon: FeatherIcons.smartphone,
      ),
      ResponsiveTagData(
        key: 'clothing',
        text: AppLocalizations.of(context)!.products_category_clothing,
        mobileText: AppLocalizations.of(context)!.products_category_clothing_mobile,
        icon: FeatherIcons.shoppingBag,
      ),
      ResponsiveTagData(
        key: 'food',
        text: AppLocalizations.of(context)!.products_category_food,
        mobileText: AppLocalizations.of(context)!.products_category_food_mobile,
        icon: FeatherIcons.coffee,
      ),
      ResponsiveTagData(
        key: 'books',
        text: AppLocalizations.of(context)!.products_category_books,
        mobileText: AppLocalizations.of(context)!.products_category_books_mobile,
        icon: FeatherIcons.book,
      ),
      ResponsiveTagData(
        key: 'sports',
        text: AppLocalizations.of(context)!.products_category_sports,
        mobileText: AppLocalizations.of(context)!.products_category_sports_mobile,
        icon: FeatherIcons.activity,
      ),
    ];

    return ResponsiveTagBar(
      tags: categories,
      selectedTag: _selectedCategory,
      onTagSelected: (key) {
        setState(() {
          _selectedCategory = key;
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
      return SliverToBoxAdapter(
        child: Container(
          padding: EdgeInsets.all(40.w),
          child: Center(
            child: Column(
              children: [
                Icon(
                  FeatherIcons.package,
                  size: 64.sp,
                  color: AppTheme.textTertiary,
                ),
                SizedBox(height: 16.h),
                Text(
                  AppLocalizations.of(context)!.common_empty,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.textTertiary,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    // 卡片化展示：两列网格，每个商品独立卡片
    final isDesktop = MediaQuery.of(context).size.width > 768;
    return SliverPadding(
      padding: EdgeInsets.symmetric(
        horizontal: isDesktop ? 8.w : 16.w, 
        vertical: isDesktop ? 4.h : 8.h
      ),
      sliver: SliverGrid(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: isDesktop ? 6.h : 12.h,
          crossAxisSpacing: isDesktop ? 6.w : 12.w,
          childAspectRatio: isDesktop ? 0.85 : 0.75, // PC端更紧凑
        ),
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final product = filteredProducts[index];
            return _buildProductCard(context, product);
          },
          childCount: filteredProducts.length,
        ),
      ),
    );
  }

  Widget _buildProductCard(BuildContext context, Product product) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    
    return GestureDetector(
      onTap: () => context.go('/products/${product.id}'),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(isDesktop ? 6.r : 12.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: isDesktop ? 4 : 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 产品图片 - PC端缩小
            ClipRRect(
              borderRadius: BorderRadius.vertical(
                top: Radius.circular(isDesktop ? 6.r : 12.r),
              ),
              child: AspectRatio(
                aspectRatio: isDesktop ? 1.0 : 1.2, // PC端更紧凑
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
                            size: isDesktop ? 12.sp : 24.sp,
                            color: AppTheme.textTertiary,
                          ),
                        ),
                      )
                    : Container(
                        color: AppTheme.backgroundColor,
                        child: Icon(
                          FeatherIcons.image,
                          size: isDesktop ? 12.sp : 24.sp,
                          color: AppTheme.textTertiary,
                        ),
                      ),
              ),
            ),
            
            // 产品信息 - PC端紧凑布局
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(isDesktop ? 6.w : 12.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // 商品名称
                    Text(
                      product.title,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        height: 1.2,
                        fontSize: isDesktop ? 12.sp : null,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    
                    // 价格和库存
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: isDesktop ? 2.h : 4.h),
                        // 价格
                        Row(
                          children: [
                            Text(
                              '${product.priceInQiancaiDou}',
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                color: AppTheme.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: isDesktop ? 14.sp : null,
                              ),
                            ),
                            SizedBox(width: isDesktop ? 2.w : 4.w),
                            QiancaiDouIcon(size: isDesktop ? 10.0 : 14.0),
                          ],
                        ),
                        SizedBox(height: isDesktop ? 2.h : 4.h),
                        // 库存状态
                        Text(
                          '${AppLocalizations.of(context)!.products_stock}: ${product.stock}',
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: product.isInStock ? AppTheme.successColor : AppTheme.errorColor,
                            fontSize: isDesktop ? 10.sp : null,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
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
        content: Text(AppLocalizations.of(context)!.success_add_to_cart),
        backgroundColor: AppTheme.successColor,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        action: SnackBarAction(
          label: AppLocalizations.of(context)!.common_more,
          textColor: Colors.white,
          onPressed: () => context.go(AppRoutes.cart),
        ),
      ),
    );
  }
}
