import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../theme/app_theme.dart';

class ResponsiveTag extends StatefulWidget {
  final String text;
  final bool isSelected;
  final VoidCallback onTap;
  final String? mobileText;
  final IconData? icon;
  final Color? selectedColor;
  final Color? unselectedColor;
  final Color? selectedTextColor;
  final Color? unselectedTextColor;

  const ResponsiveTag({
    super.key,
    required this.text,
    required this.isSelected,
    required this.onTap,
    this.mobileText,
    this.icon,
    this.selectedColor,
    this.unselectedColor,
    this.selectedTextColor,
    this.unselectedTextColor,
  });

  @override
  State<ResponsiveTag> createState() => _ResponsiveTagState();
}

class _ResponsiveTagState extends State<ResponsiveTag>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _elevationAnimation;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    
    _elevationAnimation = Tween<double>(
      begin: 2.0,
      end: 8.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _onHoverEnter() {
    setState(() {
      _isHovered = true;
    });
    _animationController.forward();
  }

  void _onHoverExit() {
    setState(() {
      _isHovered = false;
    });
    _animationController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    // 检测是否为桌面端
    final isDesktop = MediaQuery.of(context).size.width > 768;
    
    // 根据平台选择文字
    final displayText = isDesktop ? widget.text : (widget.mobileText ?? widget.text);
    
    // 动态计算尺寸 - 根据内容自适应
    final fontSize = isDesktop ? 12.sp : 11.sp;
    final iconSize = isDesktop ? 14.sp : 12.sp;
    final horizontalPadding = isDesktop ? 12.w : 10.w;
    final verticalPadding = isDesktop ? 6.h : 5.h;
    final borderRadius = isDesktop ? 16.r : 14.r;
    
    // 计算文字宽度
    final textPainter = TextPainter(
      text: TextSpan(
        text: displayText,
        style: TextStyle(
          fontSize: fontSize,
          fontWeight: widget.isSelected ? FontWeight.w600 : FontWeight.w500,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    final textWidth = textPainter.size.width;
    
    // 计算图标宽度（如果有图标）
    final iconWidth = widget.icon != null ? iconSize + (isDesktop ? 6.w : 4.w) : 0.0;
    
    // 计算总宽度
    final totalWidth = textWidth + iconWidth + (horizontalPadding * 2);
    
    // 动态高度 - 确保有足够空间容纳内容
    final tagHeight = (verticalPadding * 2) + fontSize + 4.h;
    
    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Container(
            height: tagHeight,
            width: totalWidth, // 使用动态计算的宽度
            margin: EdgeInsets.only(right: 8.w),
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              onEnter: (_) => _onHoverEnter(),
              onExit: (_) => _onHoverExit(),
              child: GestureDetector(
                onTap: widget.onTap,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeInOut,
                  width: totalWidth, // 确保Container使用动态宽度
                  height: tagHeight, // 确保Container使用动态高度
                  padding: EdgeInsets.symmetric(
                    horizontal: horizontalPadding,
                    vertical: verticalPadding,
                  ),
                  decoration: BoxDecoration(
                    color: widget.isSelected
                        ? (widget.selectedColor ?? AppTheme.primaryColor)
                        : (widget.unselectedColor ?? Colors.grey.shade50),
                    borderRadius: BorderRadius.circular(borderRadius),
                    border: Border.all(
                      color: widget.isSelected
                          ? (widget.selectedColor ?? AppTheme.primaryColor)
                          : Colors.grey.shade200,
                      width: 1.5,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: widget.isSelected
                            ? (widget.selectedColor ?? AppTheme.primaryColor)
                                .withOpacity(0.3)
                            : Colors.black.withOpacity(0.1),
                        blurRadius: _elevationAnimation.value,
                        offset: Offset(0, _elevationAnimation.value / 2),
                        spreadRadius: _isHovered ? 2.0 : 0.0,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (widget.icon != null) ...[
                        Icon(
                          widget.icon,
                          size: iconSize,
                          color: widget.isSelected
                              ? (widget.selectedTextColor ?? Colors.white)
                              : (widget.unselectedTextColor ?? Colors.black87),
                        ),
                        SizedBox(width: isDesktop ? 6.w : 4.w),
                      ],
                      Flexible(
                        child: Text(
                          displayText,
                          style: TextStyle(
                            color: widget.isSelected
                                ? (widget.selectedTextColor ?? Colors.white)
                                : (widget.unselectedTextColor ?? Colors.black87),
                            fontSize: fontSize,
                            fontWeight: widget.isSelected
                                ? FontWeight.w600
                                : FontWeight.w500,
                            height: 1.2,
                            letterSpacing: 0.3,
                          ),
                          textAlign: TextAlign.center,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class ResponsiveTagBar extends StatelessWidget {
  final List<ResponsiveTagData> tags;
  final String? selectedTag;
  final Function(String?) onTagSelected;
  final bool showScrollIndicator;
  final EdgeInsets? padding;

  const ResponsiveTagBar({
    super.key,
    required this.tags,
    this.selectedTag,
    required this.onTagSelected,
    this.showScrollIndicator = true,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final screenWidth = MediaQuery.of(context).size.width;
    
    // 电脑端使用Wrap布局确保所有标签都能显示
    if (isDesktop) {
      return Container(
        constraints: BoxConstraints(
          minHeight: 50.h,
          maxHeight: 150.h, // 允许换行，增加最大高度
        ),
        padding: padding ?? EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
        child: Wrap(
          spacing: 6.w,  // 适中的间距
          runSpacing: 6.h,  // 适中的行间距
          alignment: WrapAlignment.start,
          children: tags.map((tag) {
            final isSelected = selectedTag == tag.key;
            return ResponsiveTag(
              text: tag.text,
              mobileText: tag.mobileText,
              isSelected: isSelected,
              onTap: () => onTagSelected(tag.key),
              icon: tag.icon,
              selectedColor: tag.selectedColor,
              unselectedColor: tag.unselectedColor,
              selectedTextColor: tag.selectedTextColor,
              unselectedTextColor: tag.unselectedTextColor,
            );
          }).toList(),
        ),
      );
    }
    
    // 手机端使用ListView布局
    return Container(
      height: 50.h,
      padding: padding ?? EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: tags.length,
        itemBuilder: (context, index) {
          final tag = tags[index];
          final isSelected = selectedTag == tag.key;
          
          return ResponsiveTag(
            text: tag.text,
            mobileText: tag.mobileText,
            isSelected: isSelected,
            onTap: () => onTagSelected(tag.key),
            icon: tag.icon,
            selectedColor: tag.selectedColor,
            unselectedColor: tag.unselectedColor,
            selectedTextColor: tag.selectedTextColor,
            unselectedTextColor: tag.unselectedTextColor,
          );
        },
      ),
    );
  }
}

class ResponsiveTagData {
  final String? key;
  final String text;
  final String? mobileText;
  final IconData? icon;
  final Color? selectedColor;
  final Color? unselectedColor;
  final Color? selectedTextColor;
  final Color? unselectedTextColor;

  const ResponsiveTagData({
    this.key,
    required this.text,
    this.mobileText,
    this.icon,
    this.selectedColor,
    this.unselectedColor,
    this.selectedTextColor,
    this.unselectedTextColor,
  });
}
