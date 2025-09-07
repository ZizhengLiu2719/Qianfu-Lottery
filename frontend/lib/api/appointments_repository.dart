import '../models/models.dart';
import 'dio_client.dart';

class AppointmentsRepository {
  final DioClient _dioClient;

  AppointmentsRepository(this._dioClient);

  // 获取线下课程列表
  Future<List<OfflineCourse>> getCourses({String? category}) async {
    final response = await _dioClient.get<List<OfflineCourse>>(
      '/api/courses',
      queryParameters: {
        if (category != null) 'category': category,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final courses = data['courses'] as List;
        return courses.map((course) => OfflineCourse.fromJson(course)).toList();
      },
    );

    return response.data ?? [];
  }

  // 获取课程的时间安排
  Future<List<CourseSchedule>> getCourseSchedules(int courseId) async {
    final response = await _dioClient.get<List<CourseSchedule>>(
      '/api/courses/$courseId/schedules',
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final schedules = data['schedules'] as List;
        return schedules
            .map((schedule) => CourseSchedule.fromJson(schedule))
            .toList();
      },
    );

    return response.data ?? [];
  }

  // 创建预约
  Future<UserAppointment> createAppointment({
    required int scheduleId,
    String? note,
  }) async {
    final response = await _dioClient.post<UserAppointment>(
      '/api/appointments',
      data: {
        'scheduleId': scheduleId,
        if (note != null) 'note': note,
      },
      fromJson: (json) => UserAppointment.fromJson(json['appointment']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '创建预约失败',
      );
    }

    return response.data!;
  }

  // 获取用户预约列表
  Future<List<UserAppointment>> getUserAppointments({String? status}) async {
    final response = await _dioClient.get<List<UserAppointment>>(
      '/api/me/appointments',
      queryParameters: {
        if (status != null) 'status': status,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final appointments = data['appointments'] as List;
        return appointments
            .map((appointment) => UserAppointment.fromJson(appointment))
            .toList();
      },
    );

    return response.data ?? [];
  }

  // 取消预约
  Future<UserAppointment> cancelAppointment(int appointmentId) async {
    final response = await _dioClient.patch<UserAppointment>(
      '/api/appointments/$appointmentId/cancel',
      fromJson: (json) => UserAppointment.fromJson(json['appointment']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: '取消预约失败',
      );
    }

    return response.data!;
  }
}
