import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/appointments_provider.dart';

class StudyAbroadDetailScreen extends ConsumerStatefulWidget {
  final String serviceId;
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;

  const StudyAbroadDetailScreen({
    super.key,
    required this.serviceId,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
  });

  @override
  ConsumerState<StudyAbroadDetailScreen> createState() => _StudyAbroadDetailScreenState();
}

class _StudyAbroadDetailScreenState extends ConsumerState<StudyAbroadDetailScreen> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final appointments = ref.watch(appointmentsProvider);
    final isAppointed = appointments.any((item) => item.id == widget.serviceId);
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.study_abroad_detail_title),
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
            // 服务卡片
            _buildServiceCard(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 服务详情
            _buildServiceDetails(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 注册按钮区域
            _buildRegistrationSection(context, isDesktop, isAppointed),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceCard(BuildContext context, bool isDesktop) {
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
              color: Colors.purple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12.r),
            ),
            child: Icon(
              widget.icon,
              color: Colors.purple,
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
                    color: Colors.purple.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Text(
                    widget.category,
                    style: TextStyle(
                      fontSize: isDesktop ? 12.sp : 14.sp,
                      color: Colors.purple,
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

  Widget _buildServiceDetails(BuildContext context, bool isDesktop) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context)!.study_abroad_service_details,
          style: TextStyle(
            fontSize: isDesktop ? 18.sp : 20.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 16.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.clock,
          title: AppLocalizations.of(context)!.study_abroad_service_duration,
          content: _getServiceDuration(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.users,
          title: AppLocalizations.of(context)!.study_abroad_target_audience,
          content: _getTargetAudience(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.bookOpen,
          title: AppLocalizations.of(context)!.study_abroad_service_content,
          content: _getServiceContent(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.award,
          title: AppLocalizations.of(context)!.study_abroad_service_advantages,
          content: _getServiceAdvantages(),
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
          color: Colors.purple,
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
            isAppointed ? AppLocalizations.of(context)!.study_abroad_registered_service : AppLocalizations.of(context)!.study_abroad_register_now,
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
                          : (_isHovering ? Colors.purple.withOpacity(0.8) : Colors.purple),
                        borderRadius: BorderRadius.circular(12.r),
                        boxShadow: _isHovering ? [
                          BoxShadow(
                            color: Colors.purple.withOpacity(0.3),
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
                            isAppointed ? AppLocalizations.of(context)!.study_abroad_registered : AppLocalizations.of(context)!.study_abroad_register_service,
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
                            AppLocalizations.of(context)!.study_abroad_cancel_registration,
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

  String _getServiceDuration() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return AppLocalizations.of(context)!.study_abroad_duration_4_weeks;
      case 'study_abroad_2':
        return AppLocalizations.of(context)!.study_abroad_duration_2_weeks;
      case 'study_abroad_3':
        return AppLocalizations.of(context)!.study_abroad_duration_6_weeks;
      case 'study_abroad_4':
        return AppLocalizations.of(context)!.study_abroad_duration_8_weeks;
      default:
        return AppLocalizations.of(context)!.study_abroad_duration_4_weeks;
    }
  }

  String _getTargetAudience() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return AppLocalizations.of(context)!.study_abroad_audience_overseas;
      case 'study_abroad_2':
        return AppLocalizations.of(context)!.study_abroad_audience_major_confused;
      case 'study_abroad_3':
        return AppLocalizations.of(context)!.study_abroad_audience_materials;
      case 'study_abroad_4':
        return AppLocalizations.of(context)!.study_abroad_audience_language;
      default:
        return AppLocalizations.of(context)!.study_abroad_audience_overseas;
    }
  }

  String _getServiceContent() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return AppLocalizations.of(context)!.study_abroad_content_planning;
      case 'study_abroad_2':
        return AppLocalizations.of(context)!.study_abroad_content_school_selection;
      case 'study_abroad_3':
        return AppLocalizations.of(context)!.study_abroad_content_application;
      case 'study_abroad_4':
        return AppLocalizations.of(context)!.study_abroad_content_language;
      default:
        return AppLocalizations.of(context)!.study_abroad_content_planning;
    }
  }

  String _getServiceAdvantages() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return AppLocalizations.of(context)!.study_abroad_advantages_experienced;
      case 'study_abroad_2':
        return AppLocalizations.of(context)!.study_abroad_advantages_database;
      case 'study_abroad_3':
        return AppLocalizations.of(context)!.study_abroad_advantages_writing;
      case 'study_abroad_4':
        return AppLocalizations.of(context)!.study_abroad_advantages_small_class;
      default:
        return AppLocalizations.of(context)!.study_abroad_advantages_experienced;
    }
  }

  void _handleRegistration(bool isAppointed) {
    if (isAppointed) {
      _handleCancelRegistration();
      return;
    }

    final appointment = AppointmentItem(
      id: widget.serviceId,
      title: widget.title,
      subtitle: widget.subtitle,
      category: widget.category,
      icon: widget.icon,
      type: 'service',
      registeredAt: DateTime.now(),
    );

    ref.read(appointmentsProvider.notifier).addAppointment(appointment);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.study_abroad_registration_success),
        backgroundColor: Colors.green,
        action: SnackBarAction(
          label: AppLocalizations.of(context)!.study_abroad_view_my_appointments,
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
    ref.read(appointmentsProvider.notifier).removeAppointment(widget.serviceId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.study_abroad_registration_cancelled),
        backgroundColor: Colors.orange,
      ),
    );
  }
}
