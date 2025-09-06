import 'package:flutter/material.dart';

class L10n {
  static const List<Locale> supportedLocales = [
    Locale('zh', 'CN'), // 中文（简体）
    Locale('en', 'US'), // 英文（美国）
  ];

  static const Locale fallbackLocale = Locale('zh', 'CN');

  static Locale? localeResolutionCallback(
    Locale? locale,
    Iterable<Locale> supportedLocales,
  ) {
    // 如果设备语言在支持列表中，使用设备语言
    if (locale != null) {
      for (var supportedLocale in supportedLocales) {
        if (supportedLocale.languageCode == locale.languageCode) {
          return supportedLocale;
        }
      }
    }
    
    // 否则使用默认语言（中文）
    return fallbackLocale;
  }
}
