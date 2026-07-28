// Profile fields used across the UI after auth; keep in sync with the users table / Supabase session.
export type User = {
  id: string
  displayName: string
  email: string
}

// Returns the current user's profile for UI display, or null when no session exists.
export function getUser(): User | null {
  return null
}
