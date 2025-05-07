"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import TrendingSearches from "./trending-searches"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { currentTheme } = useTheme()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchInputRef])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (e.target.value.length > 0) {
      setIsOpen(true)
      setIsLoading(true)
      // Simulate loading state
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } else {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      console.log("Searching for:", query)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setIsOpen(false)
    searchInputRef.current?.focus()
  }

  return (
    <div className={cn("relative z-10", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center",
          "backdrop-blur-md rounded-full overflow-hidden transition-all duration-300",
          currentTheme.glass,
          currentTheme.border,
          "border",
          isOpen ? "ring-2 ring-opacity-50" : "hover:ring-2 hover:ring-opacity-30",
          `ring-${currentTheme.accent}`,
        )}
      >
        <Search className={`absolute left-3 h-5 w-5 text-${currentTheme.text}`} />
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={handleInputChange}
          className={cn(
            "pl-10 pr-10 py-3 w-full",
            "bg-transparent focus:outline-none",
            `text-${currentTheme.text} placeholder-${currentTheme.text}/60`,
          )}
          onClick={() => setIsOpen(true)}
          ref={searchInputRef}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={`absolute right-3 text-${currentTheme.text}/70 hover:text-${currentTheme.text}`}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 w-full mt-2 rounded-xl overflow-hidden shadow-lg",
              "backdrop-blur-md border",
              currentTheme.glass,
              currentTheme.border,
            )}
          >
            {isLoading ? (
              <div className={`p-4 text-center text-${currentTheme.text}/70`}>
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></div>
                Searching...
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {/* Example search results */}
                {query.length > 0 && (
                  <div className={`p-2 text-${currentTheme.text}`}>
                    <div className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-8 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-${currentTheme.primary}/20`}></div>
                        </div>
                        <div>
                          <p className="font-medium">Suzume no Tojimari</p>
                          <p className={`text-${currentTheme.text}/60 text-sm`}>2022 • 8.5/10</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-8 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-${currentTheme.primary}/20`}></div>
                        </div>
                        <div>
                          <p className="font-medium">Your Name</p>
                          <p className={`text-${currentTheme.text}/60 text-sm`}>2016 • 8.8/10</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-8 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
                          <div className={`absolute inset-0 bg-${currentTheme.primary}/20`}></div>
                        </div>
                        <div>
                          <p className="font-medium">Weathering With You</p>
                          <p className={`text-${currentTheme.text}/60 text-sm`}>2019 • 8.3/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && query === "" && <TrendingSearches />}
    </div>
  )
}

export default SearchBar
