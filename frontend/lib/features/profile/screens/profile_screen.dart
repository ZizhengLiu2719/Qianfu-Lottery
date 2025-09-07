import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 用户信息头部
          SliverAppBar(
            expandedHeight: 120.h,
            backgroundColor: Colors.white,
            pinned: true,
            centerTitle: false,
            title: Row(
              children: [
                CircleAvatar(
                  radius: 18.r,
                  backgroundColor: AppTheme.primaryColor,
                  child: Icon(FeatherIcons.user, color: Colors.white, size: 16.sp),
                ),
                SizedBox(width: 8.w),
                Text(
                  user?.displayName ?? '我的',
                  style: TextStyle(
                    color: AppTheme.textPrimary,
                    fontSize: 18.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            actions: [
              Padding(
                padding: EdgeInsets.only(right: 12.w),
                child: Row(
                  children: [
                    Icon(Icons.diamond, color: AppTheme.primaryColor, size: 18.sp),
                    SizedBox(width: 4.w),
                    Text('$qiancaiDouBalance', style: TextStyle(color: AppTheme.primaryColor)),
                  ],
                ),
              ),
            ],
          ),
          
          // 菜单列表
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(20.w),
              child: Column(
                children: [
                  _buildMenuItem(
                    context,
                    icon: FeatherIcons.shoppingBag,
                    title: AppLocalizations.of(context)!.profile_my_orders,
                    onTap: () => context.go(AppRoutes.orders),
                  ),
                  _buildMenuItem(
                    context,
                    icon: FeatherIcons.calendar,
                    title: AppLocalizations.of(context)!.profile_my_appointments,
                    onTap: () => context.go(AppRoutes.appointments),
                  ),
                  _buildMenuItem(
                    context,
                    icon: FeatherIcons.creditCard,
                    title: AppLocalizations.of(context)!.profile_transaction_history,
                    onTap: () => context.go(AppRoutes.transactionHistory),
                  ),
                  _buildMenuItem(
                    context,
                    icon: FeatherIcons.settings,
                    title: AppLocalizations.of(context)!.profile_settings,
                    onTap: () => context.go(AppRoutes.settings),
                  ),
                  SizedBox(height: 20.h),
                  _buildLogoutButton(context, ref),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: EdgeInsets.only(bottom: 8.h),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(color: AppTheme.dividerColor),
        ),
      ),
      child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 4.h),
        leading: Icon(icon, color: AppTheme.textPrimary, size: 20.sp),
        title: Text(title, style: Theme.of(context).textTheme.titleMedium),
        trailing: Icon(FeatherIcons.chevronRight, color: AppTheme.textTertiary, size: 18.sp),
        onTap: onTap,
      ),
    );
  }

  Widget _buildLogoutButton(BuildContext context, WidgetRef ref) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: () => _showLogoutDialog(context, ref),
        style: OutlinedButton.styleFrom(
          foregroundColor: AppTheme.errorColor,
          side: const BorderSide(color: AppTheme.errorColor),
          padding: EdgeInsets.symmetric(vertical: 16.h),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              FeatherIcons.logOut,
              size: 20.sp,
            ),
            SizedBox(width: 8.w),
            Text(AppLocalizations.of(context)!.auth_logout),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.auth_logout),
        content: Text('确定要退出登录吗？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(AppLocalizations.of(context)!.common_cancel),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              ref.read(authProvider.notifier).logout();
            },
            child: Text(AppLocalizations.of(context)!.common_confirm),
          ),
        ],
      ),
    );
  }
}
