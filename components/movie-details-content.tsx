"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import RelatedMovies from "./related-movies"
import type { MovieDetails } from "@/data/movies"

interface MovieDetailsContentProps {
  movie: MovieDetails
  relatedMovies: MovieDetails[]
}

export default function MovieDetailsContent({ movie, relatedMovies }: MovieDetailsContentProps) {
  const { currentTheme } = useTheme()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2">
          {/* Synopsis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("p-6 rounded-xl backdrop-blur-md border mb-8", currentTheme.glass, currentTheme.border)}
          >
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Synopsis</h2>
            <div className={`text-${currentTheme.text}/80 space-y-4`}>
              {movie.longDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {movie.galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${movie.title} scene ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.section>

          {/* Awards */}
          {movie.awards.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn("p-6 rounded-xl backdrop-blur-md border mb-8", currentTheme.glass, currentTheme.border)}
            >
              <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Awards</h2>
              <ul className={`list-disc list-inside text-${currentTheme.text}/80`}>
                {movie.awards.map((award, index) => (
                  <li key={index} className="mb-2">
                    {award}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Related Movies */}
          <RelatedMovies movies={relatedMovies} className="mb-8" />
        </div>

        {/* Sidebar */}
        <div>
          {/* Cast */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn("p-6 rounded-xl backdrop-blur-md border mb-8", currentTheme.glass, currentTheme.border)}
          >
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Cast</h2>
            <div className="space-y-4">
              {movie.cast.map((person, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={person.image || "/placeholder.svg?height=48&width=48"}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className={`font-medium text-${currentTheme.text}`}>{person.name}</p>
                    <p className={`text-sm text-${currentTheme.text}/60`}>as {person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Where to Watch */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn("p-6 rounded-xl backdrop-blur-md border mb-8", currentTheme.glass, currentTheme.border)}
          >
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Where to Watch</h2>
            <div className="flex flex-wrap gap-4">
              {movie.watchPlatforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  className="relative h-16 w-32 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-2"
                >
                  <Image
                    src={platform.logo || "/placeholder.svg"}
                    alt={platform.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </motion.section>

          {/* Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={cn("p-6 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border)}
          >
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Details</h2>
            <dl className="space-y-2">
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Original Title</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.originalTitle}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Romanized Title</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.romanizedTitle}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Director</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.director}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Release Year</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.releaseYear}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Duration</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.duration}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Studios</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.studios.join(", ")}</dd>
              </div>
              <div>
                <dt className={`text-sm text-${currentTheme.text}/60`}>Language</dt>
                <dd className={`text-${currentTheme.text}`}>{movie.language}</dd>
              </div>
            </dl>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
