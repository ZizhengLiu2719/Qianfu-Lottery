import 'package:flutter/material.dart';

/// 响应式工具类
/// 提供PC端和移动端的不同缩放比例
class ResponsiveUtils {
  /// 检测是否为桌面端
  static bool isDesktop(BuildContext context) {
    return MediaQuery.of(context).size.width > 768;
  }
  
  /// 获取屏幕宽度
  static double screenWidth(BuildContext context) {
    return MediaQuery.of(context).size.width;
  }
  
  /// 获取屏幕高度
  static double screenHeight(BuildContext context) {
    return MediaQuery.of(context).size.height;
  }
  
  /// 响应式宽度 - PC端大幅缩小
  static double w(BuildContext context, double value) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    if (isDesktop) {
      // PC端缩小到原来的1/5
      return value * 0.2;
    }
    return value;
  }
  
  /// 响应式高度 - PC端大幅缩小
  static double h(BuildContext context, double value) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    if (isDesktop) {
      // PC端缩小到原来的1/5
      return value * 0.2;
    }
    return value;
  }
  
  /// 响应式字体大小 - PC端大幅缩小
  static double sp(BuildContext context, double value) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    if (isDesktop) {
      // PC端缩小到原来的1/5
      return value * 0.2;
    }
    return value;
  }
  
  /// 响应式圆角 - PC端大幅缩小
  static double r(BuildContext context, double value) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    if (isDesktop) {
      // PC端缩小到原来的1/5
      return value * 0.2;
    }
    return value;
  }
  
  /// 响应式内边距
  static EdgeInsets padding(BuildContext context, {
    double? all,
    double? horizontal,
    double? vertical,
    double? left,
    double? top,
    double? right,
    double? bottom,
  }) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    final scale = isDesktop ? 0.2 : 1.0;
    
    if (all != null) {
      return EdgeInsets.all(all * scale);
    }
    
    return EdgeInsets.only(
      left: (left ?? 0) * scale,
      top: (top ?? 0) * scale,
      right: (right ?? 0) * scale,
      bottom: (bottom ?? 0) * scale,
    );
  }
  
  /// 响应式间距
  static EdgeInsets symmetric(BuildContext context, {
    double? horizontal,
    double? vertical,
  }) {
    final isDesktop = ResponsiveUtils.isDesktop(context);
    final scale = isDesktop ? 0.2 : 1.0;
    
    return EdgeInsets.symmetric(
      horizontal: (horizontal ?? 0) * scale,
      vertical: (vertical ?? 0) * scale,
    );
  }
}
