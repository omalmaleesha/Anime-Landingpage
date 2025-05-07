"use client"

import VerifyEmail from "@/components/auth/verify-email"
import AuthGuard from "@/components/auth/auth-guard"

export default function VerifyEmailWithTokenPage({ params }: { params: { token: string } }) {
  const { token } = params

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthGuard>
        <VerifyEmail token={token} />
      </AuthGuard>
    </div>
  )
}
