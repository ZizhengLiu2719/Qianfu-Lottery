import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../utils/safe_size.dart';
import '../../../api/dio_client.dart';
import '../../../api/travel_repository.dart';
import '../../../models/models.dart';

final _travelDetailRepoProvider = Provider<TravelRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return TravelRepository(dio);
});

final _travelDetailProvider = FutureProvider.family<TravelPost, int>((ref, id) async {
  final repo = ref.watch(_travelDetailRepoProvider);
  return repo.getTravelPost(id);
});

class TravelDetailScreen extends ConsumerWidget {
  final int postId;

  const TravelDetailScreen({super.key, required this.postId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncPost = ref.watch(_travelDetailProvider(postId));
    return Scaffold(
      appBar: AppBar(title: const Text('旅游详情')),
      body: asyncPost.when(
        data: (post) => SingleChildScrollView(
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (post.mainImage.isNotEmpty)
                ClipRRect(
                  borderRadius: BorderRadius.circular(12.r),
                  child: Image.network(post.mainImage, fit: BoxFit.cover),
                ),
              SizedBox(height: 16.h),
              Text(post.title, style: Theme.of(context).textTheme.headlineSmall),
              SizedBox(height: 8.h),
              Wrap(
                spacing: 8.w,
                children: post.tags
                    .map((t) => Chip(label: Text(t)))
                    .toList(),
              ),
              SizedBox(height: 16.h),
              Text(post.content, style: Theme.of(context).textTheme.bodyLarge),
            ],
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('加载失败')),
      ),
    );
  }
}
