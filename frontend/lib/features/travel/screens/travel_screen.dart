import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';

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
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.travel_title),
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          children: [
            _buildCategoryFilter(context),
            SizedBox(height: 16.h),
            Expanded(child: _TravelExamples()),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryFilter(BuildContext context) {
    final categories = [
      {'key': null, 'name': '全部'},
      {'key': 'domestic', 'name': '国内游'},
      {'key': 'international', 'name': '国外游'},
    ];

    return Container(
      padding: EdgeInsets.symmetric(vertical: 24.h), // 进一步增加垂直间距
      child: SizedBox(
        height: 60.h, // 进一步增加高度
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          padding: EdgeInsets.symmetric(horizontal: 20.w),
          itemCount: categories.length,
          itemBuilder: (context, index) {
            final category = categories[index];
            final isSelected = _selectedCategory == category['key'];

            return Container(
              margin: EdgeInsets.only(right: 20.w), // 进一步增加间距
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedCategory = category['key'] as String?;
                  });
                },
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 32.w, vertical: 16.h), // 进一步增加内边距
                  decoration: BoxDecoration(
                    color: isSelected ? AppTheme.primaryColor : Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(30.r), // 进一步增加圆角
                    border: Border.all(
                      color: isSelected ? AppTheme.primaryColor : Colors.grey.shade300,
                      width: 3, // 进一步增加边框宽度
                    ),
                    boxShadow: isSelected ? [
                      BoxShadow(
                        color: AppTheme.primaryColor.withOpacity(0.4),
                        blurRadius: 12,
                        offset: const Offset(0, 3),
                      ),
                    ] : null,
                  ),
                  child: Center( // 确保文字居中
                    child: Text(
                      category['name'] as String,
                      style: TextStyle(
                        color: isSelected ? Colors.white : AppTheme.textSecondary,
                        fontSize: 18.sp, // 进一步增加字体大小
                        fontWeight: isSelected ? FontWeight.w800 : FontWeight.w700, // 进一步增加字重
                        height: 1.0, // 设置行高为1，确保字体贴合
                      ),
                      textAlign: TextAlign.center, // 确保文字居中对齐
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
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
