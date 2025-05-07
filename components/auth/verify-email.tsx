"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface VerifyEmailProps {
  token?: string
  email?: string
}

export default function VerifyEmail({ token, email }: VerifyEmailProps) {
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const { user, sendVerificationEmail } = useAuth()
  const { currentTheme } = useTheme()

  const userEmail = email || user?.email

  // Handle token verification on mount
  useEffect(() => {
    if (token && userEmail) {
      verifyToken()
    }
  }, [token, userEmail])

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const verifyToken = async () => {
    if (!token || !userEmail) return

    try {
      setIsVerifying(true)
      setError("")

      // In a real app, this would call an API endpoint
      // For this demo, we'll simulate success
      setTimeout(() => {
        setSuccess(true)
        setIsVerifying(false)
      }, 1500)
    } catch (err) {
      setError((err as Error).message || "Failed to verify email")
      setIsVerifying(false)
    }
  }

  const handleResendVerification = async () => {
    if (!userEmail) {
      setError("Email address not found")
      return
    }

    try {
      setIsResending(true)
      setError("")
      setResendSuccess(false)

      const result = await sendVerificationEmail()

      if (result.success) {
        setResendSuccess(true)
        setResendCooldown(60) // 60 second cooldown
      } else {
        setError(result.message || "Failed to resend verification email")
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsResending(false)
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
        <div className="mx-auto bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
          <Mail className={`h-6 w-6 text-${currentTheme.primary}`} />
        </div>
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Verify Your Email</h2>
        <p className={`text-${currentTheme.text}/70 mt-1`}>
          {token
            ? "Verifying your email address..."
            : `We've sent a verification link to ${userEmail || "your email"}. Please check your inbox.`}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {isVerifying ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className={`h-8 w-8 animate-spin text-${currentTheme.primary}`} />
          <span className={`ml-3 text-${currentTheme.text}`}>Verifying your email...</span>
        </div>
      ) : success ? (
        <div className="space-y-6">
          <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-md flex items-start gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Email Verified Successfully</h3>
              <p className="text-sm mt-1">
                Your email has been verified. You can now enjoy all features of AnimeVerse.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Button
                className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
              >
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {resendSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-3 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p>Verification email sent successfully!</p>
            </div>
          )}

          <div className={`p-4 rounded-md bg-${currentTheme.primary}/10 border ${currentTheme.border}`}>
            <h3 className={`font-medium text-${currentTheme.text} mb-2`}>Didn't receive the email?</h3>
            <ul className={`list-disc list-inside text-sm text-${currentTheme.text}/70 space-y-1 mb-4`}>
              <li>Check your spam or junk folder</li>
              <li>Verify you entered the correct email address</li>
              <li>Wait a few minutes and check again</li>
            </ul>

            <Button
              onClick={handleResendVerification}
              disabled={isResending || resendCooldown > 0}
              variant="outline"
              className={cn(
                "w-full border",
                currentTheme.border,
                `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
              )}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : resendCooldown > 0 ? (
                `Resend in ${resendCooldown}s`
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link href="/sign-in" className={`text-${currentTheme.primary} hover:underline text-sm`}>
              Back to Sign In
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  )
}
