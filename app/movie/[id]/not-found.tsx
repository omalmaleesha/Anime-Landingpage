"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"

export default function MovieNotFound() {
  const { currentTheme } = useTheme()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.background}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "p-8 rounded-xl backdrop-blur-md border text-center max-w-md",
          currentTheme.glass,
          currentTheme.border,
        )}
      >
        <h1 className={`text-4xl font-bold text-${currentTheme.text} mb-4`}>Movie Not Found</h1>
        <p className={`text-${currentTheme.text}/80 mb-6`}>
          Sorry, we couldn't find the movie you're looking for. It might have been removed or doesn't exist.
        </p>
        <Button asChild>
          <Link href="/" className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 gap-2`}>
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
