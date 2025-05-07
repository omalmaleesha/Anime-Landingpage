"use client"

import type { ReactNode } from "react"
import { motion, useInView, type Variant } from "framer-motion"
import { useRef } from "react"

type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "none"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInDown: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInLeft: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInRight: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  zoomIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
}

const getInitialVariant = (variant: AnimationVariant): Variant => {
  switch (variant) {
    case "fadeIn":
      return { opacity: 0, y: 0, x: 0, scale: 1 }
    case "fadeInUp":
      return { opacity: 0, y: 50, x: 0, scale: 1 }
    case "fadeInDown":
      return { opacity: 0, y: -50, x: 0, scale: 1 }
    case "fadeInLeft":
      return { opacity: 0, y: 0, x: -50, scale: 1 }
    case "fadeInRight":
      return { opacity: 0, y: 0, x: 50, scale: 1 }
    case "zoomIn":
      return { opacity: 0, y: 0, x: 0, scale: 0.9 }
    default:
      return { opacity: 1, y: 0, x: 0, scale: 1 }
  }
}

export default function ScrollAnimation({
  children,
  className,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.2,
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  if (variant === "none") {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialVariant(variant)}
      animate={isInView ? variants[variant] : getInitialVariant(variant)}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
