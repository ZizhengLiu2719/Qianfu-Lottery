import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../../../routing/app_router.dart';
import '../providers/feedback_provider.dart';
import '../../../models/feedback.dart' as models;

class FeedbackScreen extends ConsumerStatefulWidget {
  const FeedbackScreen({super.key});

  @override
  ConsumerState<FeedbackScreen> createState() => _FeedbackScreenState();
}

class _FeedbackScreenState extends ConsumerState<FeedbackScreen> {
  @override
  void initState() {
    super.initState();
    // 加载用户反馈列表
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(userFeedbackProvider.notifier).loadUserFeedback();
    });
  }

  @override
  Widget build(BuildContext context) {
    final feedbackList = ref.watch(userFeedbackProvider);
    final isDesktop = MediaQuery.of(context).size.width > 768;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('平台反馈'),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(FeatherIcons.arrowLeft),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(FeatherIcons.plus),
            onPressed: () => _showCreateFeedbackDialog(context),
            tooltip: '新建反馈',
          ),
        ],
      ),
      body: feedbackList.isEmpty
          ? _buildEmptyState(context, isDesktop)
          : _buildFeedbackList(context, isDesktop, feedbackList),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showCreateFeedbackDialog(context),
        backgroundColor: AppTheme.primaryColor,
        child: const Icon(FeatherIcons.plus, color: Colors.white),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context, bool isDesktop) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            FeatherIcons.messageCircle,
            size: isDesktop ? 80.sp : 100.sp,
            color: Colors.grey.shade300,
          ),
          SizedBox(height: 24.h),
          Text(
            '暂无反馈记录',
            style: TextStyle(
              fontSize: isDesktop ? 18.sp : 20.sp,
              fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '点击右上角 + 号创建您的第一条反馈',
            style: TextStyle(
              fontSize: isDesktop ? 14.sp : 16.sp,
              color: AppTheme.textTertiary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeedbackList(BuildContext context, bool isDesktop, List<models.Feedback> feedbackList) {
    return ListView.builder(
      padding: EdgeInsets.all(16.w),
      itemCount: feedbackList.length,
      itemBuilder: (context, index) {
        final feedback = feedbackList[index];
        return _buildFeedbackCard(context, feedback, isDesktop);
      },
    );
  }

  Widget _buildFeedbackCard(BuildContext context, models.Feedback feedback, bool isDesktop) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      padding: EdgeInsets.all(isDesktop ? 12.w : 16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: isDesktop ? 6 : 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  feedback.title,
                  style: TextStyle(
                    fontSize: isDesktop ? 14.sp : 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: isDesktop ? 6.w : 8.w,
                  vertical: isDesktop ? 3.h : 4.h,
                ),
                decoration: BoxDecoration(
                  color: _getStatusColor(feedback.status).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
                ),
                child: Text(
                  feedback.statusDisplayText,
                  style: TextStyle(
                    fontSize: isDesktop ? 10.sp : 12.sp,
                    color: _getStatusColor(feedback.status),
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: isDesktop ? 6.h : 8.h),
          Text(
            feedback.content,
            style: TextStyle(
              fontSize: isDesktop ? 12.sp : 14.sp,
              color: AppTheme.textSecondary,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          SizedBox(height: isDesktop ? 8.h : 12.h),
          Row(
            children: [
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: isDesktop ? 6.w : 8.w,
                  vertical: isDesktop ? 3.h : 4.h,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(isDesktop ? 8.r : 12.r),
                ),
                child: Text(
                  feedback.categoryDisplayText,
                  style: TextStyle(
                    fontSize: isDesktop ? 10.sp : 12.sp,
                    color: AppTheme.primaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              SizedBox(width: 8.w),
              Text(
                '创建于 ${_formatDate(feedback.createdAt)}',
                style: TextStyle(
                  fontSize: isDesktop ? 10.sp : 12.sp,
                  color: AppTheme.textTertiary,
                ),
              ),
              const Spacer(),
              if (feedback.adminReply != null)
                Icon(
                  FeatherIcons.messageSquare,
                  size: isDesktop ? 14.sp : 16.sp,
                  color: AppTheme.primaryColor,
                ),
            ],
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'pending':
        return Colors.orange;
      case 'in_progress':
        return Colors.blue;
      case 'resolved':
        return Colors.green;
      case 'closed':
        return Colors.grey;
      default:
        return Colors.grey;
    }
  }

  String _formatDate(DateTime date) {
    return '${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  void _showCreateFeedbackDialog(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => const CreateFeedbackScreen(),
      ),
    );
  }
}

class CreateFeedbackScreen extends ConsumerStatefulWidget {
  const CreateFeedbackScreen({super.key});

  @override
  ConsumerState<CreateFeedbackScreen> createState() => _CreateFeedbackScreenState();
}

class _CreateFeedbackScreenState extends ConsumerState<CreateFeedbackScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();
  String _selectedCategory = 'general';
  String _selectedPriority = 'medium';
  bool _isSubmitting = false;

  List<Map<String, String>> _getCategories(BuildContext context) => [
    {'value': 'general', 'label': AppLocalizations.of(context)!.feedback_category_general},
    {'value': 'bug', 'label': AppLocalizations.of(context)!.feedback_category_bug},
    {'value': 'feature', 'label': AppLocalizations.of(context)!.feedback_category_feature},
    {'value': 'suggestion', 'label': AppLocalizations.of(context)!.feedback_category_suggestion},
    {'value': 'complaint', 'label': AppLocalizations.of(context)!.feedback_category_complaint},
  ];

  List<Map<String, String>> _getPriorities(BuildContext context) => [
    {'value': 'low', 'label': AppLocalizations.of(context)!.feedback_priority_low},
    {'value': 'medium', 'label': AppLocalizations.of(context)!.feedback_priority_medium},
    {'value': 'high', 'label': AppLocalizations.of(context)!.feedback_priority_high},
    {'value': 'urgent', 'label': AppLocalizations.of(context)!.feedback_priority_urgent},
  ];

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('新建反馈'),
        backgroundColor: Colors.white,
        foregroundColor: AppTheme.textPrimary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(FeatherIcons.arrowLeft),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          TextButton(
            onPressed: _isSubmitting ? null : _submitFeedback,
            child: _isSubmitting
                ? SizedBox(
                    width: 16.w,
                    height: 16.w,
                    child: const CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text('提交'),
          ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 标题输入
              Text(
                '反馈标题',
                style: TextStyle(
                  fontSize: isDesktop ? 14.sp : 16.sp,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              SizedBox(height: 8.h),
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(
                  hintText: '请简要描述您的问题或建议',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.r),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return '请输入反馈标题';
                  }
                  if (value.trim().length < 5) {
                    return '标题至少需要5个字符';
                  }
                  return null;
                },
              ),
              SizedBox(height: 24.h),

              // 分类选择
              Text(
                '反馈分类',
                style: TextStyle(
                  fontSize: isDesktop ? 14.sp : 16.sp,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              SizedBox(height: 8.h),
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.r),
                  ),
                ),
                items: _getCategories(context).map((category) {
                  return DropdownMenuItem(
                    value: category['value'],
                    child: Text(category['label']!),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedCategory = value!;
                  });
                },
              ),
              SizedBox(height: 24.h),

              // 优先级选择
              Text(
                '优先级',
                style: TextStyle(
                  fontSize: isDesktop ? 14.sp : 16.sp,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              SizedBox(height: 8.h),
              DropdownButtonFormField<String>(
                value: _selectedPriority,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.r),
                  ),
                ),
                items: _getPriorities(context).map((priority) {
                  return DropdownMenuItem(
                    value: priority['value'],
                    child: Text(priority['label']!),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedPriority = value!;
                  });
                },
              ),
              SizedBox(height: 24.h),

              // 内容输入
              Text(
                '详细描述',
                style: TextStyle(
                  fontSize: isDesktop ? 14.sp : 16.sp,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              SizedBox(height: 8.h),
              TextFormField(
                controller: _contentController,
                maxLines: 8,
                decoration: InputDecoration(
                  hintText: '请详细描述您遇到的问题或建议，包括复现步骤、期望结果等...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.r),
                  ),
                  alignLabelWithHint: true,
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return '请输入详细描述';
                  }
                  if (value.trim().length < 10) {
                    return '详细描述至少需要10个字符';
                  }
                  return null;
                },
              ),
              SizedBox(height: 32.h),

              // 提交按钮
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitFeedback,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primaryColor,
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 16.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                  ),
                  child: _isSubmitting
                      ? SizedBox(
                          width: 20.w,
                          height: 20.w,
                          child: const CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                          ),
                        )
                      : Text(
                          '提交反馈',
                          style: TextStyle(fontSize: isDesktop ? 14.sp : 16.sp),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _submitFeedback() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    try {
      final request = models.CreateFeedbackRequest(
        title: _titleController.text.trim(),
        content: _contentController.text.trim(),
        category: _selectedCategory,
        priority: _selectedPriority,
      );

      final success = await ref.read(userFeedbackProvider.notifier).createFeedback(request);

      if (success) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(AppLocalizations.of(context)!.success_feedback_submitted),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.of(context).pop();
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(AppLocalizations.of(context)!.common_failed),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${AppLocalizations.of(context)!.common_failed}: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }
}
