import { QUIZ_QUESTIONS } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Subjects = () => {
  return QUIZ_QUESTIONS.map((el) => (
    <article key={el.id}>
      <Link
        href={el.title.toLowerCase()}
        className='text-2xl w-full cursor-pointer h-[90px] rounded-[20px] bg-primaryLight flex items-center gap-5 p-3 transition-all border-[4px] border-transparent font-medium outline-none typeLink'>
        <span
          style={{ background: el.backgroundColor }}
          className='aspect-square h-full rounded-[10px] transition-all flex items-center justify-center text-primary font-semibold text-2xl'>
          <Image src={el.icon} alt='Subject Icon' width={35} height={35} />
        </span>
        {el.title}
      </Link>
    </article>
  ))
}

export default Subjects
