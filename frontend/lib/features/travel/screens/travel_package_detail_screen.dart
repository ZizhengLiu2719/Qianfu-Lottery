import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
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
    // 页面加载时从后端获取用户注册数据（仅在状态为空时）
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final currentTravels = ref.read(travelsProvider);
      if (currentTravels.isEmpty) {
        ref.read(travelsProvider.notifier).loadUserTravels();
      }
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
        title: Text(AppLocalizations.of(context)!.travel_package_details),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: Icon(FeatherIcons.arrowLeft),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(isDesktop ? 5.w : 16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 套餐卡片
            _buildPackageCard(context, isDesktop),
            SizedBox(height: isDesktop ? 8.h : 24.h),
            
            // 套餐详情
            _buildPackageDetails(context, isDesktop),
            SizedBox(height: isDesktop ? 8.h : 24.h),
            
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
          AppLocalizations.of(context)!.travel_package_details,
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
          title: AppLocalizations.of(context)!.travel_itinerary_days,
          content: _getDuration(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.mapPin,
          title: AppLocalizations.of(context)!.travel_destination,
          content: _getLocation(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.users,
          title: AppLocalizations.of(context)!.travel_target_audience,
          content: _getTargetAudience(),
          isDesktop: isDesktop,
        ),
        SizedBox(height: 12.h),
        _buildDetailItem(
          context,
          icon: FeatherIcons.star,
          title: AppLocalizations.of(context)!.travel_features,
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
            isTravelRegistered ? AppLocalizations.of(context)!.travel_registered : AppLocalizations.of(context)!.travel_register_now,
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
                    onTap: isTravelRegistered ? null : _handleRegistration,
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
                                isTravelRegistered ? AppLocalizations.of(context)!.travel_registered : AppLocalizations.of(context)!.travel_register_now,
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
                            AppLocalizations.of(context)!.travel_cancel_registration,
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
    
    // 检查是否已经注册
    final travels = ref.read(travelsProvider);
    final isAlreadyRegistered = travels.any((item) => item.id == widget.packageId);
    if (isAlreadyRegistered) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(AppLocalizations.of(context)!.travel_already_registered),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }
    
    setState(() {
      _isRegistering = true;
    });

    try {
      // 调用后端 API 注册旅游套餐
      final dioClient = DioClient();
      final travelPackagesRepository = TravelPackagesRepository(dioClient);
      
      final response = await travelPackagesRepository.registerTravelPackage(
        packageId: widget.packageId,
        title: widget.title,
        subtitle: widget.subtitle,
        category: widget.category,
      );

      // 注册成功后添加到前端状态（不重复调用API）
      final travel = TravelItem(
        id: widget.packageId,
        registrationId: response['data']?['id']?.toString() ?? '',  // 使用后端返回的注册记录ID
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
          content: Text(AppLocalizations.of(context)!.travel_registration_success),
          backgroundColor: Colors.green,
          action: SnackBarAction(
            label: AppLocalizations.of(context)!.travel_view_my_travel,
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
          content: Text(AppLocalizations.of(context)!.common_failed),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isRegistering = false;
      });
    }
  }

  void _handleCancelRegistration() async {
    // 先重新加载用户旅游数据，确保有正确的 registrationId
    await ref.read(travelsProvider.notifier).loadUserTravels();
    
    // 然后删除
    ref.read(travelsProvider.notifier).removeTravel(widget.packageId);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(AppLocalizations.of(context)!.travel_registration_cancelled),
        backgroundColor: Colors.orange,
      ),
    );
  }

  String _getDuration() {
    switch (widget.packageId) {
      case 'domestic_1':
        return AppLocalizations.of(context)!.travel_duration;
      case 'domestic_2':
        return AppLocalizations.of(context)!.travel_duration;
      case 'domestic_3':
        return AppLocalizations.of(context)!.travel_duration;
      case 'international_1':
        return AppLocalizations.of(context)!.travel_duration;
      case 'international_2':
        return AppLocalizations.of(context)!.travel_duration;
      case 'international_3':
        return AppLocalizations.of(context)!.travel_duration;
      default:
        return AppLocalizations.of(context)!.common_empty;
    }
  }

  String _getLocation() {
    switch (widget.packageId) {
      case 'domestic_1':
        return 'Hangzhou';
      case 'domestic_2':
        return 'Chengdu';
      case 'domestic_3':
        return 'Sanya';
      case 'international_1':
        return 'Japan (Tokyo, Kyoto, Osaka)';
      case 'international_2':
        return 'Europe (Paris, Rome, Barcelona)';
      case 'international_3':
        return 'Southeast Asia (Phuket, Bali, Maldives)';
      default:
        return AppLocalizations.of(context)!.common_empty;
    }
  }

  String _getTargetAudience() {
    switch (widget.packageId) {
      case 'domestic_1':
        return AppLocalizations.of(context)!.travel_cultural_experience;
      case 'domestic_2':
        return AppLocalizations.of(context)!.travel_food_culture;
      case 'domestic_3':
        return AppLocalizations.of(context)!.travel_natural_scenery;
      case 'international_1':
        return AppLocalizations.of(context)!.travel_japan_desc;
      case 'international_2':
        return AppLocalizations.of(context)!.travel_europe_desc;
      case 'international_3':
        return AppLocalizations.of(context)!.travel_leisure;
      default:
        return AppLocalizations.of(context)!.travel_other;
    }
  }

  String _getFeatures() {
    switch (widget.packageId) {
      case 'domestic_1':
        return AppLocalizations.of(context)!.travel_west_lake_desc;
      case 'domestic_2':
        return AppLocalizations.of(context)!.travel_chengdu_desc;
      case 'domestic_3':
        return AppLocalizations.of(context)!.travel_sanya_desc;
      case 'international_1':
        return AppLocalizations.of(context)!.travel_japan_desc;
      case 'international_2':
        return AppLocalizations.of(context)!.travel_europe_desc;
      case 'international_3':
        return AppLocalizations.of(context)!.travel_southeast_asia_desc;
      default:
        return AppLocalizations.of(context)!.travel_notes;
    }
  }

  // 价格信息已移除
}
