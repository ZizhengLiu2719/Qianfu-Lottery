import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/travels_provider.dart';

class MyTravelsScreen extends ConsumerStatefulWidget {
  const MyTravelsScreen({super.key});

  @override
  ConsumerState<MyTravelsScreen> createState() => _MyTravelsScreenState();
}

class _MyTravelsScreenState extends ConsumerState<MyTravelsScreen> {
  @override
  void initState() {
    super.initState();
    // 加载用户的旅游预约
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(travelsProvider.notifier).loadUserTravels();
    });
  }

  @override
  Widget build(BuildContext context) {
    final travels = ref.watch(travelsProvider);
    final travelStats = ref.watch(travelStatsProvider);
    final isDesktop = MediaQuery.of(context).size.width > 768;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('我的旅游预约'),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: Icon(FeatherIcons.arrowLeft),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          if (travels.isNotEmpty)
            IconButton(
              icon: Icon(FeatherIcons.trash2),
              onPressed: _showClearAllDialog,
              tooltip: '清空所有预约',
            ),
        ],
      ),
      body: travels.isEmpty
          ? _buildEmptyState(context)
          : Column(
              children: [
                // 统计信息
                _buildStatsSection(context, travelStats, isDesktop),
                SizedBox(height: 16.h),
                // 预约列表
                Expanded(
                  child: ListView.builder(
                    padding: EdgeInsets.symmetric(horizontal: 16.w),
                    itemCount: travels.length,
                    itemBuilder: (context, index) {
                      final travel = travels[index];
                      return _buildTravelCard(context, travel, isDesktop);
                    },
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            FeatherIcons.map,
            size: 64.sp,
            color: Colors.grey.shade400,
          ),
          SizedBox(height: 16.h),
          Text(
            '暂无旅游预约',
            style: TextStyle(
              fontSize: 18.sp,
              fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '去发现更多精彩的旅游套餐吧！',
            style: TextStyle(
              fontSize: 14.sp,
              color: AppTheme.textTertiary,
            ),
          ),
          SizedBox(height: 24.h),
          ElevatedButton.icon(
            onPressed: () => Navigator.of(context).pop(),
            icon: Icon(FeatherIcons.search),
            label: Text('浏览旅游套餐'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryColor,
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 12.h),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsSection(BuildContext context, Map<String, int> stats, bool isDesktop) {
    return Container(
      margin: EdgeInsets.all(16.w),
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
      child: Column(
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
              Expanded(
                child: _buildStatItem(
                  context,
                  icon: FeatherIcons.mapPin,
                  label: '国内旅游',
                  count: stats['domestic'] ?? 0,
                  color: Colors.blue,
                  isDesktop: isDesktop,
                ),
              ),
              SizedBox(width: 16.w),
              Expanded(
                child: _buildStatItem(
                  context,
                  icon: FeatherIcons.globe,
                  label: '国外旅游',
                  count: stats['international'] ?? 0,
                  color: Colors.green,
                  isDesktop: isDesktop,
                ),
              ),
              SizedBox(width: 16.w),
              Expanded(
                child: _buildStatItem(
                  context,
                  icon: FeatherIcons.calendar,
                  label: '总计',
                  count: stats['total'] ?? 0,
                  color: AppTheme.primaryColor,
                  isDesktop: isDesktop,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required int count,
    required Color color,
    required bool isDesktop,
  }) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.all(isDesktop ? 8.w : 12.w),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8.r),
          ),
          child: Icon(
            icon,
            color: color,
            size: isDesktop ? 20.sp : 24.sp,
          ),
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
    );
  }

  Widget _buildTravelCard(BuildContext context, TravelItem travel, bool isDesktop) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
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
              travel.icon,
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
                  travel.title,
                  style: TextStyle(
                    fontSize: isDesktop ? 14.sp : 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                SizedBox(height: isDesktop ? 3.h : 4.h),
                Text(
                  travel.subtitle,
                  style: TextStyle(
                    fontSize: isDesktop ? 12.sp : 14.sp,
                    color: AppTheme.textSecondary,
                  ),
                ),
                SizedBox(height: isDesktop ? 6.h : 8.h),
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: isDesktop ? 6.w : 8.w,
                        vertical: isDesktop ? 3.h : 4.h,
                      ),
                      decoration: BoxDecoration(
                        color: AppTheme.primaryColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
                      ),
                      child: Text(
                        travel.category,
                        style: TextStyle(
                          fontSize: isDesktop ? 10.sp : 12.sp,
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    SizedBox(width: 8.w),
                    Text(
                      '注册于 ${_formatDate(travel.registeredAt)}',
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
              FeatherIcons.x,
              size: isDesktop ? 16.sp : 18.sp,
              color: Colors.red,
            ),
            onPressed: () => _showCancelDialog(travel),
            tooltip: '取消预约',
          ),
        ],
      ),
    );
  }

  void _showCancelDialog(TravelItem travel) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('取消预约'),
        content: Text('确定要取消 "${travel.title}" 的预约吗？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('取消'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              ref.read(travelsProvider.notifier).removeTravel(travel.id);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('已取消预约'),
                  backgroundColor: Colors.orange,
                ),
              );
            },
            child: Text('确定', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showClearAllDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('清空所有预约'),
        content: Text('确定要清空所有旅游预约吗？此操作不可撤销。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('取消'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              ref.read(travelsProvider.notifier).clearAllTravels();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('已清空所有预约'),
                  backgroundColor: Colors.red,
                ),
              );
            },
            child: Text('确定', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }
}
