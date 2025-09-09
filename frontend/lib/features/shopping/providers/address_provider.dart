import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../api/address_repository.dart';
import '../../../api/dio_client.dart';
import '../../../models/address.dart';

// Providers
final addressRepositoryProvider = Provider<AddressRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return AddressRepository(dioClient);
});

final addressesProvider = StateNotifierProvider<AddressNotifier, List<Address>>((ref) {
  final repository = ref.watch(addressRepositoryProvider);
  return AddressNotifier(repository);
});

final defaultAddressProvider = Provider<Address?>((ref) {
  final addresses = ref.watch(addressesProvider);
  try {
    return addresses.firstWhere((address) => address.isDefault);
  } catch (e) {
    return null;
  }
});

class AddressNotifier extends StateNotifier<List<Address>> {
  final AddressRepository _repository;

  AddressNotifier(this._repository) : super([]) {
    loadAddresses();
  }

  Future<void> loadAddresses() async {
    try {
      final response = await _repository.getAddresses();
      if (response.code == 200) {
        state = response.data ?? [];
      }
    } catch (e) {
      // Handle error
      state = [];
    }
  }

  Future<Address?> createAddress({
    required String receiverName,
    required String phone,
    required String province,
    required String city,
    String? district,
    required String detail,
    String? zip,
    bool isDefault = false,
  }) async {
    try {
      final response = await _repository.createAddress(
        receiverName: receiverName,
        phone: phone,
        province: province,
        city: city,
        district: district,
        detail: detail,
        zip: zip,
        isDefault: isDefault,
      );

      if (response.code == 200) {
        await loadAddresses(); // Reload to get updated list
        return response.data;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> updateAddress({
    required int id,
    String? receiverName,
    String? phone,
    String? province,
    String? city,
    String? district,
    String? detail,
    String? zip,
    bool? isDefault,
  }) async {
    try {
      final response = await _repository.updateAddress(
        id: id,
        receiverName: receiverName,
        phone: phone,
        province: province,
        city: city,
        district: district,
        detail: detail,
        zip: zip,
        isDefault: isDefault,
      );

      if (response.code == 200) {
        await loadAddresses(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> deleteAddress(int id) async {
    try {
      final response = await _repository.deleteAddress(id);
      if (response.code == 200) {
        await loadAddresses(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> setDefaultAddress(int id) async {
    try {
      final response = await _repository.setDefaultAddress(id);
      if (response.code == 200) {
        await loadAddresses(); // Reload to get updated list
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
