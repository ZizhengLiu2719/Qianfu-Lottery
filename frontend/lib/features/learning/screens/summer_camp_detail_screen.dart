import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/appointments_provider.dart';

class SummerCampDetailScreen extends ConsumerStatefulWidget {
  final String campId;
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;

  const SummerCampDetailScreen({
    super.key,
    required this.campId,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
  });

  @override
  ConsumerState<SummerCampDetailScreen> createState() => _SummerCampDetailScreenState();
}

class _SummerCampDetailScreenState extends ConsumerState<SummerCampDetailScreen> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final appointments = ref.watch(appointmentsProvider);
    final isAppointed = appointments.any((item) => item.id == widget.campId);
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.summer_camp_detail_title),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: Icon(FeatherIcons.arrowLeft),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 夏令营卡片
            _buildCampCard(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 夏令营详情
            _buildCampDetails(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 注册按钮区域
            _buildRegistrationSection(context, isDesktop, isAppointed),
          ],
        ),
      ),
    );
  }

  Widget _buildCampCard(BuildContext context, bool isDesktop) {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(16.w),
            decoration: BoxDecoration(
              color: Colors.orange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12.r),
            ),
            child: Icon(
              widget.icon,
              color: Colors.orange,
              size: isDesktop ? 32.sp : 40.sp,
            ),
          ),
          SizedBox(width: 20.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.title,
                  style: TextStyle(
                    fontSize: isDesktop ? 20.sp : 24.sp,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 8.h),
                Text(
                  widget.subtitle,
                  style: TextStyle(
                    fontSize: isDesktop ? 14.sp : 16.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: 12.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
                  decoration: BoxDecoration(
                    color: Colors.orange.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Text(
                    widget.category,
                    style: TextStyle(
                      fontSize: isDesktop ? 12.sp : 14.sp,
                      color: Colors.orange,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCampDetails(BuildContext context, bool isDesktop) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context)!.summer_camp_details,
          style: TextStyle(
            fontSize: isDesktop ? 18.sp : 20.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 16.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.calendar,
          title: AppLocalizations.of(context)!.summer_camp_activity_time,
          content: _getCampDuration(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.users,
          title: AppLocalizations.of(context)!.summer_camp_suitable_age,
          content: _getAgeRange(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.mapPin,
          title: AppLocalizations.of(context)!.summer_camp_activity_location,
          content: _getLocation(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.bookOpen,
          title: AppLocalizations.of(context)!.summer_camp_activity_content,
          content: _getCampContent(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.award,
          title: AppLocalizations.of(context)!.summer_camp_activity_features,
          content: _getCampFeatures(),
          isDesktop: isDesktop,
        ),
      ],
    );
  }

  Widget _buildDetailItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String content,
    required bool isDesktop,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(
          icon,
          size: isDesktop ? 16.sp : 18.sp,
          color: Colors.orange,
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
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              SizedBox(height: 4.h),
              Text(
                content,
                style: TextStyle(
                  fontSize: isDesktop ? 12.sp : 14.sp,
                  color: AppTheme.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRegistrationSection(BuildContext context, bool isDesktop, bool isAppointed) {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        children: [
          Text(
            isAppointed ? AppLocalizations.of(context)!.summer_camp_registered_camp : AppLocalizations.of(context)!.summer_camp_register_now,
            style: TextStyle(
              fontSize: isDesktop ? 16.sp : 18.sp,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(height: 16.h),
          Row(
            children: [
              Expanded(
                child: MouseRegion(
                  onEnter: (_) => setState(() => _isHovering = true),
                  onExit: (_) => setState(() => _isHovering = false),
                  child: GestureDetector(
                    onTap: () => _handleRegistration(isAppointed),
                    child: AnimatedContainer(
                      duration: Duration(milliseconds: 200),
                      padding: EdgeInsets.symmetric(
                        horizontal: 24.w,
                        vertical: isDesktop ? 12.h : 16.h,
                      ),
                      decoration: BoxDecoration(
                        color: isAppointed 
                          ? Colors.green 
                          : (_isHovering ? Colors.orange.withOpacity(0.8) : Colors.orange),
                        borderRadius: BorderRadius.circular(12.r),
                        boxShadow: _isHovering ? [
                          BoxShadow(
                            color: Colors.orange.withOpacity(0.3),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ] : null,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            isAppointed ? FeatherIcons.check : FeatherIcons.userPlus,
                            color: Colors.white,
                            size: isDesktop ? 16.sp : 18.sp,
                          ),
                          SizedBox(width: 8.w),
                          Text(
                            isAppointed ? AppLocalizations.of(context)!.summer_camp_registered : AppLocalizations.of(context)!.summer_camp_register_camp,
                            style: TextStyle(
                              fontSize: isDesktop ? 14.sp : 16.sp,
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              if (isAppointed) ...[
                SizedBox(width: 12.w),
                Expanded(
                  child: GestureDetector(
                    onTap: _handleCancelRegistration,
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 24.w,
                        vertical: isDesktop ? 12.h : 16.h,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.red.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12.r),
                        border: Border.all(color: Colors.red.withOpacity(0.3)),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            FeatherIcons.x,
                            color: Colors.red,
                            size: isDesktop ? 16.sp : 18.sp,
                          ),
                          SizedBox(width: 8.w),
                          Text(
                            AppLocalizations.of(context)!.summer_camp_cancel_registration,
                            style: TextStyle(
                              fontSize: isDesktop ? 14.sp : 16.sp,
                              color: Colors.red,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }

  String _getCampDuration() {
    switch (widget.campId) {
      case 'summer_camp_1':
        return AppLocalizations.of(context)!.summer_camp_duration_july_1_14;
      case 'summer_camp_2':
        return AppLocalizations.of(context)!.summer_camp_duration_july_15_28;
      case 'summer_camp_3':
        return AppLocalizations.of(context)!.summer_camp_duration_aug_1_14;
      case 'summer_camp_4':
        return AppLocalizations.of(context)!.summer_camp_duration_aug_15_28;
      default:
        return AppLocalizations.of(context)!.summer_camp_duration_july_1_14;
    }
  }

  String _getAgeRange() {
    switch (widget.campId) {
      case 'summer_camp_1':
        return AppLocalizations.of(context)!.summer_camp_age_14_18;
      case 'summer_camp_2':
        return AppLocalizations.of(context)!.summer_camp_age_15_18;
      case 'summer_camp_3':
        return AppLocalizations.of(context)!.summer_camp_age_10_16;
      case 'summer_camp_4':
        return AppLocalizations.of(context)!.summer_camp_age_12_17;
      default:
        return AppLocalizations.of(context)!.summer_camp_age_14_18;
    }
  }

  String _getLocation() {
    switch (widget.campId) {
      case 'summer_camp_1':
        return AppLocalizations.of(context)!.summer_camp_location_harvard;
      case 'summer_camp_2':
        return AppLocalizations.of(context)!.summer_camp_location_mit;
      case 'summer_camp_3':
        return AppLocalizations.of(context)!.summer_camp_location_wonder;
      case 'summer_camp_4':
        return AppLocalizations.of(context)!.summer_camp_location_ranch;
      default:
        return AppLocalizations.of(context)!.summer_camp_location_harvard;
    }
  }

  String _getCampContent() {
    switch (widget.campId) {
      case 'summer_camp_1':
        return AppLocalizations.of(context)!.summer_camp_content_debate;
      case 'summer_camp_2':
        return AppLocalizations.of(context)!.summer_camp_content_steam;
      case 'summer_camp_3':
        return AppLocalizations.of(context)!.summer_camp_content_adventure;
      case 'summer_camp_4':
        return AppLocalizations.of(context)!.summer_camp_content_horse;
      default:
        return AppLocalizations.of(context)!.summer_camp_content_debate;
    }
  }

  String _getCampFeatures() {
    switch (widget.campId) {
      case 'summer_camp_1':
        return AppLocalizations.of(context)!.summer_camp_features_debate;
      case 'summer_camp_2':
        return AppLocalizations.of(context)!.summer_camp_features_steam;
      case 'summer_camp_3':
        return AppLocalizations.of(context)!.summer_camp_features_adventure;
      case 'summer_camp_4':
        return AppLocalizations.of(context)!.summer_camp_features_horse;
      default:
        return AppLocalizations.of(context)!.summer_camp_features_debate;
    }
  }

  void _handleRegistration(bool isAppointed) {
    if (isAppointed) {
      _handleCancelRegistration();
      return;
    }

    final appointment = AppointmentItem(
      id: widget.campId,
      title: widget.title,
      subtitle: widget.subtitle,
      category: widget.category,
      icon: widget.icon,
      type: 'camp',
      registeredAt: DateTime.now(),
    );

    ref.read(appointmentsProvider.notifier).addAppointment(appointment);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.summer_camp_registration_success),
        backgroundColor: Colors.green,
        action: SnackBarAction(
          label: AppLocalizations.of(context)!.summer_camp_view_my_appointments,
          textColor: Colors.white,
          onPressed: () {
            // TODO: 导航到我的预约页面
          },
        ),
      ),
    );
  }

  void _handleCancelRegistration() async {
    // 先重新加载用户预约数据，确保有正确的数据
    await ref.read(appointmentsProvider.notifier).loadUserAppointments();
    
    // 然后删除
    ref.read(appointmentsProvider.notifier).removeAppointment(widget.campId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.summer_camp_registration_cancelled),
        backgroundColor: Colors.orange,
      ),
    );
  }
}
