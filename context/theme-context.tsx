"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Define movie themes with different color palettes
export const movieThemes = {
  suzume: {
    primary: "#0ea5e9", // sky-500
    secondary: "#0c4a6e", // sky-900
    accent: "#7dd3fc", // sky-300
    text: "#f0f9ff", // sky-50
    background: "from-sky-900/80 via-sky-800/70 to-sky-700/60",
    glass: "bg-sky-900/20",
    border: "border-sky-300/20",
    name: "Suzume",
    poster: "/placeholder.svg?height=750&width=500",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/5pTcio2hTSw",
  },
  yourname: {
    primary: "#8b5cf6", // violet-500
    secondary: "#4c1d95", // violet-900
    accent: "#c4b5fd", // violet-300
    text: "#f5f3ff", // violet-50
    background: "from-violet-900/80 via-violet-800/70 to-violet-700/60",
    glass: "bg-violet-900/20",
    border: "border-violet-300/20",
    name: "Your Name",
    poster: "/placeholder.svg?height=750&width=500",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/xU47nhruN-Q",
  },
  weathering: {
    primary: "#f59e0b", // amber-500
    secondary: "#78350f", // amber-900
    accent: "#fcd34d", // amber-300
    text: "#fffbeb", // amber-50
    background: "from-amber-900/80 via-amber-800/70 to-amber-700/60",
    glass: "bg-amber-900/20",
    border: "border-amber-300/20",
    name: "Weathering With You",
    poster: "/placeholder.svg?height=750&width=500",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/Q6iK6DjV_iE",
  },
  spirited: {
    primary: "#10b981", // emerald-500
    secondary: "#064e3b", // emerald-900
    accent: "#6ee7b7", // emerald-300
    text: "#ecfdf5", // emerald-50
    background: "from-emerald-900/80 via-emerald-800/70 to-emerald-700/60",
    glass: "bg-emerald-900/20",
    border: "border-emerald-300/20",
    name: "Spirited Away",
    poster: "/placeholder.svg?height=750&width=500",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
  },
  ghost: {
    primary: "#ef4444", // red-500
    secondary: "#7f1d1d", // red-900
    accent: "#fca5a5", // red-300
    text: "#fef2f2", // red-50
    background: "from-red-900/80 via-red-800/70 to-red-700/60",
    glass: "bg-red-900/20",
    border: "border-red-300/20",
    name: "Ghost in the Shell",
    poster: "/placeholder.svg?height=750&width=500",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/SvBVDibOrgs",
  },
}

export type ThemeKey = keyof typeof movieThemes
export type ThemeData = (typeof movieThemes)[ThemeKey]

interface ThemeContextType {
  currentTheme: ThemeData
  setTheme: (theme: ThemeKey) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData>(movieThemes.suzume)

  const setTheme = (theme: ThemeKey) => {
    // Add transition class to body for smooth color changes
    document.documentElement.classList.add("theme-transition")
    setCurrentTheme(movieThemes[theme])

    // Remove transition class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition")
    }, 1000)
  }

  return <ThemeContext.Provider value={{ currentTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
