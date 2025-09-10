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
            title: Text('旅游攻略'),
            backgroundColor: Colors.white,
            foregroundColor: AppTheme.textPrimary,
            elevation: 0,
            pinned: true,
            actions: [
              IconButton(
                icon: Icon(FeatherIcons.calendar),
                onPressed: () => _navigateToMyTravels(),
                tooltip: '我的旅游预约',
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
        text: '国内旅游',
        mobileText: '国内游',
        icon: FeatherIcons.mapPin,
      ),
      ResponsiveTagData(
        key: 'international',
        text: '国外旅游',
        mobileText: '国外游',
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
          '旅游攻略 - 探索世界之美',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '选择你感兴趣的旅游类型，开始你的探索之旅',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildCategoryCard(
          context,
          title: '国内旅游',
          subtitle: '探索中华大地的美丽风景和深厚文化',
          icon: FeatherIcons.mapPin,
          category: '国内旅游',
          onTap: () => setState(() => _selectedCategory = 'domestic'),
        ),
        SizedBox(height: 12.h),
        _buildCategoryCard(
          context,
          title: '国外旅游',
          subtitle: '体验异国风情，感受不同文化的魅力',
          icon: FeatherIcons.globe,
          category: '国外旅游',
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
          '国内旅游',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '探索中华大地的美丽风景和深厚文化',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildPackageCard(
          context,
          title: '西湖一日游攻略',
          subtitle: '早上断桥、下午灵隐、傍晚苏堤看日落',
          icon: FeatherIcons.map,
          category: '文化体验',
          onTap: () => _navigateToPackageDetail('1'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: '成都·火锅+大熊猫',
          subtitle: '必吃推荐与最佳参观时段',
          icon: FeatherIcons.heart,
          category: '美食文化',
          onTap: () => _navigateToPackageDetail('2'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: '三亚海边拍照点合集',
          subtitle: '椰林沙滩、礁石海湾、最佳光线时间',
          icon: FeatherIcons.camera,
          category: '自然风光',
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
          '国外旅游',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        SizedBox(height: 8.h),
        Text(
          '体验异国风情，感受不同文化的魅力',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppTheme.textSecondary,
          ),
        ),
        SizedBox(height: 24.h),
        _buildPackageCard(
          context,
          title: '日本樱花季深度游',
          subtitle: '东京、京都、大阪7日赏樱之旅',
          icon: FeatherIcons.heart,
          category: '自然风光',
          onTap: () => _navigateToPackageDetail('4'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: '欧洲文化探索之旅',
          subtitle: '巴黎、罗马、巴塞罗那艺术文化深度体验',
          icon: FeatherIcons.bookOpen,
          category: '文化体验',
          onTap: () => _navigateToPackageDetail('5'),
        ),
        SizedBox(height: 12.h),
        _buildPackageCard(
          context,
          title: '东南亚海岛度假',
          subtitle: '普吉岛、巴厘岛、马尔代夫海岛休闲游',
          icon: FeatherIcons.sun,
          category: '休闲度假',
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
          'title': '西湖一日游攻略',
          'subtitle': '早上断桥、下午灵隐、傍晚苏堤看日落',
          'category': '文化体验',
          'icon': FeatherIcons.map,
        };
      case '2':
        return {
          'title': '成都·火锅+大熊猫',
          'subtitle': '必吃推荐与最佳参观时段',
          'category': '美食文化',
          'icon': FeatherIcons.heart,
        };
      case '3':
        return {
          'title': '三亚海边拍照点合集',
          'subtitle': '椰林沙滩、礁石海湾、最佳光线时间',
          'category': '自然风光',
          'icon': FeatherIcons.camera,
        };
      case '4':
        return {
          'title': '日本樱花季深度游',
          'subtitle': '东京、京都、大阪7日赏樱之旅',
          'category': '自然风光',
          'icon': FeatherIcons.heart,
        };
      case '5':
        return {
          'title': '欧洲文化探索之旅',
          'subtitle': '巴黎、罗马、巴塞罗那艺术文化深度体验',
          'category': '文化体验',
          'icon': FeatherIcons.bookOpen,
        };
      case '6':
        return {
          'title': '东南亚海岛度假',
          'subtitle': '普吉岛、巴厘岛、马尔代夫海岛休闲游',
          'category': '休闲度假',
          'icon': FeatherIcons.sun,
        };
      default:
        return {
          'title': '未知套餐',
          'subtitle': '套餐信息不可用',
          'category': '其他',
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

