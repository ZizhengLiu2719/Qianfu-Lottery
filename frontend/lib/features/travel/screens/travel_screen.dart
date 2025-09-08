import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../utils/safe_size.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../../../api/dio_client.dart';
import '../../../api/travel_repository.dart';
import '../../../models/models.dart';
import 'travel_detail_screen.dart';
import '../../../core/widgets/segmented_tabs.dart';

final _travelRepositoryProvider = Provider<TravelRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return TravelRepository(dio);
});

final _domesticPostsProvider = FutureProvider<List<TravelPost>>((ref) async {
  final repo = ref.watch(_travelRepositoryProvider);
  return repo.getTravelPosts(category: 'DOMESTIC', limit: 10);
});

final _internationalPostsProvider = FutureProvider<List<TravelPost>>((ref) async {
  final repo = ref.watch(_travelRepositoryProvider);
  return repo.getTravelPosts(category: 'INTERNATIONAL', limit: 10);
});

final travelTabIndexProvider = StateProvider<int>((ref) => 0);

class TravelScreen extends ConsumerWidget {
  const TravelScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final domesticAsync = ref.watch(_domesticPostsProvider);
    final internationalAsync = ref.watch(_internationalPostsProvider);
    final tabIndex = ref.watch(travelTabIndexProvider);

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.travel_title),
        backgroundColor: Colors.white,
      ),
      body: CustomScrollView(
        slivers: [
          // 替换为上方分段标签（国内/国外）
          SliverToBoxAdapter(
            child: _TravelTabsBar(),
          ),

          if (tabIndex == 0)
            domesticAsync.when(
              data: (posts) => _TravelPostsSliver(posts: posts),
              loading: () => _LoadingSliver(),
              error: (e, _) => _ErrorSliver(message: '加载失败'),
            )
          else
            internationalAsync.when(
              data: (posts) => _TravelPostsSliver(posts: posts),
              loading: () => _LoadingSliver(),
              error: (e, _) => _ErrorSliver(message: '加载失败'),
            ),
        ],
      ),
    );
  }
}

class _TravelPostsSliver extends StatelessWidget {
  final List<TravelPost> posts;
  const _TravelPostsSliver({required this.posts});

  @override
  Widget build(BuildContext context) {
    if (posts.isEmpty) {
      return SliverToBoxAdapter(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 24.h),
          child: Center(
            child: Text('暂无内容', style: Theme.of(context).textTheme.titleMedium),
          ),
        ),
      );
    }

    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 12.w),
      sliver: SliverGrid(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisSpacing: 8.w,
          crossAxisSpacing: 8.w,
          childAspectRatio: 0.7,
        ),
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final p = posts[index];
            return GestureDetector(
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => TravelDetailScreen(postId: p.id)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8.r),
                      child: p.mainImage.isNotEmpty
                          ? Image.network(p.mainImage, width: double.infinity, fit: BoxFit.cover)
                          : Container(color: AppTheme.backgroundColor),
                    ),
                  ),
                  SizedBox(height: 6.h),
                  Text(p.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.titleSmall?.copyWith(color: AppTheme.textPrimary)),
                  SizedBox(height: 2.h),
                  Text(p.categoryDisplay, style: Theme.of(context).textTheme.bodySmall),
                ],
              ),
            );
          },
          childCount: posts.length,
        ),
      ),
    );
  }
}

class _LoadingSliver extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: EdgeInsets.all(24.w),
        child: const Center(child: CircularProgressIndicator()),
      ),
    );
  }
}

class _ErrorSliver extends StatelessWidget {
  final String message;
  const _ErrorSliver({required this.message});

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: EdgeInsets.all(24.w),
        child: Center(child: Text(message)),
      ),
    );
  }
}

// Deprecated: Search and tags bar removed.

class _TravelTabsBar extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(travelTabIndexProvider);
    return SegmentedTabs(
      tabs: const ['国内游', '国外游'],
      selectedIndex: index,
      onChanged: (i) {
        ref.read(travelTabIndexProvider.notifier).state = i;
      },
    );
  }
}
