"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import StarRating from "./star-rating"
import { motion } from "framer-motion"

interface ReviewFormProps {
  onSubmit: (review: { rating: number; content: string }) => void
  className?: string
}

export default function ReviewForm({ onSubmit, className }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const { currentTheme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (content.trim().length < 10) {
      setError("Review must be at least 10 characters")
      return
    }

    onSubmit({ rating, content })
    setRating(0)
    setContent("")
    setError("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-4 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border, className)}
    >
      <h3 className={`text-lg font-medium mb-4 text-${currentTheme.text}`}>Write a Review</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`block mb-2 text-sm font-medium text-${currentTheme.text}`}>Your Rating</label>
          <StarRating rating={rating} interactive onRatingChange={setRating} size="lg" className="mb-1" />
          {rating > 0 && (
            <p className={`text-xs text-${currentTheme.text}/60`}>
              {rating === 5
                ? "Excellent"
                : rating === 4
                  ? "Very Good"
                  : rating === 3
                    ? "Good"
                    : rating === 2
                      ? "Fair"
                      : "Poor"}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="review-content" className={`block mb-2 text-sm font-medium text-${currentTheme.text}`}>
            Your Review
          </label>
          <Textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts about this anime..."
            rows={4}
            className={cn(
              "resize-none bg-transparent border",
              currentTheme.border,
              `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
            )}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          type="submit"
          className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
        >
          Submit Review
        </Button>
      </form>
    </motion.div>
  )
}
