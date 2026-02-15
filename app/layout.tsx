import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '3D Galaxy Viewer | Interactive Spiral Galaxy Simulation',
  description: 'Experience the cosmos in your browser with this interactive, procedurally generated 3D spiral galaxy. Built with Next.js, React Three Fiber, and WebGL.',
  generator: 'BASUDEV',
  keywords: ['3D Galaxy', 'WebGL', 'Three.js', 'React', 'Space Visualization', 'Procedural Generation'],
  authors: [{ name: 'BASUDEV' }],
  creator: 'BASUDEV',
  openGraph: {
    title: '3D Galaxy Viewer',
    description: 'Explore a mesmerizing procedurally generated spiral galaxy in your browser',
    url: 'https://github.com/CodeWithBasu/3D-Galaxy',
    siteName: '3D Galaxy Viewer',
    images: [
      {
        url: '/milky-way-img.png',
        width: 1200,
        height: 630,
        alt: '3D Galaxy Viewer - Interactive Spiral Galaxy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Galaxy Viewer',
    description: 'Explore a mesmerizing procedurally generated spiral galaxy in your browser',
    images: ['/milky-way-img.png'],
    creator: '@CodeWithBasu',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/milky-way-img.png', sizes: 'any' },
      { url: '/milky-way-img.png', sizes: '32x32', type: 'image/png' },
      { url: '/milky-way-img.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/milky-way-img.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/milky-way-img.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1b3984" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Galaxy 3D" />
      </head>
      <body className="font-sans antialiased">
        <SmoothCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
