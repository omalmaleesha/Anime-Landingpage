"use client"

import { useEffect } from "react"
import { notFound } from "next/navigation"
import { useTheme } from "@/context/theme-context"
import MovieDetailsHeader from "@/components/movie-details-header"
import MovieDetailsContent from "@/components/movie-details-content"
import MovieCommentsSection from "@/components/movie-comments-section"
import { getMovieById, getRelatedMovies, type ThemeKey } from "@/data/movies"
import { getCommentsByMovieId } from "@/data/comments"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const { id } = params
  const movie = getMovieById(id)
  const { setTheme } = useTheme()

  // If movie doesn't exist, return 404
  if (!movie) {
    notFound()
  }

  // Get related movies and comments
  const relatedMovies = getRelatedMovies(id)
  const comments = getCommentsByMovieId(id)

  // Set theme based on movie
  useEffect(() => {
    setTheme(movie.themeKey as ThemeKey)
  }, [movie.themeKey, setTheme])

  return (
    <main>
      <MovieDetailsHeader movie={movie} />
      <MovieDetailsContent movie={movie} relatedMovies={relatedMovies} />
      <MovieCommentsSection movieId={id} initialComments={comments} />
    </main>
  )
}
