import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';

class EntertainmentScreen extends ConsumerWidget {
  const EntertainmentScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.entertainment_title),
        backgroundColor: Colors.white,
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(40.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                FeatherIcons.smile,
                size: 80.sp,
                color: AppTheme.primaryColor,
              ),
              SizedBox(height: 24.h),
              Text(
                AppLocalizations.of(context)!.entertainment_coming_soon,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: AppTheme.textPrimary,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16.h),
              Text(
                AppLocalizations.of(context)!.entertainment_coming_soon_desc,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
