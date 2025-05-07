import UserProfile from "@/components/auth/user-profile"
import AuthGuard from "@/components/auth/auth-guard"

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <AuthGuard requireAuth>
        <UserProfile />
      </AuthGuard>
    </div>
  )
}
