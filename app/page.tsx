"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimeGallery from "@/components/anime-gallery"
import VoiceActors from "@/components/voice-actors"
import WatchPlatforms from "@/components/watch-platforms"
import SearchBar from "@/components/search-bar"
import MobileMenu from "@/components/mobile-menu"
import ReviewsSection from "@/components/reviews-section"
import AdminPanel from "@/components/admin-panel"
import { useTheme } from "@/context/theme-context"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import TrailerButton from "@/components/trailer-button"
import { getMovieById } from "@/data/movies"
import UserMenu from "@/components/auth/user-menu"
import NewsSection from "@/components/news-section"
import ScrollAnimation from "@/components/scroll-animation"
import StaggeredAnimation from "@/components/staggered-animation"
import ParallaxSection from "@/components/parallax-section"

export default function Home() {
  const { currentTheme } = useTheme()
  const currentMovie = getMovieById(currentTheme.name.toLowerCase().replace(/\s+/g, ""))

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-1000">
      {/* Admin Panel */}
      <AdminPanel />

      {/* Background with glassmorphism effect */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={currentTheme.backdrop || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${currentTheme.background} transition-colors duration-1000`}
        />
      </div>

      {/* Header with glass effect */}
      <header className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-500">
        <div className={cn("border-b transition-colors duration-500", currentTheme.glass, currentTheme.border)}>
          <div className="container mx-auto py-4 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className={`h-8 w-8 rounded-full bg-${currentTheme.primary} flex items-center justify-center`}>
                    <span className={`text-${currentTheme.text} font-bold`}>A</span>
                  </div>
                  <h1 className={`text-2xl font-bold text-${currentTheme.text}`}>AnimeVerse</h1>
                </motion.div>
                <MobileMenu />
              </div>

              <div className="w-full md:w-auto order-3 md:order-2">
                <SearchBar />
              </div>

              <nav className="hidden md:flex items-center gap-6 order-2 md:order-3">
                <StaggeredAnimation direction="down">
                  {["Home", "Movies", "Series", "New Releases"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className={`text-${currentTheme.text} hover:text-${currentTheme.accent} transition-colors relative group`}
                    >
                      {item}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-${currentTheme.accent} transition-all duration-300 group-hover:w-full`}
                      ></span>
                    </Link>
                  ))}
                  <UserMenu />
                </StaggeredAnimation>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with glass card */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollAnimation variant="fadeInLeft" duration={0.7}>
              <div
                className={cn(
                  "space-y-6 p-6 md:p-8 rounded-2xl backdrop-blur-md border",
                  currentTheme.glass,
                  currentTheme.border,
                )}
              >
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=24&width=36"
                    alt="Japan flag"
                    width={24}
                    height={16}
                    className="mr-2"
                  />
                  <span className={`text-${currentTheme.text}/80`}>
                    {currentMovie?.releaseYear || 2022} | {currentMovie?.ageRating || "13+"} |{" "}
                    {currentMovie?.duration || "2h 3m"} | Language: {currentMovie?.language || "Japanese"}
                  </span>
                </div>

                <h1 className={`text-5xl md:text-7xl font-bold text-${currentTheme.text} tracking-wide animate-title`}>
                  {currentTheme.name}
                </h1>

                <div className="flex items-center gap-2">
                  <p className={`text-lg text-${currentTheme.text}/90 font-medium`}>
                    Directed by: {currentMovie?.director || "Makoto Shinkai"}
                  </p>
                </div>

                <p className={`text-${currentTheme.text}/80 text-lg max-w-xl leading-relaxed`}>
                  {currentMovie?.synopsis ||
                    "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right."}
                </p>

                <div className="flex flex-wrap gap-3">
                  {(currentMovie?.genres || ["Drama", "Adventure", "Fantasy"]).map((genre) => (
                    <Badge
                      key={genre}
                      variant="outline"
                      className={`bg-white/10 text-${currentTheme.text} border-none px-4 py-1.5 text-sm`}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 gap-2 text-${currentTheme.text} px-6 py-3 rounded-full animate-pulse-subtle`}
                  >
                    <Play className="h-5 w-5" /> Watch Now
                  </Button>
                  <TrailerButton variant="outline" />
                  {currentMovie && (
                    <Link
                      href={`/movie/${currentMovie.id}`}
                      className={cn(
                        "px-4 py-2 rounded-md",
                        `bg-${currentTheme.secondary}/20 hover:bg-${currentTheme.secondary}/30`,
                        `text-${currentTheme.text} border ${currentTheme.border}`,
                        "transition-colors",
                      )}
                    >
                      More Details
                    </Link>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 rounded-full p-2 flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-900 fill-yellow-900" />
                    </div>
                    <div>
                      <span className={`text-3xl font-bold text-${currentTheme.text}`}>
                        {currentMovie?.rating || 8.5}
                      </span>
                      <span className={`text-${currentTheme.text}/70 text-sm`}>/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeInRight" duration={0.7} delay={0.2} className="hidden md:block relative">
              <div className="relative h-[500px] w-[350px] mx-auto animate-float">
                <Image
                  src={currentTheme.poster || "/placeholder.svg"}
                  alt={`${currentTheme.name} Poster`}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 rounded-lg flex items-center justify-center group">
                  <TrailerButton
                    variant="primary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
                  />
                </div>
                <div
                  className={`absolute -bottom-4 -right-4 bg-${currentTheme.primary} rounded-full p-3 shadow-lg animate-bounce-slow cursor-pointer`}
                  onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Watch Trailer"]')?.click()}
                >
                  <Play className={`h-8 w-8 text-${currentTheme.text}`} fill="currentColor" />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation variant="fadeIn">
            <div className="text-center mb-10 space-y-2">
              <h2 className={`text-3xl font-bold text-${currentTheme.text}`}>GALLERY</h2>
              <div className="flex justify-center">
                <ChevronDown className={`h-6 w-6 text-${currentTheme.accent} animate-bounce`} />
              </div>
              <p className={`text-${currentTheme.text}/70 max-w-2xl mx-auto`}>
                Click on any image to view it in full size. You can also set any movie as the featured film to change
                the site's theme.
              </p>
            </div>
          </ScrollAnimation>

          <AnimeGallery />
        </div>
      </section>

      {/* Quote Section */}
      <ParallaxSection speed={0.15}>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollAnimation variant="zoomIn" duration={0.8}>
              <div
                className={cn(
                  "p-8 rounded-2xl backdrop-blur-md border text-center",
                  currentTheme.glass,
                  currentTheme.border,
                )}
              >
                <blockquote
                  className={`text-xl md:text-2xl italic font-medium leading-relaxed text-${currentTheme.text}`}
                >
                  "The future's not that scary. You'll meet a lot of people you care for and you'll meet lots of people
                  who'll care for you too. The night might seem endless right now but one day, morning will come."
                </blockquote>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </ParallaxSection>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* News & Announcements Section */}
      <NewsSection />

      {/* Cast & Watch Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimation variant="fadeInLeft" duration={0.6}>
              <div
                className={cn("p-6 rounded-2xl backdrop-blur-md border h-fit", currentTheme.glass, currentTheme.border)}
              >
                <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-6`}>Voices of:</h2>
                <VoiceActors />
              </div>
            </ScrollAnimation>

            <ScrollAnimation variant="fadeInRight" duration={0.6} delay={0.2}>
              <div className={cn("p-6 rounded-2xl backdrop-blur-md border", currentTheme.glass, currentTheme.border)}>
                <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-6`}>Where To Watch:</h2>
                <WatchPlatforms />

                <div className="mt-12">
                  <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>Original Title:</h2>
                  <div className="flex items-center gap-4">
                    <h3 className={`text-xl font-medium text-${currentTheme.accent}`}>
                      {currentMovie?.originalTitle || "すずめの戸締まり"}
                    </h3>
                    <p className={`text-${currentTheme.text}/60`}>
                      ({currentMovie?.romanizedTitle || "Suzume no Tojimari"})
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "py-8 backdrop-blur-md border-t transition-colors duration-500",
          currentTheme.glass,
          currentTheme.border,
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className={`text-2xl font-bold text-${currentTheme.text}`}>AnimeVerse</h2>
              <p className={`text-${currentTheme.accent}`}>Your gateway to anime worlds</p>
            </div>

            <div className="flex gap-4">
              {["Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className={`text-${currentTheme.text} hover:text-${currentTheme.accent} transition-colors`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className={`mt-8 text-center text-${currentTheme.accent} text-sm`}>
            © {new Date().getFullYear()} AnimeVerse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
