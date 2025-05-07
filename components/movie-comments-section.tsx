"use client"

import { useState } from "react"
import { MessageSquare, ChevronDown, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-context"
import { useAdmin } from "@/context/admin-context"
import { cn } from "@/lib/utils"
import MovieComment, { type MovieComment as MovieCommentType } from "./movie-comment"
import MovieCommentForm from "./movie-comment-form"

interface MovieCommentsSectionProps {
  movieId: string
  initialComments?: MovieCommentType[]
}

export default function MovieCommentsSection({ movieId, initialComments = [] }: MovieCommentsSectionProps) {
  const [comments, setComments] = useState<MovieCommentType[]>(initialComments)
  const [showAllComments, setShowAllComments] = useState(false)
  const { currentTheme } = useTheme()
  const { isAdmin, toggleAdminPanel } = useAdmin()

  // For non-admin users, filter out hidden comments
  const visibleComments = isAdmin ? comments : comments.filter((comment) => !comment.isHidden)
  const displayedComments = showAllComments ? visibleComments : visibleComments.slice(0, 3)

  const handleAddComment = (newComment: Omit<MovieCommentType, "id" | "date" | "likes" | "isLiked">) => {
    const comment: MovieCommentType = {
      id: `comment-${Date.now()}`,
      ...newComment,
      date: new Date(),
      likes: 0,
      isLiked: false,
    }

    setComments([comment, ...comments])
  }

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          const isLiked = !comment.isLiked
          return {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
            isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  const handleHideComment = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            isHidden: !comment.isHidden,
          }
        }
        return comment
      }),
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <MessageSquare className={`h-5 w-5 text-${currentTheme.accent}`} />
            <h2 className={`text-3xl font-bold text-${currentTheme.text}`}>Comments</h2>
            {isAdmin && (
              <button
                onClick={toggleAdminPanel}
                className={cn(
                  "ml-2 p-1 rounded-full",
                  `bg-${currentTheme.primary}/20 hover:bg-${currentTheme.primary}/30`,
                  "transition-colors",
                )}
                aria-label="Open admin panel"
              >
                <Shield className={`h-5 w-5 text-${currentTheme.primary}`} />
              </button>
            )}
          </div>
          <p className={`text-${currentTheme.text}/70 max-w-2xl mx-auto`}>
            Share your thoughts and read what others have to say about this movie
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <MovieCommentForm onSubmit={handleAddComment} />
          </div>

          <div className="md:col-span-2">
            {visibleComments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-8 rounded-xl backdrop-blur-md border text-center",
                  currentTheme.glass,
                  currentTheme.border,
                )}
              >
                <p className={`text-${currentTheme.text}/70`}>Be the first to comment on this movie!</p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-4">
                  {displayedComments.map((comment) => (
                    <MovieComment
                      key={comment.id}
                      comment={comment}
                      movieId={movieId}
                      onLike={handleLikeComment}
                      onDelete={isAdmin ? handleDeleteComment : undefined}
                      onHide={isAdmin ? handleHideComment : undefined}
                    />
                  ))}
                </div>

                {visibleComments.length > 3 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllComments(!showAllComments)}
                      className={cn(
                        "border",
                        currentTheme.border,
                        `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
                      )}
                    >
                      {showAllComments ? "Show Less" : `Show All Comments (${visibleComments.length})`}
                      <ChevronDown
                        className={`ml-2 h-4 w-4 ${showAllComments ? "rotate-180" : ""} transition-transform`}
                      />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
