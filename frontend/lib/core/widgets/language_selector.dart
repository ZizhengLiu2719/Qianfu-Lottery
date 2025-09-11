import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../../providers/language_provider.dart';
import '../theme/app_theme.dart';

class LanguageSelector extends ConsumerWidget {
  final bool isCompact;
  final VoidCallback? onChanged;

  const LanguageSelector({
    super.key,
    this.isCompact = false,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentLanguage = ref.watch(languageProvider);
    final isDesktop = MediaQuery.of(context).size.width > 768;

    if (isCompact) {
      return _buildCompactSelector(context, ref, currentLanguage, isDesktop);
    } else {
      return _buildFullSelector(context, ref, currentLanguage, isDesktop);
    }
  }

  Widget _buildCompactSelector(
    BuildContext context,
    WidgetRef ref,
    AppLanguage currentLanguage,
    bool isDesktop,
  ) {
    return PopupMenuButton<AppLanguage>(
      icon: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            FeatherIcons.globe,
            size: isDesktop ? 16.sp : 18.sp,
            color: AppTheme.textPrimary,
          ),
          SizedBox(width: 4.w),
          Text(
            currentLanguage.displayName,
            style: TextStyle(
              fontSize: isDesktop ? 12.sp : 14.sp,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(width: 4.w),
          Icon(
            FeatherIcons.chevronDown,
            size: isDesktop ? 12.sp : 14.sp,
            color: AppTheme.textSecondary,
          ),
        ],
      ),
      onSelected: (AppLanguage language) {
        ref.read(languageProvider.notifier).setLanguage(language);
        onChanged?.call();
      },
      itemBuilder: (BuildContext context) => AppLanguage.values.map((AppLanguage language) {
        return PopupMenuItem<AppLanguage>(
          value: language,
          child: Row(
            children: [
              Icon(
                language == AppLanguage.chinese ? FeatherIcons.flag : FeatherIcons.flag,
                size: 16.sp,
                color: language == AppLanguage.chinese ? Colors.red : Colors.blue,
              ),
              SizedBox(width: 8.w),
              Text(
                language.displayName,
                style: TextStyle(
                  fontSize: 14.sp,
                  color: language == currentLanguage ? AppTheme.primaryColor : AppTheme.textPrimary,
                  fontWeight: language == currentLanguage ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
              if (language == currentLanguage) ...[
                const Spacer(),
                Icon(
                  FeatherIcons.check,
                  size: 16.sp,
                  color: AppTheme.primaryColor,
                ),
              ],
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildFullSelector(
    BuildContext context,
    WidgetRef ref,
    AppLanguage currentLanguage,
    bool isDesktop,
  ) {
    return Container(
      padding: EdgeInsets.all(isDesktop ? 12.w : 16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: isDesktop ? 6 : 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                FeatherIcons.globe,
                size: isDesktop ? 18.sp : 20.sp,
                color: AppTheme.primaryColor,
              ),
              SizedBox(width: 8.w),
              Text(
                AppLocalizations.of(context)!.language_settings,
                style: TextStyle(
                  fontSize: isDesktop ? 16.sp : 18.sp,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
            ],
          ),
          SizedBox(height: 16.h),
          ...AppLanguage.values.map((language) {
            final isSelected = language == currentLanguage;
            return Container(
              margin: EdgeInsets.only(bottom: 8.h),
              child: InkWell(
                onTap: () {
                  ref.read(languageProvider.notifier).setLanguage(language);
                  onChanged?.call();
                },
                borderRadius: BorderRadius.circular(8.r),
                child: Container(
                  padding: EdgeInsets.all(isDesktop ? 12.w : 16.w),
                  decoration: BoxDecoration(
                    color: isSelected 
                        ? AppTheme.primaryColor.withOpacity(0.1)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(8.r),
                    border: Border.all(
                      color: isSelected 
                          ? AppTheme.primaryColor
                          : Colors.grey.shade200,
                      width: isSelected ? 2 : 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        language == AppLanguage.chinese ? FeatherIcons.flag : FeatherIcons.flag,
                        size: isDesktop ? 18.sp : 20.sp,
                        color: language == AppLanguage.chinese ? Colors.red : Colors.blue,
                      ),
                      SizedBox(width: 12.w),
                      Expanded(
                        child: Text(
                          language.displayName,
                          style: TextStyle(
                            fontSize: isDesktop ? 14.sp : 16.sp,
                            color: isSelected ? AppTheme.primaryColor : AppTheme.textPrimary,
                            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                          ),
                        ),
                      ),
                      if (isSelected)
                        Icon(
                          FeatherIcons.check,
                          size: isDesktop ? 16.sp : 18.sp,
                          color: AppTheme.primaryColor,
                        ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }
}
