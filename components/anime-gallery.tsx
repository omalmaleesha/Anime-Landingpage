"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useTheme, type ThemeKey } from "@/context/theme-context"
import { motion } from "framer-motion"

// Import the TrailerButton component
import TrailerButton from "@/components/trailer-button"

export default function AnimeGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { setTheme } = useTheme()

  const images = [
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Suzume scene",
      theme: "suzume" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Your Name scene",
      theme: "yourname" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Weathering With You scene",
      theme: "weathering" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Spirited Away scene",
      theme: "spirited" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Ghost in the Shell scene",
      theme: "ghost" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Suzume scene 2",
      theme: "suzume" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Your Name scene 2",
      theme: "yourname" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Weathering With You scene 2",
      theme: "weathering" as ThemeKey,
    },
    {
      src: "/placeholder.svg?height=300&width=500",
      alt: "Spirited Away scene 2",
      theme: "spirited" as ThemeKey,
    },
  ]

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
  }

  const handleSetFeatured = (theme: ThemeKey) => {
    setTheme(theme)
    setSelectedImage(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative h-60 overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
              "group",
            )}
            onClick={() => handleImageClick(index)}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-medium">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          {selectedImage !== null && (
            <div className="relative">
              <div className="relative h-[80vh] w-full">
                <Image
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/70 backdrop-blur-md">
                <h3 className="text-white text-xl mb-2">{images[selectedImage].alt}</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleSetFeatured(images[selectedImage].theme)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md backdrop-blur-sm transition-colors"
                  >
                    Set as Featured Movie
                  </button>
                  <TrailerButton variant="primary" size="sm" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
