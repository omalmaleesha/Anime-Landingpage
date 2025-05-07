"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, User, Mail, AlertCircle, CheckCircle, Camera, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangePasswordForm from "./change-password-form"

export default function UserProfile() {
  const { user, updateProfile, signOut, sendVerificationEmail } = useAuth()
  const { currentTheme } = useTheme()

  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [avatar, setAvatar] = useState(user?.avatar || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState(false)

  if (!user) {
    return <div className={`text-center p-8 text-${currentTheme.text}/70`}>Please sign in to view your profile</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    try {
      setIsSubmitting(true)

      const result = await updateProfile({
        displayName,
        avatar,
      })

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        setError(result.message || "Failed to update profile")
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendVerification = async () => {
    try {
      setIsVerifying(true)
      setError("")
      setVerificationSuccess(false)

      const result = await sendVerificationEmail()

      if (result.success) {
        setVerificationSuccess(true)
        setTimeout(() => {
          setVerificationSuccess(false)
        }, 5000)
      } else {
        setError(result.message || "Failed to send verification email")
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "p-6 rounded-xl backdrop-blur-md border max-w-3xl w-full mx-auto",
        currentTheme.glass,
        currentTheme.border,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Your Profile</h2>
        <Button
          variant="outline"
          onClick={signOut}
          className={cn("border", currentTheme.border, `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`)}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
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
          <p>Profile updated successfully!</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar section */}
        <div className="md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white/20">
                {avatar ? (
                  <img src={avatar || "/placeholder.svg"} alt={displayName} className="h-full w-full object-cover" />
                ) : (
                  <User className={`h-full w-full p-6 text-${currentTheme.text}/30`} />
                )}
              </div>
              <button
                type="button"
                className={`absolute bottom-0 right-0 p-2 rounded-full bg-${currentTheme.primary} text-${currentTheme.text} hover:bg-${currentTheme.primary}/80 transition-colors`}
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center">
              <h3 className={`font-medium text-${currentTheme.text}`}>{user.displayName}</h3>
              <p className={`text-sm text-${currentTheme.text}/70`}>@{user.username}</p>
            </div>

            <div className="mt-4 w-full">
              <div className={`p-3 rounded-md bg-${currentTheme.primary}/10 text-sm`}>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className={`h-4 w-4 text-${currentTheme.text}/70`} />
                  <span className={`text-${currentTheme.text}`}>{user.email}</span>
                </div>

                {user.isVerified ? (
                  <div className="flex items-center gap-1 text-green-500 text-xs mt-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Email verified</span>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className={`text-${currentTheme.text}/70 text-xs mb-2`}>
                      Your email is not verified. Please verify to access all features.
                    </p>
                    <Button
                      size="sm"
                      onClick={handleSendVerification}
                      disabled={isVerifying || verificationSuccess}
                      className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text} text-xs py-1 h-auto`}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Sending...
                        </>
                      ) : verificationSuccess ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" /> Email Sent
                        </>
                      ) : (
                        "Verify Email"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile tabs */}
        <div className="md:w-2/3">
          <Tabs defaultValue="profile">
            <TabsList
              className={cn("w-full mb-6 bg-transparent border-b", currentTheme.border, "rounded-none p-0 h-auto")}
            >
              <TabsTrigger
                value="profile"
                className={cn(
                  "rounded-t-lg data-[state=active]:bg-transparent",
                  `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                  `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                  "py-3 px-6",
                )}
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className={cn(
                  "rounded-t-lg data-[state=active]:bg-transparent",
                  `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                  `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                  "py-3 px-6",
                )}
              >
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="displayName"
                      className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}
                    >
                      Display Name
                    </label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={cn(
                        "bg-transparent border",
                        currentTheme.border,
                        `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                      )}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="avatar" className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
                      Avatar URL
                    </label>
                    <Input
                      id="avatar"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className={cn(
                        "bg-transparent border",
                        currentTheme.border,
                        `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                      )}
                      disabled={isSubmitting}
                    />
                    <p className={`text-xs text-${currentTheme.text}/50 mt-1`}>
                      Enter a URL to an image for your profile picture
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}
