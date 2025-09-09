import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../api/order_repository.dart';
import '../../../api/dio_client.dart';
import '../../../models/order.dart';

// Providers
final orderRepositoryProvider = Provider<OrderRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return OrderRepository(dioClient);
});

final ordersProvider = StateNotifierProvider<OrderNotifier, List<Order>>((ref) {
  final repository = ref.watch(orderRepositoryProvider);
  return OrderNotifier(repository);
});

final orderDetailProvider = StateNotifierProvider.family<OrderDetailNotifier, Order?, int>((ref, orderId) {
  final repository = ref.watch(orderRepositoryProvider);
  return OrderDetailNotifier(repository, orderId);
});

class OrderNotifier extends StateNotifier<List<Order>> {
  final OrderRepository _repository;

  OrderNotifier(this._repository) : super([]) {
    loadOrders();
  }

  Future<void> loadOrders({String? status}) async {
    try {
      final response = await _repository.getOrders(status: status);
      if (response.code == 200) {
        state = response.data?.orders ?? [];
      }
    } catch (e) {
      // Handle error
      state = [];
    }
  }

  Future<Order?> createOrderFromCart({
    required int shippingAddressId,
    String? note,
  }) async {
    try {
      final response = await _repository.createOrderFromCart(
        shippingAddressId: shippingAddressId,
        note: note,
      );

      if (response.code == 200) {
        await loadOrders(); // Reload to get updated list
        return response.data;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> payOrder(int id) async {
    try {
      final response = await _repository.payOrder(id);
      if (response.code == 200) {
        await loadOrders(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> cancelOrder(int id) async {
    try {
      final response = await _repository.cancelOrder(id);
      if (response.code == 200) {
        await loadOrders(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> confirmDelivery(int id) async {
    try {
      final response = await _repository.confirmDelivery(id);
      if (response.code == 200) {
        await loadOrders(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

class OrderDetailNotifier extends StateNotifier<Order?> {
  final OrderRepository _repository;
  final int _orderId;

  OrderDetailNotifier(this._repository, this._orderId) : super(null) {
    loadOrder();
  }

  Future<void> loadOrder() async {
    try {
      final response = await _repository.getOrder(_orderId);
      if (response.code == 200) {
        state = response.data;
      }
    } catch (e) {
      // Handle error
      state = null;
    }
  }

  Future<void> refresh() async {
    await loadOrder();
  }

  Future<bool> payOrder() async {
    try {
      final response = await _repository.payOrder(_orderId);
      if (response.code == 200) {
        state = response.data;
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> cancelOrder() async {
    try {
      final response = await _repository.cancelOrder(_orderId);
      if (response.code == 200) {
        state = response.data;
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> confirmDelivery() async {
    try {
      final response = await _repository.confirmDelivery(_orderId);
      if (response.code == 200) {
        state = response.data;
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
