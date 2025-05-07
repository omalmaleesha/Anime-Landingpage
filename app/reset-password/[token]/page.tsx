"use client"

import ResetPasswordForm from "@/components/auth/reset-password-form"
import AuthGuard from "@/components/auth/auth-guard"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { token } = params

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard requireGuest>
        <ResetPasswordForm token={token} />
      </AuthGuard>
    </div>
  )
}
