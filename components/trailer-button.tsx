"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-context"
import VideoModal from "./video-modal"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TrailerButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  iconOnly?: boolean
}

export default function TrailerButton({
  variant = "primary",
  size = "md",
  className,
  iconOnly = false,
}: TrailerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentTheme } = useTheme()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  // Icon sizes
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`
      case "secondary":
        return `bg-${currentTheme.secondary} hover:bg-${currentTheme.secondary}/80 text-${currentTheme.text}`
      case "outline":
        return `bg-transparent border border-${currentTheme.primary} text-${currentTheme.primary} hover:bg-${currentTheme.primary}/10`
      case "ghost":
        return `bg-transparent hover:bg-${currentTheme.primary}/10 text-${currentTheme.text}`
      default:
        return `bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`
    }
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={openModal}
          className={cn(
            "gap-2 rounded-full transition-all duration-300",
            getVariantClasses(),
            sizeClasses[size],
            className,
          )}
        >
          <Play className={iconSizes[size]} fill="currentColor" />
          {!iconOnly && "Watch Trailer"}
        </Button>
      </motion.div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={currentTheme.trailerUrl || ""}
        title={currentTheme.name}
      />
    </>
  )
}
