import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../models/product.dart';
import '../../../core/theme/app_theme.dart';

final _productDetailRepoProvider = Provider<ProductsRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return ProductsRepository(dio);
});

final _productProvider = FutureProvider.family<Product, int>((ref, id) async {
  final repo = ref.watch(_productDetailRepoProvider);
  return repo.getProduct(id);
});

class ProductDetailScreen extends ConsumerWidget {
  final int productId;

  const ProductDetailScreen({super.key, required this.productId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncProduct = ref.watch(_productProvider(productId));
    return Scaffold(
      appBar: AppBar(title: const Text('商品详情')),
      body: asyncProduct.when(
        data: (p) => SingleChildScrollView(
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12.r),
                child: p.mainImage.isNotEmpty
                    ? Image.network(p.mainImage, height: 260.h, width: double.infinity, fit: BoxFit.cover)
                    : Container(height: 260.h, color: AppTheme.backgroundColor),
              ),
              SizedBox(height: 16.h),
              Text(p.title, style: Theme.of(context).textTheme.headlineSmall),
              SizedBox(height: 8.h),
              Row(children: [
                const Icon(Icons.diamond, color: AppTheme.primaryColor, size: 18),
                SizedBox(width: 4.w),
                Text('${p.priceInQiancaiDou}', style: Theme.of(context).textTheme.titleLarge?.copyWith(color: AppTheme.primaryColor)),
              ]),
              SizedBox(height: 16.h),
              Text(p.description, style: Theme.of(context).textTheme.bodyLarge),
            ],
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => const Center(child: Text('加载失败')),
      ),
    );
  }
}
