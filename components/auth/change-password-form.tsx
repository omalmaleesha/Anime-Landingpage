"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { changePassword } from "@/lib/auth"

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const { currentTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate form
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (!user) {
      setError("You must be logged in to change your password")
      return
    }

    try {
      setIsSubmitting(true)

      const result = await changePassword(user.id, currentPassword, newPassword)

      if (result.success) {
        setSuccess(true)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

        setTimeout(() => {
          setSuccess(false)
        }, 5000)
      } else {
        setError(result.message || "Failed to change password")
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className={`text-lg font-medium text-${currentTheme.text} mb-4`}>Change Password</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-3 rounded-md flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>Password changed successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            Current Password
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
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
          <label htmlFor="newPassword" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
            New Password
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-${currentTheme.text}/50`} />
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Changing Password...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </div>
  )
}
