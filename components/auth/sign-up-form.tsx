"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2, Mail, User, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const { currentTheme } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    try {
      setIsSubmitting(true)
      const result = await signUp(email, username, password)

      if (result.success) {
        setSuccess(true)
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push("/verify-email")
        }, 1500)
      } else {
        setError(result.message || "Failed to sign up")
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
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Create an Account</h2>
        <p className={`text-${currentTheme.text}/70 mt-1`}>Join AnimeVerse to track and discover anime</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>Account created successfully! Redirecting...</p>
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
              disabled={isSubmitting || success}
            />
          </div>
        </div>

        <div>
          <label htmlFor="username" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            Username
          </label>
          <div className="relative">
            <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className={cn(
                "pl-10 bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting || success}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            Password
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className={cn(
                "pl-10 bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting || success}
            />
          </div>
          <p className={`text-xs text-${currentTheme.text}/50 mt-1`}>Password must be at least 8 characters</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            Confirm Password
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={cn(
                "pl-10 bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting || success}
            />
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
          disabled={isSubmitting || success}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className={`text-center text-${currentTheme.text}/70 text-sm mt-4`}>
          Already have an account?{" "}
          <Link href="/sign-in" className={`text-${currentTheme.primary} hover:underline`}>
            Sign In
          </Link>
        </p>
      </form>
    </motion.div>
  )
}
