import 'package:flutter/material.dart';

/// 仟彩豆图标（使用本地图像 assets/images/coin.png）
class QcCoin extends StatelessWidget {
  final double size;
  final EdgeInsetsGeometry? padding;

  const QcCoin({super.key, this.size = 16, this.padding});

  @override
  Widget build(BuildContext context) {
    final image = Image.asset(
      'assets/images/coin.png',
      width: size,
      height: size,
      fit: BoxFit.contain,
      filterQuality: FilterQuality.high,
    );

    if (padding != null) {
      return Padding(padding: padding!, child: image);
    }
    return image;
  }
}


