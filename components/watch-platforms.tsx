import Image from "next/image"
import Link from "next/link"
import StaggeredAnimation from "@/components/staggered-animation"

export default function WatchPlatforms() {
  const platforms = [
    { name: "Prime Video", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    { name: "Apple TV", logo: "/placeholder.svg?height=60&width=120", url: "#" },
    { name: "Crunchyroll", logo: "/placeholder.svg?height=60&width=120", url: "#" },
  ]

  return (
    <StaggeredAnimation className="flex flex-wrap gap-6" direction="right">
      {platforms.map((platform, index) => (
        <Link
          key={index}
          href={platform.url}
          className="relative h-16 w-32 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-2"
        >
          <Image
            src={platform.logo || "/placeholder.svg"}
            alt={platform.name}
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>
      ))}
    </StaggeredAnimation>
  )
}
