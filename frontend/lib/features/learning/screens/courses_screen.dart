import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';

class CoursesScreen extends ConsumerWidget {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: const Text('线上课程'),
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Icon(FeatherIcons.playCircle, color: AppTheme.primaryColor),
                SizedBox(width: 8.w),
                const Text('热门线上课程', style: TextStyle(fontWeight: FontWeight.w600)),
              ],
            ),
            SizedBox(height: 12.h),
            Expanded(child: _Examples()),
          ],
        ),
      ),
    );
  }
}

class _Examples extends StatelessWidget {
  final List<Map<String, dynamic>> data = const [
    {
      'title': 'AI 编程入门（直播课）',
      'subtitle': '每周二/四 晚 20:00 · 60 分钟',
      'icon': FeatherIcons.cpu
    },
    {
      'title': '英语口语提升（录播+答疑）',
      'subtitle': '随时观看 · 每周一次答疑',
      'icon': FeatherIcons.mic
    },
    {
      'title': '短视频剪辑（实战）',
      'subtitle': '四周完成作品集',
      'icon': FeatherIcons.film
    },
  ];

  const _Examples({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: data.length,
      separatorBuilder: (_, __) => const Divider(height: 1),
      itemBuilder: (context, index) {
        final item = data[index];
        return ListTile(
          leading: Icon(item['icon'] as IconData, color: AppTheme.textPrimary),
          title: Text(item['title'] as String),
          subtitle: Text(item['subtitle'] as String),
          trailing: const Icon(FeatherIcons.chevronRight, size: 18, color: AppTheme.textTertiary),
          onTap: () {},
        );
      },
    );
  }
}
