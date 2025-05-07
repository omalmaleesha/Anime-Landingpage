"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  getCurrentUser,
  updateUserProfile,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  type AuthUser,
} from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  signUp: (email: string, username: string, password: string) => Promise<{ success: boolean; message?: string }>
  signOut: () => void
  updateProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; message?: string }>
  sendVerificationEmail: () => Promise<{ success: boolean; message?: string }>
  sendPasswordResetEmail: (email: string) => Promise<{ success: boolean; message?: string }>
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error("Failed to get current user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await apiSignIn(email, password)
      if (result.success && result.user) {
        setUser(result.user)
        return { success: true }
      }
      return { success: false, message: result.message || "Failed to sign in" }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await apiSignUp(email, username, password)
      if (result.success && result.user) {
        setUser(result.user)
        return { success: true }
      }
      return { success: false, message: result.message || "Failed to sign up" }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await apiSignOut()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  const updateProfile = async (data: Partial<AuthUser>) => {
    try {
      setIsLoading(true)
      if (!user) {
        return { success: false, message: "Not authenticated" }
      }

      const result = await updateUserProfile(user.id, data)
      if (result.success && result.user) {
        setUser(result.user)
        return { success: true }
      }
      return { success: false, message: result.message || "Failed to update profile" }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    } finally {
      setIsLoading(false)
    }
  }

  const sendVerificationEmail = async () => {
    try {
      if (!user) {
        return { success: false, message: "Not authenticated" }
      }

      const result = await verifyEmail(user.email)
      return { success: result.success, message: result.message }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    }
  }

  const sendPasswordResetEmail = async (email: string) => {
    try {
      const result = await requestPasswordReset(email)
      return { success: result.success, message: result.message }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    }
  }

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    try {
      const result = await resetPassword(token, newPassword)
      return { success: result.success, message: result.message }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
        sendVerificationEmail,
        sendPasswordResetEmail,
        confirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
