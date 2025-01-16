import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(allowedRoles: string[]) {
  const router = useRouter()

  useEffect(() => {
    // Get token from cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      router.push('/login')
      return
    }

    // Extract role from token
    const userRole = token.split('-')[0]

    if (!allowedRoles.includes(userRole)) {
      // Handle unauthorized access
      router.push('/unauthorized') // or show an error message
    }
  }, [router, allowedRoles])
} 