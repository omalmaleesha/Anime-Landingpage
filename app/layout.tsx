import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"
import { AdminProvider } from "@/context/admin-context"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnimeVerse - Discover Anime Movies",
  description: "Explore the best anime movies from around the world",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AdminProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
