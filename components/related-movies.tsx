"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import MovieCard from "./movie-card"
import type { MovieDetails } from "@/data/movies"

interface RelatedMoviesProps {
  movies: MovieDetails[]
  className?: string
}

export default function RelatedMovies({ movies, className }: RelatedMoviesProps) {
  const { currentTheme } = useTheme()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.75

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (!movies.length) return null

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>Related Movies</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className={cn(
              "p-2 rounded-full",
              `bg-${currentTheme.primary}/10 hover:bg-${currentTheme.primary}/20`,
              `text-${currentTheme.text}`,
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={cn(
              "p-2 rounded-full",
              `bg-${currentTheme.primary}/10 hover:bg-${currentTheme.primary}/20`,
              `text-${currentTheme.text}`,
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-w-[180px] w-[180px] snap-start"
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
