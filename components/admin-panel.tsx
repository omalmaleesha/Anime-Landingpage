"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, X, Flag, Users, LogOut, RefreshCw } from "lucide-react"
import { useAdmin } from "@/context/admin-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getReportedComments } from "@/data/reported-comments"
import AdminLogin from "./admin-login"
import UserList from "./user-management/user-list"

export default function AdminPanel() {
  const [reports, setReports] = useState<any[]>([])
  const { isAdmin, isAdminPanelOpen, toggleAdminPanel, logout, currentAdminView, setAdminView } = useAdmin()
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (isAdminPanelOpen) {
      refreshReports()
    }
  }, [isAdminPanelOpen])

  const refreshReports = () => {
    setReports(getReportedComments())
  }

  if (!isAdminPanelOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative rounded-xl backdrop-blur-md border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden",
            currentTheme.glass,
            currentTheme.border,
          )}
        >
          {/* Close button */}
          <button
            onClick={toggleAdminPanel}
            className={cn(
              "absolute top-4 right-4 p-2 rounded-full",
              `bg-${currentTheme.primary}/10 hover:bg-${currentTheme.primary}/20`,
              "transition-colors z-10",
            )}
            aria-label="Close admin panel"
          >
            <X className={`h-5 w-5 text-${currentTheme.text}`} />
          </button>

          {!isAdmin ? (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
              <AdminLogin />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 border-b flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className={`h-6 w-6 text-${currentTheme.primary}`} />
                  <h2 className={`text-xl font-bold text-${currentTheme.text}`}>Admin Panel</h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshReports}
                    className={`border-${currentTheme.border} text-${currentTheme.text}`}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className={`border-${currentTheme.border} text-${currentTheme.text}`}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Tabs value={currentAdminView} onValueChange={setAdminView}>
                  <TabsList
                    className={cn(
                      "w-full mb-6 bg-transparent border-b",
                      currentTheme.border,
                      "rounded-none p-0 h-auto",
                    )}
                  >
                    <TabsTrigger
                      value="reports"
                      className={cn(
                        "rounded-t-lg data-[state=active]:bg-transparent",
                        `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                        `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                        "py-3 px-6",
                      )}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Reported Comments
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className={cn(
                        "rounded-t-lg data-[state=active]:bg-transparent",
                        `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                        `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                        "py-3 px-6",
                      )}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      User Management
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="reports" className="mt-0">
                    {/* Reports content - this was implemented in the previous version */}
                    <div className="text-center p-8">
                      <p className={`text-${currentTheme.text}/70`}>
                        {reports.length === 0 ? "No reported comments found" : `${reports.length} reported comments`}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="users" className="mt-0">
                    <UserList />
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
