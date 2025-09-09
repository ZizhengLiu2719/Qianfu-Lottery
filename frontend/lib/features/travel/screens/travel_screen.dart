import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/responsive_tag.dart';

class TravelScreen extends ConsumerStatefulWidget {
  const TravelScreen({super.key});

  @override
  ConsumerState<TravelScreen> createState() => _TravelScreenState();
}

class _TravelScreenState extends ConsumerState<TravelScreen> {
  String? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 顶部标题栏
          SliverAppBar(
            title: Text(AppLocalizations.of(context)!.travel_title),
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textPrimary,
            elevation: 0,
            pinned: true,
          ),
          // 标签栏
          SliverToBoxAdapter(
            child: _buildCategoryFilter(context),
          ),
          // 内容区域
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 16.w),
            sliver: SliverToBoxAdapter(
              child: _TravelExamples(),
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
        text: '全部攻略',
        mobileText: '全部',
        icon: FeatherIcons.globe,
      ),
      ResponsiveTagData(
        key: 'domestic',
        text: '国内旅游',
        mobileText: '国内游',
        icon: FeatherIcons.mapPin,
      ),
      ResponsiveTagData(
        key: 'international',
        text: '国外旅游',
        mobileText: '国外游',
        icon: FeatherIcons.plane,
      ),
      ResponsiveTagData(
        key: 'city',
        text: '城市探索',
        mobileText: '城市',
        icon: FeatherIcons.building,
      ),
      ResponsiveTagData(
        key: 'nature',
        text: '自然风光',
        mobileText: '自然',
        icon: FeatherIcons.mountain,
      ),
      ResponsiveTagData(
        key: 'culture',
        text: '文化体验',
        mobileText: '文化',
        icon: FeatherIcons.bookOpen,
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
}

class _TravelExamples extends StatelessWidget {
  final List<Map<String, String>> posts = const [
    {
      'title': '西湖一日游攻略',
      'summary': '早上断桥、下午灵隐、傍晚苏堤看日落',
    },
    {
      'title': '成都·火锅 + 大熊猫',
      'summary': '必吃推荐与最佳参观时段',
    },
    {
      'title': '三亚海边拍照点合集',
      'summary': '椰林沙滩、礁石海湾、最佳光线时间',
    },
  ];

  const _TravelExamples({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: posts.length,
      separatorBuilder: (_, __) => const Divider(height: 1),
      itemBuilder: (context, index) {
        final p = posts[index];
        return ListTile(
          leading: const Icon(FeatherIcons.map, color: AppTheme.textPrimary),
          title: Text(p['title']!),
          subtitle: Text(p['summary']!),
          trailing: const Icon(FeatherIcons.chevronRight, size: 18, color: AppTheme.textTertiary),
          onTap: () {},
        );
      },
    );
  }
}
