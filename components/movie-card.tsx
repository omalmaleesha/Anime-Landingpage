"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import type { MovieDetails } from "@/data/movies"

interface MovieCardProps {
  movie: MovieDetails
  className?: string
  priority?: boolean
}

export default function MovieCard({ movie, className, priority = false }: MovieCardProps) {
  const { currentTheme } = useTheme()

  return (
    <motion.div whileHover={{ y: -5 }} className={cn("group relative overflow-hidden rounded-lg", className)}>
      <Link href={`/movie/${movie.id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <Image
            src={movie.posterImage || "/placeholder.svg"}
            alt={movie.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{movie.title}</h3>
            <p className="text-white/70 text-sm mb-2">
              {movie.releaseYear} • {movie.director}
            </p>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{movie.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
