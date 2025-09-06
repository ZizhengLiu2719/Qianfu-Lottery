import 'package:json_annotation/json_annotation.dart';

part 'api_response.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class ApiResponse<T> {
  final int code;
  final String message;
  final T? data;

  const ApiResponse({
    required this.code,
    required this.message,
    this.data,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) =>
      _$ApiResponseFromJson(json, fromJsonT);

  Map<String, dynamic> toJson(Object Function(T value) toJsonT) =>
      _$ApiResponseToJson(this, toJsonT);

  bool get isSuccess => code == 200;
  bool get isError => code != 200;
}

@JsonSerializable()
class ErrorResponse {
  final int code;
  final String message;
  final Map<String, dynamic>? details;

  const ErrorResponse({
    required this.code,
    required this.message,
    this.details,
  });

  factory ErrorResponse.fromJson(Map<String, dynamic> json) => _$ErrorResponseFromJson(json);
  
  Map<String, dynamic> toJson() => _$ErrorResponseToJson(this);

  static ErrorResponse fromException(Exception e) {
    return ErrorResponse(
      code: 500,
      message: e.toString(),
    );
  }

  static ErrorResponse networkError() {
    return const ErrorResponse(
      code: -1,
      message: '网络连接失败，请检查网络设置',
    );
  }

  static ErrorResponse timeout() {
    return const ErrorResponse(
      code: -2,
      message: '请求超时，请稍后重试',
    );
  }
}
