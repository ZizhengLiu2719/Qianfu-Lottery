import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_feather_icons/flutter_feather_icons.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/qiancai_dou_icon.dart';
import '../providers/cart_provider.dart';
import '../providers/address_provider.dart';
import '../providers/order_provider.dart';
import '../../../models/address.dart';
import '../../../models/product.dart';
import '../../../models/order.dart';
import 'address_list_screen.dart';
import 'payment_success_screen.dart';

class CheckoutScreen extends ConsumerStatefulWidget {
  const CheckoutScreen({super.key});

  @override
  ConsumerState<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends ConsumerState<CheckoutScreen> {
  Address? _selectedAddress;
  String _note = '';
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadDefaultAddress();
    });
  }

  Future<void> _loadDefaultAddress() async {
    // 先加载地址列表，然后获取默认地址
    await ref.read(addressesProvider.notifier).loadAddresses();
    final defaultAddress = ref.read(defaultAddressProvider);
    if (defaultAddress != null) {
      setState(() {
        _selectedAddress = defaultAddress;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width > 768;
    final cartItems = ref.watch(cartItemsProvider);
    final totalCost = ref.watch(cartTotalCostProvider);

    if (cartItems.isEmpty) {
      return Scaffold(
        backgroundColor: AppTheme.backgroundColor,
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          title: Text(
            '确认订单',
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
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                FeatherIcons.shoppingCart,
                size: 80.sp,
                color: AppTheme.textTertiary,
              ),
              SizedBox(height: 16.h),
              Text(
                '购物车为空',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: AppTheme.textTertiary,
                ),
              ),
              SizedBox(height: 8.h),
              Text(
                '请先添加商品到购物车',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppTheme.textTertiary,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          '确认订单',
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
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildAddressSection(),
                  SizedBox(height: 24.h),
                  _buildOrderItemsSection(cartItems),
                  SizedBox(height: 24.h),
                  _buildNoteSection(),
                ],
              ),
            ),
          ),
          _buildBottomBar(totalCost, isDesktop),
        ],
      ),
    );
  }

  Widget _buildAddressSection() {
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
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(FeatherIcons.mapPin, color: AppTheme.primaryColor, size: 20.sp),
                SizedBox(width: 8.w),
                Text(
                  '收货地址',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: () async {
                    final result = await Navigator.of(context).push<Address>(
                      MaterialPageRoute(
                        builder: (context) => AddressListScreen(
                          onAddressSelected: (address) {
                            setState(() {
                              _selectedAddress = address;
                            });
                          },
                        ),
                      ),
                    );
                  },
                  child: Text(
                    _selectedAddress == null ? '选择地址' : '更换地址',
                    style: TextStyle(
                      color: AppTheme.primaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 12.h),
            if (_selectedAddress == null)
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(16.w),
                decoration: BoxDecoration(
                  color: AppTheme.backgroundColor,
                  borderRadius: BorderRadius.circular(8.r),
                  border: Border.all(
                    color: AppTheme.borderColor,
                    style: BorderStyle.solid,
                    width: 1,
                  ),
                ),
                child: Column(
                  children: [
                    Icon(
                      FeatherIcons.mapPin,
                      color: AppTheme.textTertiary,
                      size: 24.sp,
                    ),
                    SizedBox(height: 8.h),
                    Text(
                      '请选择收货地址',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.textTertiary,
                      ),
                    ),
                  ],
                ),
              )
            else
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(16.w),
                decoration: BoxDecoration(
                  color: AppTheme.backgroundColor,
                  borderRadius: BorderRadius.circular(8.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          _selectedAddress!.receiverName,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(width: 8.w),
                        Text(
                          _selectedAddress!.phone,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: AppTheme.textSecondary,
                          ),
                        ),
                        const Spacer(),
                        if (_selectedAddress!.isDefault)
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryColor.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(4.r),
                            ),
                            child: Text(
                              '默认',
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: AppTheme.primaryColor,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                      ],
                    ),
                    SizedBox(height: 8.h),
                    Text(
                      _selectedAddress!.fullAddress,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.textSecondary,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderItemsSection(List<CartItem> cartItems) {
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
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(FeatherIcons.package, color: AppTheme.primaryColor, size: 20.sp),
                SizedBox(width: 8.w),
                Text(
                  '商品清单',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16.h),
            ...cartItems.map((item) => _buildOrderItem(item)).toList(),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderItem(CartItem item) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      child: Row(
        children: [
          Container(
            width: 60.w,
            height: 60.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.r),
              image: DecorationImage(
                image: NetworkImage(item.product.imageUrl),
                fit: BoxFit.cover,
              ),
            ),
          ),
          SizedBox(width: 12.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.product.title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 4.h),
                Text(
                  '数量: ${item.quantity}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  QiancaiDouIcon(size: 16.sp),
                  SizedBox(width: 4.w),
                  Text(
                    '${item.product.priceInQiancaiDou * item.quantity}',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primaryColor,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildNoteSection() {
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
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(FeatherIcons.messageSquare, color: AppTheme.primaryColor, size: 20.sp),
                SizedBox(width: 8.w),
                Text(
                  '订单备注',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 12.h),
            TextField(
              onChanged: (value) => _note = value,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: '请输入订单备注（选填）',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.r),
                  borderSide: BorderSide(color: AppTheme.borderColor),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.r),
                  borderSide: BorderSide(color: AppTheme.primaryColor),
                ),
                contentPadding: EdgeInsets.all(12.w),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomBar(int totalCost, bool isDesktop) {
    return Container(
      padding: EdgeInsets.all(isDesktop ? 6.w : 8.w),
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
      child: Row(
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '总计',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppTheme.textSecondary,
                  fontSize: isDesktop ? 10.sp : 12.sp,
                ),
              ),
              SizedBox(height: 2.h),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  QiancaiDouIcon(size: isDesktop ? 12.sp : 14.sp),
                  SizedBox(width: 2.w),
                  Text(
                    '$totalCost',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primaryColor,
                      fontSize: isDesktop ? 14.sp : 16.sp,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const Spacer(),
          SizedBox(
            width: isDesktop ? 80.w : 100.w,
            child: ElevatedButton(
              onPressed: _selectedAddress == null || _isLoading ? null : _createOrder,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryColor,
                padding: EdgeInsets.symmetric(vertical: isDesktop ? 6.h : 8.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.r),
                ),
              ),
              child: _isLoading
                  ? SizedBox(
                      width: isDesktop ? 12.w : 16.w,
                      height: isDesktop ? 12.w : 16.w,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Text(
                      '提交订单',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: isDesktop ? 12.sp : 14.sp,
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _createOrder() async {
    if (_selectedAddress == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('请选择收货地址'),
          backgroundColor: AppTheme.errorColor,
        ),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final order = await ref.read(ordersProvider.notifier).createOrderFromCart(
        shippingAddressId: _selectedAddress!.id,
        note: _note.isEmpty ? null : _note,
      );

      if (order != null && mounted) {
        // 清空购物车
        ref.read(cartProvider.notifier).clear();
        
        // 跳转到支付成功页面
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => PaymentSuccessScreen(order: order),
          ),
        );
      } else if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('订单创建失败，请重试'),
            backgroundColor: AppTheme.errorColor,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('订单创建失败：${e.toString()}'),
            backgroundColor: AppTheme.errorColor,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }
}
