import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../utils/safe_size.dart';
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
          padding: EdgeInsets.all(safeW(16)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(safeR(12)),
                child: p.mainImage.isNotEmpty
                    ? Image.network(p.mainImage, height: safeH(260), width: double.infinity, fit: BoxFit.cover)
                    : Container(height: safeH(260), color: AppTheme.backgroundColor),
              ),
              SizedBox(height: safeH(16)),
              Text(p.title, style: Theme.of(context).textTheme.headlineSmall),
              SizedBox(height: safeH(8)),
              Row(children: [
                const Icon(Icons.diamond, color: AppTheme.primaryColor, size: 18),
                SizedBox(width: safeW(4)),
                Text('${p.priceInQiancaiDou}', style: Theme.of(context).textTheme.titleLarge?.copyWith(color: AppTheme.primaryColor)),
              ]),
              SizedBox(height: safeH(16)),
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
