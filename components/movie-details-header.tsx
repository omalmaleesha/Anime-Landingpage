"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Clock, Calendar, Film, Play } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import TrailerButton from "./trailer-button"
import type { MovieDetails } from "@/data/movies"

interface MovieDetailsHeaderProps {
  movie: MovieDetails
}

export default function MovieDetailsHeader({ movie }: MovieDetailsHeaderProps) {
  const { currentTheme } = useTheme()

  return (
    <div className="relative">
      {/* Backdrop image */}
      <div className="absolute inset-0 -z-10 h-[70vh]">
        <Image
          src={movie.backdropImage || "/placeholder.svg"}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.background}`} />
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full",
            `bg-${currentTheme.glass} backdrop-blur-md border ${currentTheme.border}`,
            `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10 transition-colors`,
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Movie details */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:mx-0"
          >
            <Image
              src={movie.posterImage || "/placeholder.svg"}
              alt={movie.title}
              fill
              priority
              className="object-cover rounded-xl shadow-2xl"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn("p-6 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border)}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={`bg-${currentTheme.primary}/20 text-${currentTheme.text} border-none`}
              >
                {movie.ageRating}
              </Badge>
              <span className={`text-${currentTheme.text}/70`}>•</span>
              <span className={`text-${currentTheme.text}/70 flex items-center gap-1`}>
                <Clock className="h-4 w-4" /> {movie.duration}
              </span>
              <span className={`text-${currentTheme.text}/70`}>•</span>
              <span className={`text-${currentTheme.text}/70 flex items-center gap-1`}>
                <Calendar className="h-4 w-4" /> {movie.releaseYear}
              </span>
              <span className={`text-${currentTheme.text}/70`}>•</span>
              <span className={`text-${currentTheme.text}/70 flex items-center gap-1`}>
                <Film className="h-4 w-4" /> {movie.studios.join(", ")}
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold text-${currentTheme.text} mb-2`}>{movie.title}</h1>

            <div className="mb-4">
              <p className={`text-${currentTheme.accent} text-lg`}>
                {movie.originalTitle} ({movie.romanizedTitle})
              </p>
              <p className={`text-${currentTheme.text}/70`}>Directed by {movie.director}</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className={`text-2xl font-bold text-${currentTheme.text}`}>{movie.rating}</span>
                <span className={`text-${currentTheme.text}/60 text-sm`}>/10</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className={`bg-white/10 text-${currentTheme.text} border-none px-4 py-1.5 text-sm`}
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <p className={`text-${currentTheme.text}/80 text-lg mb-6`}>{movie.synopsis}</p>

            <div className="flex flex-wrap gap-4">
              <TrailerButton variant="primary" size="lg" />
              <Button
                className={`bg-${currentTheme.secondary} hover:bg-${currentTheme.secondary}/80 text-${currentTheme.text} gap-2`}
              >
                <Play className="h-5 w-5" /> Watch Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
