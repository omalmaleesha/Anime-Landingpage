import { v4 as uuidv4 } from "uuid"
import { hashPassword, comparePasswords } from "./crypto"

// Types
export interface AuthUser {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

interface StoredUser extends AuthUser {
  passwordHash: string
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpiry?: Date
}

// Simulated database
const users: StoredUser[] = []

// Helper to get stored user by email
const getUserByEmail = (email: string): StoredUser | undefined => {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Helper to get stored user by username
const getUserByUsername = (username: string): StoredUser | undefined => {
  return users.find((user) => user.username.toLowerCase() === username.toLowerCase())
}

// Helper to get stored user by ID
const getUserById = (id: string): StoredUser | undefined => {
  return users.find((user) => user.id === id)
}

// Helper to convert stored user to auth user (remove sensitive data)
const toAuthUser = (user: StoredUser): AuthUser => {
  const { passwordHash, verificationToken, resetPasswordToken, resetPasswordExpiry, ...authUser } = user
  return authUser
}

// Sign up
export const signUp = async (
  email: string,
  username: string,
  password: string,
): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
  try {
    // Validate input
    if (!email || !username || !password) {
      return { success: false, message: "All fields are required" }
    }

    if (password.length < 8) {
      return { success: false, message: "Password must be at least 8 characters" }
    }

    // Check if email already exists
    if (getUserByEmail(email)) {
      return { success: false, message: "Email already in use" }
    }

    // Check if username already exists
    if (getUserByUsername(username)) {
      return { success: false, message: "Username already taken" }
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const newUser: StoredUser = {
      id: uuidv4(),
      email,
      username,
      displayName: username,
      passwordHash,
      isVerified: false,
      verificationToken: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Store user
    users.push(newUser)

    // Simulate sending verification email
    console.log(`Verification email sent to ${email} with token ${newUser.verificationToken}`)

    // Return user without sensitive data
    return { success: true, user: toAuthUser(newUser) }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, message: "Failed to create account" }
  }
}

// Sign in
export const signIn = async (
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
  try {
    // Find user
    const user = getUserByEmail(email)
    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Check password
    const isPasswordValid = await comparePasswords(password, user.passwordHash)
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" }
    }

    // Update last login
    user.updatedAt = new Date()

    // Store auth in localStorage for persistence
    localStorage.setItem(
      "animeverse-auth",
      JSON.stringify({
        userId: user.id,
        token: `simulated-jwt-token-${user.id}`,
      }),
    )

    // Return user without sensitive data
    return { success: true, user: toAuthUser(user) }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, message: "Failed to sign in" }
  }
}

// Sign out
export const signOut = async (): Promise<void> => {
  localStorage.removeItem("animeverse-auth")
}

// Get current user
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    // Get auth from localStorage
    const authData = localStorage.getItem("animeverse-auth")
    if (!authData) {
      return null
    }

    const { userId } = JSON.parse(authData)
    const user = getUserById(userId)

    if (!user) {
      return null
    }

    return toAuthUser(user)
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Update user profile
export const updateUserProfile = async (
  userId: string,
  data: Partial<AuthUser>,
): Promise<{ success: boolean; message?: string; user?: AuthUser }> => {
  try {
    const user = getUserById(userId)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    // Update allowed fields
    if (data.displayName) user.displayName = data.displayName
    if (data.avatar) user.avatar = data.avatar

    user.updatedAt = new Date()

    return { success: true, user: toAuthUser(user) }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, message: "Failed to update profile" }
  }
}

// Verify email
export const verifyEmail = async (email: string, token?: string): Promise<{ success: boolean; message: string }> => {
  try {
    const user = getUserByEmail(email)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    if (token) {
      // Verify token
      if (user.verificationToken !== token) {
        return { success: false, message: "Invalid verification token" }
      }

      // Mark as verified
      user.isVerified = true
      user.verificationToken = undefined
      user.updatedAt = new Date()

      return { success: true, message: "Email verified successfully" }
    } else {
      // Generate new token and send verification email
      user.verificationToken = uuidv4()
      user.updatedAt = new Date()

      // Simulate sending verification email
      console.log(`Verification email sent to ${email} with token ${user.verificationToken}`)

      return { success: true, message: "Verification email sent" }
    }
  } catch (error) {
    console.error("Verify email error:", error)
    return { success: false, message: "Failed to verify email" }
  }
}

// Request password reset
export const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const user = getUserByEmail(email)
    if (!user) {
      // Don't reveal if email exists or not for security
      return { success: true, message: "If your email is registered, you will receive a password reset link" }
    }

    // Generate token
    const token = uuidv4()
    user.resetPasswordToken = token

    // Set expiry to 1 hour from now
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1)
    user.resetPasswordExpiry = expiry

    user.updatedAt = new Date()

    // Simulate sending reset email
    console.log(`Password reset email sent to ${email} with token ${token}`)

    return { success: true, message: "If your email is registered, you will receive a password reset link" }
  } catch (error) {
    console.error("Request password reset error:", error)
    return { success: false, message: "Failed to request password reset" }
  }
}

// Reset password
export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate password
    if (newPassword.length < 8) {
      return { success: false, message: "Password must be at least 8 characters" }
    }

    // Find user with this token
    const user = users.find((u) => u.resetPasswordToken === token)
    if (!user) {
      return { success: false, message: "Invalid or expired token" }
    }

    // Check if token is expired
    if (user.resetPasswordExpiry && user.resetPasswordExpiry < new Date()) {
      return { success: false, message: "Token has expired" }
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update password
    user.passwordHash = passwordHash
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    user.updatedAt = new Date()

    return { success: true, message: "Password reset successfully" }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, message: "Failed to reset password" }
  }
}

// Change password (when logged in)
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = getUserById(userId)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    // Verify current password
    const isPasswordValid = await comparePasswords(currentPassword, user.passwordHash)
    if (!isPasswordValid) {
      return { success: false, message: "Current password is incorrect" }
    }

    // Validate new password
    if (newPassword.length < 8) {
      return { success: false, message: "New password must be at least 8 characters" }
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update password
    user.passwordHash = passwordHash
    user.updatedAt = new Date()

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    console.error("Change password error:", error)
    return { success: false, message: "Failed to change password" }
  }
}
