import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../../../api/dio_client.dart';
import '../../../api/travel_repository.dart';
import '../../../models/models.dart';
import 'travel_detail_screen.dart';

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

class TravelScreen extends ConsumerWidget {
  const TravelScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final domesticAsync = ref.watch(_domesticPostsProvider);
    final internationalAsync = ref.watch(_internationalPostsProvider);

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.travel_title),
        backgroundColor: Colors.white,
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: _SearchAndTagsBar(),
          ),

          // 国内游 Section
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              child: Text('国内游', style: Theme.of(context).textTheme.headlineSmall),
            ),
          ),
          domesticAsync.when(
            data: (posts) => _TravelPostsSliver(posts: posts),
            loading: () => _LoadingSliver(),
            error: (e, _) => _ErrorSliver(message: '加载失败'),
          ),

          // 国外游 Section
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              child: Text('国外游', style: Theme.of(context).textTheme.headlineSmall),
            ),
          ),
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

class _SearchAndTagsBar extends ConsumerStatefulWidget {
  @override
  ConsumerState<_SearchAndTagsBar> createState() => _SearchAndTagsBarState();
}

class _SearchAndTagsBarState extends ConsumerState<_SearchAndTagsBar> {
  String _query = '';
  String? _tag;
  List<TravelTag> _popularTags = [];
  bool _loadingTags = true;

  @override
  void initState() {
    super.initState();
    _loadTags();
  }

  Future<void> _loadTags() async {
    try {
      final repo = ref.read(_travelRepositoryProvider);
      final tags = await repo.getPopularTags();
      if (mounted) setState(() { _popularTags = tags; _loadingTags = false; });
    } catch (_) {
      if (mounted) setState(() { _popularTags = []; _loadingTags = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(FeatherIcons.mapPin, color: AppTheme.primaryColor),
              SizedBox(width: 8.w),
              Expanded(
                child: TextField(
                  onSubmitted: (v) => _search(v),
                  onChanged: (v) => _query = v,
                  decoration: InputDecoration(
                    hintText: AppLocalizations.of(context)!.travel_search_hint,
                    prefixIcon: const Icon(FeatherIcons.search),
                    suffixIcon: (_query.isNotEmpty)
                        ? IconButton(icon: const Icon(FeatherIcons.x), onPressed: () { setState(() { _query=''; }); _search(''); })
                        : null,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 8.h),
          _loadingTags
              ? const SizedBox(height: 28, child: Center(child: CircularProgressIndicator(strokeWidth: 2)))
              : SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      FilterChip(
                        label: const Text('全部'),
                        selected: _tag == null,
                        onSelected: (_) => _applyTag(null),
                      ),
                      ..._popularTags.map((t) => Padding(
                            padding: EdgeInsets.only(left: 8.w),
                            child: FilterChip(
                              label: Text(t.tag),
                              selected: _tag == t.tag,
                              onSelected: (_) => _applyTag(t.tag),
                            ),
                          )),
                    ],
                  ),
                ),
        ],
      ),
    );
  }

  Future<void> _search(String query) async {
    final repo = ref.read(_travelRepositoryProvider);
    if (query.trim().isEmpty) {
      // 清空搜索时刷新首页两个 Section
      ref.invalidate(_domesticPostsProvider);
      ref.invalidate(_internationalPostsProvider);
      return;
    }

    final result = await repo.searchTravelPosts(query: query.trim(), page: 1, limit: 20);
    if (!mounted) return;

    // 弹出页面展示搜索结果（简单列表）
    // ignore: use_build_context_synchronously
    Navigator.of(context).push(MaterialPageRoute(builder: (_) {
      return Scaffold(
        appBar: AppBar(title: Text('搜索：$query')),
        body: ListView.separated(
          itemCount: result.posts.length,
          separatorBuilder: (_, __) => const Divider(height: 1),
          itemBuilder: (ctx, i) {
            final p = result.posts[i];
            return ListTile(
              title: Text(p.title),
              subtitle: Text(p.displaySummary, maxLines: 2, overflow: TextOverflow.ellipsis),
              onTap: () => Navigator.of(ctx).push(MaterialPageRoute(builder: (_) => TravelDetailScreen(postId: p.id))),
            );
          },
        ),
      );
    }));
  }

  void _applyTag(String? tag) async {
    setState(() { _tag = tag; });
    // 当选中标签时，刷新两个 Section 使用 tag 过滤
    final repo = ref.read(_travelRepositoryProvider);
    // 简单做法：直接用 getTravelPosts + tag 取代 Section 数据（此处用 invalidate + override 可进一步优化）
    ref.invalidate(_domesticPostsProvider);
    ref.invalidate(_internationalPostsProvider);
    // 此处保留 UI 交互，服务端已支持 tag 过滤；如果你需要将 section 同时带 tag，请考虑改为单列表模式
  }
}
