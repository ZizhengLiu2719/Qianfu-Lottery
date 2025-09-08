import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';

import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';
import '../../../core/widgets/qc_coin.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          // 用户信息头部（编辑头像 + 名称 + 积分）
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16.w, 16.h, 16.w, 8.h),
              child: Row(
                children: [
                  _EditableAvatar(
                    initialName: user?.displayName ?? '未命名',
                    points: qiancaiDouBalance,
                  ),
                ],
              ),
            ),
          ),
          
          // 信息分区：订单/预约/资产/设置（去除外部图标与箭头，使用清晰分组卡片）
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _Section(
                    title: '订单与预约',
                    children: [
                      _PlainItem(
                        title: AppLocalizations.of(context)!.profile_my_orders,
                        onTap: () => context.go(AppRoutes.orders),
                      ),
                      _PlainItem(
                        title: AppLocalizations.of(context)!.profile_my_appointments,
                        onTap: () => context.go(AppRoutes.appointments),
                      ),
                    ],
                  ),
                  _Section(
                    title: '资产与记录',
                    children: [
                      _PlainItem(
                        title: AppLocalizations.of(context)!.profile_transaction_history,
                        onTap: () => context.go(AppRoutes.transactionHistory),
                      ),
                    ],
                  ),
                  _Section(
                    title: '设置',
                    children: [
                      _PlainItem(
                        title: AppLocalizations.of(context)!.profile_settings,
                        onTap: () => context.go(AppRoutes.settings),
                      ),
                    ],
                  ),
                  SizedBox(height: 20.h),
                  _buildLogoutButton(context, ref),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return SizedBox(
      height: 56.h,
      child: ListTile(
        dense: true,
        contentPadding: EdgeInsets.symmetric(horizontal: 16.w),
        leading: Icon(icon, color: AppTheme.textPrimary, size: 22.sp),
        title: Text(title, style: Theme.of(context).textTheme.titleMedium),
        trailing: Icon(FeatherIcons.chevronRight, color: AppTheme.textTertiary, size: 18.sp),
        onTap: onTap,
      ),
    );
  }

  Widget _buildLogoutButton(BuildContext context, WidgetRef ref) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: () => _showLogoutDialog(context, ref),
        style: OutlinedButton.styleFrom(
          foregroundColor: AppTheme.errorColor,
          side: const BorderSide(color: AppTheme.errorColor),
          padding: EdgeInsets.symmetric(vertical: 16.h),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              FeatherIcons.logOut,
              size: 20.sp,
            ),
            SizedBox(width: 8.w),
            Text(AppLocalizations.of(context)!.auth_logout),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.auth_logout),
        content: Text('确定要退出登录吗？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(AppLocalizations.of(context)!.common_cancel),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              ref.read(authProvider.notifier).logout();
            },
            child: Text(AppLocalizations.of(context)!.common_confirm),
          ),
        ],
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final List<Widget> children;
  const _Section({required this.title, required this.children});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.borderRadiusLarge),
        boxShadow: [AppTheme.cardShadow],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(16.w, 14.h, 16.w, 8.h),
            child: Text(title, style: Theme.of(context).textTheme.titleLarge),
          ),
          const Divider(height: 1, color: AppTheme.dividerColor),
          ..._withDividers(children),
        ],
      ),
    );
  }

  List<Widget> _withDividers(List<Widget> items) {
    final result = <Widget>[];
    for (var i = 0; i < items.length; i++) {
      result.add(items[i]);
      if (i != items.length - 1) {
        result.add(const Divider(height: 1, color: AppTheme.dividerColor));
      }
    }
    return result;
  }
}

class _PlainItem extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  const _PlainItem({required this.title, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 14.h),
        child: Text(
          title,
          style: Theme.of(context).textTheme.titleMedium,
        ),
      ),
    );
  }
}

class _EditableAvatar extends ConsumerStatefulWidget {
  final String initialName;
  final int points;

  const _EditableAvatar({required this.initialName, required this.points});

  @override
  ConsumerState<_EditableAvatar> createState() => _EditableAvatarState();
}

class _EditableAvatarState extends ConsumerState<_EditableAvatar> {
  String? _avatarPath; // data URL
  late TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.initialName);
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _pickAvatar() async {
    // Web/Flutter 通用：使用 file_picker/web 或 html input（此处使用简化实现：showDialog 提示由前端补齐插件）
    // 为了跨平台，这里先使用 image_picker_web 的 API 占位（用户可添加依赖）
    // 如果未添加依赖，提供一个输入对话框让用户粘贴 data URL
    String? inputDataUrl;
    await showDialog(
      context: context,
      builder: (ctx) {
        final controller = TextEditingController();
        return AlertDialog(
          title: const Text('上传头像 (粘贴 data URL)'),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: 'data:image/png;base64,...'),
            minLines: 1,
            maxLines: 3,
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('取消')),
            TextButton(
              onPressed: () {
                inputDataUrl = controller.text.trim();
                Navigator.pop(ctx);
              },
              child: const Text('确定'),
            )
          ],
        );
      },
    );

    if (inputDataUrl != null && inputDataUrl!.startsWith('data:image')) {
      setState(() => _avatarPath = inputDataUrl);
      // 同步到服务器
      try {
        final repo = ref.read(authRepositoryProvider);
        await repo.updateProfile(avatarDataUrl: inputDataUrl);
        // 刷新用户
        ref.read(authProvider.notifier).refreshUser();
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('上传失败: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Stack(
          children: [
            CircleAvatar(
              radius: 32,
              backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
              backgroundImage: _avatarPath != null ? NetworkImage(_avatarPath!) : null,
              child: _avatarPath == null ? Icon(FeatherIcons.user, color: AppTheme.textPrimary) : null,
            ),
            Positioned(
              right: 0,
              bottom: 0,
              child: GestureDetector(
                onTap: _pickAvatar,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: const BoxDecoration(
                    color: AppTheme.primaryColor,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.edit, size: 14, color: Colors.white),
                ),
              ),
            ),
          ],
        ),
        SizedBox(width: 12.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _nameController,
                decoration: const InputDecoration(
                  isDense: true,
                  border: InputBorder.none,
                ),
                style: Theme.of(context).textTheme.titleLarge,
              ),
              Row(
                children: [
                  const QcCoin(size: 16),
                  SizedBox(width: 4.w),
                  Text('${widget.points}', style: TextStyle(color: AppTheme.primaryColor)),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
