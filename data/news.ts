export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  category: "release" | "update" | "event" | "announcement"
  image: string
  publishedAt: string
  author: string
  tags: string[]
}

export const newsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "Demon Slayer Season 4 Coming This Fall",
    summary: "The highly anticipated fourth season of Demon Slayer has been confirmed for Fall 2023.",
    content:
      "Fans of the popular anime series Demon Slayer can rejoice as the fourth season has officially been confirmed for a Fall 2023 release. The new season will adapt the Hashira Training arc from the manga, setting the stage for the final battle against Muzan Kibutsuji.",
    category: "release",
    image: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-07-15",
    author: "Anime Editorial Team",
    tags: ["demon slayer", "upcoming release", "fall 2023", "anime news"],
  },
  {
    id: "news-2",
    title: "AnimeVerse Platform Update: Watch Parties Coming Soon",
    summary: "New social feature will allow users to watch anime together virtually.",
    content:
      "We're excited to announce that AnimeVerse will soon be launching a new Watch Party feature. This will allow users to synchronize their viewing experience and chat in real-time with friends. The feature will support up to 10 participants in a single watch party and includes video and audio chat options.",
    category: "update",
    image: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-07-10",
    author: "Development Team",
    tags: ["platform update", "watch party", "social features", "coming soon"],
  },
  {
    id: "news-3",
    title: "Studio Ghibli Film Festival Announcement",
    summary: "A month-long celebration of Studio Ghibli classics coming to AnimeVerse.",
    content:
      "Mark your calendars for our upcoming Studio Ghibli Film Festival! For the entire month of August, we'll be featuring the complete collection of Studio Ghibli films, along with exclusive behind-the-scenes content, director interviews, and special commentary tracks. This is the perfect opportunity for both long-time fans and newcomers to experience these beloved classics.",
    category: "event",
    image: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-07-05",
    author: "Events Team",
    tags: ["studio ghibli", "film festival", "event", "classic anime"],
  },
  {
    id: "news-4",
    title: 'Exclusive: Interview with "Your Name" Director Makoto Shinkai',
    summary: "The acclaimed director discusses his creative process and upcoming projects.",
    content:
      'In an exclusive interview with AnimeVerse, renowned director Makoto Shinkai shares insights into his creative process, the impact of "Your Name" on his career, and teases details about his upcoming projects. The director also reflects on the evolution of anime in the global entertainment landscape and his personal journey as a filmmaker.',
    category: "announcement",
    image: "/placeholder.svg?height=400&width=600",
    publishedAt: "2023-06-28",
    author: "Editorial Team",
    tags: ["makoto shinkai", "your name", "exclusive interview", "director"],
  },
]

export function getNewsById(id: string): NewsItem | undefined {
  return newsItems.find((item) => item.id === id)
}

export function getLatestNews(limit = 4): NewsItem[] {
  return [...newsItems]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export function getNewsByCategory(category: NewsItem["category"], limit?: number): NewsItem[] {
  const filtered = newsItems.filter((item) => item.category === category)

  if (limit) {
    return filtered.slice(0, limit)
  }

  return filtered
}
