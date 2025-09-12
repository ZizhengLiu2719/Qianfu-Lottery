import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../api/dio_client.dart';
import '../../../api/auth_repository.dart';
import '../../../models/models.dart';
import '../../../utils/token_manager.dart';

// DI Providers
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return AuthRepository(dioClient);
});

final tokenManagerProvider = Provider<TokenManager>((ref) => TokenManager());

// 认证状态
enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthState {
  final AuthStatus status;
  final User? user;
  final String? error;
  final bool isLoading;

  const AuthState({
    this.status = AuthStatus.unknown,
    this.user,
    this.error,
    this.isLoading = false,
  });

  AuthState copyWith({
    AuthStatus? status,
    User? user,
    String? error,
    bool? isLoading,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      error: error,
      isLoading: isLoading ?? this.isLoading,
    );
  }

  bool get isAuthenticated => status == AuthStatus.authenticated;
  bool get isUnauthenticated => status == AuthStatus.unauthenticated;
}

// 认证Provider
class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _authRepository;
  final TokenManager _tokenManager;

  AuthNotifier(this._authRepository, this._tokenManager) : super(const AuthState()) {
    _checkAuthStatus();
  }

  // 检查认证状态
  Future<void> _checkAuthStatus() async {
    try {
      final isLoggedIn = await _tokenManager.isLoggedIn();
      if (!isLoggedIn) {
        state = state.copyWith(status: AuthStatus.unauthenticated);
        return;
      }

      // 尝试获取用户信息验证token有效性
      final user = await _authRepository.getCurrentUser();
      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: user,
      );
    } catch (e) {
      // Token无效，清除并标记为未认证
      await _tokenManager.clearToken();
      state = state.copyWith(status: AuthStatus.unauthenticated);
    }
  }

  // 登录
  Future<void> login({
    required String email,
    required String password,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final authResponse = await _authRepository.login(
        email: email,
        password: password,
      );

      // 保存token和用户信息
      await _tokenManager.saveToken(authResponse.token);
      await _tokenManager.saveUserId(authResponse.user.id);

      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: authResponse.user,
        isLoading: false,
      );
    } catch (e) {
      String errorMessage = '登录失败';
      if (e is ApiException) {
        errorMessage = e.message;
      }
      
      state = state.copyWith(
        isLoading: false,
        error: errorMessage,
      );
      rethrow;
    }
  }

  // 注册
  Future<void> register({
    required String email,
    required String password,
    String? firstName,
    String? lastName,
    String? language,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final authResponse = await _authRepository.register(
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        language: language,
      );

      // 保存token和用户信息
      await _tokenManager.saveToken(authResponse.token);
      await _tokenManager.saveUserId(authResponse.user.id);

      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: authResponse.user,
        isLoading: false,
      );
    } catch (e) {
      String errorMessage = '注册失败';
      if (e is ApiException) {
        errorMessage = e.message;
      }
      
      state = state.copyWith(
        isLoading: false,
        error: errorMessage,
      );
      rethrow;
    }
  }

  // 登出
  Future<void> logout() async {
    state = state.copyWith(isLoading: true);

    try {
      await _tokenManager.clearToken();
      await _tokenManager.clearAll(); // 清除所有存储数据
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
        isLoading: false,
        error: null,
      );
    } catch (e) {
      if (kDebugMode) {
        print('Logout error: $e');
      }
      // 即使清除失败也要登出
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
        isLoading: false,
        error: null,
      );
    }
  }

  // 刷新用户信息
  Future<void> refreshUser() async {
    if (!state.isAuthenticated) return;

    try {
      final user = await _authRepository.getCurrentUser();
      state = state.copyWith(user: user);
    } catch (e) {
      if (kDebugMode) {
        print('Refresh user error: $e');
      }
      // 如果刷新失败，可能token已过期，执行登出
      await logout();
    }
  }

  // 清除错误
  void clearError() {
    state = state.copyWith(error: null);
  }
}

// 提供AuthNotifier
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  final tokenManager = ref.watch(tokenManagerProvider);
  return AuthNotifier(authRepository, tokenManager);
});

// 便捷的访问方法
final currentUserProvider = Provider<User?>((ref) {
  return ref.watch(authProvider).user;
});

final isAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(authProvider).isAuthenticated;
});

final qiancaiDouBalanceProvider = Provider<int>((ref) {
  final user = ref.watch(currentUserProvider);
  return user?.qiancaiDouBalance ?? 0;
});
