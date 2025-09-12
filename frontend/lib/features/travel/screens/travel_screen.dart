import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/responsive_tag.dart';
import '../providers/travels_provider.dart';
import 'travel_package_detail_screen.dart';
import 'my_travels_screen.dart';

class TravelScreen extends ConsumerStatefulWidget {
  const TravelScreen({super.key});

  @override
  ConsumerState<TravelScreen> createState() => _TravelScreenState();
}

class _TravelScreenState extends ConsumerState<TravelScreen> {
  String? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 顶部标题栏
          SliverAppBar(
            title: Text(AppLocalizations.of(context)!.travel_packages),
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textPrimary,
            elevation: 0,
            pinned: true,
            actions: [
              IconButton(
                icon: Icon(FeatherIcons.calendar),
                onPressed: () => _navigateToMyTravels(),
                tooltip: AppLocalizations.of(context)!.travel_my_appointments,
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
        key: 'domestic',
        text: AppLocalizations.of(context)!.travel_domestic,
        mobileText: AppLocalizations.of(context)!.travel_domestic,
        icon: FeatherIcons.mapPin,
      ),
      ResponsiveTagData(
        key: 'international',
        text: AppLocalizations.of(context)!.travel_international,
        mobileText: AppLocalizations.of(context)!.travel_international,
        icon: FeatherIcons.globe,
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
    if (_selectedCategory == 'domestic') {
      return _buildDomesticPackages(context);
    } else if (_selectedCategory == 'international') {
      return _buildInternationalPackages(context);
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
          AppLocalizations.of(context)!.travel_packages,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.travel_subtitle,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.travel_domestic,
          subtitle: AppLocalizations.of(context)!.travel_domestic_desc,
          icon: FeatherIcons.mapPin,
          category: AppLocalizations.of(context)!.travel_domestic,
          onTap: () => setState(() => _selectedCategory = 'domestic'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: AppLocalizations.of(context)!.travel_international,
          subtitle: AppLocalizations.of(context)!.travel_international_desc,
          icon: FeatherIcons.globe,
          category: AppLocalizations.of(context)!.travel_international,
          onTap: () => setState(() => _selectedCategory = 'international'),
        ),
      ],
    );
  }

  Widget _buildDomesticPackages(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          AppLocalizations.of(context)!.travel_domestic,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.travel_domestic_desc,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_west_lake,
          subtitle: AppLocalizations.of(context)!.travel_west_lake_desc,
          icon: FeatherIcons.map,
          category: AppLocalizations.of(context)!.travel_cultural_experience,
          onTap: () => _navigateToPackageDetail('1'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_chengdu,
          subtitle: AppLocalizations.of(context)!.travel_chengdu_desc,
          icon: FeatherIcons.heart,
          category: AppLocalizations.of(context)!.travel_food_culture,
          onTap: () => _navigateToPackageDetail('2'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_sanya,
          subtitle: AppLocalizations.of(context)!.travel_sanya_desc,
          icon: FeatherIcons.camera,
          category: AppLocalizations.of(context)!.travel_natural_scenery,
          onTap: () => _navigateToPackageDetail('3'),
        ),
      ],
    );
  }

  Widget _buildInternationalPackages(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16.h),
        Text(
          AppLocalizations.of(context)!.travel_international,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          AppLocalizations.of(context)!.travel_international_desc,
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_japan,
          subtitle: AppLocalizations.of(context)!.travel_japan_desc,
          icon: FeatherIcons.heart,
          category: AppLocalizations.of(context)!.travel_natural_scenery,
          onTap: () => _navigateToPackageDetail('4'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_europe,
          subtitle: AppLocalizations.of(context)!.travel_europe_desc,
          icon: FeatherIcons.bookOpen,
          category: AppLocalizations.of(context)!.travel_cultural_experience,
          onTap: () => _navigateToPackageDetail('5'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: AppLocalizations.of(context)!.travel_southeast_asia,
          subtitle: AppLocalizations.of(context)!.travel_southeast_asia_desc,
          icon: FeatherIcons.sun,
          category: AppLocalizations.of(context)!.travel_leisure,
          onTap: () => _navigateToPackageDetail('6'),
        ),
      ],
    );
  }

  Widget _buildCategoryCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required String category,
    required VoidCallback onTap,
  }) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(isDesktop ? 5.w : 16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(isDesktop ? 4.r : 12.r),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: isDesktop ? 3 : 8,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(isDesktop ? 4.w : 12.w),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(isDesktop ? 3.r : 8.r),
              ),
              child: Icon(
                icon,
                color: AppTheme.primaryColor,
                size: isDesktop ? 8.sp : 24.sp,
              ),
            ),
            SizedBox(width: isDesktop ? 5.w : 16.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: isDesktop ? 5.sp : 16.sp,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  SizedBox(height: isDesktop ? 1.h : 4.h),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: isDesktop ? 4.sp : 14.sp,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              FeatherIcons.chevronRight,
              size: isDesktop ? 7.sp : 20.sp,
              color: AppTheme.textTertiary,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPackageCard(
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
        padding: EdgeInsets.all(isDesktop ? 4.w : 16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(isDesktop ? 3.r : 12.r),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: isDesktop ? 2 : 8,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(isDesktop ? 3.w : 12.w),
              decoration: BoxDecoration(
                color: AppTheme.primaryColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(isDesktop ? 2.r : 8.r),
              ),
              child: Icon(
                icon,
                color: AppTheme.primaryColor,
                size: isDesktop ? 6.sp : 24.sp,
              ),
            ),
            SizedBox(width: isDesktop ? 4.w : 16.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: isDesktop ? 5.sp : 16.sp,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  SizedBox(height: isDesktop ? 1.h : 4.h),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: isDesktop ? 4.sp : 14.sp,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                  SizedBox(height: isDesktop ? 3.h : 8.h),
                  Container(
                    padding: EdgeInsets.symmetric(
                      horizontal: isDesktop ? 3.w : 8.w, 
                      vertical: isDesktop ? 1.h : 4.h
                    ),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(isDesktop ? 3.r : 12.r),
                    ),
                    child: Text(
                      category,
                      style: TextStyle(
                        fontSize: isDesktop ? 3.sp : 12.sp,
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
              size: isDesktop ? 5.sp : 20.sp,
              color: AppTheme.textTertiary,
            ),
          ],
        ),
      ),
    );
  }

  void _navigateToPackageDetail(String packageId) {
    // 根据packageId获取套餐信息
    Map<String, dynamic> packageInfo = _getPackageInfo(packageId);
    
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => TravelPackageDetailScreen(
          packageId: packageId,
          title: packageInfo['title'],
          subtitle: packageInfo['subtitle'],
          category: packageInfo['category'],
          icon: packageInfo['icon'],
        ),
      ),
    );
  }

  Map<String, dynamic> _getPackageInfo(String packageId) {
    switch (packageId) {
      case '1':
        return {
          'title': AppLocalizations.of(context)!.travel_west_lake,
          'subtitle': AppLocalizations.of(context)!.travel_west_lake_desc,
          'category': AppLocalizations.of(context)!.travel_cultural_experience,
          'icon': FeatherIcons.map,
        };
      case '2':
        return {
          'title': AppLocalizations.of(context)!.travel_chengdu,
          'subtitle': AppLocalizations.of(context)!.travel_chengdu_desc,
          'category': AppLocalizations.of(context)!.travel_food_culture,
          'icon': FeatherIcons.heart,
        };
      case '3':
        return {
          'title': AppLocalizations.of(context)!.travel_sanya,
          'subtitle': AppLocalizations.of(context)!.travel_sanya_desc,
          'category': AppLocalizations.of(context)!.travel_natural_scenery,
          'icon': FeatherIcons.camera,
        };
      case '4':
        return {
          'title': AppLocalizations.of(context)!.travel_japan,
          'subtitle': AppLocalizations.of(context)!.travel_japan_desc,
          'category': AppLocalizations.of(context)!.travel_natural_scenery,
          'icon': FeatherIcons.heart,
        };
      case '5':
        return {
          'title': AppLocalizations.of(context)!.travel_europe,
          'subtitle': AppLocalizations.of(context)!.travel_europe_desc,
          'category': AppLocalizations.of(context)!.travel_cultural_experience,
          'icon': FeatherIcons.bookOpen,
        };
      case '6':
        return {
          'title': AppLocalizations.of(context)!.travel_southeast_asia,
          'subtitle': AppLocalizations.of(context)!.travel_southeast_asia_desc,
          'category': AppLocalizations.of(context)!.travel_leisure,
          'icon': FeatherIcons.sun,
        };
      default:
        return {
          'title': AppLocalizations.of(context)!.travel_unknown_package,
          'subtitle': AppLocalizations.of(context)!.travel_package_unavailable,
          'category': AppLocalizations.of(context)!.travel_other,
          'icon': FeatherIcons.helpCircle,
        };
    }
  }

  void _navigateToMyTravels() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => const MyTravelsScreen(),
      ),
    );
  }
}

