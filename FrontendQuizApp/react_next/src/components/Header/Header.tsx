'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UIContext } from '../providers/UIContextProvider'

const Header = () => {
  const ui = useContext(UIContext)

  return (
    <header className='flex justify-between items-center py-16 max-[700px]:py-10 max-[550px]:py-8'>
      <div className='flex items-center gap-4' id='activeQuizHeader'>
        {/* HEADER */}
      </div>

      {/* MODE OPTIONS */}
      <nav className='flex items-center gap-5'>
        <Image
          id='sunIcon'
          src='/icons/icon-sun-dark.svg'
          alt='sun icon'
          height={26}
          width={26}
        />
        <div>
          {/* TOGGLER */}
          <input
            type='checkbox'
            hidden
            className='toggleINP'
            id='toggleModeINP'
            onChange={() => ui.toggleMode()}
            checked={ui.mode === 'dark'}
          />
          <label
            role='button'
            htmlFor='toggleModeINP'
            className='w-[42px] h-6 rounded-full bg-[#EBF2FF] flex relative'>
            <span className='toggleDOT'></span>
          </label>
        </div>
        <Image
          src='/icons/icon-moon-light.svg'
          id='moonIcon'
          alt='moon icon'
          width={26}
          height={26}
        />
      </nav>
    </header>
  )
}

export default Header
