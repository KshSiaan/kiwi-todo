import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KIWI - TODO',
    short_name: 'KIWI',
    description: 'A simple TODO app built with Next.js with Offline support',
    start_url: '/',
    display: 'standalone',
    background_color: '#dfdfdf',
    theme_color: '#191919',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}