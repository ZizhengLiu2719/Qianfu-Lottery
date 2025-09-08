/**
 * Node.js 服务器入口文件
 * 这个文件用于在传统的 Node.js 环境中运行应用（比如阿里云 ECS）
 */

import { serve } from '@hono/node-server'
import { app } from './app'

const port = 3000 // Fixed port for local development

console.log(`🚀 Starting Qianfu Jicai API server...`)
console.log(`📍 Server will run on http://localhost:${port}`)
console.log(`🌍 Environment: development`)

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`✅ Server is running on http://localhost:${info.port}`)
  console.log(`📖 API Documentation available at http://localhost:${info.port}/api/health`)
  console.log('📱 Ready to serve requests!')
})
