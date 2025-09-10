import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/responsive_tag.dart';
import 'course_detail_screen.dart';
import 'study_abroad_detail_screen.dart';
import 'summer_camp_detail_screen.dart';
import 'my_appointments_screen.dart';
import '../providers/appointments_provider.dart';

class CoursesScreen extends ConsumerStatefulWidget {
  const CoursesScreen({super.key});

  @override
  ConsumerState<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends ConsumerState<CoursesScreen> {
  String? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 顶部标题栏
          SliverAppBar(
            title: Text(AppLocalizations.of(context)!.nav_learning),
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textPrimary,
            elevation: 0,
            pinned: true,
            actions: [
              IconButton(
                icon: Icon(FeatherIcons.calendar),
                onPressed: () => _navigateToMyAppointments(),
                tooltip: '我的预约',
              ),
            ],
          ),
          // 标签栏
          SliverToBoxAdapter(
            child: _buildCategoryFilter(context),
          ),
          // 内容区域
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 16.w),
            sliver: SliverToBoxAdapter(
              child: _buildContent(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryFilter(BuildContext context) {
    final categories = [
      ResponsiveTagData(
        key: 'ai',
        text: 'AI编程学习',
        mobileText: 'AI编程',
        icon: FeatherIcons.cpu,
      ),
      ResponsiveTagData(
        key: 'english',
        text: '英语学习',
        mobileText: '英语',
        icon: FeatherIcons.mic,
      ),
      ResponsiveTagData(
        key: 'study_abroad',
        text: '留学咨询',
        mobileText: '留学',
        icon: FeatherIcons.globe,
      ),
      ResponsiveTagData(
        key: 'summer_camp',
        text: '夏令营',
        mobileText: '夏令营',
        icon: FeatherIcons.sun,
      ),
    ];

    return ResponsiveTagBar(
      tags: categories,
      selectedTag: _selectedCategory,
      onTagSelected: (key) {
        setState(() {
          _selectedCategory = key;
        });
      },
    );
  }

  Widget _buildContent(BuildContext context) {
    // 根据选中的分类显示不同内容
    if (_selectedCategory == 'ai') {
      return _buildAICourses(context);
    } else if (_selectedCategory == 'english') {
      return _buildEnglishCourses(context);
    } else if (_selectedCategory == 'study_abroad') {
      return _buildStudyAbroadServices(context);
    } else if (_selectedCategory == 'summer_camp') {
      return _buildSummerCamps(context);
    } else {
      return _buildWelcomeContent(context);
    }
  }

  Widget _buildWelcomeContent(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          '学习彩 - 知识改变命运',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '选择你感兴趣的领域，开始你的学习之旅',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCategoryCard(
          context,
          title: 'AI编程学习',
          subtitle: '掌握人工智能编程技能，开启未来职业道路',
          icon: FeatherIcons.cpu,
          category: 'AI编程学习',
          onTap: () => setState(() => _selectedCategory = 'ai'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: '英语学习',
          subtitle: '提升英语水平，拓展国际视野',
          icon: FeatherIcons.mic,
          category: '英语学习',
          onTap: () => setState(() => _selectedCategory = 'english'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: '留学咨询',
          subtitle: '专业留学规划，助力海外求学梦想',
          icon: FeatherIcons.globe,
          category: '留学咨询',
          onTap: () => setState(() => _selectedCategory = 'study_abroad'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: '夏令营',
          subtitle: '美国顶级夏令营，体验国际化教育',
          icon: FeatherIcons.sun,
          category: '夏令营',
          onTap: () => setState(() => _selectedCategory = 'summer_camp'),
        ),
      ],
    );
  }

  Widget _buildAICourses(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          'AI编程学习',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '掌握人工智能编程技能，开启未来职业道路',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCourseCard(
          context,
          title: 'AI 编程入门（直播课）',
          subtitle: '每周二/四 晚 20:00 · 60 分钟',
          icon: FeatherIcons.cpu,
          category: 'AI编程',
          onTap: () => _navigateToCourseDetail('ai_course_1'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '机器学习实战',
          subtitle: '从零开始构建AI模型',
          icon: FeatherIcons.cpu,
          category: 'AI编程',
          onTap: () => _navigateToCourseDetail('ai_course_2'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '深度学习进阶',
          subtitle: '神经网络与深度学习应用',
          icon: FeatherIcons.layers,
          category: 'AI编程',
          onTap: () => _navigateToCourseDetail('ai_course_3'),
        ),
      ],
    );
  }

  Widget _buildEnglishCourses(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          '英语学习',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '提升英语水平，拓展国际视野',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCourseCard(
          context,
          title: '英语口语提升（录播+答疑）',
          subtitle: '随时观看 · 每周一次答疑',
          icon: FeatherIcons.mic,
          category: '英语学习',
          onTap: () => _navigateToCourseDetail('english_course_1'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '商务英语写作',
          subtitle: '专业商务邮件与报告写作',
          icon: FeatherIcons.edit,
          category: '英语学习',
          onTap: () => _navigateToCourseDetail('english_course_2'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '雅思托福备考',
          subtitle: '系统化备考，高分通过',
          icon: FeatherIcons.award,
          category: '英语学习',
          onTap: () => _navigateToCourseDetail('english_course_3'),
        ),
      ],
    );
  }

  Widget _buildStudyAbroadServices(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          '留学咨询',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '专业留学规划，助力海外求学梦想',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_1'),
          child: _buildServiceCard(
            context,
            title: '留学规划与定位',
            subtitle: '根据学术背景和职业目标提供个性化留学计划',
            icon: FeatherIcons.crosshair,
            duration: '4周',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_2'),
          child: _buildServiceCard(
            context,
            title: '院校选择与专业推荐',
            subtitle: '推荐适合的学校和专业，提供详细信息',
            icon: FeatherIcons.bookOpen,
            duration: '2周',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_3'),
          child: _buildServiceCard(
            context,
            title: '申请材料准备指导',
            subtitle: '协助准备个人陈述、推荐信等申请材料',
            icon: FeatherIcons.edit,
            duration: '6周',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_4'),
          child: _buildServiceCard(
            context,
            title: '语言培训与考试指导',
            subtitle: '提供语言培训课程和考试指导',
            icon: FeatherIcons.award,
            duration: '8周',
          ),
        ),
      ],
    );
  }

  Widget _buildSummerCamps(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          '夏令营',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '美国顶级夏令营，体验国际化教育',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_1'),
          child: _buildCampCard(
            context,
            title: '哈佛西湖辩论赛夏令营',
            subtitle: '马萨诸塞州 · 14-18岁',
            icon: FeatherIcons.messageSquare,
            duration: '7月1日-14日',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_2'),
          child: _buildCampCard(
            context,
            title: '麻省理工STEAM沉浸式夏令营',
            subtitle: '马萨诸塞州 · 15-18岁',
            icon: FeatherIcons.cpu,
            duration: '7月15日-28日',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_3'),
          child: _buildCampCard(
            context,
            title: 'Wonder Valley度假村夏令营',
            subtitle: '加利福尼亚州 · 10-16岁',
            icon: FeatherIcons.mapPin,
            duration: '8月1日-14日',
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_4'),
          child: _buildCampCard(
            context,
            title: 'Rocking Horse牧场夏令营',
            subtitle: '纽约州 · 12-17岁',
            icon: FeatherIcons.heart,
            duration: '8月15日-28日',
          ),
        ),
      ],
    );
  }

  Widget _buildCourseCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required String category,
    VoidCallback? onTap,
  }) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(isDesktop ? 12.w : 16.w),
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
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(isDesktop ? 8.w : 12.w),
            decoration: BoxDecoration(
              color: AppTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(isDesktop ? 6.r : 8.r),
            ),
            child: Icon(
              icon,
              color: AppTheme.primaryColor,
              size: isDesktop ? 18.sp : 24.sp,
            ),
          ),
          SizedBox(width: isDesktop ? 12.w : 16.w),
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
                SizedBox(height: isDesktop ? 3.h : 4.h),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: isDesktop ? 12.sp : 14.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: isDesktop ? 6.h : 8.h),
                Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: isDesktop ? 6.w : 8.w, 
                    vertical: isDesktop ? 3.h : 4.h
                  ),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
                  ),
                  child: Text(
                    category,
                    style: TextStyle(
                      fontSize: isDesktop ? 10.sp : 12.sp,
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Icon(
            FeatherIcons.chevronRight,
            size: isDesktop ? 16.sp : 20.sp,
            color: AppTheme.textTertiary,
          ),
        ],
      ),
      ),
    );
  }

  void _navigateToCourseDetail(String courseId) {
    // 根据courseId获取课程信息
    Map<String, dynamic> courseInfo = _getCourseInfo(courseId);
    
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => CourseDetailScreen(
          courseId: courseId,
          title: courseInfo['title'],
          subtitle: courseInfo['subtitle'],
          category: courseInfo['category'],
          icon: courseInfo['icon'],
        ),
      ),
    );
  }

  Map<String, dynamic> _getCourseInfo(String courseId) {
    switch (courseId) {
      case 'ai_course_1':
        return {
          'title': 'AI 编程入门（直播课）',
          'subtitle': '每周二/四 晚 20:00 · 60 分钟',
          'category': 'AI编程',
          'icon': FeatherIcons.cpu,
        };
      case 'ai_course_2':
        return {
          'title': '机器学习实战',
          'subtitle': '从零开始构建AI模型',
          'category': 'AI编程',
          'icon': FeatherIcons.cpu,
        };
      case 'ai_course_3':
        return {
          'title': '深度学习进阶',
          'subtitle': '神经网络与深度学习应用',
          'category': 'AI编程',
          'icon': FeatherIcons.layers,
        };
      case 'english_course_1':
        return {
          'title': '英语口语提升（录播+答疑）',
          'subtitle': '随时观看 · 每周一次答疑',
          'category': '英语学习',
          'icon': FeatherIcons.mic,
        };
      case 'english_course_2':
        return {
          'title': '商务英语写作',
          'subtitle': '专业商务邮件与报告写作',
          'category': '英语学习',
          'icon': FeatherIcons.edit,
        };
      case 'english_course_3':
        return {
          'title': '雅思托福备考',
          'subtitle': '系统化备考，高分通过',
          'category': '英语学习',
          'icon': FeatherIcons.award,
        };
      default:
        return {
          'title': '未知课程',
          'subtitle': '课程信息不可用',
          'category': '其他',
          'icon': FeatherIcons.helpCircle,
        };
    }
  }

  void _navigateToMyAppointments() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => const MyAppointmentsScreen(),
      ),
    );
  }

  void _navigateToStudyAbroadDetail(String serviceId) {
    Map<String, dynamic> serviceInfo = _getStudyAbroadInfo(serviceId);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => StudyAbroadDetailScreen(
          serviceId: serviceId,
          title: serviceInfo['title'],
          subtitle: serviceInfo['subtitle'],
          category: serviceInfo['category'],
          icon: serviceInfo['icon'],
        ),
      ),
    );
  }

  void _navigateToSummerCampDetail(String campId) {
    Map<String, dynamic> campInfo = _getSummerCampInfo(campId);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => SummerCampDetailScreen(
          campId: campId,
          title: campInfo['title'],
          subtitle: campInfo['subtitle'],
          category: campInfo['category'],
          icon: campInfo['icon'],
        ),
      ),
    );
  }

  Map<String, dynamic> _getStudyAbroadInfo(String serviceId) {
    switch (serviceId) {
      case 'study_abroad_1':
        return {
          'title': '留学规划与定位',
          'subtitle': '根据学术背景和职业目标提供个性化留学计划',
          'category': '留学咨询',
          'icon': FeatherIcons.crosshair,
        };
      case 'study_abroad_2':
        return {
          'title': '院校选择与专业推荐',
          'subtitle': '推荐适合的学校和专业，提供详细信息',
          'category': '留学咨询',
          'icon': FeatherIcons.bookOpen,
        };
      case 'study_abroad_3':
        return {
          'title': '申请材料准备指导',
          'subtitle': '协助准备个人陈述、推荐信等申请材料',
          'category': '留学咨询',
          'icon': FeatherIcons.edit,
        };
      case 'study_abroad_4':
        return {
          'title': '语言培训与考试指导',
          'subtitle': '提供语言培训课程和考试指导',
          'category': '留学咨询',
          'icon': FeatherIcons.award,
        };
      default:
        return {
          'title': '未知服务',
          'subtitle': '服务信息不可用',
          'category': '留学咨询',
          'icon': FeatherIcons.helpCircle,
        };
    }
  }

  Map<String, dynamic> _getSummerCampInfo(String campId) {
    switch (campId) {
      case 'summer_camp_1':
        return {
          'title': '哈佛西湖辩论赛夏令营',
          'subtitle': '马萨诸塞州 · 14-18岁',
          'category': '夏令营',
          'icon': FeatherIcons.messageSquare,
        };
      case 'summer_camp_2':
        return {
          'title': '麻省理工STEAM沉浸式夏令营',
          'subtitle': '马萨诸塞州 · 15-18岁',
          'category': '夏令营',
          'icon': FeatherIcons.cpu,
        };
      case 'summer_camp_3':
        return {
          'title': 'Wonder Valley度假村夏令营',
          'subtitle': '加利福尼亚州 · 10-16岁',
          'category': '夏令营',
          'icon': FeatherIcons.mapPin,
        };
      case 'summer_camp_4':
        return {
          'title': 'Rocking Horse牧场夏令营',
          'subtitle': '纽约州 · 12-17岁',
          'category': '夏令营',
          'icon': FeatherIcons.heart,
        };
      default:
        return {
          'title': '未知夏令营',
          'subtitle': '夏令营信息不可用',
          'category': '夏令营',
          'icon': FeatherIcons.helpCircle,
        };
    }
  }

  Widget _buildCategoryCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required String category,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12.r),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(12.w),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Icon(
                icon,
                color: AppTheme.primaryColor,
                size: 24.sp,
              ),
            ),
            SizedBox(width: 16.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  SizedBox(height: 4.h),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              FeatherIcons.chevronRight,
              size: 20.sp,
              color: AppTheme.textTertiary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required String duration,
  }) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(12.w),
            decoration: BoxDecoration(
              color: AppTheme.primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: Icon(
              icon,
              color: AppTheme.primaryColor,
              size: 24.sp,
            ),
          ),
          SizedBox(width: 16.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: 8.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: Text(
                    duration,
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Icon(
            FeatherIcons.chevronRight,
            size: 20.sp,
            color: AppTheme.textTertiary,
          ),
        ],
      ),
    );
  }

  Widget _buildCampCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required String duration,
  }) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(12.w),
            decoration: BoxDecoration(
              color: Colors.orange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: Icon(
              icon,
              color: Colors.orange,
              size: 24.sp,
            ),
          ),
          SizedBox(width: 16.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: 8.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: Text(
                    duration,
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Icon(
            FeatherIcons.chevronRight,
            size: 20.sp,
            color: AppTheme.textTertiary,
          ),
        ],
      ),
    );
  }
}

