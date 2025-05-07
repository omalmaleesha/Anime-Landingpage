"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth()
  const { currentTheme } = useTheme()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/sign-in")}
          className={cn("border", currentTheme.border, `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10`)}
        >
          Sign In
        </Button>
        <Button
          onClick={() => router.push("/sign-up")}
          className={`bg-${currentTheme.primary} hover:bg-${currentTheme.primary}/80 text-${currentTheme.text}`}
        >
          Sign Up
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border",
            currentTheme.border,
            `text-${currentTheme.text} hover:bg-${currentTheme.primary}/10 flex items-center gap-2`,
          )}
        >
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 rounded-full overflow-hidden bg-gray-200">
              {user?.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User
                  className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-${currentTheme.text}/50`}
                />
              )}
            </div>
            <span className="hidden md:inline">{user?.displayName}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("backdrop-blur-md border", currentTheme.glass, currentTheme.border, `text-${currentTheme.text}`)}
      >
        <div className="px-2 py-1.5 text-sm font-semibold">{user?.displayName}</div>
        <div className="px-2 py-1.5 text-xs text-muted-foreground">@{user?.username}</div>
        <DropdownMenuSeparator className={currentTheme.border} />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={currentTheme.border} />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
