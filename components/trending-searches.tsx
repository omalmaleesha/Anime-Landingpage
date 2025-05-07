"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { motion } from "framer-motion"

export default function TrendingSearches() {
  const { currentTheme } = useTheme()
  const trendingSearches = ["Makoto Shinkai", "Romance Anime", "Fantasy Adventure", "Studio Ghibli", "New Releases"]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className={`h-4 w-4 text-${currentTheme.accent}`} />
        <h3 className={`text-sm font-medium text-${currentTheme.text}`}>Trending Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingSearches.map((term, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link
              href={`#search=${term}`}
              className={`px-3 py-1 ${currentTheme.glass} hover:bg-white/10 text-${currentTheme.text} text-xs rounded-full transition-colors border ${currentTheme.border}`}
            >
              {term}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
