import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../api/dio_client.dart';
import '../../../api/appointments_repository.dart';
import '../../../models/appointment.dart';
import '../../../core/theme/app_theme.dart';

final _courseDetailRepoProvider = Provider<AppointmentsRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return AppointmentsRepository(dio);
});

final _courseSchedulesProvider = FutureProvider.family<List<CourseSchedule>, int>((ref, courseId) async {
  final repo = ref.watch(_courseDetailRepoProvider);
  return repo.getCourseSchedules(courseId);
});

class CourseDetailScreen extends ConsumerWidget {
  final int courseId;

  const CourseDetailScreen({super.key, required this.courseId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncSchedules = ref.watch(_courseSchedulesProvider(courseId));
    return Scaffold(
      appBar: AppBar(title: const Text('课程排期')),
      body: asyncSchedules.when(
        data: (schedules) {
          if (schedules.isEmpty) return const Center(child: Text('暂无可预约时间'));
          return ListView.separated(
            padding: EdgeInsets.all(16.w),
            itemCount: schedules.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final s = schedules[index];
              return ListTile(
                contentPadding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 8.h),
                title: Text(s.course?.title ?? '课程'),
                subtitle: Text('${s.dateDisplay}  ${s.timeRange}  ·  余${s.availableSlots}'),
                trailing: ElevatedButton(
                  onPressed: s.isAvailable ? () => _book(context, ref, s) : null,
                  child: const Text('预约'),
                ),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => const Center(child: Text('加载失败')),
      ),
    );
  }

  Future<void> _book(BuildContext context, WidgetRef ref, CourseSchedule s) async {
    try {
      final repo = ref.read(_courseDetailRepoProvider);
      await repo.createAppointment(scheduleId: s.id);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('预约成功'),
            backgroundColor: AppTheme.successColor,
          ),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString()), backgroundColor: AppTheme.errorColor),
        );
      }
    }
  }
}
