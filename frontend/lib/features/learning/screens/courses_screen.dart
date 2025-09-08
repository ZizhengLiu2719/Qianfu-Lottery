import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../api/dio_client.dart';
import '../../../api/appointments_repository.dart';
import '../../../models/appointment.dart';
import '../../../routing/app_router.dart';
import 'course_detail_screen.dart';

final _coursesRepoProvider = Provider<AppointmentsRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return AppointmentsRepository(dio);
});

final _coursesProvider = FutureProvider<List<OfflineCourse>>((ref) async {
  final repo = ref.watch(_coursesRepoProvider);
  return repo.getCourses();
});

class CoursesScreen extends ConsumerWidget {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: const Text('线上课程预约'),
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.w),
        child: Consumer(
          builder: (context, ref, _) {
            final asyncCourses = ref.watch(_coursesProvider);
            return asyncCourses.when(
              data: (courses) {
                if (courses.isEmpty) {
                  return const Center(child: Text('暂无课程'));
                }
                return ListView.separated(
                  itemCount: courses.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final c = courses[index];
                    return ListTile(
                      contentPadding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 8.h),
                      leading: CircleAvatar(
                        backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
                        backgroundImage: (c.imageUrl != null && c.imageUrl!.isNotEmpty)
                            ? NetworkImage(c.imageUrl!)
                            : null,
                        child: (c.imageUrl == null || c.imageUrl!.isEmpty)
                            ? const Icon(FeatherIcons.bookOpen, color: AppTheme.primaryColor)
                            : null,
                      ),
                      title: Text(c.title),
                      subtitle: Text(c.categoryDisplay),
                      onTap: () => Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => CourseDetailScreen(courseId: c.id),
                        ),
                      ),
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => const Center(child: Text('加载失败')),
            );
          },
        ),
      ),
    );
  }
}

