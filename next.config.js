/** @type {import('next').NextConfig} */
require('dotenv').config()
module.exports = {
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com', 'static.vecteezy.com', 'storage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/',
      },
      // Proxy Firebase Auth handler para evitar bloqueo de cookies de terceros.
      // Así el authDomain puede ser el propio dominio de la app en lugar de
      // fiar-3a207.firebaseapp.com, y las cookies son first-party.
      {
        source: '/__/auth/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fiar-3a207'}.firebaseapp.com/__/auth/:path*`,
      },
    ]
  },
}
