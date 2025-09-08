declare module '*.wasm' {
  const value: WebAssembly.Module
  export default value
}

// Augment Hono Env bindings so c.env has typed variables
import 'hono'
declare module 'hono' {
  interface Env {
    Bindings: {
      ENVIRONMENT?: string
      DATABASE_URL?: string
      JWT_SECRET?: string
    }
  }
}