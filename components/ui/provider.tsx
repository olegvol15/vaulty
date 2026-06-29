"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider as ReduxProvider } from "react-redux"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { makeStore } from "@/lib/store"
import { setSidebarOpen } from "@/lib/slices/vaultSlice"
import { Toaster } from "./toast/toaster"

type ProviderProps = {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  const [store] = useState(makeStore)

  useEffect(() => {
    const saved = localStorage.getItem("sidebarOpen")
    if (saved !== null) {
      store.dispatch(setSidebarOpen(JSON.parse(saved)))
    }
  }, [store])


  return (
    <ReduxProvider store={store}>
      <ChakraProvider value={defaultSystem}>
        {children}
        <Toaster />
      </ChakraProvider>
    </ReduxProvider>
  )
}
