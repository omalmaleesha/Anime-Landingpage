export interface UserRole {
  id: string
  name: string
  permissions: string[]
}

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  avatar: string
  joinDate: Date
  lastActive: Date
  role: string
  isBanned: boolean
  banReason?: string
  banExpiry?: Date
  isVerified: boolean
  bio?: string
  customPermissions?: string[]
}

export interface BanRecord {
  userId: string
  adminId: string
  reason: string
  startDate: Date
  endDate?: Date
  isActive: boolean
  notes?: string
}

// Define roles and their permissions
export const roles: Record<string, UserRole> = {
  admin: {
    id: "admin",
    name: "Administrator",
    permissions: [
      "manage_users",
      "manage_content",
      "manage_comments",
      "manage_roles",
      "ban_users",
      "delete_users",
      "view_analytics",
      "manage_settings",
    ],
  },
  moderator: {
    id: "moderator",
    name: "Moderator",
    permissions: ["manage_comments", "ban_users", "view_analytics"],
  },
  contributor: {
    id: "contributor",
    name: "Contributor",
    permissions: ["create_content", "edit_own_content"],
  },
  user: {
    id: "user",
    name: "User",
    permissions: ["create_comments"],
  },
}

// Sample users
export const sampleUsers: User[] = [
  {
    id: "user-1",
    username: "admin",
    email: "admin@animeverse.com",
    displayName: "Admin User",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2022, 0, 1),
    lastActive: new Date(),
    role: "admin",
    isBanned: false,
    isVerified: true,
    bio: "Site administrator",
  },
  {
    id: "user-2",
    username: "moderator",
    email: "mod@animeverse.com",
    displayName: "Mod User",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2022, 1, 15),
    lastActive: new Date(),
    role: "moderator",
    isBanned: false,
    isVerified: true,
    bio: "Community moderator",
  },
  {
    id: "user-3",
    username: "animeexplorer",
    email: "explorer@example.com",
    displayName: "AnimeExplorer",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2022, 3, 10),
    lastActive: new Date(),
    role: "user",
    isBanned: false,
    isVerified: true,
    bio: "Anime enthusiast and reviewer",
  },
  {
    id: "user-4",
    username: "filmcritic2023",
    email: "critic@example.com",
    displayName: "FilmCritic2023",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2023, 0, 5),
    lastActive: new Date(),
    role: "contributor",
    isBanned: false,
    isVerified: true,
    bio: "Professional film critic and anime lover",
  },
  {
    id: "user-5",
    username: "japanfan",
    email: "japan@example.com",
    displayName: "JapanFan",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2022, 6, 22),
    lastActive: new Date(),
    role: "user",
    isBanned: false,
    isVerified: true,
  },
  {
    id: "user-6",
    username: "banneduser",
    email: "banned@example.com",
    displayName: "Banned User",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: new Date(2022, 8, 15),
    lastActive: new Date(2023, 2, 10),
    role: "user",
    isBanned: true,
    banReason: "Repeated violations of community guidelines",
    banExpiry: new Date(2024, 2, 10),
    isVerified: true,
  },
]

// Ban records
export const banRecords: BanRecord[] = [
  {
    userId: "user-6",
    adminId: "user-1",
    reason: "Repeated violations of community guidelines",
    startDate: new Date(2023, 2, 10),
    endDate: new Date(2024, 2, 10),
    isActive: true,
    notes: "Multiple instances of inappropriate comments and harassment",
  },
]

// In-memory store
let users = [...sampleUsers]
let bans = [...banRecords]

// User management functions
export function getAllUsers(): User[] {
  return [...users]
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username.toLowerCase() === username.toLowerCase())
}

export function updateUser(updatedUser: User): User {
  users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
  return updatedUser
}

export function deleteUser(id: string): boolean {
  const initialLength = users.length
  users = users.filter((user) => user.id !== id)
  return users.length < initialLength
}

export function banUser(userId: string, adminId: string, reason: string, endDate?: Date): BanRecord {
  // Update user
  users = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        isBanned: true,
        banReason: reason,
        banExpiry: endDate,
      }
    }
    return user
  })

  // Create ban record
  const banRecord: BanRecord = {
    userId,
    adminId,
    reason,
    startDate: new Date(),
    endDate,
    isActive: true,
  }

  bans.push(banRecord)
  return banRecord
}

export function unbanUser(userId: string): boolean {
  // Update user
  users = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        isBanned: false,
        banReason: undefined,
        banExpiry: undefined,
      }
    }
    return user
  })

  // Update ban records
  bans = bans.map((ban) => {
    if (ban.userId === userId && ban.isActive) {
      return {
        ...ban,
        isActive: false,
        endDate: new Date(),
      }
    }
    return ban
  })

  return true
}

export function getUserBanHistory(userId: string): BanRecord[] {
  return bans.filter((ban) => ban.userId === userId)
}

export function hasPermission(user: User, permission: string): boolean {
  // Get role permissions
  const rolePermissions = roles[user.role]?.permissions || []

  // Check custom permissions
  const customPermissions = user.customPermissions || []

  // Return true if the permission is in either array
  return rolePermissions.includes(permission) || customPermissions.includes(permission)
}

export function createUser(newUser: Omit<User, "id" | "joinDate">): User {
  const user: User = {
    id: `user-${Date.now()}`,
    joinDate: new Date(),
    ...newUser,
  }

  users.push(user)
  return user
}

export function changeUserRole(userId: string, newRole: string): User | undefined {
  if (!roles[newRole]) return undefined

  let updatedUser: User | undefined

  users = users.map((user) => {
    if (user.id === userId) {
      updatedUser = {
        ...user,
        role: newRole,
      }
      return updatedUser
    }
    return user
  })

  return updatedUser
}

export function getAllRoles(): UserRole[] {
  return Object.values(roles)
}
