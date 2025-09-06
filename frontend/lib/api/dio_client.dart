import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../utils/token_manager.dart';
import '../models/models.dart';

class DioClient {
  static const String _baseUrl = kDebugMode 
      ? 'http://localhost:8787'  // 本地开发
      : 'https://qianfu-jicai-api.workers.dev'; // 生产环境 Cloudflare Worker URL

  late final Dio _dio;
  final TokenManager _tokenManager = TokenManager();

  DioClient() {
    _dio = Dio(BaseOptions(
      baseUrl: _baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      sendTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _setupInterceptors();
  }

  void _setupInterceptors() {
    // 请求拦截器 - 添加认证头
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _tokenManager.getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        
        if (kDebugMode) {
          print('🚀 ${options.method} ${options.path}');
          if (options.data != null) {
            print('📤 Request data: ${options.data}');
          }
        }
        
        handler.next(options);
      },
      onResponse: (response, handler) {
        if (kDebugMode) {
          print('✅ ${response.statusCode} ${response.requestOptions.path}');
          print('📥 Response data: ${response.data}');
        }
        handler.next(response);
      },
      onError: (error, handler) {
        if (kDebugMode) {
          print('❌ Error: ${error.message}');
          print('📍 Path: ${error.requestOptions.path}');
          if (error.response?.data != null) {
            print('📥 Error response: ${error.response?.data}');
          }
        }

        // 处理401错误，自动登出
        if (error.response?.statusCode == 401) {
          _tokenManager.clearToken();
        }

        handler.next(error);
      },
    ));
  }

  // GET 请求
  Future<ApiResponse<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic json) fromJson,
  }) async {
    try {
      final response = await _dio.get(path, queryParameters: queryParameters);
      return _handleResponse<T>(response, fromJson);
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // POST 请求
  Future<ApiResponse<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic json) fromJson,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
      );
      return _handleResponse<T>(response, fromJson);
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // PUT 请求
  Future<ApiResponse<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic json) fromJson,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
      );
      return _handleResponse<T>(response, fromJson);
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // PATCH 请求
  Future<ApiResponse<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic json) fromJson,
  }) async {
    try {
      final response = await _dio.patch(
        path,
        data: data,
        queryParameters: queryParameters,
      );
      return _handleResponse<T>(response, fromJson);
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // DELETE 请求
  Future<ApiResponse<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    required T Function(dynamic json) fromJson,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
      );
      return _handleResponse<T>(response, fromJson);
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  // 处理响应
  ApiResponse<T> _handleResponse<T>(
    Response response,
    T Function(dynamic json) fromJson,
  ) {
    final data = response.data;
    
    if (data is Map<String, dynamic>) {
      final apiResponse = ApiResponse<T>.fromJson(
        data,
        (json) => json != null ? fromJson(json) : null as T,
      );
      
      if (apiResponse.isSuccess) {
        return apiResponse;
      } else {
        throw ApiException(
          code: apiResponse.code,
          message: apiResponse.message,
        );
      }
    } else {
      throw ApiException(
        code: response.statusCode ?? 500,
        message: 'Invalid response format',
      );
    }
  }

  // 处理错误
  ApiException _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return ApiException(
          code: -2,
          message: '请求超时，请稍后重试',
        );
      case DioExceptionType.connectionError:
        return ApiException(
          code: -1,
          message: '网络连接失败，请检查网络设置',
        );
      case DioExceptionType.badResponse:
        final response = error.response;
        if (response?.data is Map<String, dynamic>) {
          final errorData = response!.data as Map<String, dynamic>;
          return ApiException(
            code: errorData['code'] ?? response.statusCode ?? 500,
            message: errorData['message'] ?? 'Server error',
          );
        }
        return ApiException(
          code: response?.statusCode ?? 500,
          message: 'Server error',
        );
      default:
        return ApiException(
          code: 500,
          message: error.message ?? 'Unknown error',
        );
    }
  }

  // 更新Base URL（用于从开发环境切换到生产环境）
  void updateBaseUrl(String newBaseUrl) {
    _dio.options.baseUrl = newBaseUrl;
  }

  // 清理资源
  void dispose() {
    _dio.close();
  }
}

// API 异常类
class ApiException implements Exception {
  final int code;
  final String message;
  final Map<String, dynamic>? details;

  const ApiException({
    required this.code,
    required this.message,
    this.details,
  });

  @override
  String toString() => 'ApiException(code: $code, message: $message)';

  bool get isNetworkError => code < 0;
  bool get isClientError => code >= 400 && code < 500;
  bool get isServerError => code >= 500;
}
