import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../features/auth/screens/login_screen.dart';
import '../features/auth/screens/register_screen.dart';
import '../features/home/screens/main_scaffold.dart';
import '../features/shopping/screens/products_screen.dart';
import '../features/shopping/screens/product_detail_screen.dart';
import '../features/shopping/screens/cart_screen.dart';
import '../features/shopping/screens/orders_screen.dart';
import '../features/learning/screens/courses_screen.dart';
import '../features/learning/screens/course_detail_screen.dart';
import '../features/learning/screens/appointments_screen.dart';
import '../features/travel/screens/travel_screen.dart';
import '../features/travel/screens/travel_detail_screen.dart';
import '../features/entertainment/screens/entertainment_screen.dart';
import '../features/profile/screens/profile_screen.dart';
import '../features/profile/screens/transaction_history_screen.dart';
import '../features/profile/screens/settings_screen.dart';
import '../features/auth/providers/auth_provider.dart';

// 路由路径常量
class AppRoutes {
  static const String login = '/login';
  static const String register = '/register';
  static const String home = '/';
  static const String products = '/products';
  static const String productDetail = '/products/:id';
  static const String cart = '/cart';
  static const String orders = '/orders';
  static const String courses = '/courses';
  static const String courseDetail = '/courses/:id';
  static const String appointments = '/appointments';
  static const String travel = '/travel';
  static const String travelDetail = '/travel/:id';
  static const String entertainment = '/entertainment';
  static const String profile = '/profile';
  static const String transactionHistory = '/transaction-history';
  static const String settings = '/settings';
}

// 底部导航页面类型
enum BottomNavPage {
  life('/products'),
  learning('/courses'),
  travel('/travel'),
  entertainment('/entertainment'),
  profile('/profile');

  const BottomNavPage(this.path);
  final String path;
}

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: AppRoutes.home,
    debugLogDiagnostics: true,
    redirect: (context, state) {
      final authState = ref.read(authProvider);
      final isAuthenticated = authState.isAuthenticated;
      final currentRoute = state.uri.toString();
      final isAuthPage = currentRoute == AppRoutes.login ||
                        currentRoute == AppRoutes.register;

      // 如果未认证且不在认证页面，跳转到登录页
      if (!isAuthenticated && !isAuthPage) {
        return AppRoutes.login;
      }

      // 如果已认证且在认证页面，跳转到首页
      if (isAuthenticated && isAuthPage) {
        return AppRoutes.home;
      }

      return null;
    },
    routes: [
      // 认证路由
      GoRoute(
        path: AppRoutes.login,
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: AppRoutes.register,
        name: 'register',
        builder: (context, state) => const RegisterScreen(),
      ),

      // 主应用Shell路由
      ShellRoute(
        navigatorKey: _shellNavigatorKey,
        builder: (context, state, child) => MainScaffold(child: child),
        routes: [
          // 首页重定向到生活彩
          GoRoute(
            path: AppRoutes.home,
            redirect: (context, state) => AppRoutes.products,
          ),

          // 生活彩 - 商品相关
          GoRoute(
            path: AppRoutes.products,
            name: 'products',
            builder: (context, state) => const ProductsScreen(),
            routes: [
              GoRoute(
                path: ':id',
                name: 'product-detail',
                builder: (context, state) {
                  final id = int.parse(state.pathParameters['id']!);
                  return ProductDetailScreen(productId: id);
                },
              ),
            ],
          ),
          GoRoute(
            path: AppRoutes.cart,
            name: 'cart',
            builder: (context, state) => const CartScreen(),
          ),
          GoRoute(
            path: AppRoutes.orders,
            name: 'orders',
            builder: (context, state) => const OrdersScreen(),
          ),

          // 学习彩 - 课程相关
          GoRoute(
            path: AppRoutes.courses,
            name: 'courses',
            builder: (context, state) => const CoursesScreen(),
            routes: [
              GoRoute(
                path: ':id',
                name: 'course-detail',
                builder: (context, state) {
                  final id = int.parse(state.pathParameters['id']!);
                  return CourseDetailScreen(courseId: id);
                },
              ),
            ],
          ),
          GoRoute(
            path: AppRoutes.appointments,
            name: 'appointments',
            builder: (context, state) => const AppointmentsScreen(),
          ),

          // 旅游彩
          GoRoute(
            path: AppRoutes.travel,
            name: 'travel',
            builder: (context, state) => const TravelScreen(),
            routes: [
              GoRoute(
                path: ':id',
                name: 'travel-detail',
                builder: (context, state) {
                  final id = int.parse(state.pathParameters['id']!);
                  return TravelDetailScreen(postId: id);
                },
              ),
            ],
          ),

          // 娱乐彩
          GoRoute(
            path: AppRoutes.entertainment,
            name: 'entertainment',
            builder: (context, state) => const EntertainmentScreen(),
          ),

          // 个人中心
          GoRoute(
            path: AppRoutes.profile,
            name: 'profile',
            builder: (context, state) => const ProfileScreen(),
          ),
          GoRoute(
            path: AppRoutes.transactionHistory,
            name: 'transaction-history',
            builder: (context, state) => const TransactionHistoryScreen(),
          ),
          GoRoute(
            path: AppRoutes.settings,
            name: 'settings',
            builder: (context, state) => const SettingsScreen(),
          ),
        ],
      ),
    ],
  );
});

// 获取当前底部导航页面
BottomNavPage getCurrentBottomNavPage(String location) {
  for (final page in BottomNavPage.values) {
    if (location.startsWith(page.path)) {
      return page;
    }
  }
  return BottomNavPage.life; // 默认返回生活彩
}
