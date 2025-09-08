import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../core/theme/app_theme.dart';

class SegmentedTabs extends StatelessWidget {
  final List<String> tabs;
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  const SegmentedTabs({super.key, required this.tabs, required this.selectedIndex, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40.h,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        itemBuilder: (context, index) {
          final bool selected = index == selectedIndex;
          return GestureDetector(
            onTap: () => onChanged(index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 8.h),
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
                    fontSize: 14.sp,
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


