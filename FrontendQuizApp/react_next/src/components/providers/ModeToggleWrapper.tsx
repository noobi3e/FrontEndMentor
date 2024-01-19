'use client'
import React, { PropsWithChildren, ReactNode, useContext } from 'react'
import { UIContext } from './UIContextProvider'

const ModeToggleWrapper = ({ children }: PropsWithChildren) => {
  const ui = useContext(UIContext)

  return (
    <section
      id='modeToggler'
      className={`${
        ui.mode === 'dark' ? 'cus-dark' : 'cus-light'
      } overflow-x-hidden relative min-h-[100dvh]`}>
      <div
        id='graphicsBottom'
        style={{
          borderColor: ui.mode === 'dark' ? '#2C3949' : '#EBF2FF',
        }}
        className='h-[140dvh] aspect-square bg-transparent border-[15dvh] rounded-full fixed z-[5] right-0 bottom-0 translate-x-[50%] translate-y-[50%] max-[700px]:h-[100dvh]'
      />
      <div
        id='graphicsTop'
        style={{
          borderColor: ui.mode === 'dark' ? '#2C3949' : '#EBF2FF',
        }}
        className='h-[100dvh] aspect-square bg-transparent border-[15dvh] rounded-full fixed z-[5] top-0 left-0 translate-x-[-50%] translate-y-[-50%] max-[700px]:h-[80dvh]'
      />

      {/* Content */}
      <div className='relative z-[10]'>{children}</div>
    </section>
  )
}

export default ModeToggleWrapper
