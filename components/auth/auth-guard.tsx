"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireGuest?: boolean
}

export default function AuthGuard({ children, requireAuth = false, requireGuest = false }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    // Redirect authenticated users away from guest-only pages
    if (requireGuest && isAuthenticated) {
      router.replace("/")
      return
    }

    // Redirect unauthenticated users away from protected pages
    if (requireAuth && !isAuthenticated) {
      router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
      return
    }
  }, [isAuthenticated, isLoading, requireAuth, requireGuest, router, pathname])

  // Show nothing while checking auth status
  if (isLoading) {
    return null
  }

  // Don't render children if conditions aren't met
  if ((requireAuth && !isAuthenticated) || (requireGuest && isAuthenticated)) {
    return null
  }

  return <>{children}</>
}
