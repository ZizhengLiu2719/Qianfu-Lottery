import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

// 支持的语言
enum AppLanguage {
  chinese('zh', '中文'),
  english('en', 'English');

  const AppLanguage(this.code, this.displayName);
  final String code;
  final String displayName;
}

// 语言Provider
final languageProvider = StateNotifierProvider<LanguageNotifier, AppLanguage>((ref) {
  return LanguageNotifier();
});

class LanguageNotifier extends StateNotifier<AppLanguage> {
  LanguageNotifier() : super(AppLanguage.chinese) {
    _loadLanguage();
  }

  // 从本地存储加载语言设置
  Future<void> _loadLanguage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final languageCode = prefs.getString('selected_language') ?? 'zh';
      
      final language = AppLanguage.values.firstWhere(
        (lang) => lang.code == languageCode,
        orElse: () => AppLanguage.chinese,
      );
      
      state = language;
    } catch (e) {
      print('Error loading language: $e');
      state = AppLanguage.chinese;
    }
  }

  // 切换语言
  Future<void> setLanguage(AppLanguage language) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('selected_language', language.code);
      state = language;
    } catch (e) {
      print('Error saving language: $e');
    }
  }

  // 获取当前语言代码
  String get currentLanguageCode => state.code;

  // 是否为中文
  bool get isChinese => state == AppLanguage.chinese;

  // 是否为英文
  bool get isEnglish => state == AppLanguage.english;
}
