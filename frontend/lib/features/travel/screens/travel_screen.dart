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
      height: 70.h, // 进一步增加纵向高度
      padding: EdgeInsets.symmetric(vertical: 16.h),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = _selectedCategory == category['key'];
          
          return Container(
            margin: EdgeInsets.only(right: 10.w),
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedCategory = category['key'] as String?;
                  });
                },
                child: Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 8.w,  // 进一步减少横向内边距
                    vertical: 16.h,   // 进一步增加纵向内边距
                  ),
                  decoration: BoxDecoration(
                    color: isSelected 
                        ? AppTheme.primaryColor 
                        : Colors.grey.shade50,
                    borderRadius: BorderRadius.circular(30.r), // 进一步增加圆角
                    border: Border.all(
                      color: isSelected 
                          ? AppTheme.primaryColor 
                          : Colors.grey.shade200,
                      width: 1.5,
                    ),
                    boxShadow: isSelected ? [
                      BoxShadow(
                        color: AppTheme.primaryColor.withOpacity(0.3),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ] : [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 4,
                        offset: const Offset(0, 1),
                      ),
                    ],
                  ),
                  child: Center(
                    child: Text(
                      category['name'] as String,
                      style: TextStyle(
                        color: isSelected 
                            ? Colors.white 
                            : AppTheme.textPrimary,
                        fontSize: 16.sp, // 进一步增加字体大小
                        fontWeight: isSelected 
                            ? FontWeight.w700 
                            : FontWeight.w600,
                        height: 1.1, // 稍微减少行高，让文字更紧凑
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
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
