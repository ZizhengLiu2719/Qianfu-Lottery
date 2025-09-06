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
  Future<bool> shouldRefreshToken() async {
    final token = await getToken();
    if (token == null) return false;

    try {
      // 解析 JWT Token 的 payload
      final parts = token.split('.');
      if (parts.length != 3) return true;

      final payload = parts[1];
      // 添加必要的填充
      final normalizedPayload = base64Normalize(payload);
      
      final decoded = Uri.decodeFull(String.fromCharCodes(
        Uri.dataFromString(normalizedPayload, encoding: Uri.encodeFull).data
      ));

      // 这里简化处理，实际项目中应该正确解析 JWT
      // 如果解析失败，假设需要刷新
      return false;
    } catch (e) {
      return true;
    }
  }

  // Base64 标准化（添加必要的填充）
  String base64Normalize(String source) {
    switch (source.length % 4) {
      case 0:
        return source;
      case 2:
        return source + "==";
      case 3:
        return source + "=";
      default:
        throw Exception("Illegal base64url string!");
    }
  }
}
