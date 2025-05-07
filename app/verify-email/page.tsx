import VerifyEmail from "@/components/auth/verify-email"
import AuthGuard from "@/components/auth/auth-guard"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard>
        <VerifyEmail />
      </AuthGuard>
    </div>
  )
}
