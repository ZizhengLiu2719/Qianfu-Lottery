import 'package:flutter_screenutil/flutter_screenutil.dart';

double safeSp(double value) {
  try {
    final r = value.sp;
    if (r.isNaN || !r.isFinite) return value;
    return r;
  } catch (_) {
    return value;
  }
}

double safeW(double value) {
  try {
    final r = value.w;
    if (r.isNaN || !r.isFinite) return value;
    return r;
  } catch (_) {
    return value;
  }
}

double safeH(double value) {
  try {
    final r = value.h;
    if (r.isNaN || !r.isFinite) return value;
    return r;
  } catch (_) {
    return value;
  }
}

double safeR(double value) {
  try {
    final r = value.r;
    if (r.isNaN || !r.isFinite) return value;
    return r;
  } catch (_) {
    return value;
  }
}


