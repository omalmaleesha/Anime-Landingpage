"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/data/users"
import { getUserById } from "@/data/users"

interface AdminContextType {
  isAdmin: boolean
  isAdminPanelOpen: boolean
  adminUser: User | null
  currentAdminView: string
  login: (password: string) => Promise<boolean>
  logout: () => void
  toggleAdminPanel: () => void
  setAdminView: (view: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [adminUser, setAdminUser] = useState<User | null>(null)
  const [currentAdminView, setCurrentAdminView] = useState("reports")

  // Check if admin is logged in on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("animeverse-admin")
    if (adminStatus === "true") {
      setIsAdmin(true)

      // Get admin user
      const adminId = localStorage.getItem("animeverse-admin-id")
      if (adminId) {
        const user = getUserById(adminId)
        if (user) {
          setAdminUser(user)
        }
      }
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    // In a real app, this would be a server request
    // For demo purposes, we'll use a simple password
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === "admin123") {
          setIsAdmin(true)
          localStorage.setItem("animeverse-admin", "true")

          // Set admin user (first admin in the system)
          const adminUser = getUserById("user-1")
          if (adminUser) {
            setAdminUser(adminUser)
            localStorage.setItem("animeverse-admin-id", adminUser.id)
          }

          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setIsAdmin(false)
    setIsAdminPanelOpen(false)
    setAdminUser(null)
    localStorage.removeItem("animeverse-admin")
    localStorage.removeItem("animeverse-admin-id")
  }

  const toggleAdminPanel = () => {
    setIsAdminPanelOpen((prev) => !prev)
  }

  const setAdminView = (view: string) => {
    setCurrentAdminView(view)
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isAdminPanelOpen,
        adminUser,
        currentAdminView,
        login,
        logout,
        toggleAdminPanel,
        setAdminView,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
