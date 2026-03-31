import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/Sidebar'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design System Lab',
  description: 'Component library documentation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen bg-(--color-bg)">
            <Suspense
              fallback={
                <div className="w-64 min-h-screen border-r border-(--color-border) bg-(--color-surface) shrink-0" />
              }
            >
              <Sidebar />
            </Suspense>
            <main className="flex-1 overflow-auto text-(--color-text-primary)">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
