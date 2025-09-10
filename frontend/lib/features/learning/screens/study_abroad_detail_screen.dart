import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
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
        title: Text('留学咨询详情'),
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
          '服务详情',
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
          title: '服务时长',
          content: _getServiceDuration(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.users,
          title: '适合人群',
          content: _getTargetAudience(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.bookOpen,
          title: '服务内容',
          content: _getServiceContent(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.award,
          title: '服务优势',
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
            isAppointed ? '已注册此服务' : '立即注册服务',
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
                            isAppointed ? '已注册' : '注册服务',
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

  String _getServiceDuration() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return '4周';
      case 'study_abroad_2':
        return '2周';
      case 'study_abroad_3':
        return '6周';
      case 'study_abroad_4':
        return '8周';
      default:
        return '4周';
    }
  }

  String _getTargetAudience() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return '准备申请海外大学的学生';
      case 'study_abroad_2':
        return '对专业选择迷茫的学生';
      case 'study_abroad_3':
        return '需要申请材料指导的学生';
      case 'study_abroad_4':
        return '需要语言培训的学生';
      default:
        return '准备留学的学生';
    }
  }

  String _getServiceContent() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return '个人背景分析、目标院校评估、申请时间规划、专业选择建议';
      case 'study_abroad_2':
        return '院校信息收集、专业对比分析、录取要求解读、申请策略制定';
      case 'study_abroad_3':
        return '个人陈述撰写、推荐信指导、简历优化、作品集准备';
      case 'study_abroad_4':
        return '托福/雅思培训、口语练习、写作指导、考试技巧';
      default:
        return '个性化留学规划服务';
    }
  }

  String _getServiceAdvantages() {
    switch (widget.serviceId) {
      case 'study_abroad_1':
        return '资深顾问一对一指导，成功率高达95%';
      case 'study_abroad_2':
        return '海量院校数据库，精准匹配推荐';
      case 'study_abroad_3':
        return '专业文书团队，提升申请竞争力';
      case 'study_abroad_4':
        return '小班教学，快速提升语言能力';
      default:
        return '专业团队，优质服务';
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

  void _handleCancelRegistration() {
    ref.read(appointmentsProvider.notifier).removeAppointment(widget.serviceId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('已取消注册'),
        backgroundColor: Colors.orange,
      ),
    );
  }
}
