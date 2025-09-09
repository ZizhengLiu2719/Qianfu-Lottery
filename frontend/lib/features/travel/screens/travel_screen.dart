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
      height: 50.h,
      padding: EdgeInsets.symmetric(vertical: 8.h),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = _selectedCategory == category['key'];
          
          return Container(
            margin: EdgeInsets.only(right: 8.w),
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
                    horizontal: 16.w,
                    vertical: 8.h,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected 
                        ? AppTheme.primaryColor 
                        : Colors.grey.shade50,
                    borderRadius: BorderRadius.circular(20.r),
                    border: Border.all(
                      color: isSelected 
                          ? AppTheme.primaryColor 
                          : Colors.grey.shade200,
                      width: 1.0,
                    ),
                    boxShadow: isSelected ? [
                      BoxShadow(
                        color: AppTheme.primaryColor.withOpacity(0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ] : [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.05),
                        blurRadius: 3,
                        offset: const Offset(0, 1),
                      ),
                    ],
                  ),
                  child: Text(
                    category['name'] as String,
                    style: TextStyle(
                      color: isSelected 
                          ? Colors.white 
                          : AppTheme.textPrimary,
                      fontSize: 14.sp,
                      fontWeight: isSelected 
                          ? FontWeight.w600 
                          : FontWeight.w500,
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
