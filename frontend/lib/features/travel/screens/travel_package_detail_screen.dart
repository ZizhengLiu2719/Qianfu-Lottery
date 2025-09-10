import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/travels_provider.dart';
import '../../../api/travel_packages_repository.dart';
import '../../../api/dio_client.dart';

class TravelPackageDetailScreen extends ConsumerStatefulWidget {
  final String packageId;
  final String title;
  final String subtitle;
  final String category;
  final IconData icon;

  const TravelPackageDetailScreen({
    super.key,
    required this.packageId,
    required this.title,
    required this.subtitle,
    required this.category,
    required this.icon,
  });

  @override
  ConsumerState<TravelPackageDetailScreen> createState() => _TravelPackageDetailScreenState();
}

class _TravelPackageDetailScreenState extends ConsumerState<TravelPackageDetailScreen> {
  bool _isRegistered = false;
  bool _isHovering = false;
  bool _isRegistering = false;

  @override
  void initState() {
    super.initState();
    // 页面加载时从后端获取用户注册数据
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(travelsProvider.notifier).loadUserTravels();
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final travels = ref.watch(travelsProvider);
    print('Checking registration status for packageId: ${widget.packageId}');
    print('Available travels: ${travels.map((t) => '${t.id}: ${t.title}').join(', ')}');
    final isTravelRegistered = travels.any((item) => item.id == widget.packageId);
    print('Is travel registered: $isTravelRegistered');
    
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('旅游套餐详情'),
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
            // 套餐卡片
            _buildPackageCard(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 套餐详情
            _buildPackageDetails(context, isDesktop),
            SizedBox(height: 24.h),
            
            // 注册按钮区域
            _buildRegistrationSection(context, isDesktop, isTravelRegistered),
          ],
        ),
      ),
    );
  }

  Widget _buildPackageCard(BuildContext context, bool isDesktop) {
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

  Widget _buildPackageDetails(BuildContext context, bool isDesktop) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '套餐详情',
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
          title: '行程天数',
          content: _getDuration(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.mapPin,
          title: '目的地',
          content: _getLocation(),
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
          icon: FeatherIcons.star,
          title: '套餐特色',
          content: _getFeatures(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        // 价格信息已移除
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

  Widget _buildRegistrationSection(BuildContext context, bool isDesktop, bool isTravelRegistered) {
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
            isTravelRegistered ? '已注册此旅游套餐' : '立即注册旅游套餐',
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
                        color: isTravelRegistered 
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
                            isTravelRegistered ? FeatherIcons.check : FeatherIcons.mapPin,
                            color: Colors.white,
                            size: isDesktop ? 16.sp : 18.sp,
                          ),
                          SizedBox(width: 8.w),
                          _isRegistering 
                            ? SizedBox(
                                width: 20.w,
                                height: 20.h,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                ),
                              )
                            : Text(
                                isTravelRegistered ? '已注册' : '注册套餐',
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
              if (isTravelRegistered) ...[
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

  void _handleRegistration() async {
    // 防止重复点击
    if (_isRegistering) return;
    
    setState(() {
      _isRegistering = true;
    });

    try {
      // 调用后端 API 注册旅游套餐
      final dioClient = DioClient();
      final travelPackagesRepository = TravelPackagesRepository(dioClient);
      
      await travelPackagesRepository.registerTravelPackage(
        packageId: widget.packageId,
        title: widget.title,
        subtitle: widget.subtitle,
        category: widget.category,
      );

      // 注册成功后添加到前端状态（不重复调用API）
      final travel = TravelItem(
        id: widget.packageId,
        registrationId: '',
        title: widget.title,
        subtitle: widget.subtitle,
        category: widget.category,
        icon: widget.icon,
        type: 'travel',
        registeredAt: DateTime.now(),
      );

      // 直接添加到状态，不调用addTravel（避免重复API调用）
      ref.read(travelsProvider.notifier).state = [...ref.read(travelsProvider), travel];

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('注册成功！'),
          backgroundColor: Colors.green,
          action: SnackBarAction(
            label: '查看我的旅游',
            textColor: Colors.white,
            onPressed: () {
              // TODO: 导航到我的旅游页面
            },
          ),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('注册失败：${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isRegistering = false;
      });
    }
  }

  void _handleCancelRegistration() {
    ref.read(travelsProvider.notifier).removeTravel(widget.packageId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('已取消注册'),
        backgroundColor: Colors.orange,
      ),
    );
  }

  String _getDuration() {
    switch (widget.packageId) {
      case 'domestic_1':
        return '1日游';
      case 'domestic_2':
        return '2日游';
      case 'domestic_3':
        return '3日游';
      case 'international_1':
        return '7日游';
      case 'international_2':
        return '10日游';
      case 'international_3':
        return '5日游';
      default:
        return '待定';
    }
  }

  String _getLocation() {
    switch (widget.packageId) {
      case 'domestic_1':
        return '杭州';
      case 'domestic_2':
        return '成都';
      case 'domestic_3':
        return '三亚';
      case 'international_1':
        return '日本（东京、京都、大阪）';
      case 'international_2':
        return '欧洲（巴黎、罗马、巴塞罗那）';
      case 'international_3':
        return '东南亚（普吉岛、巴厘岛、马尔代夫）';
      default:
        return '待定';
    }
  }

  String _getTargetAudience() {
    switch (widget.packageId) {
      case 'domestic_1':
        return '文化爱好者，喜欢历史古迹的游客';
      case 'domestic_2':
        return '美食爱好者，喜欢大熊猫的游客';
      case 'domestic_3':
        return '摄影爱好者，喜欢海景的游客';
      case 'international_1':
        return '樱花爱好者，喜欢日本文化的游客';
      case 'international_2':
        return '艺术爱好者，喜欢欧洲文化的游客';
      case 'international_3':
        return '度假爱好者，喜欢海岛风光的游客';
      default:
        return '所有游客';
    }
  }

  String _getFeatures() {
    switch (widget.packageId) {
      case 'domestic_1':
        return '经典西湖十景，专业导游讲解，特色美食体验';
      case 'domestic_2':
        return '正宗川菜品尝，大熊猫基地参观，成都文化体验';
      case 'domestic_3':
        return '专业摄影指导，最佳拍摄时间安排，海景酒店住宿';
      case 'international_1':
        return '樱花季限定，日式温泉体验，和服文化体验';
      case 'international_2':
        return '艺术博物馆参观，米其林餐厅体验，欧洲古建筑游览';
      case 'international_3':
        return '海岛度假村住宿，水上活动体验，热带风情体验';
      default:
        return '特色体验';
    }
  }

  // 价格信息已移除
}
