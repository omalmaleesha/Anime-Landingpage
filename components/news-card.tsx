"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NewsItem } from "@/data/news"
import { useTheme } from "@/context/theme-context"

interface NewsCardProps {
  news: NewsItem
  featured?: boolean
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const { currentTheme } = useTheme()
  const formattedDate = new Date(news.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const categoryColors = {
    release: "bg-green-500",
    update: "bg-blue-500",
    event: "bg-purple-500",
    announcement: "bg-amber-500",
  }

  const categoryLabels = {
    release: "New Release",
    update: "Platform Update",
    event: "Event",
    announcement: "Announcement",
  }

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border",
        currentTheme.glass,
        currentTheme.border,
        featured ? "col-span-2" : "",
      )}
    >
      <div className={featured ? "md:flex" : ""}>
        <div className={featured ? "md:w-1/2" : ""}>
          <div className="relative h-52 w-full">
            <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
            <div className="absolute top-3 left-3">
              <Badge className={cn("px-3 py-1", categoryColors[news.category])}>{categoryLabels[news.category]}</Badge>
            </div>
          </div>
        </div>

        <div className={cn("p-5 space-y-3", featured ? "md:w-1/2" : "")}>
          <div className="flex items-center text-sm space-x-2 text-muted-foreground">
            <Calendar size={14} />
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{news.author}</span>
          </div>

          <h3
            className={cn(
              "text-xl font-bold leading-tight",
              featured ? "md:text-2xl" : "",
              `text-${currentTheme.text}`,
            )}
          >
            {news.title}
          </h3>

          <p className={`text-${currentTheme.text}/80 line-clamp-2`}>{news.summary}</p>

          {featured && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {news.tags.slice(0, 3).map((tag) => (
                  <div
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full bg-${currentTheme.secondary}/20 text-${currentTheme.text}/80 flex items-center gap-1`}
                  >
                    <Tag size={12} />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Button
              variant="link"
              className={`p-0 h-auto text-${currentTheme.accent} hover:text-${currentTheme.primary}`}
              asChild
            >
              <Link href="#" className="flex items-center gap-1">
                Read more <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
