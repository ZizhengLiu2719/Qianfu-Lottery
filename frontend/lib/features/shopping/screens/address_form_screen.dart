import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../providers/address_provider.dart';
import '../../../models/address.dart';

class AddressFormScreen extends ConsumerStatefulWidget {
  final Address? address;

  const AddressFormScreen({super.key, this.address});

  @override
  ConsumerState<AddressFormScreen> createState() => _AddressFormScreenState();
}

class _AddressFormScreenState extends ConsumerState<AddressFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _receiverNameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _provinceController = TextEditingController();
  final _cityController = TextEditingController();
  final _districtController = TextEditingController();
  final _detailController = TextEditingController();
  final _zipController = TextEditingController();
  bool _isDefault = false;

  @override
  void initState() {
    super.initState();
    if (widget.address != null) {
      _receiverNameController.text = widget.address!.receiverName;
      _phoneController.text = widget.address!.phone;
      _provinceController.text = widget.address!.province;
      _cityController.text = widget.address!.city;
      _districtController.text = widget.address!.district ?? '';
      _detailController.text = widget.address!.detail;
      _zipController.text = widget.address!.zip ?? '';
      _isDefault = widget.address!.isDefault;
    }
  }

  @override
  void dispose() {
    _receiverNameController.dispose();
    _phoneController.dispose();
    _provinceController.dispose();
    _cityController.dispose();
    _districtController.dispose();
    _detailController.dispose();
    _zipController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          widget.address == null ? AppLocalizations.of(context)!.address_title_add : AppLocalizations.of(context)!.address_title_edit,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.textPrimary,
          ),
        ),
        leading: IconButton(
          icon: Icon(FeatherIcons.arrowLeft, color: AppTheme.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle(AppLocalizations.of(context)!.address_section_contact),
              SizedBox(height: 12.h),
              _buildTextField(
                controller: _receiverNameController,
                label: AppLocalizations.of(context)!.address_receiver_name,
                hint: AppLocalizations.of(context)!.address_receiver_name,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppLocalizations.of(context)!.address_receiver_name;
                  }
                  return null;
                },
              ),
              SizedBox(height: 16.h),
              _buildTextField(
                controller: _phoneController,
                label: AppLocalizations.of(context)!.address_phone,
                hint: AppLocalizations.of(context)!.address_phone,
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppLocalizations.of(context)!.address_phone;
                  }
                  if (!RegExp(r'^1[3-9]\\d{9}$').hasMatch(value)) {
                    return AppLocalizations.of(context)!.address_phone;
                  }
                  return null;
                },
              ),
              SizedBox(height: 24.h),
              _buildSectionTitle(AppLocalizations.of(context)!.address_section_address),
              SizedBox(height: 12.h),
              Row(
                children: [
                  Expanded(
                    child: _buildTextField(
                      controller: _provinceController,
                      label: AppLocalizations.of(context)!.address_province,
                      hint: AppLocalizations.of(context)!.address_province,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppLocalizations.of(context)!.address_province;
                        }
                        return null;
                      },
                    ),
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: _buildTextField(
                      controller: _cityController,
                      label: AppLocalizations.of(context)!.address_city,
                      hint: AppLocalizations.of(context)!.address_city,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppLocalizations.of(context)!.address_city;
                        }
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.h),
              _buildTextField(
                controller: _districtController,
                label: AppLocalizations.of(context)!.address_district_optional,
                hint: AppLocalizations.of(context)!.address_district_optional,
              ),
              SizedBox(height: 16.h),
              _buildTextField(
                controller: _detailController,
                label: AppLocalizations.of(context)!.address_detail,
                hint: AppLocalizations.of(context)!.address_detail,
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppLocalizations.of(context)!.address_detail;
                  }
                  return null;
                },
              ),
              SizedBox(height: 16.h),
              _buildTextField(
                controller: _zipController,
                label: AppLocalizations.of(context)!.address_zip_optional,
                hint: AppLocalizations.of(context)!.address_zip_optional,
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 24.h),
              _buildSectionTitle(AppLocalizations.of(context)!.app_settings),
              SizedBox(height: 12.h),
              Container(
                padding: EdgeInsets.all(16.w),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12.r),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Icon(
                      FeatherIcons.star,
                      color: _isDefault ? AppTheme.primaryColor : AppTheme.textTertiary,
                      size: 20.sp,
                    ),
                    SizedBox(width: 12.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context)!.address_set_default,
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(height: 4.h),
                          Text(
                            AppLocalizations.of(context)!.address_set_default_desc,
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppTheme.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Switch(
                      value: _isDefault,
                      onChanged: (value) {
                        setState(() {
                          _isDefault = value;
                        });
                      },
                      activeColor: AppTheme.primaryColor,
                    ),
                  ],
                ),
              ),
              SizedBox(height: 32.h),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Container(
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: _submitForm,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryColor,
              padding: EdgeInsets.symmetric(vertical: 16.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.r),
              ),
            ),
            child: Text(
              widget.address == null ? AppLocalizations.of(context)!.address_save : AppLocalizations.of(context)!.address_update,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: Theme.of(context).textTheme.titleMedium?.copyWith(
        fontWeight: FontWeight.bold,
        color: AppTheme.textPrimary,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    TextInputType? keyboardType,
    int maxLines = 1,
    String? Function(String?)? validator,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: TextFormField(
        controller: controller,
        keyboardType: keyboardType,
        maxLines: maxLines,
        validator: validator,
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12.r),
            borderSide: BorderSide.none,
          ),
          filled: true,
          fillColor: Colors.white,
          contentPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h),
        ),
      ),
    );
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final addressNotifier = ref.read(addressesProvider.notifier);
    Address? result;

    if (widget.address == null) {
      // 创建新地址
      result = await addressNotifier.createAddress(
        receiverName: _receiverNameController.text,
        phone: _phoneController.text,
        province: _provinceController.text,
        city: _cityController.text,
        district: _districtController.text.isEmpty ? null : _districtController.text,
        detail: _detailController.text,
        zip: _zipController.text.isEmpty ? null : _zipController.text,
        isDefault: _isDefault,
      );
    } else {
      // 更新地址
      final success = await addressNotifier.updateAddress(
        id: widget.address!.id,
        receiverName: _receiverNameController.text,
        phone: _phoneController.text,
        province: _provinceController.text,
        city: _cityController.text,
        district: _districtController.text.isEmpty ? null : _districtController.text,
        detail: _detailController.text,
        zip: _zipController.text.isEmpty ? null : _zipController.text,
        isDefault: _isDefault,
      );
      result = success ? widget.address : null;
    }

    if (result != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(widget.address == null ? AppLocalizations.of(context)!.address_saved : AppLocalizations.of(context)!.address_updated),
          backgroundColor: AppTheme.successColor,
        ),
      );
      Navigator.of(context).pop();
    } else if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(AppLocalizations.of(context)!.action_failed),
          backgroundColor: AppTheme.errorColor,
        ),
      );
    }
  }
}
