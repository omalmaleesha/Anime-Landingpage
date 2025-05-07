"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import StarRating from "./star-rating"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import type { MovieComment } from "./movie-comment"

interface MovieCommentFormProps {
  onSubmit: (comment: Omit<MovieComment, "id" | "date" | "likes" | "isLiked">) => void
  className?: string
}

export default function MovieCommentForm({ onSubmit, className }: MovieCommentFormProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { currentTheme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (content.trim().length < 10) {
      setError("Comment must be at least 10 characters")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        rating,
        content,
      })

      setRating(0)
      setContent("")
      setIsSubmitting(false)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const getRatingText = () => {
    if (rating === 5) return "Excellent"
    if (rating === 4) return "Very Good"
    if (rating === 3) return "Good"
    if (rating === 2) return "Fair"
    if (rating === 1) return "Poor"
    return ""
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-4 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border, className)}
    >
      <h3 className={`text-lg font-medium mb-4 text-${currentTheme.text}`}>Write a Comment</h3>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn("p-4 rounded-lg mb-4", `bg-green-500/10 text-green-500 border border-green-500/20`)}
        >
          Your comment has been submitted successfully!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block mb-2 text-sm font-medium text-${currentTheme.text}`}>Your Rating</label>
            <StarRating rating={rating} interactive onRatingChange={setRating} size="lg" className="mb-1" />
            {rating > 0 && <p className={`text-xs text-${currentTheme.text}/60`}>{getRatingText()}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="comment-content" className={`block mb-2 text-sm font-medium text-${currentTheme.text}`}>
              Your Comment
            </label>
            <Textarea
              id="comment-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows={4}
              className={cn(
                "resize-none bg-transparent border",
                currentTheme.border,
                `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
              )}
              disabled={isSubmitting}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            type="submit"
            className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Comment"
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
