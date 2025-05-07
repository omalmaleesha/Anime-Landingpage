import type { MovieComment } from "@/components/movie-comment"

// Sample comments for each movie
export const sampleComments: Record<string, MovieComment[]> = {
  suzume: [
    {
      id: "suzume-1",
      user: {
        name: "AnimeExplorer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2023, 5, 15),
      content:
        "Suzume is a visual masterpiece! The animation is breathtaking and the story is both heartwarming and thrilling. Makoto Shinkai has outdone himself again with this beautiful tale.",
      likes: 42,
      isLiked: false,
    },
    {
      id: "suzume-2",
      user: {
        name: "FilmCritic2023",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: new Date(2023, 6, 3),
      content:
        "While not quite reaching the emotional heights of Your Name, Suzume delivers a compelling story with stunning visuals. The character development is excellent and the environmental themes are thoughtfully presented.",
      likes: 28,
      isLiked: false,
    },
    {
      id: "suzume-3",
      user: {
        name: "JapanFan",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2023, 4, 22),
      content:
        "I loved how this film blends fantasy elements with real-world issues. The scenes of devastation reminded me of the 2011 earthquake and tsunami, giving the story a powerful emotional resonance.",
      likes: 36,
      isLiked: false,
    },
    {
      id: "suzume-4",
      user: {
        name: "AnimeLover99",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: new Date(2023, 7, 10),
      content:
        "The animation quality is top-notch and the soundtrack is amazing! I found myself completely immersed in Suzume's journey. My only criticism is that some plot points felt a bit rushed.",
      likes: 19,
      isLiked: false,
    },
  ],
  yourname: [
    {
      id: "yourname-1",
      user: {
        name: "CinematicDreamer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 2, 5),
      content:
        "Your Name is a masterpiece that transcends the anime genre. The body-swapping premise could have been played for laughs, but instead becomes a profound meditation on connection, fate, and memory. The animation is gorgeous and the soundtrack by RADWIMPS perfectly complements the emotional journey.",
      likes: 87,
      isLiked: false,
    },
    {
      id: "yourname-2",
      user: {
        name: "FilmBuff42",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 3, 12),
      content:
        "I've watched this film multiple times and it still moves me to tears. The way the story weaves together themes of time, distance, and longing is simply beautiful. One of the best animated films ever made.",
      likes: 65,
      isLiked: false,
    },
  ],
  weathering: [
    {
      id: "weathering-1",
      user: {
        name: "StormChaser",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: new Date(2022, 8, 18),
      content:
        "Weathering With You beautifully captures the bittersweet nature of sacrifice and love. The rain-soaked Tokyo setting creates a magical atmosphere that enhances the emotional impact of the story.",
      likes: 41,
      isLiked: false,
    },
    {
      id: "weathering-2",
      user: {
        name: "AnimeFanatic",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: new Date(2022, 9, 7),
      content:
        "While not quite reaching the heights of Your Name, this film still showcases Shinkai's incredible talent for visual storytelling and creating emotionally resonant characters. The environmental themes add an interesting layer to the romance.",
      likes: 33,
      isLiked: false,
    },
  ],
  spirited: [
    {
      id: "spirited-1",
      user: {
        name: "GhibliFan",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 5, 25),
      content:
        "Spirited Away remains the pinnacle of animated storytelling. Twenty years later, and no film has matched its perfect blend of imagination, heart, and visual splendor. Every frame could be a painting.",
      likes: 112,
      isLiked: false,
    },
    {
      id: "spirited-2",
      user: {
        name: "ClassicAnimeLover",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 6, 14),
      content:
        "This film changed my perspective on what animation could achieve. The world-building is unparalleled, and Chihiro's growth throughout the story feels genuine and earned. A true masterpiece that deserves all its accolades.",
      likes: 98,
      isLiked: false,
    },
  ],
  ghost: [
    {
      id: "ghost-1",
      user: {
        name: "CyberPunk2077",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 4, 8),
      content:
        "Ghost in the Shell was ahead of its time and remains relevant today. Its exploration of consciousness, identity, and humanity in an increasingly digital world feels even more pertinent now than when it was released.",
      likes: 76,
      isLiked: false,
    },
    {
      id: "ghost-2",
      user: {
        name: "SciFiEnthusiast",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: new Date(2022, 7, 19),
      content:
        "The philosophical depth of this film is astounding. It asks profound questions about what makes us human while delivering stunning visuals and action sequences. A landmark in both anime and science fiction.",
      likes: 64,
      isLiked: false,
    },
  ],
}

export function getCommentsByMovieId(movieId: string): MovieComment[] {
  return sampleComments[movieId] || []
}
