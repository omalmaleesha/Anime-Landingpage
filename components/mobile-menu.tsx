"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/theme-context"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme } = useTheme()

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className={`text-${currentTheme.text}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile menu overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm shadow-xl",
                "backdrop-blur-xl border-l",
                currentTheme.glass,
                currentTheme.border,
              )}
            >
              <div className={`flex items-center justify-between p-4 border-b ${currentTheme.border}`}>
                <h2 className={`font-bold text-xl text-${currentTheme.text}`}>Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-${currentTheme.text}`}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="p-4">
                <ul className="space-y-4">
                  {["Home", "Movies", "Series", "New Releases"].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        href="#"
                        className={`block py-2 text-lg font-medium text-${currentTheme.text} hover:text-${currentTheme.accent} transition-colors`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`pt-4 border-t ${currentTheme.border}`}
                  >
                    <Button
                      className={`w-full bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80`}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
