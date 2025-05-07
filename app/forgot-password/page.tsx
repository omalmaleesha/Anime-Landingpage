import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import AuthGuard from "@/components/auth/auth-guard"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard requireGuest>
        <ForgotPasswordForm />
      </AuthGuard>
    </div>
  )
}
