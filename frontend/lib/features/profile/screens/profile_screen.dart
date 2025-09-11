import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'dart:math' as math;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'dart:html' as html;

import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';
import '../../../api/auth_repository.dart';

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
              child: _EditableAvatar(
                initialName: user?.displayName ?? AppLocalizations.of(context)!.common_loading,
                points: qiancaiDouBalance,
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
                    title: AppLocalizations.of(context)!.learning_my_appointments,
                    onTap: () => context.go(AppRoutes.appointments),
                  ),
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.travel_my_appointments,
                    onTap: () => context.go(AppRoutes.myTravels),
                  ),
                  _buildMenuTextItem(
                    context,
                    title: AppLocalizations.of(context)!.profile_platform_feedback,
                    onTap: () => context.go(AppRoutes.feedback),
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
      child: _HoverableMenuButton(
        title: title,
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
        child: Text(AppLocalizations.of(context)!.profile_logout),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.profile_logout),
        content: Text(AppLocalizations.of(context)!.confirm_logout),
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
  bool _isUploading = false;

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
    if (_isUploading) return;

    // 根据平台选择不同的图片选择方式
    if (kIsWeb) {
      await _pickImageFromWeb();
    } else {
      await _pickImageFromMobile();
    }
  }

  Future<void> _pickImageFromWeb() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.image,
        allowMultiple: false,
      );

      if (result != null && result.files.isNotEmpty) {
        final file = result.files.first;
        if (file.bytes != null) {
          await _processImageData(file.bytes!, file.extension ?? 'jpg');
        }
      }
    } catch (e) {
      _showError(AppLocalizations.of(context)!.common_failed);
    }
  }

  Future<void> _pickImageFromMobile() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 85,
      );

      if (image != null) {
        final bytes = await image.readAsBytes();
        final extension = image.path.split('.').last.toLowerCase();
        await _processImageData(bytes, extension);
      }
    } catch (e) {
      _showError(AppLocalizations.of(context)!.common_failed);
    }
  }

  Future<void> _processImageData(Uint8List bytes, String extension) async {
    setState(() {
      _isUploading = true;
    });

    try {
      // 图片压缩 - 如果图片大于500KB，进行压缩
      Uint8List processedBytes = bytes;
      if (bytes.length > 500 * 1024) { // 500KB
        processedBytes = await _compressImage(bytes);
        print('图片已压缩: ${bytes.length} -> ${processedBytes.length} bytes');
      }
      
      // 转换为Base64
      final base64String = base64Encode(processedBytes);
      
      // 确定MIME类型
      String mimeType;
      switch (extension.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        default:
          mimeType = 'image/jpeg';
      }

      print('上传头像数据: mimeType=$mimeType, size=${processedBytes.length}');

      // 上传到服务器
      final authRepo = ref.read(authRepositoryProvider);
      final result = await authRepo.uploadAvatar(
        avatarData: base64String,
        mimeType: mimeType,
        size: processedBytes.length,
      );

      print('上传结果: $result');

      if (result['code'] == 200 && result['data'] != null) {
        // 更新本地状态
        setState(() {
          _avatarPath = result['data']['user']['avatarUrl'];
        });
        
        // 更新全局用户状态
        await ref.read(authProvider.notifier).refreshUser();
        
        // 延迟显示成功消息，确保状态更新完成
        Future.delayed(const Duration(milliseconds: 100), () {
          if (mounted) {
            _showSuccess(AppLocalizations.of(context)!.common_success);
          }
        });
      } else {
        _showError(result['message'] ?? AppLocalizations.of(context)!.common_failed);
      }
    } catch (e) {
      print('上传头像错误: $e');
      _showError(AppLocalizations.of(context)!.common_failed);
    } finally {
      setState(() {
        _isUploading = false;
      });
    }
  }

  // 简单的图片压缩 - 通过减少质量来压缩
  Future<Uint8List> _compressImage(Uint8List bytes) async {
    const int maxSize = 500 * 1024; // 500KB
    
    if (bytes.length <= maxSize) {
      return bytes;
    }
    
    // 对于 Web 平台，我们使用 Canvas API 进行图片压缩
    if (kIsWeb) {
      try {
        // 创建一个临时的 Image 元素来获取图片尺寸
        final html.ImageElement img = html.ImageElement();
        img.src = 'data:image/png;base64,${base64Encode(bytes)}';
        
        // 等待图片加载
        await img.onLoad.first;
        
        // 计算压缩比例
        final double scale = math.sqrt(maxSize / bytes.length);
        final int newWidth = (img.width! * scale).round();
        final int newHeight = (img.height! * scale).round();
        
        // 使用 Canvas 进行压缩
        final html.CanvasElement canvas = html.CanvasElement();
        final html.CanvasRenderingContext2D ctx = canvas.context2D as html.CanvasRenderingContext2D;
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        ctx.drawImageScaled(img, 0, 0, newWidth, newHeight);
        
        // 转换为 data URL 并解析为字节
        final String dataUrl = canvas.toDataUrl('image/jpeg', 0.8);
        final String base64Data = dataUrl.split(',')[1];
        final Uint8List compressedBytes = base64Decode(base64Data);
        
        return compressedBytes;
      } catch (e) {
        print('Canvas compression failed: $e');
        // 如果压缩失败，返回原始字节
        return bytes;
      }
    }
    
    // 对于移动平台，返回原始字节（移动端通常有更好的图片处理）
    return bytes;
  }

  void _showError(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: AppTheme.errorColor,
          duration: const Duration(seconds: 3),
        ),
      );
    }
  }

  void _showSuccess(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: AppTheme.successColor,
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }

  // 检查URL是否为有效的data URL
  bool _isValidDataUrl(String? url) {
    if (url == null || url.isEmpty) return false;
    return url.startsWith('data:image/') && url.contains('base64,');
  }

  // 获取头像显示组件
  Widget _buildAvatarWidget(String? avatarUrl) {
    if (avatarUrl == null || avatarUrl.isEmpty) {
      return Text(
        widget.initialName.isNotEmpty ? widget.initialName.characters.first : '-',
        style: TextStyle(
          color: AppTheme.textPrimary,
          fontSize: 36.sp,
          fontWeight: FontWeight.w600,
        ),
      );
    }

    // 如果是data URL，直接使用Image.memory
    if (_isValidDataUrl(avatarUrl)) {
      try {
        final base64Data = avatarUrl.split('base64,')[1];
        final bytes = base64Decode(base64Data);
        return Image.memory(
          bytes,
          width: 128,
          height: 128,
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) {
            print('Data URL 头像加载失败: $error');
            return _buildFallbackAvatar();
          },
        );
      } catch (e) {
        print('Data URL 解析失败: $e');
        return _buildFallbackAvatar();
      }
    }

    // 如果是网络URL，使用CachedNetworkImage
    return CachedNetworkImage(
      imageUrl: avatarUrl,
      width: 128,
      height: 128,
      fit: BoxFit.cover,
      memCacheWidth: 256,
      memCacheHeight: 256,
      maxWidthDiskCache: 512,
      maxHeightDiskCache: 512,
      httpHeaders: const {
        'Cache-Control': 'max-age=3600',
      },
      placeholder: (context, url) => Container(
        width: 128,
        height: 128,
        color: AppTheme.primaryColor.withOpacity(0.1),
        child: Center(
          child: CircularProgressIndicator(
            strokeWidth: 2.0,
            valueColor: AlwaysStoppedAnimation<Color>(AppTheme.primaryColor),
          ),
        ),
      ),
      errorWidget: (context, url, error) {
        print('网络头像加载失败: $url, 错误: $error');
        return _buildFallbackAvatar();
      },
    );
  }

  // 构建备用头像
  Widget _buildFallbackAvatar() {
    return Container(
      width: 128,
      height: 128,
      color: AppTheme.primaryColor.withOpacity(0.1),
      child: Center(
        child: Text(
          widget.initialName.isNotEmpty ? widget.initialName.characters.first : '-',
          style: TextStyle(
            color: AppTheme.textPrimary,
            fontSize: 36.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Future<void> _pickAvatarOld() async {
    // Web/Flutter 通用：使用 file_picker/web 或 html input（此处使用简化实现：showDialog 提示由前端补齐插件）
    // 为了跨平台，这里先使用 image_picker_web 的 API 占位（用户可添加依赖）
    // 如果未添加依赖，提供一个输入对话框让用户粘贴 data URL
    String? inputDataUrl;
    await showDialog(
      context: context,
      builder: (ctx) {
        final controller = TextEditingController();
        return AlertDialog(
          title: Text(AppLocalizations.of(context)!.profile_edit),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: 'data:image/png;base64,...'),
            minLines: 1,
            maxLines: 3,
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx), child: Text(AppLocalizations.of(context)!.common_cancel)),
            TextButton(
              onPressed: () {
                inputDataUrl = controller.text.trim();
                Navigator.pop(ctx);
              },
              child: Text(AppLocalizations.of(context)!.common_confirm),
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
    // 获取当前用户信息，优先使用全局状态中的头像
    final currentUser = ref.watch(currentUserProvider);
    final avatarUrl = currentUser?.avatarUrl ?? _avatarPath;
    
    // 调试信息
    if (avatarUrl != null) {
      print('头像URL: $avatarUrl');
      print('是否为data URL: ${avatarUrl.startsWith('data:')}');
    }
    
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween, // 使用spaceBetween确保内容可见
      children: [
        // 用户信息部分（名字 + 千彩豆）
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start, // 改为左对齐
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
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '${widget.points} ${AppLocalizations.of(context)!.cart_qiancai_dou}',
                    style: const TextStyle(color: AppTheme.primaryColor),
                  ),
                  SizedBox(width: 4.w),
                  QiancaiDouIcon(
                    size: 16.0,
                  ),
                ],
              ),
            ],
          ),
        ),
        SizedBox(width: 12.w),
        // 头像部分
        Column(
          children: [
            CircleAvatar(
              radius: 64, // 进一步增大头像半径到64
              backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
              child: ClipOval(
                child: _buildAvatarWidget(avatarUrl),
              ),
            ),
            SizedBox(height: 4.h), // 进一步减少间距
            TextButton(
              onPressed: _isUploading ? null : _pickAvatar,
              style: TextButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h), // 进一步减少内边距
                minimumSize: Size(32.w, 20.h), // 进一步减小按钮尺寸
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                backgroundColor: _isUploading ? AppTheme.textTertiary : AppTheme.primaryColor,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.r), // 进一步减小圆角
                ),
              ),
              child: _isUploading 
                ? SizedBox(
                    width: 10.w, // 进一步减小加载指示器尺寸
                    height: 10.w,
                    child: const CircularProgressIndicator(
                      strokeWidth: 1.0, // 进一步减小线条宽度
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Text(
                    AppLocalizations.of(context)!.profile_change_avatar,
                    style: TextStyle(
                      fontSize: 8.sp, // 进一步减小字体到8
                      fontWeight: FontWeight.w500,
                    ),
                  ),
            ),
          ],
        ),
      ],
    );
  }
}

// 可悬停的菜单按钮组件
class _HoverableMenuButton extends StatefulWidget {
  final String title;
  final VoidCallback onTap;

  const _HoverableMenuButton({
    required this.title,
    required this.onTap,
  });

  @override
  State<_HoverableMenuButton> createState() => _HoverableMenuButtonState();
}

class _HoverableMenuButtonState extends State<_HoverableMenuButton>
    with SingleTickerProviderStateMixin {
  bool _isHovered = false;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _elevationAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    
    _elevationAnimation = Tween<double>(
      begin: 2.0,
      end: 8.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _onHoverEnter() {
    setState(() {
      _isHovered = true;
    });
    _animationController.forward();
  }

  void _onHoverExit() {
    setState(() {
      _isHovered = false;
    });
    _animationController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => _onHoverEnter(),
      onExit: (_) => _onHoverExit(),
      child: AnimatedBuilder(
        animation: _animationController,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: InkWell(
              onTap: widget.onTap,
              borderRadius: BorderRadius.circular(12.r),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
                decoration: BoxDecoration(
                  color: _isHovered 
                      ? AppTheme.primaryColor.withOpacity(0.05)
                      : Colors.white,
                  borderRadius: BorderRadius.circular(12.r),
                  border: Border.all(
                    color: _isHovered 
                        ? AppTheme.primaryColor.withOpacity(0.3)
                        : AppTheme.dividerColor.withOpacity(0.5),
                    width: _isHovered ? 1.5 : 1.0,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05 + (_elevationAnimation.value - 2) * 0.02),
                      blurRadius: _elevationAnimation.value,
                      offset: Offset(0, _elevationAnimation.value / 2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        widget.title,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: _isHovered 
                              ? AppTheme.primaryColor
                              : AppTheme.textPrimary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    AnimatedRotation(
                      turns: _isHovered ? 0.25 : 0.0,
                      duration: const Duration(milliseconds: 200),
                      child: Icon(
                        Icons.arrow_forward_ios,
                        size: 16.sp,
                        color: _isHovered 
                            ? AppTheme.primaryColor
                            : AppTheme.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
