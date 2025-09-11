import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class TravelDetailScreen extends ConsumerWidget {
  final int postId;

  const TravelDetailScreen({super.key, required this.postId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text(AppLocalizations.of(context)!.travel_details)),
      body: Center(
        child: Text('${AppLocalizations.of(context)!.travel_details} - ID: $postId'),
      ),
    );
  }
}
