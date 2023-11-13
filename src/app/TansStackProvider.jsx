'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'

const TansStackProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient())
    
    return (
        <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
        </QueryClientProvider>
    )
    }

export default TansStackProvider