import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';

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
          
          // 菜单列表
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.all(20.w),
              child: Column(
                children: [
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.profile_my_orders,
                    onTap: () => context.go(AppRoutes.orders),
                  ),
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.profile_my_appointments,
                    onTap: () => context.go(AppRoutes.appointments),
                  ),
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.profile_transaction_history,
                    onTap: () => context.go(AppRoutes.transactionHistory),
                  ),
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.profile_settings,
                    onTap: () => context.go(AppRoutes.settings),
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

  Widget _buildMenuTextItem(
    BuildContext context, {
    required String title,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12.r),
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12.r),
            border: Border.all(color: AppTheme.dividerColor.withOpacity(0.5)),
          ),
          child: Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.textPrimary,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
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
        child: Text(AppLocalizations.of(context)!.auth_logout),
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
              child: _avatarPath == null
                  ? Text(
                      widget.initialName.isNotEmpty ? widget.initialName.characters.first : '-',
                      style: TextStyle(
                        color: AppTheme.textPrimary,
                        fontSize: 20.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    )
                  : null,
            ),
            Positioned(
              right: 0,
              bottom: 0,
              child: TextButton(
                onPressed: _pickAvatar,
                style: TextButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  backgroundColor: AppTheme.primaryColor,
                  foregroundColor: Colors.white,
                ),
                child: const Text('更换'),
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
              Text(
                '${widget.points} 仟彩豆',
                style: const TextStyle(color: AppTheme.primaryColor),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
