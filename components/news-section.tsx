"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import { getLatestNews, getNewsByCategory } from "@/data/news"
import NewsCard from "@/components/news-card"
import ScrollAnimation from "@/components/scroll-animation"
import StaggeredAnimation from "@/components/staggered-animation"

export default function NewsSection() {
  const { currentTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("latest")

  const latestNews = getLatestNews(4)
  const releaseNews = getNewsByCategory("release", 3)
  const updateNews = getNewsByCategory("update", 3)
  const eventNews = getNewsByCategory("event", 3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeIn">
          <div className="text-center mb-10 space-y-3">
            <h2 className={`text-3xl font-bold text-${currentTheme.text}`}>NEWS & ANNOUNCEMENTS</h2>
            <p className={`text-${currentTheme.text}/70 max-w-2xl mx-auto`}>
              Stay up-to-date with the latest anime releases, platform updates, and special events
            </p>
          </div>
        </ScrollAnimation>

        <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollAnimation variant="fadeIn" delay={0.1}>
            <div className="flex justify-center mb-8">
              <TabsList
                className={cn("bg-background/30 backdrop-blur-sm border", currentTheme.glass, currentTheme.border)}
              >
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="releases">New Releases</TabsTrigger>
                <TabsTrigger value="updates">Platform Updates</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
            </div>
          </ScrollAnimation>

          <TabsContent value="latest" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews[0] && (
                <ScrollAnimation variant="fadeInUp" className="col-span-1 md:col-span-2 lg:col-span-3">
                  <NewsCard news={latestNews[0]} featured />
                </ScrollAnimation>
              )}
              <StaggeredAnimation className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.slice(1).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </StaggeredAnimation>
            </div>
          </TabsContent>

          <TabsContent value="releases" className="m-0">
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {releaseNews.map((news, index) => (
                <div key={news.id} className={index === 0 ? "col-span-1 md:col-span-2" : ""}>
                  <NewsCard news={news} featured={index === 0} />
                </div>
              ))}
            </StaggeredAnimation>
          </TabsContent>

          <TabsContent value="updates" className="m-0">
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updateNews.map((news, index) => (
                <div key={news.id} className={index === 0 ? "col-span-1 md:col-span-2" : ""}>
                  <NewsCard news={news} featured={index === 0} />
                </div>
              ))}
            </StaggeredAnimation>
          </TabsContent>

          <TabsContent value="events" className="m-0">
            <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventNews.map((news, index) => (
                <div key={news.id} className={index === 0 ? "col-span-1 md:col-span-2" : ""}>
                  <NewsCard news={news} featured={index === 0} />
                </div>
              ))}
            </StaggeredAnimation>
          </TabsContent>
        </Tabs>

        <ScrollAnimation variant="fadeIn" delay={0.3}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className={cn(
                "px-6 py-2 rounded-full",
                `border-${currentTheme.accent} text-${currentTheme.text} hover:bg-${currentTheme.accent}/10`,
              )}
            >
              View All News
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
