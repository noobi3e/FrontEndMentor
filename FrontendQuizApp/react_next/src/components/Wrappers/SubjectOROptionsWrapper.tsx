'use client'
import React, { PropsWithChildren, useContext } from 'react'
import { UIContext } from './UIContextProvider'

const SubjectOROptionsWrapper = ({ children }: PropsWithChildren) => {
  const { mode } = useContext(UIContext)
  return (
    <div
      id='optionsContainer'
      className={`${
        mode === 'light' ? 'cus-light' : ''
      } flex flex-col gap-5 max-[1050px]:gap-6 max-[400px]:gap-4`}>
      {children}
    </div>
  )
}

export default SubjectOROptionsWrapper
