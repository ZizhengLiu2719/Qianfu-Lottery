import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../providers/appointments_provider.dart';

class MyAppointmentsScreen extends ConsumerStatefulWidget {
  const MyAppointmentsScreen({super.key});

  @override
  ConsumerState<MyAppointmentsScreen> createState() => _MyAppointmentsScreenState();
}

class _MyAppointmentsScreenState extends ConsumerState<MyAppointmentsScreen> {

  @override
  void initState() {
    super.initState();
    // 页面加载时从后端获取用户预约数据
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(appointmentsProvider.notifier).loadUserAppointments();
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final appointments = ref.watch(appointmentsProvider);
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.learning_my_appointments),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        actions: [
          if (appointments.isNotEmpty)
            IconButton(
              icon: Icon(FeatherIcons.trash2),
              onPressed: _showClearAllDialog,
              tooltip: AppLocalizations.of(context)!.cart_clear,
            ),
        ],
      ),
      body: appointments.isEmpty 
        ? _buildEmptyState(context, isDesktop)
        : _buildAppointmentsList(context, isDesktop, appointments),
    );
  }

  Widget _buildEmptyState(BuildContext context, bool isDesktop) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            FeatherIcons.calendar,
            size: isDesktop ? 80.sp : 100.sp,
            color: Colors.grey.shade300,
          ),
          SizedBox(height: 24.h),
          Text(
            AppLocalizations.of(context)!.learning_no_appointments,
            style: TextStyle(
              fontSize: isDesktop ? 18.sp : 20.sp,
              fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            AppLocalizations.of(context)!.learning_go_to_learning_page,
            style: TextStyle(
              fontSize: isDesktop ? 14.sp : 16.sp,
              color: AppTheme.textTertiary,
            ),
          ),
          SizedBox(height: 32.h),
          ElevatedButton.icon(
            onPressed: () => context.go(AppRoutes.courses),
            icon: Icon(FeatherIcons.arrowLeft),
            label: Text(AppLocalizations.of(context)!.learning_back_to_learning),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryColor,
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(
                horizontal: 24.w,
                vertical: 12.h,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppointmentsList(BuildContext context, bool isDesktop, List<AppointmentItem> appointments) {
    return SingleChildScrollView(
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 统计信息
          _buildStatsCard(context, isDesktop, appointments),
          SizedBox(height: 24.h),
          
          // 预约列表
          Text(
            '${AppLocalizations.of(context)!.learning_appointment_list} (${appointments.length})',
            style: TextStyle(
              fontSize: isDesktop ? 16.sp : 18.sp,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(height: 16.h),
          
          ...appointments.map((appointment) => 
            _buildAppointmentCard(context, appointment, isDesktop)
          ).toList(),
        ],
      ),
    );
  }

  Widget _buildStatsCard(BuildContext context, bool isDesktop, List<AppointmentItem> appointments) {
    int courseCount = appointments.where((a) => a.type == 'course').length;
    int serviceCount = appointments.where((a) => a.type == 'service').length;
    int campCount = appointments.where((a) => a.type == 'camp').length;
    
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.primaryColor.withOpacity(0.1),
            AppTheme.primaryColor.withOpacity(0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: AppTheme.primaryColor.withOpacity(0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            AppLocalizations.of(context)!.learning_appointment_stats,
            style: TextStyle(
              fontSize: isDesktop ? 16.sp : 18.sp,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(height: 16.h),
          Row(
            children: [
              _buildStatItem(context, AppLocalizations.of(context)!.learning_courses_category, courseCount, FeatherIcons.bookOpen, isDesktop),
              SizedBox(width: 16.w),
              _buildStatItem(context, AppLocalizations.of(context)!.learning_study_abroad_category, serviceCount, FeatherIcons.globe, isDesktop),
              SizedBox(width: 16.w),
              _buildStatItem(context, AppLocalizations.of(context)!.learning_summer_camp_category, campCount, FeatherIcons.sun, isDesktop),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context, 
    String label, 
    int count, 
    IconData icon, 
    bool isDesktop
  ) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.all(12.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(
              icon,
              size: isDesktop ? 20.sp : 24.sp,
              color: AppTheme.primaryColor,
            ),
            SizedBox(height: 8.h),
            Text(
              count.toString(),
              style: TextStyle(
                fontSize: isDesktop ? 18.sp : 20.sp,
                fontWeight: FontWeight.bold,
                color: AppTheme.textPrimary,
              ),
            ),
            SizedBox(height: 4.h),
            Text(
              label,
              style: TextStyle(
                fontSize: isDesktop ? 12.sp : 14.sp,
                color: AppTheme.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAppointmentCard(
    BuildContext context, 
    AppointmentItem appointment, 
    bool isDesktop
  ) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(12.w),
            decoration: BoxDecoration(
              color: _getCategoryColor(appointment.category).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: Icon(
              appointment.icon,
              color: _getCategoryColor(appointment.category),
              size: isDesktop ? 20.sp : 24.sp,
            ),
          ),
          SizedBox(width: 16.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  appointment.title,
                  style: TextStyle(
                    fontSize: isDesktop ? 14.sp : 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  appointment.subtitle,
                  style: TextStyle(
                    fontSize: isDesktop ? 12.sp : 14.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: 8.h),
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                      decoration: BoxDecoration(
                        color: _getCategoryColor(appointment.category).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12.r),
                      ),
                      child: Text(
                        appointment.category,
                        style: TextStyle(
                          fontSize: isDesktop ? 10.sp : 12.sp,
                          color: _getCategoryColor(appointment.category),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    SizedBox(width: 8.w),
                    Text(
                      '${AppLocalizations.of(context)!.learning_appointment_time} ${_formatDate(appointment.registeredAt)}',
                      style: TextStyle(
                        fontSize: isDesktop ? 10.sp : 12.sp,
                        color: AppTheme.textTertiary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(
              FeatherIcons.trash2,
              color: Colors.red,
              size: isDesktop ? 16.sp : 18.sp,
            ),
            onPressed: () => _removeAppointment(appointment.id),
            tooltip: AppLocalizations.of(context)!.common_delete,
          ),
        ],
      ),
    );
  }

  Color _getCategoryColor(String category) {
    switch (category) {
      case 'AI编程':
        return Colors.blue;
      case '英语学习':
        return Colors.green;
      case '留学咨询':
        return Colors.purple;
      case '夏令营':
        return Colors.orange;
      default:
        return AppTheme.primaryColor;
    }
  }

  String _formatDate(DateTime date) {
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  void _removeAppointment(String appointmentId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.common_confirm_delete),
        content: Text(AppLocalizations.of(context)!.common_confirm_delete_content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(AppLocalizations.of(context)!.common_cancel),
          ),
          TextButton(
            onPressed: () {
              ref.read(appointmentsProvider.notifier).removeAppointment(appointmentId);
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(AppLocalizations.of(context)!.common_deleted),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: Text(AppLocalizations.of(context)!.common_delete, style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showClearAllDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.common_confirm_clear),
        content: Text(AppLocalizations.of(context)!.common_confirm_clear_content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(AppLocalizations.of(context)!.common_cancel),
          ),
          TextButton(
            onPressed: () {
              ref.read(appointmentsProvider.notifier).clearAllAppointments();
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(AppLocalizations.of(context)!.common_cleared),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: Text(AppLocalizations.of(context)!.common_clear, style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
