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
                tooltip: AppLocalizations.of(context)!.learning_my_appointments,
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
        text: AppLocalizations.of(context)!.learning_ai_programming,
        mobileText: AppLocalizations.of(context)!.learning_ai_programming,
        icon: FeatherIcons.cpu,
      ),
      ResponsiveTagData(
        key: 'english',
        text: AppLocalizations.of(context)!.learning_english,
        mobileText: AppLocalizations.of(context)!.learning_english,
        icon: FeatherIcons.mic,
      ),
      ResponsiveTagData(
        key: 'study_abroad',
        text: AppLocalizations.of(context)!.learning_study_abroad,
        mobileText: AppLocalizations.of(context)!.learning_study_abroad,
        icon: FeatherIcons.globe,
      ),
      ResponsiveTagData(
        key: 'summer_camp',
        text: AppLocalizations.of(context)!.learning_summer_camp,
        mobileText: AppLocalizations.of(context)!.learning_summer_camp,
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
          AppLocalizations.of(context)!.learning_title,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.learning_subtitle,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.learning_ai_programming,
          subtitle: AppLocalizations.of(context)!.learning_ai_programming_desc,
          icon: FeatherIcons.cpu,
          category: AppLocalizations.of(context)!.learning_ai_programming_category,
          onTap: () => setState(() => _selectedCategory = 'ai'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.learning_english,
          subtitle: AppLocalizations.of(context)!.learning_english_desc,
          icon: FeatherIcons.mic,
          category: AppLocalizations.of(context)!.learning_english_category,
          onTap: () => setState(() => _selectedCategory = 'english'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.learning_study_abroad,
          subtitle: AppLocalizations.of(context)!.learning_study_abroad_desc,
          icon: FeatherIcons.globe,
          category: AppLocalizations.of(context)!.learning_study_abroad_category,
          onTap: () => setState(() => _selectedCategory = 'study_abroad'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.learning_summer_camp,
          subtitle: AppLocalizations.of(context)!.learning_summer_camp_desc,
          icon: FeatherIcons.sun,
          category: AppLocalizations.of(context)!.learning_summer_camp_category,
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
          AppLocalizations.of(context)!.learning_ai_programming,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.learning_ai_programming_desc,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.courses_title,
          subtitle: AppLocalizations.of(context)!.learning_course_schedule_value,
          icon: FeatherIcons.cpu,
          category: AppLocalizations.of(context)!.learning_ai_programming,
          onTap: () => _navigateToCourseDetail('ai_course_1'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.travel_unknown_package,
          subtitle: AppLocalizations.of(context)!.learning_course_content_value,
          icon: FeatherIcons.cpu,
          category: AppLocalizations.of(context)!.learning_ai_programming,
          onTap: () => _navigateToCourseDetail('ai_course_2'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.learning_course_content,
          subtitle: AppLocalizations.of(context)!.learning_course_content_value,
          icon: FeatherIcons.layers,
          category: AppLocalizations.of(context)!.learning_ai_programming,
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
          AppLocalizations.of(context)!.learning_english,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.learning_english_desc,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.learning_oral_english,
          subtitle: AppLocalizations.of(context)!.learning_course_schedule_value,
          icon: FeatherIcons.mic,
          category: AppLocalizations.of(context)!.learning_english,
          onTap: () => _navigateToCourseDetail('english_course_1'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.travel_unknown_package,
          subtitle: AppLocalizations.of(context)!.learning_english_desc,
          icon: FeatherIcons.edit,
          category: AppLocalizations.of(context)!.learning_english,
          onTap: () => _navigateToCourseDetail('english_course_2'),
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: AppLocalizations.of(context)!.travel_unknown_package,
          subtitle: AppLocalizations.of(context)!.learning_english_desc,
          icon: FeatherIcons.award,
          category: AppLocalizations.of(context)!.learning_english,
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
          AppLocalizations.of(context)!.learning_study_abroad,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.learning_study_abroad_desc,
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
            title: AppLocalizations.of(context)!.learning_planning_positioning,
            subtitle: AppLocalizations.of(context)!.learning_study_abroad_desc,
            icon: FeatherIcons.crosshair,
            duration: AppLocalizations.of(context)!.learning_course_duration_value,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_2'),
          child: _buildServiceCard(
            context,
            title: AppLocalizations.of(context)!.learning_school_selection,
            subtitle: AppLocalizations.of(context)!.learning_study_abroad_desc,
            icon: FeatherIcons.bookOpen,
            duration: AppLocalizations.of(context)!.learning_course_duration_value,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_3'),
          child: _buildServiceCard(
            context,
            title: AppLocalizations.of(context)!.learning_application_guidance,
            subtitle: AppLocalizations.of(context)!.learning_study_abroad_desc,
            icon: FeatherIcons.edit,
            duration: AppLocalizations.of(context)!.learning_course_duration_value,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToStudyAbroadDetail('study_abroad_4'),
          child: _buildServiceCard(
            context,
            title: AppLocalizations.of(context)!.learning_language_training,
            subtitle: AppLocalizations.of(context)!.learning_study_abroad_desc,
            icon: FeatherIcons.award,
            duration: AppLocalizations.of(context)!.learning_course_duration_value,
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
          AppLocalizations.of(context)!.learning_summer_camp_title,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.learning_summer_camp_desc,
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
            title: AppLocalizations.of(context)!.learning_harvard_debate,
            subtitle: AppLocalizations.of(context)!.learning_harvard_debate_subtitle,
            icon: FeatherIcons.messageSquare,
            duration: AppLocalizations.of(context)!.learning_harvard_debate_duration,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_2'),
          child: _buildCampCard(
            context,
            title: AppLocalizations.of(context)!.learning_mit_steam,
            subtitle: AppLocalizations.of(context)!.learning_mit_steam_subtitle,
            icon: FeatherIcons.cpu,
            duration: AppLocalizations.of(context)!.learning_mit_steam_duration,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_3'),
          child: _buildCampCard(
            context,
            title: AppLocalizations.of(context)!.learning_wonder_valley,
            subtitle: AppLocalizations.of(context)!.learning_wonder_valley_subtitle,
            icon: FeatherIcons.mapPin,
            duration: AppLocalizations.of(context)!.learning_wonder_valley_duration,
          ),
        ),
        SizedBox(height: 12.h),
        GestureDetector(
          onTap: () => _navigateToSummerCampDetail('summer_camp_4'),
          child: _buildCampCard(
            context,
            title: AppLocalizations.of(context)!.learning_rocking_horse,
            subtitle: AppLocalizations.of(context)!.learning_rocking_horse_subtitle,
            icon: FeatherIcons.heart,
            duration: AppLocalizations.of(context)!.learning_rocking_horse_duration,
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
          'title': AppLocalizations.of(context)!.learning_ai_programming_live,
          'subtitle': AppLocalizations.of(context)!.learning_schedule_tue_thu,
          'category': AppLocalizations.of(context)!.learning_ai_programming_tag,
          'icon': FeatherIcons.cpu,
        };
      case 'ai_course_2':
        return {
          'title': AppLocalizations.of(context)!.learning_machine_learning,
          'subtitle': AppLocalizations.of(context)!.learning_machine_learning_subtitle,
          'category': AppLocalizations.of(context)!.learning_ai_programming_tag,
          'icon': FeatherIcons.cpu,
        };
      case 'ai_course_3':
        return {
          'title': AppLocalizations.of(context)!.learning_deep_learning,
          'subtitle': AppLocalizations.of(context)!.learning_deep_learning_subtitle,
          'category': AppLocalizations.of(context)!.learning_ai_programming_tag,
          'icon': FeatherIcons.layers,
        };
      case 'english_course_1':
        return {
          'title': AppLocalizations.of(context)!.learning_english_speaking,
          'subtitle': AppLocalizations.of(context)!.learning_english_speaking_subtitle,
          'category': AppLocalizations.of(context)!.learning_english_category,
          'icon': FeatherIcons.mic,
        };
      case 'english_course_2':
        return {
          'title': AppLocalizations.of(context)!.learning_business_english,
          'subtitle': AppLocalizations.of(context)!.learning_business_english_subtitle,
          'category': AppLocalizations.of(context)!.learning_english_category,
          'icon': FeatherIcons.edit,
        };
      case 'english_course_3':
        return {
          'title': AppLocalizations.of(context)!.learning_ielts_toefl,
          'subtitle': AppLocalizations.of(context)!.learning_ielts_toefl_subtitle,
          'category': AppLocalizations.of(context)!.learning_english_category,
          'icon': FeatherIcons.award,
        };
      default:
        return {
          'title': AppLocalizations.of(context)!.learning_unknown_course,
          'subtitle': AppLocalizations.of(context)!.learning_unknown_course_subtitle,
          'category': AppLocalizations.of(context)!.learning_other_category,
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
          'title': AppLocalizations.of(context)!.learning_planning_positioning,
          'subtitle': AppLocalizations.of(context)!.learning_study_abroad_desc,
          'category': AppLocalizations.of(context)!.learning_study_abroad_category,
          'icon': FeatherIcons.crosshair,
        };
      case 'study_abroad_2':
        return {
          'title': AppLocalizations.of(context)!.learning_school_selection,
          'subtitle': AppLocalizations.of(context)!.learning_study_abroad_desc,
          'category': AppLocalizations.of(context)!.learning_study_abroad_category,
          'icon': FeatherIcons.bookOpen,
        };
      case 'study_abroad_3':
        return {
          'title': AppLocalizations.of(context)!.learning_application_guidance,
          'subtitle': AppLocalizations.of(context)!.learning_study_abroad_desc,
          'category': AppLocalizations.of(context)!.learning_study_abroad_category,
          'icon': FeatherIcons.edit,
        };
      case 'study_abroad_4':
        return {
          'title': AppLocalizations.of(context)!.learning_language_training,
          'subtitle': AppLocalizations.of(context)!.learning_study_abroad_desc,
          'category': AppLocalizations.of(context)!.learning_study_abroad_category,
          'icon': FeatherIcons.award,
        };
      default:
        return {
          'title': AppLocalizations.of(context)!.learning_unknown_service,
          'subtitle': AppLocalizations.of(context)!.learning_unknown_service_subtitle,
          'category': AppLocalizations.of(context)!.learning_study_abroad_category,
          'icon': FeatherIcons.helpCircle,
        };
    }
  }

  Map<String, dynamic> _getSummerCampInfo(String campId) {
    switch (campId) {
      case 'summer_camp_1':
        return {
          'title': AppLocalizations.of(context)!.learning_harvard_debate,
          'subtitle': AppLocalizations.of(context)!.learning_harvard_debate_subtitle,
          'category': AppLocalizations.of(context)!.learning_summer_camp_category,
          'icon': FeatherIcons.messageSquare,
        };
      case 'summer_camp_2':
        return {
          'title': AppLocalizations.of(context)!.learning_mit_steam,
          'subtitle': AppLocalizations.of(context)!.learning_mit_steam_subtitle,
          'category': AppLocalizations.of(context)!.learning_summer_camp_category,
          'icon': FeatherIcons.cpu,
        };
      case 'summer_camp_3':
        return {
          'title': AppLocalizations.of(context)!.learning_wonder_valley,
          'subtitle': AppLocalizations.of(context)!.learning_wonder_valley_subtitle,
          'category': AppLocalizations.of(context)!.learning_summer_camp_category,
          'icon': FeatherIcons.mapPin,
        };
      case 'summer_camp_4':
        return {
          'title': AppLocalizations.of(context)!.learning_rocking_horse,
          'subtitle': AppLocalizations.of(context)!.learning_rocking_horse_subtitle,
          'category': AppLocalizations.of(context)!.learning_summer_camp_category,
          'icon': FeatherIcons.heart,
        };
      default:
        return {
          'title': AppLocalizations.of(context)!.learning_unknown_camp,
          'subtitle': AppLocalizations.of(context)!.learning_unknown_camp_subtitle,
          'category': AppLocalizations.of(context)!.learning_summer_camp_category,
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

