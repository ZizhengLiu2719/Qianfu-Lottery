import 'package:dio/dio.dart';
import '../models/models.dart';
import 'dio_client.dart';

class AuthRepository {
  final DioClient _dioClient;

  AuthRepository(this._dioClient);

  // 用户注册
  Future<AuthResponse> register({
    required String email,
    required String password,
    String? firstName,
    String? lastName,
    String? language,
  }) async {
    final response = await _dioClient.post<AuthResponse>(
      '/api/auth/register',
      data: {
        'email': email,
        'password': password,
        if (firstName != null) 'firstName': firstName,
        if (lastName != null) 'lastName': lastName,
        'language': language ?? 'zh',
      },
      fromJson: (json) => AuthResponse.fromJson(json),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '注册失败',
      );
    }

    return response.data!;
  }

  // 用户登录
  Future<AuthResponse> login({
    required String email,
    required String password,
  }) async {
    final response = await _dioClient.post<AuthResponse>(
      '/api/auth/login',
      data: {
        'email': email,
        'password': password,
      },
      fromJson: (json) => AuthResponse.fromJson(json),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '登录失败',
      );
    }

    return response.data!;
  }

  // 获取当前用户信息
  Future<User> getCurrentUser() async {
    final response = await _dioClient.get<User>(
      '/api/me',
      fromJson: (json) => User.fromJson(json['user']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '获取用户信息失败',
      );
    }

    return response.data!;
  }

  // 获取千彩豆交易历史
  Future<List<QiancaiDouTransaction>> getTransactionHistory({
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _dioClient.get<List<QiancaiDouTransaction>>(
      '/api/me/qiancaidou/transactions',
      queryParameters: {
        'page': page,
        'limit': limit,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final transactions = data['transactions'] as List;
        return transactions
            .map((transaction) => QiancaiDouTransaction.fromJson(transaction))
            .toList();
      },
    );

    return response.data ?? [];
  }

  // 更新当前用户资料
  Future<User> updateProfile({
    String? firstName,
    String? lastName,
    String? language,
    String? avatarDataUrl,
  }) async {
    final response = await _dioClient.patch<User>(
      '/api/me',
      data: {
        if (firstName != null) 'firstName': firstName,
        if (lastName != null) 'lastName': lastName,
        if (language != null) 'language': language,
        if (avatarDataUrl != null) 'avatarDataUrl': avatarDataUrl,
      },
      fromJson: (json) => User.fromJson(json['user']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '更新用户资料失败',
      );
    }

    return response.data!;
  }

  // 上传头像
  Future<Map<String, dynamic>> uploadAvatar({
    required String avatarData,
    required String mimeType,
    required int size,
  }) async {
    try {
      final response = await _dioClient.dio.post(
        '/api/me/avatar',
        data: {
          'avatarData': avatarData,
          'mimeType': mimeType,
          'size': size,
        },
      );

      if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
        return response.data as Map<String, dynamic>;
      } else {
        throw const ApiException(
          code: 500,
          message: '上传头像失败',
        );
      }
    } on DioException catch (e) {
      if (e.response?.data is Map<String, dynamic>) {
        final errorData = e.response!.data as Map<String, dynamic>;
        throw ApiException(
          code: errorData['code'] ?? e.response?.statusCode ?? 500,
          message: errorData['message'] ?? '上传头像失败',
        );
      }
      throw const ApiException(
        code: 500,
        message: '上传头像失败',
      );
    }
  }
}
