'use client'
import React, { ReactNode } from 'react'

const ModeToggleWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section
      id='modeToggler'
      className='cus-dark overflow-x-hidden relative min-h-[100dvh]'>
      <div
        id='graphicsBottom'
        className='h-[140dvh] aspect-square bg-transparent border-[15dvh] border-primaryDark rounded-full fixed z-[5] right-0 bottom-0 translate-x-[50%] translate-y-[50%] max-[700px]:h-[100dvh]'
      />
      <div
        id='graphicsTop'
        className='h-[100dvh] aspect-square bg-transparent border-[15dvh] border-primaryDark rounded-full fixed z-[5] top-0 left-0 translate-x-[-50%] translate-y-[-50%] max-[700px]:h-[80dvh]'
      />

      {/* Content */}
      <div className='relative z-[10]'>{children}</div>
    </section>
  )
}

export default ModeToggleWrapper
