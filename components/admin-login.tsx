"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Loader2 } from "lucide-react"
import { useAdmin } from "@/context/admin-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAdmin()
  const { currentTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password) {
      setError("Please enter the admin password")
      return
    }

    setIsLoading(true)
    const success = await login(password)
    setIsLoading(false)

    if (!success) {
      setError("Invalid password")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "p-6 rounded-xl backdrop-blur-md border shadow-lg max-w-md w-full mx-auto",
        currentTheme.glass,
        currentTheme.border,
      )}
    >
      <div className="text-center mb-6">
        <div className="mx-auto bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
          <Shield className={`h-6 w-6 text-${currentTheme.primary}`} />
        </div>
        <h2 className={`text-xl font-bold text-${currentTheme.text}`}>Admin Login</h2>
        <p className={`text-${currentTheme.text}/70 text-sm mt-1`}>Enter your password to access admin features</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "bg-transparent border",
              currentTheme.border,
              `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
            )}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <Button
          type="submit"
          className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <p className={`text-${currentTheme.text}/50 text-xs text-center mt-4`}>
          Hint: For demo purposes, the password is "admin123"
        </p>
      </form>
    </motion.div>
  )
}
