export interface MovieCast {
  name: string
  character: string
  image?: string
}

export interface MovieDetails {
  id: string
  title: string
  originalTitle: string
  romanizedTitle: string
  director: string
  releaseYear: number
  duration: string
  ageRating: string
  rating: number
  synopsis: string
  longDescription: string
  genres: string[]
  studios: string[]
  language: string
  awards: string[]
  cast: MovieCast[]
  relatedMovies: string[]
  trailerUrl: string
  posterImage: string
  backdropImage: string
  galleryImages: string[]
  watchPlatforms: {
    name: string
    logo: string
    url: string
  }[]
  themeKey: string
}

export const movies: Record<string, MovieDetails> = {
  suzume: {
    id: "suzume",
    title: "Suzume",
    originalTitle: "すずめの戸締まり",
    romanizedTitle: "Suzume no Tojimari",
    director: "Makoto Shinkai",
    releaseYear: 2022,
    duration: "2h 3m",
    ageRating: "13+",
    rating: 8.5,
    synopsis:
      "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.",
    longDescription:
      "Suzume no Tojimari follows a 17-year-old girl named Suzume who lives in a quiet town in Kyushu. Her life changes when she meets a young man who is looking for a door. Suzume finds a single weathered door standing upright amid ruins as if it was shielded from whatever catastrophe left the remainder of the building in ruins. Seemingly drawn by its power, Suzume reaches for the knob... Doors begin to open one after another all across Japan, unleashing destruction upon any who are near. Suzume must close these portals to prevent further disaster.\n\nThe journey that began with opening a door soon becomes a journey of self-discovery as Suzume travels across Japan to close various doors causing disaster. Throughout her journey, the film explores themes of coming of age, loss, and the impact of natural disasters on communities, which is a recurring theme in Shinkai's works.",
    genres: ["Drama", "Adventure", "Fantasy", "Animation"],
    studios: ["CoMix Wave Films"],
    language: "Japanese",
    awards: ["Japan Academy Prize for Animation of the Year", "Annie Award Nomination for Best Animated Feature"],
    cast: [
      { name: "Nanoka Hara", character: "Suzume Iwato", image: "/placeholder.svg?height=100&width=100" },
      { name: "Hokuto Matsumura", character: "Souta Munakata", image: "/placeholder.svg?height=100&width=100" },
      { name: "Eri Fukatsu", character: "Tamaki Iwato", image: "/placeholder.svg?height=100&width=100" },
      { name: "Shota Sometani", character: "Minoru Okabe", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sairi Ito", character: "Rumi Ninomiya", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kotone Hanase", character: "Chika Amabe", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kana Hanazawa", character: "Tsubame Iwato", image: "/placeholder.svg?height=100&width=100" },
    ],
    relatedMovies: ["yourname", "weathering", "spirited"],
    trailerUrl: "https://www.youtube.com/embed/5pTcio2hTSw",
    posterImage: "/placeholder.svg?height=750&width=500",
    backdropImage: "/placeholder.svg?height=1080&width=1920",
    galleryImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    watchPlatforms: [
      { name: "Prime Video", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Apple TV", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Crunchyroll", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    ],
    themeKey: "suzume",
  },
  yourname: {
    id: "yourname",
    title: "Your Name",
    originalTitle: "君の名は。",
    romanizedTitle: "Kimi no Na wa",
    director: "Makoto Shinkai",
    releaseYear: 2016,
    duration: "1h 52m",
    ageRating: "13+",
    rating: 8.8,
    synopsis:
      "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
    longDescription:
      "Your Name tells the story of a high school girl in rural Japan and a high school boy in Tokyo who swap bodies. The film starts with Mitsuha Miyamizu, a high school girl living in the fictional town of Itomori in Japan's mountainous Hida region, who wishes to live as a boy in the exciting city of Tokyo. She begins to switch bodies intermittently with Taki Tachibana, a high school boy in Tokyo, when they sleep.\n\nThey communicate by leaving notes in each other's phones and bodies. As time passes, they establish a connection and build a bond by text messages. However, they discover that they are separated not only by physical distance but also by time: Mitsuha is actually three years in the past. When Taki attempts to meet Mitsuha in person, he discovers a shocking truth—the town of Itomori was destroyed by a fragment of a comet that crashed to Earth three years ago.\n\nThe film explores themes of time, fate, and the interconnectedness of people's lives. It became a global phenomenon and is one of the highest-grossing anime films of all time.",
    genres: ["Romance", "Fantasy", "Drama", "Animation"],
    studios: ["CoMix Wave Films"],
    language: "Japanese",
    awards: [
      "Japan Academy Prize for Animation of the Year",
      "Los Angeles Film Critics Association Award for Best Animated Film",
    ],
    cast: [
      { name: "Ryunosuke Kamiki", character: "Taki Tachibana", image: "/placeholder.svg?height=100&width=100" },
      { name: "Mone Kamishiraishi", character: "Mitsuha Miyamizu", image: "/placeholder.svg?height=100&width=100" },
      { name: "Ryo Narita", character: "Katsuhiko Teshigawara", image: "/placeholder.svg?height=100&width=100" },
      { name: "Aoi Yuki", character: "Sayaka Natori", image: "/placeholder.svg?height=100&width=100" },
      { name: "Nobunaga Shimazaki", character: "Tsukasa Fujii", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kaito Ishikawa", character: "Shinta Takagi", image: "/placeholder.svg?height=100&width=100" },
    ],
    relatedMovies: ["suzume", "weathering", "spirited"],
    trailerUrl: "https://www.youtube.com/embed/xU47nhruN-Q",
    posterImage: "/placeholder.svg?height=750&width=500",
    backdropImage: "/placeholder.svg?height=1080&width=1920",
    galleryImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    watchPlatforms: [
      { name: "Netflix", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Prime Video", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Crunchyroll", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    ],
    themeKey: "yourname",
  },
  weathering: {
    id: "weathering",
    title: "Weathering With You",
    originalTitle: "天気の子",
    romanizedTitle: "Tenki no Ko",
    director: "Makoto Shinkai",
    releaseYear: 2019,
    duration: "1h 54m",
    ageRating: "13+",
    rating: 8.3,
    synopsis:
      "A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather.",
    longDescription:
      "Weathering With You follows the story of a 16-year-old boy named Hodaka Morishima who runs away from his rural home to Tokyo and befriends a girl named Hina Amano who has the ability to control the weather. The film is set during a period of exceptionally rainy weather in Tokyo.\n\nHodaka struggles to find work and live independently, eventually finding a job as a writer for a small occult magazine. Meanwhile, Hina and her younger brother Nagi are also struggling to survive after the death of their mother. When Hodaka discovers Hina's ability to temporarily stop the rain and clear the sky, they start a business where people can request sunshine for special events.\n\nHowever, Hina's power comes at a great cost—she is gradually being drawn into the sky, and may disappear altogether if she continues to use her abilities. The film explores themes of climate change, sacrifice, and the choices we make for the ones we love.",
    genres: ["Romance", "Fantasy", "Drama", "Animation"],
    studios: ["CoMix Wave Films"],
    language: "Japanese",
    awards: [
      "Japan Academy Prize for Animation of the Year",
      "Asia Pacific Screen Award for Best Animated Feature Film",
    ],
    cast: [
      { name: "Kotaro Daigo", character: "Hodaka Morishima", image: "/placeholder.svg?height=100&width=100" },
      { name: "Nana Mori", character: "Hina Amano", image: "/placeholder.svg?height=100&width=100" },
      { name: "Shun Oguri", character: "Keisuke Suga", image: "/placeholder.svg?height=100&width=100" },
      { name: "Tsubasa Honda", character: "Natsumi", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sakura Kiryu", character: "Nagi Amano", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sei Hiraizumi", character: "Yasui", image: "/placeholder.svg?height=100&width=100" },
    ],
    relatedMovies: ["suzume", "yourname", "spirited"],
    trailerUrl: "https://www.youtube.com/embed/Q6iK6DjV_iE",
    posterImage: "/placeholder.svg?height=750&width=500",
    backdropImage: "/placeholder.svg?height=1080&width=1920",
    galleryImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    watchPlatforms: [
      { name: "Netflix", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Prime Video", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "HBO Max", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    ],
    themeKey: "weathering",
  },
  spirited: {
    id: "spirited",
    title: "Spirited Away",
    originalTitle: "千と千尋の神隠し",
    romanizedTitle: "Sen to Chihiro no Kamikakushi",
    director: "Hayao Miyazaki",
    releaseYear: 2001,
    duration: "2h 5m",
    ageRating: "PG",
    rating: 8.6,
    synopsis:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    longDescription:
      "Spirited Away tells the story of Chihiro Ogino, a 10-year-old girl who, while moving to a new neighborhood, enters the world of Kami (spirits of Japanese Shinto folklore). After her parents are turned into pigs by the witch Yubaba, Chihiro takes a job working in Yubaba's bathhouse to find a way to free herself and her parents and return to the human world.\n\nWhile working at the bathhouse, Chihiro encounters and befriends a mysterious boy named Haku, who helps her navigate the spirit world. She also meets various spirits and supernatural beings, including the enigmatic No-Face, who becomes obsessed with her kindness in a world of greed.\n\nThe film explores themes of courage, friendship, perseverance, and environmentalism. It became the most successful film in Japanese history and won the Academy Award for Best Animated Feature at the 75th Academy Awards.",
    genres: ["Fantasy", "Adventure", "Family", "Animation"],
    studios: ["Studio Ghibli"],
    language: "Japanese",
    awards: ["Academy Award for Best Animated Feature", "Golden Bear at the Berlin International Film Festival"],
    cast: [
      { name: "Rumi Hiiragi", character: "Chihiro Ogino", image: "/placeholder.svg?height=100&width=100" },
      { name: "Miyu Irino", character: "Haku", image: "/placeholder.svg?height=100&width=100" },
      { name: "Mari Natsuki", character: "Yubaba/Zeniba", image: "/placeholder.svg?height=100&width=100" },
      { name: "Takashi Naito", character: "Akio Ogino", image: "/placeholder.svg?height=100&width=100" },
      { name: "Yasuko Sawaguchi", character: "Yūko Ogino", image: "/placeholder.svg?height=100&width=100" },
      { name: "Tatsuya Gashuin", character: "Aogaeru", image: "/placeholder.svg?height=100&width=100" },
    ],
    relatedMovies: ["suzume", "yourname", "ghost"],
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
    posterImage: "/placeholder.svg?height=750&width=500",
    backdropImage: "/placeholder.svg?height=1080&width=1920",
    galleryImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    watchPlatforms: [
      { name: "Netflix", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "HBO Max", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Disney+", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    ],
    themeKey: "spirited",
  },
  ghost: {
    id: "ghost",
    title: "Ghost in the Shell",
    originalTitle: "攻殻機動隊",
    romanizedTitle: "Kōkaku Kidōtai",
    director: "Mamoru Oshii",
    releaseYear: 1995,
    duration: "1h 23m",
    ageRating: "R",
    rating: 8.0,
    synopsis: "A cyborg policewoman and her partner hunt a mysterious and powerful hacker called the Puppet Master.",
    longDescription:
      "Ghost in the Shell is set in 2029, when the world has become interconnected by a vast electronic network that permeates every aspect of life. People have become so intertwined with the network that they have developed 'cyberbrains,' allowing them to access the Internet directly from their minds.\n\nThe story follows Major Motoko Kusanagi, a full-body prosthesis augmented-cybernetic human employed as the squad leader of Public Security Section 9, a special operations task-force. She and her team are investigating the case of the Puppet Master, a mysterious hacker who is capable of 'ghost-hacking' - taking over people's cyberbrains and manipulating their memories.\n\nAs Kusanagi delves deeper into the investigation, she begins to question her own humanity and what it means to be alive in a world where the line between human and machine is increasingly blurred. The film explores complex philosophical themes such as consciousness, identity, and the nature of existence in a digitally connected world.",
    genres: ["Sci-Fi", "Action", "Thriller", "Animation"],
    studios: ["Production I.G"],
    language: "Japanese",
    awards: ["Fantasporto Critics' Choice Award", "Animation Kobe Feature Film Award"],
    cast: [
      { name: "Atsuko Tanaka", character: "Major Motoko Kusanagi", image: "/placeholder.svg?height=100&width=100" },
      { name: "Akio Ōtsuka", character: "Batou", image: "/placeholder.svg?height=100&width=100" },
      { name: "Iemasa Kayumi", character: "Puppet Master", image: "/placeholder.svg?height=100&width=100" },
      { name: "Kōichi Yamadera", character: "Togusa", image: "/placeholder.svg?height=100&width=100" },
      { name: "Tamio Ōki", character: "Chief Aramaki", image: "/placeholder.svg?height=100&width=100" },
      { name: "Yutaka Nakano", character: "Ishikawa", image: "/placeholder.svg?height=100&width=100" },
    ],
    relatedMovies: ["spirited", "suzume", "yourname"],
    trailerUrl: "https://www.youtube.com/embed/SvBVDibOrgs",
    posterImage: "/placeholder.svg?height=750&width=500",
    backdropImage: "/placeholder.svg?height=1080&width=1920",
    galleryImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    watchPlatforms: [
      { name: "Prime Video", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Crunchyroll", logo: "/placeholder.svg?height=60&width=120", url: "#" },
      { name: "Hulu", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    ],
    themeKey: "ghost",
  },
}

export function getMovieById(id: string): MovieDetails | undefined {
  return movies[id]
}

export function getAllMovieIds(): string[] {
  return Object.keys(movies)
}

export function getRelatedMovies(id: string, limit = 3): MovieDetails[] {
  const movie = movies[id]
  if (!movie) return []

  return movie.relatedMovies
    .map((relatedId) => movies[relatedId])
    .filter(Boolean)
    .slice(0, limit)
}

export type ThemeKey = keyof typeof movies
