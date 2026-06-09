import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITEST
const isViteDevtoolsDisabled = process.env.DISABLE_TANSTACK_VITE_DEVTOOLS === 'true'

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
      include: [
        'tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        'tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      ],
      deps: {
        optimizer: {
          web: {
            include: ['react', 'react-dom'],
          },
        },
      },
    },
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    plugins: [
      !isViteDevtoolsDisabled &&
        devtools({
          // Keep the console pipe off in dev — it can stall the renderer on route transitions.
          consolePiping: { enabled: false },
        }),
      tailwindcss(),
      !isTest &&
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      viteReact(),
    ].filter(Boolean),
  }
})
