/**
 * Cloudflare Worker 入口文件
 * 这个文件是部署到 Cloudflare Workers 时使用的入口点
 */

import { app } from './app'

// Cloudflare Workers 运行时期望导出一个默认的 fetch 处理器
export default app
