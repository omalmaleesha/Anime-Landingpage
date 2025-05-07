import type { MovieComment } from "@/components/movie-comment"

export interface ReportedComment {
  commentId: string
  movieId: string
  reportedBy: string
  reason: string
  timestamp: Date
  resolved: boolean
  comment: MovieComment
}

// In-memory store for reported comments
let reportedComments: ReportedComment[] = []

export function reportComment(
  commentId: string,
  movieId: string,
  reportedBy: string,
  reason: string,
  comment: MovieComment,
): void {
  reportedComments.push({
    commentId,
    movieId,
    reportedBy,
    reason,
    timestamp: new Date(),
    resolved: false,
    comment,
  })
}

export function getReportedComments(): ReportedComment[] {
  return [...reportedComments]
}

export function resolveReport(commentId: string): void {
  reportedComments = reportedComments.map((report) =>
    report.commentId === commentId ? { ...report, resolved: true } : report,
  )
}

export function deleteReport(commentId: string): void {
  reportedComments = reportedComments.filter((report) => report.commentId !== commentId)
}
