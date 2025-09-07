import 'package:flutter/material.dart';

/// 贴纸风容器
class StickerContainer extends StatelessWidget {
  final Widget child;
  final Color? color;
  final Color? borderColor;
  final double borderWidth;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry margin;
  final double borderRadius;
  final double tilt;

  const StickerContainer({
    super.key,
    required this.child,
    this.color,
    this.borderColor,
    this.borderWidth = 2,
    this.padding = const EdgeInsets.all(16),
    this.margin = const EdgeInsets.symmetric(vertical: 8),
    this.borderRadius = 18,
    this.tilt = 0.0,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Transform.rotate(
      angle: tilt,
      child: Container(
        margin: margin,
        padding: padding,
        decoration: BoxDecoration(
          color: color ?? theme.colorScheme.surface,
          border: Border.all(
            color: borderColor ?? theme.colorScheme.onSurface.withOpacity(0.15),
            width: borderWidth,
          ),
          borderRadius: BorderRadius.circular(borderRadius),
          boxShadow: const [
            // 贴纸投影（偏移明显，模糊小）
            BoxShadow(
              color: Color(0x22000000),
              blurRadius: 4,
              spreadRadius: 0,
              offset: Offset(4, 4),
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}

/// 贴纸风按钮
class StickerButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final Color? color;
  final Color? borderColor;
  final double borderWidth;
  final EdgeInsetsGeometry padding;
  final double borderRadius;

  const StickerButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.color,
    this.borderColor,
    this.borderWidth = 2,
    this.padding = const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
    this.borderRadius = 16,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final bg = color ?? theme.colorScheme.primary;
    final bd = borderColor ?? theme.colorScheme.onPrimary.withOpacity(0.8);
    return Container(
      decoration: const BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Color(0x33000000),
            blurRadius: 0,
            spreadRadius: 0,
            offset: Offset(3, 3),
          ),
        ],
      ),
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: bg,
          foregroundColor: theme.colorScheme.onPrimary,
          padding: padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadius),
            side: BorderSide(color: bd, width: borderWidth),
          ),
          elevation: 0,
        ),
        child: child,
      ),
    );
  }
}


