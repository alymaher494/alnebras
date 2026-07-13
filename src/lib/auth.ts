import { NextRequest } from 'next/server'

export function checkAuth(request: NextRequest): boolean {
  const session = request.cookies.get('admin_session')
  return !!(session && session.value === 'nebras_admin_authorized')
}
