import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/appointments_provider.dart';

class CourseDetailScreen extends ConsumerStatefulWidget {
  final String courseId;
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;

  const CourseDetailScreen({
    super.key,
    required this.courseId,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
  });

  @override
  ConsumerState<CourseDetailScreen> createState() => _CourseDetailScreenState();
}

class _CourseDetailScreenState extends ConsumerState<CourseDetailScreen> {
  bool _isRegistered = false;
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final appointments = ref.watch(appointmentsProvider);
    final isAppointed = appointments.any((item) => item.id == widget.courseId);
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.learning_course_details),
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
            // 课程卡片
            _buildCourseCard(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 课程详情
            _buildCourseDetails(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 注册按钮区域
            _buildRegistrationSection(context, isDesktop, isAppointed),
          ],
        ),
      ),
    );
  }

  Widget _buildCourseCard(BuildContext context, bool isDesktop) {
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
              color: AppTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12.r),
            ),
            child: Icon(
              widget.icon,
              color: AppTheme.primaryColor,
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
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Text(
                    widget.category,
                    style: TextStyle(
                      fontSize: isDesktop ? 12.sp : 14.sp,
                      color: AppTheme.primaryColor,
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

  Widget _buildCourseDetails(BuildContext context, bool isDesktop) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context)!.learning_course_details,
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
          title: AppLocalizations.of(context)!.learning_course_duration,
          content: AppLocalizations.of(context)!.learning_course_duration_value,
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.calendar,
          title: AppLocalizations.of(context)!.learning_course_schedule,
          content: AppLocalizations.of(context)!.learning_course_schedule_value,
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.users,
          title: AppLocalizations.of(context)!.learning_course_target_audience,
          content: AppLocalizations.of(context)!.learning_course_target_audience_value,
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.bookOpen,
          title: AppLocalizations.of(context)!.learning_course_content,
          content: AppLocalizations.of(context)!.learning_course_content_value,
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
          color: AppTheme.primaryColor,
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
            isAppointed ? '已注册此课程' : '立即注册课程',
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
                    onTap: _handleRegistration,
                    child: AnimatedContainer(
                      duration: Duration(milliseconds: 200),
                      padding: EdgeInsets.symmetric(
                        horizontal: 24.w,
                        vertical: isDesktop ? 12.h : 16.h,
                      ),
                      decoration: BoxDecoration(
                        color: isAppointed 
                          ? Colors.green 
                          : (_isHovering ? AppTheme.primaryColor.withOpacity(0.8) : AppTheme.primaryColor),
                        borderRadius: BorderRadius.circular(12.r),
                        boxShadow: _isHovering ? [
                          BoxShadow(
                            color: AppTheme.primaryColor.withOpacity(0.3),
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
                            isAppointed ? '已注册' : '注册课程',
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
                            '取消注册',
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

  void _handleRegistration() {
    final appointment = AppointmentItem(
      id: widget.courseId,
      title: widget.title,
      subtitle: widget.subtitle,
      category: widget.category,
      icon: widget.icon,
      type: 'course',
      registeredAt: DateTime.now(),
    );

    ref.read(appointmentsProvider.notifier).addAppointment(appointment);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('注册成功！'),
        backgroundColor: Colors.green,
        action: SnackBarAction(
          label: '查看我的预约',
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
    ref.read(appointmentsProvider.notifier).removeAppointment(widget.courseId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('已取消注册'),
        backgroundColor: Colors.orange,
      ),
    );
  }
}
