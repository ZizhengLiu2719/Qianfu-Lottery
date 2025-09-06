import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenManager {
  static const String _tokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'user_id';
  
  static const FlutterSecureStorage _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: KeychainAccessibility.first_unlock_this_device,
    ),
  );

  // 保存 Token
  Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  // 获取 Token
  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // 保存 Refresh Token
  Future<void> saveRefreshToken(String refreshToken) async {
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
  }

  // 获取 Refresh Token
  Future<String?> getRefreshToken() async {
    return await _storage.read(key: _refreshTokenKey);
  }

  // 保存用户 ID
  Future<void> saveUserId(int userId) async {
    await _storage.write(key: _userIdKey, value: userId.toString());
  }

  // 获取用户 ID
  Future<int?> getUserId() async {
    final userIdStr = await _storage.read(key: _userIdKey);
    return userIdStr != null ? int.tryParse(userIdStr) : null;
  }

  // 检查是否已登录
  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }

  // 清除所有认证信息
  Future<void> clearToken() async {
    await Future.wait([
      _storage.delete(key: _tokenKey),
      _storage.delete(key: _refreshTokenKey),
      _storage.delete(key: _userIdKey),
    ]);
  }

  // 清除所有存储数据
  Future<void> clearAll() async {
    await _storage.deleteAll();
  }

  // 检查 Token 是否即将过期（预留时间刷新）
  Future<bool> shouldRefreshToken({Duration refreshThreshold = const Duration(minutes: 5)}) async {
    final token = await getToken();
    if (token == null) return false;

    try {
      final parts = token.split('.');
      if (parts.length != 3) return true; // Malformed token

      final payload = parts[1];
      final normalizedPayload = base64Url.normalize(payload);
      final decodedPayload = utf8.decode(base64Url.decode(normalizedPayload));
      final payloadMap = json.decode(decodedPayload) as Map<String, dynamic>;

      if (payloadMap['exp'] == null || payloadMap['exp'] is! int) {
        return true; // No expiration claim
      }

      final expiry = DateTime.fromMillisecondsSinceEpoch((payloadMap['exp'] as int) * 1000);
      final timeUntilExpiry = expiry.difference(DateTime.now());

      return timeUntilExpiry < refreshThreshold;
    } catch (e) {
      return true; // If any error decoding, assume it needs refresh
    }
  }
}
