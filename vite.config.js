import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            includeAssets: ['favicon.png', 'robots.txt'],
            manifest: {
                name: 'inBrief - Your Daily News, Simplified',
                short_name: 'inBrief',
                description: 'A modern news aggregation app with category-based browsing.',
                theme_color: '#0d6efd',
                background_color: '#f8f9fa',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/favicon.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/favicon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/newsapi\.org\/v2\/.*$/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-news-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 // 24 hours
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                            }
                        }
                    }
                ]
            }
        })
    ],
    build: {
        outDir: "dist"
    },
    server: {
        port: 3000,
    },
});
