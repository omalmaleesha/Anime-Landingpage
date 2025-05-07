import Image from "next/image"
import StaggeredAnimation from "@/components/staggered-animation"

export default function VoiceActors() {
  const actors = [
    { name: "Nanoka Hara", character: "Suzume Iwato" },
    { name: "Hokuto Matsumura", character: "Souta Munakata" },
    { name: "Eri Fukatsu", character: "Tamaki Iwato" },
    { name: "Shota Sometani", character: "Minoru Okabe" },
    { name: "Sairi Ito", character: "Rumi Ninomiya" },
    { name: "Kotone Hanase", character: "Chika Amabe" },
    { name: "Kana Hanazawa", character: "Tsubame Iwato" },
  ]

  return (
    <StaggeredAnimation className="space-y-4" staggerDelay={0.08}>
      {actors.map((actor, index) => (
        <div key={index} className="flex items-center gap-4 group">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-sky-100 flex-shrink-0">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt={actor.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-medium text-sky-800">{actor.name}</p>
            <p className="text-sm text-gray-500">as {actor.character}</p>
          </div>
        </div>
      ))}
    </StaggeredAnimation>
  )
}
