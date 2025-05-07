"use client"

import { useState } from "react"
import { Search, Filter, UserCheck, UserX, Shield, User, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAllUsers, type User as UserType, roles } from "@/data/users"
import { formatDistanceToNow } from "date-fns"
import UserDetailsDialog from "./user-details-dialog"

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>(getAllUsers())
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "banned">("all")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const { currentTheme } = useTheme()

  const handleRefresh = () => {
    setUsers(getAllUsers())
  }

  const filteredUsers = users
    .filter((user) => {
      // Role filter
      if (roleFilter && user.role !== roleFilter) return false

      // Status filter
      if (statusFilter === "active" && user.isBanned) return false
      if (statusFilter === "banned" && !user.isBanned) return false

      // Search term
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      return (
        user.username.toLowerCase().includes(searchLower) ||
        user.displayName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      // Sort by role importance first
      const roleOrder = { admin: 0, moderator: 1, contributor: 2, user: 3 }
      const roleA = roleOrder[a.role as keyof typeof roleOrder] || 999
      const roleB = roleOrder[b.role as keyof typeof roleOrder] || 999

      if (roleA !== roleB) return roleA - roleB

      // Then by username
      return a.username.localeCompare(b.username)
    })

  const handleViewUser = (user: UserType) => {
    setSelectedUser(user)
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
    handleRefresh() // Refresh the list to show any changes
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30"
      case "moderator":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
      case "contributor":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
      default:
        return `bg-${currentTheme.primary}/20 text-${currentTheme.primary} hover:bg-${currentTheme.primary}/30`
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-${currentTheme.text}/50`} />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "pl-10 bg-transparent border",
              currentTheme.border,
              `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className={`h-4 w-4 text-${currentTheme.text}/70`} />
          <select
            value={roleFilter || ""}
            onChange={(e) => setRoleFilter(e.target.value || null)}
            className={cn(
              "bg-transparent border rounded-md px-3 py-2",
              currentTheme.border,
              `text-${currentTheme.text}`,
            )}
          >
            <option value="">All Roles</option>
            {Object.entries(roles).map(([id, role]) => (
              <option key={id} value={id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <UserCheck className={`h-4 w-4 text-${currentTheme.text}/70`} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "banned")}
            className={cn(
              "bg-transparent border rounded-md px-3 py-2",
              currentTheme.border,
              `text-${currentTheme.text}`,
            )}
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="banned">Banned Only</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className={`border-${currentTheme.border} text-${currentTheme.text}`}
        >
          Refresh
        </Button>
      </div>

      {/* Users list */}
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {filteredUsers.length === 0 ? (
          <div
            className={cn(
              "p-8 rounded-xl backdrop-blur-md border text-center",
              currentTheme.glass,
              currentTheme.border,
            )}
          >
            <p className={`text-${currentTheme.text}/70`}>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-xl backdrop-blur-md border",
                currentTheme.glass,
                currentTheme.border,
                user.isBanned && "border-red-500/30 bg-red-500/5",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User
                        className={`h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-${currentTheme.text}/50`}
                      />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium text-${currentTheme.text}`}>{user.displayName}</h3>
                      <Badge variant="outline" className={cn("text-xs", getRoleBadgeColor(user.role))}>
                        {roles[user.role]?.name || user.role}
                      </Badge>
                      {user.isVerified && (
                        <Badge variant="outline" className="bg-green-500/20 text-green-500 text-xs">
                          Verified
                        </Badge>
                      )}
                      {user.isBanned && (
                        <Badge variant="outline" className="bg-red-500/20 text-red-500 text-xs">
                          Banned
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm text-${currentTheme.text}/60`}>@{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className={`text-xs text-${currentTheme.text}/60`}>
                      Joined {formatDistanceToNow(user.joinDate, { addSuffix: true })}
                    </p>
                    <p className={`text-xs text-${currentTheme.text}/60`}>
                      Last active {formatDistanceToNow(user.lastActive, { addSuffix: true })}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={`text-${currentTheme.text}/70`}>
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={cn(
                        "backdrop-blur-md border",
                        currentTheme.glass,
                        currentTheme.border,
                        `text-${currentTheme.text}`,
                      )}
                    >
                      <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className={currentTheme.border} />
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <Shield className="h-4 w-4 mr-2" />
                        Manage Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        {user.isBanned ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Unban User
                          </>
                        ) : (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Ban User
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* User details dialog */}
      {selectedUser && <UserDetailsDialog user={selectedUser} onClose={handleCloseDetails} />}
    </div>
  )
}
