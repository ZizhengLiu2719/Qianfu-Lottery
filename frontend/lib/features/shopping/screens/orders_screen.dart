import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../api/dio_client.dart';
import '../../../api/products_repository.dart';
import '../../../models/product.dart';

final _ordersRepoProvider = Provider<ProductsRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return ProductsRepository(dio);
});

final _ordersProvider = FutureProvider<List<Order>>((ref) async {
  final repo = ref.watch(_ordersRepoProvider);
  return repo.getUserOrders(limit: 50);
});

class OrdersScreen extends ConsumerWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncOrders = ref.watch(_ordersProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('我的订单')),
      body: asyncOrders.when(
        data: (orders) {
          if (orders.isEmpty) {
            return const Center(child: Text('暂无订单'));
          }
          return ListView.separated(
            itemCount: orders.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final o = orders[index];
              return InkWell(
                onTap: () => _openOrderDetail(context, o),
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('订单 #${o.id}', style: Theme.of(context).textTheme.titleMedium),
                          Text(o.statusDisplay, style: Theme.of(context).textTheme.titleSmall),
                        ],
                      ),
                      SizedBox(height: 8.h),
                      Wrap(
                        spacing: 8.w,
                        runSpacing: 4.h,
                        children: o.items.map((it) => Text('×${it.quantity} ${it.product?.title ?? ''}')).toList(),
                      ),
                      SizedBox(height: 8.h),
                      Row(
                        children: [
                          const Icon(Icons.diamond, size: 16),
                          SizedBox(width: 4.w),
                          Text('${o.totalCost}', style: Theme.of(context).textTheme.titleMedium),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => const Center(child: Text('加载失败')),
      ),
    );
  }
}

void _openOrderDetail(BuildContext context, Order order) {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    builder: (ctx) {
      return Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(ctx).viewInsets.bottom,
          left: 16.w,
          right: 16.w,
          top: 16.w,
        ),
        child: _OrderDetailContent(order: order),
      );
    },
  );
}

class _OrderDetailContent extends StatelessWidget {
  final Order order;
  const _OrderDetailContent({required this.order});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('订单 #${order.id}', style: Theme.of(context).textTheme.titleLarge),
            Text(order.statusDisplay, style: Theme.of(context).textTheme.titleSmall),
          ],
        ),
        const Divider(),
        ...order.items.map((it) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(child: Text(it.product?.title ?? '商品')),
                  Text('×${it.quantity}'),
                  Row(children: const [Icon(Icons.diamond, size: 14)]),
                  Text('${it.totalPrice}'),
                ],
              ),
            )),
        const Divider(),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            const Icon(Icons.diamond, size: 16),
            const SizedBox(width: 4),
            Text('合计：${order.totalCost}', style: Theme.of(context).textTheme.titleMedium),
          ],
        ),
        const SizedBox(height: 12),
        if (order.canCancel)
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('关闭'),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: () async {
                  final repo = ProductsRepository(DioClient());
                  try {
                    final updated = await repo.cancelOrder(order.id);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('订单已取消')),
                    );
                    Navigator.pop(context);
                  } catch (e) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(e.toString())),
                    );
                  }
                },
                child: const Text('取消订单'),
              ),
            ],
          )
        else
          Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('关闭'),
            ),
          ),
        SizedBox(height: 12.w),
      ],
    );
  }
}
