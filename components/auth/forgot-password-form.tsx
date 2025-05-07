"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { sendPasswordResetEmail } = useAuth()
  const { currentTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email) {
      setError("Email is required")
      return
    }

    try {
      setIsSubmitting(true)
      const result = await sendPasswordResetEmail(email)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.message || "Failed to send reset email")
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
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Reset Password</h2>
        <p className={`text-${currentTheme.text}/70 mt-1`}>
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-md flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Check your email</h3>
              <p className="text-sm mt-1">
                We've sent a password reset link to <strong>{email}</strong>. The link will expire in 1 hour.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/sign-in">
              <Button
                variant="outline"
                className={cn(
                  "border",
                  currentTheme.border,
                  `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
                )}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
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

          <Button
            type="submit"
            className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <p className={`text-center text-${currentTheme.text}/70 text-sm mt-4`}>
            Remember your password?{" "}
            <Link href="/sign-in" className={`text-${currentTheme.primary} hover:underline`}>
              Sign In
            </Link>
          </p>
        </form>
      )}
    </motion.div>
  )
}
