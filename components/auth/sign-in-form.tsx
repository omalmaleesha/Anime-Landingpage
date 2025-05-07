"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signIn } = useAuth()
  const { currentTheme } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    try {
      setIsSubmitting(true)
      const result = await signIn(email, password)

      if (result.success) {
        router.push("/")
      } else {
        setError(result.message || "Failed to sign in")
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "p-6 rounded-xl backdrop-blur-md border max-w-md w-full mx-auto",
        currentTheme.glass,
        currentTheme.border,
      )}
    >
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Welcome Back</h2>
        <p className={`text-${currentTheme.text}/70 mt-1`}>Sign in to your AnimeVerse account</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            Email
          </label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className={cn(
                "pl-10 bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className={`block text-sm font-medium text-${currentTheme.text}/70`}>
              Password
            </label>
            <Link href="/forgot-password" className={`text-xs text-${currentTheme.primary} hover:underline`}>
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={cn(
                "pl-10 bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <p className={`text-center text-${currentTheme.text}/70 text-sm mt-4`}>
          Don't have an account?{" "}
          <Link href="/sign-up" className={`text-${currentTheme.primary} hover:underline`}>
            Sign Up
          </Link>
        </p>
      </form>
    </motion.div>
  )
}
