"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"

interface StarRatingProps {
  rating?: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export default function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(rating)
  const { currentTheme } = useTheme()

  const handleClick = (index: number) => {
    if (!interactive) return
    setSelectedRating(index)
    onRatingChange?.(index)
  }

  const displayRating = interactive ? hoverRating || selectedRating : rating

  // Size mappings
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className={cn("flex", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "text-yellow-400 transition-transform duration-100",
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
              starValue <= displayRating ? "opacity-100" : "opacity-30",
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
          >
            <Star className={sizeClasses[size]} fill="currentColor" />
          </button>
        )
      })}
    </div>
  )
}
