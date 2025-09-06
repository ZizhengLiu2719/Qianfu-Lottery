import 'package:json_annotation/json_annotation.dart';

part 'appointment.g.dart';

@JsonSerializable()
class OfflineCourse {
  final int id;
  final String title;
  final String description;
  final String? instructor;
  final String category;
  final int? duration;
  final String? imageUrl;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const OfflineCourse({
    required this.id,
    required this.title,
    required this.description,
    this.instructor,
    required this.category,
    this.duration,
    this.imageUrl,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory OfflineCourse.fromJson(Map<String, dynamic> json) => _$OfflineCourseFromJson(json);
  
  Map<String, dynamic> toJson() => _$OfflineCourseToJson(this);

  String get categoryDisplay {
    switch (category) {
      case 'ENGLISH_ORAL':
        return '英语口语练习';
      case 'AI_PROGRAMMING':
        return 'AI编程学习';
      default:
        return category;
    }
  }

  String get durationDisplay {
    if (duration == null) return '';
    final hours = duration! ~/ 60;
    final minutes = duration! % 60;
    if (hours > 0) {
      return minutes > 0 ? '${hours}小时${minutes}分钟' : '${hours}小时';
    }
    return '${minutes}分钟';
  }
}

@JsonSerializable()
class CourseSchedule {
  final int id;
  final int courseId;
  final DateTime startTime;
  final DateTime endTime;
  final String? location;
  final int capacity;
  final int bookedSlots;
  final int feeInQiancaiDou;
  final bool isActive;
  final DateTime createdAt;
  final OfflineCourse? course;

  const CourseSchedule({
    required this.id,
    required this.courseId,
    required this.startTime,
    required this.endTime,
    this.location,
    required this.capacity,
    required this.bookedSlots,
    required this.feeInQiancaiDou,
    required this.isActive,
    required this.createdAt,
    this.course,
  });

  factory CourseSchedule.fromJson(Map<String, dynamic> json) => _$CourseScheduleFromJson(json);
  
  Map<String, dynamic> toJson() => _$CourseScheduleToJson(this);

  bool get isAvailable => bookedSlots < capacity && startTime.isAfter(DateTime.now());
  
  int get availableSlots => capacity - bookedSlots;
  
  String get timeRange {
    final start = '${startTime.hour.toString().padLeft(2, '0')}:${startTime.minute.toString().padLeft(2, '0')}';
    final end = '${endTime.hour.toString().padLeft(2, '0')}:${endTime.minute.toString().padLeft(2, '0')}';
    return '$start - $end';
  }

  String get dateDisplay {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final scheduleDate = DateTime(startTime.year, startTime.month, startTime.day);
    
    if (scheduleDate == today) {
      return '今天';
    } else if (scheduleDate == today.add(const Duration(days: 1))) {
      return '明天';
    } else {
      return '${startTime.month}月${startTime.day}日';
    }
  }
}

@JsonSerializable()
class UserAppointment {
  final int id;
  final int userId;
  final int scheduleId;
  final String status;
  final String? note;
  final DateTime createdAt;
  final DateTime updatedAt;
  final CourseSchedule? schedule;

  const UserAppointment({
    required this.id,
    required this.userId,
    required this.scheduleId,
    required this.status,
    this.note,
    required this.createdAt,
    required this.updatedAt,
    this.schedule,
  });

  factory UserAppointment.fromJson(Map<String, dynamic> json) => _$UserAppointmentFromJson(json);
  
  Map<String, dynamic> toJson() => _$UserAppointmentToJson(this);

  String get statusDisplay {
    switch (status) {
      case 'BOOKED':
        return '已预约';
      case 'CANCELLED':
        return '已取消';
      case 'COMPLETED':
        return '已完成';
      case 'NO_SHOW':
        return '缺席';
      default:
        return status;
    }
  }

  bool get canCancel {
    if (status != 'BOOKED' || schedule == null) return false;
    
    final hoursUntilStart = schedule!.startTime.difference(DateTime.now()).inHours;
    return hoursUntilStart >= 24;
  }

  bool get isPast {
    if (schedule == null) return false;
    return schedule!.endTime.isBefore(DateTime.now());
  }

  bool get isUpcoming {
    if (schedule == null) return false;
    return schedule!.startTime.isAfter(DateTime.now()) && status == 'BOOKED';
  }
}
