"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, Flag, MoreHorizontal, AlertTriangle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import { useAdmin } from "@/context/admin-context"
import StarRating from "./star-rating"
import { reportComment } from "@/data/reported-comments"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export interface MovieComment {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  date: Date
  content: string
  likes: number
  isLiked?: boolean
  isHidden?: boolean
}

interface MovieCommentProps {
  comment: MovieComment
  movieId: string
  onLike: (id: string) => void
  onDelete?: (id: string) => void
  onHide?: (id: string) => void
  className?: string
}

export default function MovieComment({ comment, movieId, onLike, onDelete, onHide, className }: MovieCommentProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [isReporting, setIsReporting] = useState(false)
  const [reportSuccess, setReportSuccess] = useState(false)
  const { currentTheme } = useTheme()
  const { isAdmin } = useAdmin()

  const handleLike = () => {
    onLike(comment.id)
  }

  const handleReport = () => {
    setShowDropdown(false)
    setShowReportDialog(true)
  }

  const handleSubmitReport = () => {
    if (!reportReason.trim()) return

    setIsReporting(true)

    // Simulate API call
    setTimeout(() => {
      reportComment(comment.id, movieId, "current-user", reportReason, comment)
      setIsReporting(false)
      setReportSuccess(true)

      setTimeout(() => {
        setShowReportDialog(false)
        setReportSuccess(false)
        setReportReason("")
      }, 2000)
    }, 1000)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment.id)
    }
    setShowDropdown(false)
  }

  const handleHide = () => {
    if (onHide) {
      onHide(comment.id)
    }
    setShowDropdown(false)
  }

  if (comment.isHidden && !isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "p-4 rounded-xl backdrop-blur-md border",
          currentTheme.glass,
          currentTheme.border,
          "opacity-60",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-center justify-center">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <p className={`text-${currentTheme.text}/70 text-sm`}>This comment has been hidden by a moderator</p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "p-4 rounded-xl backdrop-blur-md border",
          currentTheme.glass,
          currentTheme.border,
          comment.isHidden && isAdmin && "border-yellow-500/50 bg-yellow-500/5",
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={comment.user.avatar || "/placeholder.svg?height=40&width=40"}
              alt={comment.user.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className={`font-medium text-${currentTheme.text}`}>{comment.user.name}</h4>
                <div className="flex items-center gap-2">
                  <StarRating rating={comment.rating} size="sm" />
                  <span className={`text-xs text-${currentTheme.text}/60`}>
                    {formatDistanceToNow(comment.date, { addSuffix: true })}
                  </span>
                </div>
              </div>

              <div className="relative">
                <button
                  className={`text-${currentTheme.text}/60 hover:text-${currentTheme.text} transition-colors p-1 rounded-full`}
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-label="Comment options"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>

                {showDropdown && (
                  <div
                    className={cn(
                      "absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg z-10",
                      "backdrop-blur-md border",
                      currentTheme.glass,
                      currentTheme.border,
                    )}
                  >
                    {isAdmin ? (
                      <>
                        <button
                          className={cn(
                            "flex items-center gap-2 w-full text-left px-4 py-2 text-sm",
                            `text-${currentTheme.text}/80 hover:bg-${currentTheme.primary}/10 rounded-t-md`,
                          )}
                          onClick={handleHide}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {comment.isHidden ? "Unhide comment" : "Hide comment"}
                        </button>
                        <button
                          className={cn(
                            "flex items-center gap-2 w-full text-left px-4 py-2 text-sm",
                            "text-red-500 hover:bg-red-500/10 rounded-b-md",
                          )}
                          onClick={handleDelete}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete comment
                        </button>
                      </>
                    ) : (
                      <button
                        className={cn(
                          "flex items-center gap-2 w-full text-left px-4 py-2 text-sm",
                          `text-${currentTheme.text}/80 hover:bg-${currentTheme.primary}/10 rounded-md`,
                        )}
                        onClick={handleReport}
                      >
                        <Flag className="h-4 w-4" />
                        Report comment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={`mt-2 text-${currentTheme.text}/90 text-sm`}>
              <p>{comment.content}</p>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1 text-xs",
                  comment.isLiked
                    ? `text-${currentTheme.primary}`
                    : `text-${currentTheme.text}/60 hover:text-${currentTheme.text}/80`,
                  "transition-colors",
                )}
              >
                <ThumbsUp className="h-4 w-4" fill={comment.isLiked ? "currentColor" : "none"} />
                <span>{comment.likes}</span>
              </button>

              {comment.isHidden && isAdmin && (
                <span className="flex items-center gap-1 text-xs text-yellow-500">
                  <AlertTriangle className="h-4 w-4" />
                  Hidden by moderator
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent
          className={cn(
            "backdrop-blur-md border sm:max-w-md",
            currentTheme.glass,
            currentTheme.border,
            `text-${currentTheme.text}`,
          )}
        >
          <DialogHeader>
            <DialogTitle>Report Comment</DialogTitle>
          </DialogHeader>

          {reportSuccess ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-600">Report Submitted</h3>
              <p className={`mt-2 text-sm text-${currentTheme.text}/70`}>
                Thank you for helping keep our community safe. Our moderators will review this comment.
              </p>
            </div>
          ) : (
            <>
              <div className="py-4">
                <p className={`text-sm text-${currentTheme.text}/70 mb-4`}>
                  Please let us know why you're reporting this comment. Our moderators will review it as soon as
                  possible.
                </p>
                <Textarea
                  placeholder="Reason for reporting..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className={cn(
                    "resize-none bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                  rows={4}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowReportDialog(false)}
                  className={`border-${currentTheme.border} text-${currentTheme.text}`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReport}
                  className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
                  disabled={!reportReason.trim() || isReporting}
                >
                  {isReporting ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
