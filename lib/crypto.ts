// In a real application, we would use bcrypt or Argon2
// For this demo, we'll use a simple simulation

export async function hashPassword(password: string): Promise<string> {
  // In a real app, we would use bcrypt.hash() or similar
  // This is just a simulation
  return `hashed_${password}_${Date.now()}`
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  // In a real app, we would use bcrypt.compare() or similar
  // This is just a simulation that checks if the hash starts with "hashed_" + the password
  return hash.startsWith(`hashed_${password}_`)
}
