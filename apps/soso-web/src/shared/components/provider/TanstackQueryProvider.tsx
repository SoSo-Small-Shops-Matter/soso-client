'use client'

import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface TanstackQueryProviderProps {
  children: ReactNode
  onMutationError?: (error: unknown) => void
}

export default function TanstackQueryProvider({ children, onMutationError }: TanstackQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error) => {
            onMutationError?.(error)
          },
        }),
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
