import SignUpForm from "@/components/auth/sign-up-form"
import AuthGuard from "@/components/auth/auth-guard"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard requireGuest>
        <SignUpForm />
      </AuthGuard>
    </div>
  )
}
