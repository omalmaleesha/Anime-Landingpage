"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import {
  User,
  Shield,
  UserX,
  UserCheck,
  Calendar,
  Mail,
  Clock,
  Save,
  AlertTriangle,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import {
  type User as UserType,
  updateUser,
  deleteUser,
  banUser,
  unbanUser,
  getUserBanHistory,
  roles,
  getAllRoles,
  type BanRecord,
  hasPermission,
} from "@/data/users"
import { format, formatDistanceToNow } from "date-fns"
import { useAdmin } from "@/context/admin-context"

interface UserDetailsDialogProps {
  user: UserType
  onClose: () => void
}

export default function UserDetailsDialog({ user: initialUser, onClose }: UserDetailsDialogProps) {
  const [user, setUser] = useState<UserType>(initialUser)
  const [editedUser, setEditedUser] = useState<UserType>(initialUser)
  const [banReason, setBanReason] = useState("")
  const [banDuration, setBanDuration] = useState("permanent")
  const [customBanDays, setCustomBanDays] = useState(30)
  const [banHistory, setBanHistory] = useState<BanRecord[]>(getUserBanHistory(user.id))
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState("")

  const { currentTheme } = useTheme()
  const { adminUser } = useAdmin()

  const allRoles = getAllRoles()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setIsSaving(true)
    setSaveError("")

    try {
      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)) {
        throw new Error("Please enter a valid email address")
      }

      // In a real app, this would be an API call
      setTimeout(() => {
        const updatedUser = updateUser(editedUser)
        setUser(updatedUser)
        setIsSaving(false)
        setSaveSuccess(true)

        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }, 1000)
    } catch (error) {
      setIsSaving(false)
      setSaveError((error as Error).message)
    }
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    setEditedUser((prev) => ({ ...prev, role: newRole }))
  }

  const handleBanUser = () => {
    if (!banReason.trim()) {
      setSaveError("Please provide a reason for the ban")
      return
    }

    setIsSaving(true)
    setSaveError("")

    try {
      // Calculate ban expiry date
      let banExpiry: Date | undefined

      if (banDuration !== "permanent") {
        const days = banDuration === "custom" ? customBanDays : Number.parseInt(banDuration)
        banExpiry = new Date()
        banExpiry.setDate(banExpiry.getDate() + days)
      }

      // In a real app, this would be an API call
      setTimeout(() => {
        if (!adminUser) {
          throw new Error("Admin user not found")
        }

        banUser(user.id, adminUser.id, banReason, banExpiry)
        const updatedUser = { ...user, isBanned: true, banReason, banExpiry }
        setUser(updatedUser)
        setEditedUser(updatedUser)
        setBanHistory(getUserBanHistory(user.id))
        setIsSaving(false)
        setSaveSuccess(true)

        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }, 1000)
    } catch (error) {
      setIsSaving(false)
      setSaveError((error as Error).message)
    }
  }

  const handleUnbanUser = () => {
    setIsSaving(true)
    setSaveError("")

    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        unbanUser(user.id)
        const updatedUser = { ...user, isBanned: false, banReason: undefined, banExpiry: undefined }
        setUser(updatedUser)
        setEditedUser(updatedUser)
        setBanHistory(getUserBanHistory(user.id))
        setIsSaving(false)
        setSaveSuccess(true)

        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }, 1000)
    } catch (error) {
      setIsSaving(false)
      setSaveError((error as Error).message)
    }
  }

  const handleDeleteUser = () => {
    setIsSaving(true)
    setSaveError("")

    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        deleteUser(user.id)
        setIsSaving(false)
        onClose()
      }, 1000)
    } catch (error) {
      setIsSaving(false)
      setSaveError((error as Error).message)
    }
  }

  const canEditRole = adminUser && hasPermission(adminUser, "manage_roles")
  const canBanUser = adminUser && hasPermission(adminUser, "ban_users")
  const canDeleteUser = adminUser && hasPermission(adminUser, "delete_users")

  // Don't allow admins to ban other admins unless they are also admins
  const canBanThisUser = canBanUser && (user.role !== "admin" || adminUser?.role === "admin")

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-3xl backdrop-blur-md border",
          currentTheme.glass,
          currentTheme.border,
          `text-${currentTheme.text}`,
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details: {user.displayName}
          </DialogTitle>
        </DialogHeader>

        {saveSuccess && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-3 rounded-md flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5" />
            Changes saved successfully
          </div>
        )}

        {saveError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md flex items-center gap-2 mb-4">
            <XCircle className="h-5 w-5" />
            {saveError}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className={cn("w-full mb-6 bg-transparent border-b", currentTheme.border, "rounded-none p-0 h-auto")}
          >
            <TabsTrigger
              value="profile"
              className={cn(
                "rounded-t-lg data-[state=active]:bg-transparent",
                `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                "py-3 px-6",
              )}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className={cn(
                "rounded-t-lg data-[state=active]:bg-transparent",
                `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                "py-3 px-6",
              )}
            >
              <Shield className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
            <TabsTrigger
              value="ban"
              className={cn(
                "rounded-t-lg data-[state=active]:bg-transparent",
                `data-[state=active]:border-b-2 data-[state=active]:border-${currentTheme.primary}`,
                `text-${currentTheme.text}/70 data-[state=active]:text-${currentTheme.text}`,
                "py-3 px-6",
              )}
            >
              <UserX className="h-4 w-4 mr-2" />
              Ban Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Username</label>
                <Input
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                  className={cn(
                    "bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Display Name</label>
                <Input
                  name="displayName"
                  value={editedUser.displayName}
                  onChange={handleInputChange}
                  className={cn(
                    "bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Email</label>
                <Input
                  name="email"
                  type="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className={cn(
                    "bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Avatar URL</label>
                <Input
                  name="avatar"
                  value={editedUser.avatar}
                  onChange={handleInputChange}
                  className={cn(
                    "bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Bio</label>
                <Textarea
                  name="bio"
                  value={editedUser.bio || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className={cn(
                    "resize-none bg-transparent border",
                    currentTheme.border,
                    `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                  )}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className={`h-4 w-4 text-${currentTheme.text}/70`} />
                <span className={`text-sm text-${currentTheme.text}/70`}>Joined: {format(user.joinDate, "PPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 text-${currentTheme.text}/70`} />
                <span className={`text-sm text-${currentTheme.text}/70`}>
                  Last active: {format(user.lastActive, "PPP")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`h-4 w-4 text-${currentTheme.text}/70`} />
                <span className={`text-sm text-${currentTheme.text}/70`}>
                  Verification: {user.isVerified ? "Verified" : "Not verified"}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={cn(
                  "border",
                  currentTheme.border,
                  `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
                )}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              {canDeleteUser && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving || showDeleteConfirm}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              )}
            </div>

            {showDeleteConfirm && (
              <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-md">
                <h4 className="text-red-500 font-medium mb-2">Confirm Account Deletion</h4>
                <p className="text-sm text-red-400 mb-4">
                  This action cannot be undone. All user data, comments, and content will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <Button variant="destructive" onClick={handleDeleteUser} disabled={isSaving}>
                    {isSaving ? "Deleting..." : "Confirm Delete"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>User Role</label>
              <div className="flex gap-3 items-center">
                <select
                  name="role"
                  value={editedUser.role}
                  onChange={handleRoleChange}
                  disabled={!canEditRole}
                  className={cn(
                    "bg-transparent border rounded-md px-3 py-2 flex-1",
                    currentTheme.border,
                    `text-${currentTheme.text}`,
                    !canEditRole && "opacity-70 cursor-not-allowed",
                  )}
                >
                  {allRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>

                {!canEditRole && (
                  <div className="text-sm text-yellow-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    You don't have permission to change roles
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className={`font-medium text-${currentTheme.text} mb-2`}>Role Permissions</h4>
              <div className={cn("p-4 rounded-md border", currentTheme.border, "bg-black/10")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {roles[user.role]?.permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className={`text-sm text-${currentTheme.text}`}>
                        {permission.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleSaveProfile}
                disabled={isSaving || !canEditRole}
                className={cn(
                  "border",
                  currentTheme.border,
                  `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`,
                  !canEditRole && "opacity-70 cursor-not-allowed",
                )}
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ban" className="space-y-4">
            {user.isBanned ? (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <UserX className="h-5 w-5 text-red-500" />
                  <h3 className="text-red-500 font-medium">User is Currently Banned</h3>
                </div>
                <p className={`text-${currentTheme.text}/80 mb-2`}>
                  <strong>Reason:</strong> {user.banReason}
                </p>
                {user.banExpiry ? (
                  <p className={`text-${currentTheme.text}/80 mb-4`}>
                    <strong>Ban expires:</strong> {format(user.banExpiry, "PPP")} (
                    {formatDistanceToNow(user.banExpiry, { addSuffix: true })})
                  </p>
                ) : (
                  <p className={`text-${currentTheme.text}/80 mb-4`}>
                    <strong>Ban type:</strong> Permanent
                  </p>
                )}

                {canBanThisUser && (
                  <Button
                    onClick={handleUnbanUser}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isSaving ? (
                      "Processing..."
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Remove Ban
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Ban Reason</label>
                  <Textarea
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder="Explain why this user is being banned..."
                    rows={3}
                    className={cn(
                      "resize-none bg-transparent border",
                      currentTheme.border,
                      `text-${currentTheme.text} placeholder:text-${currentTheme.text}/50`,
                    )}
                    disabled={!canBanThisUser}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>Ban Duration</label>
                  <select
                    value={banDuration}
                    onChange={(e) => setBanDuration(e.target.value)}
                    className={cn(
                      "bg-transparent border rounded-md px-3 py-2 w-full",
                      currentTheme.border,
                      `text-${currentTheme.text}`,
                      !canBanThisUser && "opacity-70 cursor-not-allowed",
                    )}
                    disabled={!canBanThisUser}
                  >
                    <option value="1">1 day</option>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="custom">Custom duration</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>

                {banDuration === "custom" && (
                  <div>
                    <label className={`block text-sm font-medium text-${currentTheme.text}/70 mb-1`}>
                      Custom Duration (days)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={customBanDays}
                      onChange={(e) => setCustomBanDays(Number.parseInt(e.target.value) || 1)}
                      className={cn(
                        "bg-transparent border",
                        currentTheme.border,
                        `text-${currentTheme.text}`,
                        !canBanThisUser && "opacity-70 cursor-not-allowed",
                      )}
                      disabled={!canBanThisUser}
                    />
                  </div>
                )}

                {!canBanThisUser && (
                  <div className="text-sm text-yellow-500 flex items-center gap-1 p-2 border border-yellow-500/30 bg-yellow-500/10 rounded-md">
                    <AlertTriangle className="h-4 w-4" />
                    {user.role === "admin"
                      ? "You don't have permission to ban administrators"
                      : "You don't have permission to ban users"}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="destructive"
                    onClick={handleBanUser}
                    disabled={isSaving || !canBanThisUser || !banReason.trim()}
                  >
                    {isSaving ? (
                      "Processing..."
                    ) : (
                      <>
                        <UserX className="h-4 w-4 mr-2" />
                        Ban User
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Ban history */}
            <div className="mt-6">
              <h4 className={`font-medium text-${currentTheme.text} mb-2`}>Ban History</h4>
              {banHistory.length === 0 ? (
                <p className={`text-${currentTheme.text}/60 text-sm`}>No previous bans found</p>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {banHistory.map((ban, index) => (
                    <div key={index} className={cn("p-3 rounded-md border", currentTheme.border, "bg-black/10")}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {ban.isActive ? (
                            <Badge variant="outline" className="bg-red-500/20 text-red-500 text-xs">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-500/20 text-gray-400 text-xs">
                              Expired
                            </Badge>
                          )}
                          <span className={`text-sm text-${currentTheme.text}/70`}>{format(ban.startDate, "PPP")}</span>
                        </div>
                        <span className={`text-xs text-${currentTheme.text}/60`}>
                          {ban.endDate ? `Until ${format(ban.endDate, "PPP")}` : "Permanent"}
                        </span>
                      </div>
                      <p className={`text-sm text-${currentTheme.text}/80`}>
                        <strong>Reason:</strong> {ban.reason}
                      </p>
                      {ban.notes && (
                        <p className={`text-xs text-${currentTheme.text}/70 mt-1`}>
                          <strong>Notes:</strong> {ban.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
