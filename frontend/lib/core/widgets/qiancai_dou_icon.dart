import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

/// 千彩豆图标组件
/// 自动处理尺寸缩放，适配不同屏幕密度
class QiancaiDouIcon extends StatelessWidget {
  /// 图标尺寸（逻辑像素）
  final double size;
  
  /// 图标颜色（可选，null表示使用原图颜色）
  final Color? color;
  
  /// 是否启用错误处理
  final bool enableErrorBuilder;

  const QiancaiDouIcon({
    super.key,
    this.size = 24.0,
    this.color,
    this.enableErrorBuilder = true,
  });

  @override
  Widget build(BuildContext context) {
    // 使用ScreenUtil进行响应式尺寸调整
    final responsiveSize = size.w;
    
    return Image.asset(
      'assets/images/coin.png',
      width: responsiveSize,
      height: responsiveSize,
      color: color,
      fit: BoxFit.contain, // 保持图片比例，避免变形
      errorBuilder: enableErrorBuilder ? (context, error, stackTrace) {
        // 如果图片加载失败，显示备用图标
        return Container(
          width: responsiveSize,
          height: responsiveSize,
          decoration: BoxDecoration(
            color: Colors.orange.shade100,
            shape: BoxShape.circle,
            border: Border.all(color: Colors.orange.shade300, width: 1),
          ),
          child: Icon(
            Icons.stars,
            size: responsiveSize * 0.6,
            color: Colors.orange.shade600,
          ),
        );
      } : null,
    );
  }
}

/// 千彩豆文本组件（带图标）
/// 将千彩豆图标和文本组合在一起
class QiancaiDouText extends StatelessWidget {
  /// 千彩豆数量
  final int points;
  
  /// 图标尺寸
  final double iconSize;
  
  /// 文本样式
  final TextStyle? textStyle;
  
  /// 图标和文本之间的间距
  final double spacing;

  const QiancaiDouText({
    super.key,
    required this.points,
    this.iconSize = 16.0,
    this.textStyle,
    this.spacing = 4.0,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          '$points',
          style: textStyle ?? Theme.of(context).textTheme.bodyMedium,
        ),
        SizedBox(width: spacing.w),
        const Text('千彩豆'),
        SizedBox(width: spacing.w),
        QiancaiDouIcon(
          size: iconSize,
          color: textStyle?.color,
        ),
      ],
    );
  }
}
