"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { confirmPasswordReset } = useAuth()
  const { currentTheme } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!password || !confirmPassword) {
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
      const result = await confirmPasswordReset(token, password)

      if (result.success) {
        setSuccess(true)
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push("/sign-in")
        }, 3000)
      } else {
        setError(result.message || "Failed to reset password")
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
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Reset Your Password</h2>
        <p className={`text-${currentTheme.text}/70 mt-1`}>Create a new password for your account</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-md flex items-start gap-3">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Password Reset Successful</h3>
            <p className="text-sm mt-1">
              Your password has been reset successfully. You will be redirected to the sign in page shortly.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
              New Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a new password"
                className={cn(
                  "pl-10 bg-transparent border",
                  currentTheme.border,
                  `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                )}
                disabled={isSubmitting}
              />
            </div>
            <p className={`text-xs text-${currentTheme.text}/50 mt-1`}>Password must be at least 8 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
