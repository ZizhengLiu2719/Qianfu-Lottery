import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/language_selector.dart';
import '../../../providers/language_provider.dart';
import '../../../routing/app_router.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final currentLanguage = ref.watch(languageProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.profile_settings,
          style: TextStyle(
            fontSize: isDesktop ? 18.sp : 20.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(FeatherIcons.arrowLeft),
          onPressed: () => context.go(AppRoutes.profile),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(isDesktop ? 16.w : 20.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 语言设置
            LanguageSelector(
              isCompact: false,
              onChanged: () {
                // 语言切换后可以在这里添加额外的逻辑
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      currentLanguage.isChinese 
                          ? AppLocalizations.of(context)!.settings_language_changed_to_english
                          : AppLocalizations.of(context)!.settings_language_changed_to_chinese,
                    ),
                    backgroundColor: AppTheme.primaryColor,
                    duration: const Duration(seconds: 2),
                  ),
                );
              },
            ),
            SizedBox(height: 24.h),

            // 其他设置项
            _buildSettingsSection(
              context,
              AppLocalizations.of(context)!.app_settings,
              [
                _buildSettingsItem(
                  context,
                  FeatherIcons.bell,
                  AppLocalizations.of(context)!.settings_notification_settings,
                  AppLocalizations.of(context)!.settings_notification_settings_desc,
                  () {
                    // TODO: 实现通知设置
                  },
                  isDesktop,
                ),
                _buildSettingsItem(
                  context,
                  FeatherIcons.shield,
                  AppLocalizations.of(context)!.settings_privacy_settings,
                  AppLocalizations.of(context)!.settings_privacy_settings_desc,
                  () {
                    // TODO: 实现隐私设置
                  },
                  isDesktop,
                ),
                _buildSettingsItem(
                  context,
                  FeatherIcons.download,
                  AppLocalizations.of(context)!.settings_cache_management,
                  AppLocalizations.of(context)!.settings_cache_management_desc,
                  () {
                    // TODO: 实现缓存管理
                  },
                  isDesktop,
                ),
              ],
              isDesktop,
            ),
            SizedBox(height: 24.h),

            // 关于应用
            _buildSettingsSection(
              context,
              AppLocalizations.of(context)!.settings_about_app,
              [
                _buildSettingsItem(
                  context,
                  FeatherIcons.info,
                  AppLocalizations.of(context)!.settings_app_info,
                  AppLocalizations.of(context)!.settings_app_info_desc,
                  () {
                    // TODO: 实现应用信息
                  },
                  isDesktop,
                ),
                _buildSettingsItem(
                  context,
                  FeatherIcons.helpCircle,
                  AppLocalizations.of(context)!.settings_help_center,
                  AppLocalizations.of(context)!.settings_help_center_desc,
                  () {
                    // TODO: 实现帮助中心
                  },
                  isDesktop,
                ),
                _buildSettingsItem(
                  context,
                  FeatherIcons.fileText,
                  AppLocalizations.of(context)!.settings_user_agreement,
                  AppLocalizations.of(context)!.settings_user_agreement_desc,
                  () {
                    // TODO: 实现用户协议
                  },
                  isDesktop,
                ),
              ],
              isDesktop,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsSection(
    BuildContext context,
    String title,
    List<Widget> items,
    bool isDesktop,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: isDesktop ? 16.sp : 18.sp,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 12.h),
        Container(
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
          child: Column(children: items),
        ),
      ],
    );
  }

  Widget _buildSettingsItem(
    BuildContext context,
    IconData icon,
    String title,
    String subtitle,
    VoidCallback onTap,
    bool isDesktop,
  ) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
      child: Container(
        padding: EdgeInsets.all(isDesktop ? 12.w : 16.w),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(isDesktop ? 8.w : 10.w),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(isDesktop ? 6.r : 8.r),
              ),
              child: Icon(
                icon,
                size: isDesktop ? 16.sp : 18.sp,
                color: AppTheme.primaryColor,
              ),
            ),
            SizedBox(width: 12.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: isDesktop ? 14.sp : 16.sp,
                      fontWeight: FontWeight.w500,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  SizedBox(height: 2.h),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: isDesktop ? 12.sp : 14.sp,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              FeatherIcons.chevronRight,
              size: isDesktop ? 14.sp : 16.sp,
              color: AppTheme.textTertiary,
            ),
          ],
        ),
      ),
    );
  }
}
