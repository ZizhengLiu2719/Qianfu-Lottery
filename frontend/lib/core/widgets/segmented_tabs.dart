import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/foundation.dart';
import '../../core/theme/app_theme.dart';

class SegmentedTabs extends StatelessWidget {
  final List<String> tabs;
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  const SegmentedTabs({super.key, required this.tabs, required this.selectedIndex, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    // Web 桌面自适配：标签高度与字体稍大，避免桌面显示过小或异常
    final width = MediaQuery.of(context).size.width;
    final bool isDesktopWeb = kIsWeb && width >= 900;
    final double tabHeight = isDesktopWeb ? 44 : 40.h;
    final double fontSize = isDesktopWeb
        ? (width >= 1440 ? 18 : 16)
        : (14 * MediaQuery.of(context).textScaleFactor).clamp(12, 18).toDouble();

    return SizedBox(
      height: tabHeight,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        itemBuilder: (context, index) {
          final bool selected = index == selectedIndex;
          return GestureDetector(
            onTap: () => onChanged(index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: isDesktopWeb ? 10 : 8.h),
              decoration: BoxDecoration(
                color: selected ? AppTheme.primaryColor : Colors.white,
                border: Border.all(color: selected ? AppTheme.primaryColor : AppTheme.dividerColor, width: selected ? 1.6 : 1.2),
                borderRadius: BorderRadius.circular(22.r),
                boxShadow: selected ? [AppTheme.defaultShadow] : null,
              ),
              child: Center(
                child: Text(
                  tabs[index],
                  style: TextStyle(
                    color: selected ? Colors.white : AppTheme.textPrimary,
                    fontWeight: selected ? FontWeight.w700 : FontWeight.w600,
                    fontSize: fontSize,
                    fontFamilyFallback: const [
                      'PingFang SC',
                      'Microsoft YaHei',
                      'Noto Sans SC',
                      'Source Han Sans SC',
                      'Heiti SC',
                      'Arial',
                      'sans-serif'
                    ],
                  ),
                ),
              ),
            ),
          );
        },
        separatorBuilder: (_, __) => SizedBox(width: 10.w),
        itemCount: tabs.length,
      ),
    );
  }
}


