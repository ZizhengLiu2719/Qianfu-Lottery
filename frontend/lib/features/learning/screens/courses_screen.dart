import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/responsive_tag.dart';

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
        key: null,
        text: '全部课程',
        mobileText: '全部',
        icon: FeatherIcons.bookOpen,
      ),
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
    } else {
      return _buildAllCourses(context);
    }
  }

  Widget _buildAllCourses(BuildContext context) {
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
        _buildCourseCard(
          context,
          title: 'AI 编程入门（直播课）',
          subtitle: '每周二/四 晚 20:00 · 60 分钟',
          icon: FeatherIcons.cpu,
          category: 'AI编程',
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '英语口语提升（录播+答疑）',
          subtitle: '随时观看 · 每周一次答疑',
          icon: FeatherIcons.mic,
          category: '英语学习',
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
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '机器学习实战',
          subtitle: '从零开始构建AI模型',
          icon: FeatherIcons.brain,
          category: 'AI编程',
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '深度学习进阶',
          subtitle: '神经网络与深度学习应用',
          icon: FeatherIcons.layers,
          category: 'AI编程',
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
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '商务英语写作',
          subtitle: '专业商务邮件与报告写作',
          icon: FeatherIcons.edit,
          category: '英语学习',
        ),
        SizedBox(height: 12.h),
        _buildCourseCard(
          context,
          title: '雅思托福备考',
          subtitle: '系统化备考，高分通过',
          icon: FeatherIcons.award,
          category: '英语学习',
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
                    category,
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

