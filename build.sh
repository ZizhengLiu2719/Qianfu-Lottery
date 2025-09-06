#!/bin/bash
set -e # 如果任何命令失败，立即退出

# 步骤 1: 手动安装 Flutter SDK
echo "INFO: Installing Flutter v3.19.0..."
git clone https://github.com/flutter/flutter.git --depth 1 --branch 3.19.0 _flutter_sdk
export PATH="$PATH:`pwd`/_flutter_sdk/bin"

# 步骤 2: 验证 Flutter 环境
echo "INFO: Verifying Flutter installation..."
flutter --version

# 步骤 3: 构建 Flutter Web 应用
echo "INFO: Navigating to frontend directory..."
cd frontend
echo "INFO: Getting dependencies..."
flutter pub get
echo "INFO: Building for production..."
flutter build web --release

echo "INFO: Build finished successfully!"