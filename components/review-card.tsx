"use client"

import { useState } from "react"
import Image from "next/image"
import { ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import StarRating from "./star-rating"

export interface ReviewProps {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  date: string
  content: string
  likes: number
  replies: number
}

interface ReviewCardProps {
  review: ReviewProps
  className?: string
}

export default function ReviewCard({ review, className }: ReviewCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(review.likes)
  const { currentTheme } = useTheme()

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-4 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border, className)}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.user.avatar || "/placeholder.svg?height=40&width=40"}
            alt={review.user.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className={`font-medium text-${currentTheme.text}`}>{review.user.name}</h4>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                <span className={`text-xs text-${currentTheme.text}/60`}>{review.date}</span>
              </div>
            </div>

            <button className={`text-${currentTheme.text}/60 hover:text-${currentTheme.text} transition-colors`}>
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className={`mt-2 text-${currentTheme.text}/90 text-sm`}>
            <p>{review.content}</p>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 text-xs",
                liked
                  ? `text-${currentTheme.primary}`
                  : `text-${currentTheme.text}/60 hover:text-${currentTheme.text}/80`,
                "transition-colors",
              )}
            >
              <ThumbsUp className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
              <span>{likeCount}</span>
            </button>

            <button
              className={`flex items-center gap-1 text-xs text-${currentTheme.text}/60 hover:text-${currentTheme.text}/80 transition-colors`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{review.replies}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
