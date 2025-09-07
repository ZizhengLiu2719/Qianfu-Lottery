import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';
import '../../../core/widgets/sticker.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      body: CustomScrollView(
        slivers: [
          // 用户信息头部
          SliverAppBar(
            expandedHeight: 200.h,
            backgroundColor: AppTheme.primaryColor,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: AppTheme.primaryGradient,
                ),
                child: SafeArea(
                  child: Padding(
                    padding: EdgeInsets.all(20.w),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircleAvatar(
                          radius: 40.r,
                          backgroundColor: Colors.white.withOpacity(0.2),
                          child: Icon(
                            FeatherIcons.user,
                            size: 40.sp,
                            color: Colors.white,
                          ),
                        ),
                        SizedBox(height: 16.h),
                        Text(
                          user?.displayName ?? '用户',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20.sp,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8.h),
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 16.w,
                            vertical: 8.h,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20.r),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.diamond,
                                size: 16.sp,
                                color: Colors.white,
                              ),
                              SizedBox(width: 4.w),
                              Text(
                                '$qiancaiDouBalance ${AppLocalizations.of(context)!.qiancaidou_unit}',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16.sp,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          
          // 菜单列表
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(20.w),
              child: Column(
                children: [
                  StickerContainer(
                    tilt: -0.01,
                    child: _buildMenuItem(
                      context,
                      icon: FeatherIcons.shoppingBag,
                      title: AppLocalizations.of(context)!.profile_my_orders,
                      onTap: () => context.go(AppRoutes.orders),
                    ),
                  ),
                  StickerContainer(
                    tilt: 0.015,
                    child: _buildMenuItem(
                      context,
                      icon: FeatherIcons.calendar,
                      title: AppLocalizations.of(context)!.profile_my_appointments,
                      onTap: () => context.go(AppRoutes.appointments),
                    ),
                  ),
                  StickerContainer(
                    tilt: -0.008,
                    child: _buildMenuItem(
                      context,
                      icon: FeatherIcons.creditCard,
                      title: AppLocalizations.of(context)!.profile_transaction_history,
                      onTap: () => context.go(AppRoutes.transactionHistory),
                    ),
                  ),
                  StickerContainer(
                    tilt: 0.01,
                    child: _buildMenuItem(
                      context,
                      icon: FeatherIcons.settings,
                      title: AppLocalizations.of(context)!.profile_settings,
                      onTap: () => context.go(AppRoutes.settings),
                    ),
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
      margin: EdgeInsets.only(bottom: 12.h),
      child: ListTile(
        leading: Container(
          padding: EdgeInsets.all(8.w),
          decoration: BoxDecoration(
            color: AppTheme.primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8.r),
          ),
          child: Icon(
            icon,
            color: AppTheme.primaryColor,
            size: 20.sp,
          ),
        ),
        title: Text(
          title,
          style: Theme.of(context).textTheme.titleMedium,
        ),
        trailing: Icon(
          FeatherIcons.chevronRight,
          color: AppTheme.textTertiary,
          size: 20.sp,
        ),
        onTap: onTap,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.r),
        ),
        tileColor: Colors.white,
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
