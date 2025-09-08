import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../api/dio_client.dart';
import '../../../api/appointments_repository.dart';
import '../../../models/appointment.dart';

final _appointmentsRepoProvider = Provider<AppointmentsRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return AppointmentsRepository(dio);
});

final _myAppointmentsProvider = FutureProvider<List<UserAppointment>>((ref) async {
  final repo = ref.watch(_appointmentsRepoProvider);
  return repo.getUserAppointments();
});

class AppointmentsScreen extends ConsumerWidget {
  const AppointmentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncData = ref.watch(_myAppointmentsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('我的预约')),
      body: asyncData.when(
        data: (list) {
          if (list.isEmpty) return const Center(child: Text('暂无预约'));
          return ListView.separated(
            itemCount: list.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final a = list[index];
              final schedule = a.schedule;
              return Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(schedule?.course?.title ?? '课程', style: Theme.of(context).textTheme.titleMedium),
                    SizedBox(height: 6.h),
                    Text('${schedule?.dateDisplay ?? ''}  ${schedule?.timeRange ?? ''}'),
                    SizedBox(height: 6.h),
                    Text(a.statusDisplay, style: Theme.of(context).textTheme.titleSmall),
                  ],
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
}
