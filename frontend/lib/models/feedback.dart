class Feedback {
  final int id;
  final int userId;
  final String title;
  final String content;
  final String category;
  final String status;
  final String priority;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? adminReply;
  final DateTime? adminRepliedAt;

  const Feedback({
    required this.id,
    required this.userId,
    required this.title,
    required this.content,
    required this.category,
    required this.status,
    required this.priority,
    required this.createdAt,
    required this.updatedAt,
    this.adminReply,
    this.adminRepliedAt,
  });

  factory Feedback.fromJson(Map<String, dynamic> json) {
    return Feedback(
      id: json['id'] as int,
      userId: json['userId'] as int,
      title: json['title'] as String,
      content: json['content'] as String,
      category: json['category'] as String,
      status: json['status'] as String,
      priority: json['priority'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      adminReply: json['adminReply'] as String?,
      adminRepliedAt: json['adminRepliedAt'] != null 
          ? DateTime.parse(json['adminRepliedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'content': content,
      'category': category,
      'status': status,
      'priority': priority,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'adminReply': adminReply,
      'adminRepliedAt': adminRepliedAt?.toIso8601String(),
    };
  }

  Feedback copyWith({
    int? id,
    int? userId,
    String? title,
    String? content,
    String? category,
    String? status,
    String? priority,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? adminReply,
    DateTime? adminRepliedAt,
  }) {
    return Feedback(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      content: content ?? this.content,
      category: category ?? this.category,
      status: status ?? this.status,
      priority: priority ?? this.priority,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      adminReply: adminReply ?? this.adminReply,
      adminRepliedAt: adminRepliedAt ?? this.adminRepliedAt,
    );
  }

  // 获取状态显示文本
  String get statusDisplayText {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'in_progress':
        return '处理中';
      case 'resolved':
        return '已解决';
      case 'closed':
        return '已关闭';
      default:
        return status;
    }
  }

  // 获取分类显示文本
  String get categoryDisplayText {
    switch (category) {
      case 'general':
        return '一般反馈';
      case 'bug':
        return '错误报告';
      case 'feature':
        return '功能建议';
      case 'suggestion':
        return '改进建议';
      case 'complaint':
        return '投诉';
      default:
        return category;
    }
  }

  // 获取优先级显示文本
  String get priorityDisplayText {
    switch (priority) {
      case 'low':
        return '低';
      case 'medium':
        return '中';
      case 'high':
        return '高';
      case 'urgent':
        return '紧急';
      default:
        return priority;
    }
  }

  // 获取状态颜色
  String get statusColor {
    switch (status) {
      case 'pending':
        return '#FFA726'; // 橙色
      case 'in_progress':
        return '#2196F3'; // 蓝色
      case 'resolved':
        return '#4CAF50'; // 绿色
      case 'closed':
        return '#9E9E9E'; // 灰色
      default:
        return '#9E9E9E';
    }
  }
}

// 创建反馈请求模型
class CreateFeedbackRequest {
  final String title;
  final String content;
  final String category;
  final String priority;

  const CreateFeedbackRequest({
    required this.title,
    required this.content,
    required this.category,
    required this.priority,
  });

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'content': content,
      'category': category,
      'priority': priority,
    };
  }
}
