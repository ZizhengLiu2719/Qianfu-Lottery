import 'package:flutter/material.dart';

/// 仟彩豆图标（用系统图标替代，移除对本地图像的依赖）
class QcCoin extends StatelessWidget {
  final double size;
  final EdgeInsetsGeometry? padding;
  final Color color;

  const QcCoin({super.key, this.size = 16, this.padding, this.color = const Color(0xFFFFB300)});

  @override
  Widget build(BuildContext context) {
    final icon = Icon(
      Icons.diamond,
      size: size,
      color: color,
    );

    if (padding != null) {
      return Padding(padding: padding!, child: icon);
    }
    return icon;
  }
}

