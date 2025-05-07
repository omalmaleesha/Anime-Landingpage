"use client"

import type { ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface StaggeredAnimationProps {
  children: ReactNode[]
  className?: string
  childClassName?: string
  staggerDelay?: number
  duration?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
}

export default function StaggeredAnimation({
  children,
  className,
  childClassName,
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  direction = "up",
  threshold = 0.1,
}: StaggeredAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionProps = () => {
    switch (direction) {
      case "up":
        return { y: 20 }
      case "down":
        return { y: -20 }
      case "left":
        return { x: 20 }
      case "right":
        return { x: -20 }
      case "none":
        return {}
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, ...getDirectionProps() },
    show: { opacity: 1, x: 0, y: 0, transition: { duration } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div key={index} className={childClassName} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
