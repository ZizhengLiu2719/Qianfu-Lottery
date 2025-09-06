import '../models/models.dart';
import 'dio_client.dart';

class TravelRepository {
  final DioClient _dioClient;

  TravelRepository(this._dioClient);

  // 获取旅游文章列表
  Future<List<TravelPost>> getTravelPosts({
    int page = 1,
    int limit = 20,
    String? category,
    String? tag,
  }) async {
    final response = await _dioClient.get<List<TravelPost>>(
      '/api/travel/posts',
      queryParameters: {
        'page': page,
        'limit': limit,
        if (category != null) 'category': category,
        if (tag != null) 'tag': tag,
      },
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final posts = data['posts'] as List;
        return posts.map((post) => TravelPost.fromJson(post)).toList();
      },
    );

    return response.data ?? [];
  }

  // 获取旅游文章详情
  Future<TravelPost> getTravelPost(int postId) async {
    final response = await _dioClient.get<TravelPost>(
      '/api/travel/posts/$postId',
      fromJson: (json) => TravelPost.fromJson(json['post']),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 404,
        message: 'Travel post not found',
      );
    }

    return response.data!;
  }

  // 获取热门标签
  Future<List<TravelTag>> getPopularTags() async {
    final response = await _dioClient.get<List<TravelTag>>(
      '/api/travel/tags',
      fromJson: (json) {
        final data = json as Map<String, dynamic>;
        final tags = data['tags'] as List;
        return tags.map((tag) => TravelTag.fromJson(tag)).toList();
      },
    );

    return response.data ?? [];
  }

  // 搜索旅游文章
  Future<TravelSearchResult> searchTravelPosts({
    required String query,
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _dioClient.get<TravelSearchResult>(
      '/api/travel/search',
      queryParameters: {
        'q': query,
        'page': page,
        'limit': limit,
      },
      fromJson: (json) => TravelSearchResult.fromJson(json),
    );

    if (response.data == null) {
      throw const ApiException(
        code: 500,
        message: 'Search failed',
      );
    }

    return response.data!;
  }
}
