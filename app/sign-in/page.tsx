import SignInForm from "@/components/auth/sign-in-form"
import AuthGuard from "@/components/auth/auth-guard"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard requireGuest>
        <SignInForm />
      </AuthGuard>
    </div>
  )
}
