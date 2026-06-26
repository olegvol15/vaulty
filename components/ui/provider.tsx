"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider as ReduxProvider } from "react-redux"
import type { ReactNode } from "react"
import { useState } from "react"
import { makeStore } from "@/lib/store"

type ProviderProps = {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  const [store] = useState(makeStore)

  return (
    <ReduxProvider store={store}>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  )
}
