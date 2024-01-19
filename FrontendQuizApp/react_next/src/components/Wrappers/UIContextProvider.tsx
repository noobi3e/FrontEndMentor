'use client'
import { PropsWithChildren, createContext, useState } from 'react'

export const UIContext = createContext<{
  mode: 'light' | 'dark'
  toggleMode: () => void
}>({
  mode: 'light',
  toggleMode: () => {},
})

const UIContextProvider = ({ children }: PropsWithChildren) => {
  const [MODE, setMODE] = useState<'light' | 'dark'>('dark')

  const toggleMode = () =>
    setMODE((lst) => {
      let m = lst

      switch (m) {
        case 'dark':
          m = 'light'
          break
        case 'light':
          m = 'dark'
          break
        default:
          ''
      }

      return m
    })

  return (
    <UIContext.Provider
      value={{
        mode: MODE,
        toggleMode,
      }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIContextProvider
