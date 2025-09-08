import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TravelDetailScreen extends ConsumerWidget {
  final int postId;

  const TravelDetailScreen({super.key, required this.postId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text('旅游详情')),
      body: Center(
        child: Text('旅游文章详情 - ID: $postId'),
      ),
    );
  }
}
