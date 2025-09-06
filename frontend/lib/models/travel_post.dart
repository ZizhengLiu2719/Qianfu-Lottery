import 'package:json_annotation/json_annotation.dart';

part 'travel_post.g.dart';

@JsonSerializable()
class TravelPost {
  final int id;
  final String title;
  final String content;
  final String? summary;
  final String category;
  final List<String> tags;
  final String? imageUrl;
  final List<String> images;
  final String? author;
  final bool isPublished;
  final int viewCount;
  final DateTime createdAt;
  final DateTime updatedAt;

  const TravelPost({
    required this.id,
    required this.title,
    required this.content,
    this.summary,
    required this.category,
    required this.tags,
    this.imageUrl,
    required this.images,
    this.author,
    required this.isPublished,
    required this.viewCount,
    required this.createdAt,
    required this.updatedAt,
  });

  factory TravelPost.fromJson(Map<String, dynamic> json) => _$TravelPostFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelPostToJson(this);

  String get categoryDisplay {
    switch (category) {
      case 'DOMESTIC':
        return '国内旅游';
      case 'INTERNATIONAL':
        return '国际旅游';
      default:
        return category;
    }
  }

  String get mainImage => imageUrl ?? (images.isNotEmpty ? images.first : '');

  String get displaySummary => summary ?? content.substring(0, content.length > 100 ? 100 : content.length);

  String get readingTime {
    final words = content.length;
    final minutes = (words / 500).ceil(); // 假设每分钟阅读500字
    return '${minutes}分钟阅读';
  }
}

@JsonSerializable()
class TravelTag {
  final String tag;
  final int count;

  const TravelTag({
    required this.tag,
    required this.count,
  });

  factory TravelTag.fromJson(Map<String, dynamic> json) => _$TravelTagFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelTagToJson(this);
}

@JsonSerializable()
class TravelSearchResult {
  final List<TravelPost> posts;
  final String query;
  final Pagination pagination;

  const TravelSearchResult({
    required this.posts,
    required this.query,
    required this.pagination,
  });

  factory TravelSearchResult.fromJson(Map<String, dynamic> json) => _$TravelSearchResultFromJson(json);
  
  Map<String, dynamic> toJson() => _$TravelSearchResultToJson(this);
}

@JsonSerializable()
class Pagination {
  final int page;
  final int limit;
  final int total;
  final int totalPages;

  const Pagination({
    required this.page,
    required this.limit,
    required this.total,
    required this.totalPages,
  });

  factory Pagination.fromJson(Map<String, dynamic> json) => _$PaginationFromJson(json);
  
  Map<String, dynamic> toJson() => _$PaginationToJson(this);

  bool get hasNext => page < totalPages;
  bool get hasPrevious => page > 1;
}
