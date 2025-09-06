import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../../../routing/app_router.dart';
import '../../auth/providers/auth_provider.dart';

class MainScaffold extends ConsumerWidget {
  final Widget child;

  const MainScaffold({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final location = GoRouterState.of(context).location;
    final currentPage = getCurrentBottomNavPage(location);
    final user = ref.watch(currentUserProvider);
    final qiancaiDouBalance = ref.watch(qiancaiDouBalanceProvider);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: currentPage.index,
          type: BottomNavigationBarType.fixed,
          backgroundColor: Theme.of(context).colorScheme.surface,
          selectedItemColor: Theme.of(context).primaryColor,
          unselectedItemColor: Theme.of(context).colorScheme.onSurface.withOpacity(0.6),
          selectedFontSize: 12,
          unselectedFontSize: 12,
          elevation: 0,
          onTap: (index) {
            final page = BottomNavPage.values[index];
            context.go(page.path);
          },
          items: [
            BottomNavigationBarItem(
              icon: const Icon(FeatherIcons.shoppingBag, size: 20),
              activeIcon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  FeatherIcons.shoppingBag,
                  size: 20,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              label: AppLocalizations.of(context)!.nav_life,
            ),
            BottomNavigationBarItem(
              icon: const Icon(FeatherIcons.bookOpen, size: 20),
              activeIcon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  FeatherIcons.bookOpen,
                  size: 20,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              label: AppLocalizations.of(context)!.nav_learning,
            ),
            BottomNavigationBarItem(
              icon: const Icon(FeatherIcons.map, size: 20),
              activeIcon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  FeatherIcons.map,
                  size: 20,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              label: AppLocalizations.of(context)!.nav_travel,
            ),
            BottomNavigationBarItem(
              icon: const Icon(FeatherIcons.smile, size: 20),
              activeIcon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  FeatherIcons.smile,
                  size: 20,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              label: AppLocalizations.of(context)!.nav_entertainment,
            ),
            BottomNavigationBarItem(
              icon: Stack(
                clipBehavior: Clip.none,
                children: [
                  const Icon(FeatherIcons.user, size: 20),
                  if (qiancaiDouBalance > 0)
                    Positioned(
                      right: -8,
                      top: -4,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 4,
                          vertical: 1,
                        ),
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.secondary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 16,
                          minHeight: 16,
                        ),
                        child: Text(
                          qiancaiDouBalance > 999 ? '999+' : qiancaiDouBalance.toString(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 8,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
              activeIcon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  FeatherIcons.user,
                  size: 20,
                  color: Theme.of(context).primaryColor,
                ),
              ),
              label: AppLocalizations.of(context)!.nav_profile,
            ),
          ],
        ),
      ),
    );
  }
}
