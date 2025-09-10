import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';

class MyAppointmentsScreen extends ConsumerStatefulWidget {
  const MyAppointmentsScreen({super.key});

  @override
  ConsumerState<MyAppointmentsScreen> createState() => _MyAppointmentsScreenState();
}

class _MyAppointmentsScreenState extends ConsumerState<MyAppointmentsScreen> {
  // 模拟预约数据
  List<Map<String, dynamic>> _appointments = [
    {
      'id': 'ai_course_1',
      'title': 'AI 编程入门（直播课）',
      'subtitle': '每周二/四 晚 20:00 · 60 分钟',
      'category': 'AI编程',
      'icon': FeatherIcons.cpu,
      'type': 'course',
      'registeredAt': '2024-01-15',
    },
    {
      'id': 'english_course_2',
      'title': '商务英语写作',
      'subtitle': '专业商务邮件与报告写作',
      'category': '英语学习',
      'icon': FeatherIcons.edit,
      'type': 'course',
      'registeredAt': '2024-01-16',
    },
    {
      'id': 'study_abroad_1',
      'title': '留学规划与定位',
      'subtitle': '根据学术背景和职业目标提供个性化留学计划',
      'category': '留学咨询',
      'icon': FeatherIcons.crosshair,
      'type': 'service',
      'registeredAt': '2024-01-17',
    },
    {
      'id': 'summer_camp_1',
      'title': '哈佛西湖辩论赛夏令营',
      'subtitle': '马萨诸塞州 · 14-18岁',
      'category': '夏令营',
      'icon': FeatherIcons.messageSquare,
      'type': 'camp',
      'registeredAt': '2024-01-18',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('我的预约'),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        actions: [
          if (_appointments.isNotEmpty)
            IconButton(
              icon: Icon(FeatherIcons.trash2),
              onPressed: _showClearAllDialog,
              tooltip: '清空所有预约',
            ),
        ],
      ),
      body: _appointments.isEmpty 
        ? _buildEmptyState(context, isDesktop)
        : _buildAppointmentsList(context, isDesktop),
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
            '暂无预约记录',
            style: TextStyle(
              fontSize: isDesktop ? 18.sp : 20.sp,
              fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '去学习彩页面选择感兴趣的课程吧',
            style: TextStyle(
              fontSize: isDesktop ? 14.sp : 16.sp,
              color: AppTheme.textTertiary,
            ),
          ),
          SizedBox(height: 32.h),
          ElevatedButton.icon(
            onPressed: () => Navigator.of(context).pop(),
            icon: Icon(FeatherIcons.arrowLeft),
            label: Text('返回学习彩'),
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

  Widget _buildAppointmentsList(BuildContext context, bool isDesktop) {
    return SingleChildScrollView(
      padding: EdgeInsets.all(16.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 统计信息
          _buildStatsCard(context, isDesktop),
          SizedBox(height: 24.h),
          
          // 预约列表
          Text(
            '预约列表 (${_appointments.length})',
            style: TextStyle(
              fontSize: isDesktop ? 16.sp : 18.sp,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(height: 16.h),
          
          ..._appointments.map((appointment) => 
            _buildAppointmentCard(context, appointment, isDesktop)
          ).toList(),
        ],
      ),
    );
  }

  Widget _buildStatsCard(BuildContext context, bool isDesktop) {
    int courseCount = _appointments.where((a) => a['type'] == 'course').length;
    int serviceCount = _appointments.where((a) => a['type'] == 'service').length;
    int campCount = _appointments.where((a) => a['type'] == 'camp').length;
    
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
            '预约统计',
            style: TextStyle(
              fontSize: isDesktop ? 16.sp : 18.sp,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          SizedBox(height: 16.h),
          Row(
            children: [
              _buildStatItem(context, '课程', courseCount, FeatherIcons.bookOpen, isDesktop),
              SizedBox(width: 16.w),
              _buildStatItem(context, '留学咨询', serviceCount, FeatherIcons.globe, isDesktop),
              SizedBox(width: 16.w),
              _buildStatItem(context, '夏令营', campCount, FeatherIcons.sun, isDesktop),
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
    Map<String, dynamic> appointment, 
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
              color: _getCategoryColor(appointment['category']).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: Icon(
              appointment['icon'],
              color: _getCategoryColor(appointment['category']),
              size: isDesktop ? 20.sp : 24.sp,
            ),
          ),
          SizedBox(width: 16.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  appointment['title'],
                  style: TextStyle(
                    fontSize: isDesktop ? 14.sp : 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  appointment['subtitle'],
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
                        color: _getCategoryColor(appointment['category']).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12.r),
                      ),
                      child: Text(
                        appointment['category'],
                        style: TextStyle(
                          fontSize: isDesktop ? 10.sp : 12.sp,
                          color: _getCategoryColor(appointment['category']),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    SizedBox(width: 8.w),
                    Text(
                      '预约时间: ${appointment['registeredAt']}',
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
            onPressed: () => _removeAppointment(appointment['id']),
            tooltip: '删除预约',
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

  void _removeAppointment(String appointmentId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('确认删除'),
        content: Text('确定要删除这个预约吗？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('取消'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _appointments.removeWhere((a) => a['id'] == appointmentId);
              });
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('已删除预约'),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: Text('删除', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showClearAllDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('确认清空'),
        content: Text('确定要清空所有预约吗？此操作不可撤销。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('取消'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _appointments.clear();
              });
              Navigator.of(context).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('已清空所有预约'),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: Text('清空', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
