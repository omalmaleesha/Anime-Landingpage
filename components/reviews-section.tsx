"use client"

import { useState } from "react"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import ReviewCard, { type ReviewProps } from "./review-card"
import ReviewForm from "./review-form"
import { Button } from "@/components/ui/button"
import { ChevronDown, MessageSquare, Star } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import StaggeredAnimation from "@/components/staggered-animation"

// Sample review data
const initialReviews: ReviewProps[] = [
  {
    id: "1",
    user: {
      name: "Miyazaki Fan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2 days ago",
    content:
      "Absolutely stunning visuals and a captivating story. Makoto Shinkai has outdone himself again with this masterpiece. The animation is breathtaking and the characters are so well developed. I was emotionally invested from start to finish!",
    likes: 42,
    replies: 5,
  },
  {
    id: "2",
    user: {
      name: "AnimeExplorer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "1 week ago",
    content:
      "Beautiful animation and interesting premise, though the pacing felt a bit off in the middle. Still, the emotional moments hit hard and the soundtrack is amazing. Definitely worth watching!",
    likes: 28,
    replies: 3,
  },
  {
    id: "3",
    user: {
      name: "CinematicDreamer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2 weeks ago",
    content:
      "The way this film blends fantasy elements with real-world issues is masterful. The character development is subtle but effective, and the animation quality is top-tier. One of my favorite anime films of the year!",
    likes: 36,
    replies: 7,
  },
]

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewProps[]>(initialReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const { currentTheme } = useTheme()

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2)

  const handleSubmitReview = (newReview: { rating: number; content: string }) => {
    const review: ReviewProps = {
      id: `${reviews.length + 1}`,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: newReview.rating,
      date: "Just now",
      content: newReview.content,
      likes: 0,
      replies: 0,
    }

    setReviews([review, ...reviews])
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeIn">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <MessageSquare className={`h-5 w-5 text-${currentTheme.accent}`} />
              <h2 className={`text-3xl font-bold text-${currentTheme.text}`}>User Reviews</h2>
            </div>
            <p className={`text-${currentTheme.text}/70 max-w-2xl mx-auto`}>
              Share your thoughts and read what others have to say about this anime
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ScrollAnimation variant="fadeInLeft" duration={0.6}>
              <ReviewForm onSubmit={handleSubmitReview} />
            </ScrollAnimation>

            <ScrollAnimation variant="fadeInLeft" duration={0.6} delay={0.2}>
              <div
                className={cn("mt-6 p-4 rounded-xl backdrop-blur-md border", currentTheme.glass, currentTheme.border)}
              >
                <h3 className={`text-lg font-medium mb-3 text-${currentTheme.text}`}>Rating Overview</h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-3xl font-bold text-${currentTheme.text}`}>4.7</div>
                  <div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" opacity={0.5} />
                    </div>
                    <p className={`text-sm text-${currentTheme.text}/60`}>Based on {reviews.length} reviews</p>
                  </div>
                </div>

                {/* Rating bars */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className={`text-sm text-${currentTheme.text}/80 w-3`}>{star}</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`,
                          }}
                        ></div>
                      </div>
                      <div className={`text-xs text-${currentTheme.text}/60 w-8`}>
                        {star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="md:col-span-2">
            <StaggeredAnimation className="space-y-4" staggerDelay={0.15}>
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </StaggeredAnimation>

            {reviews.length > 2 && (
              <ScrollAnimation variant="fadeIn" delay={0.3}>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className={cn(
                      "border",
                      currentTheme.border,
                      `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
                    )}
                  >
                    {showAllReviews ? "Show Less" : "Show More Reviews"}
                    <ChevronDown
                      className={`ml-2 h-4 w-4 ${showAllReviews ? "rotate-180" : ""} transition-transform`}
                    />
                  </Button>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
