'use client'
import React, { FC, FormEvent, useState } from 'react'
import SubjectOROptionsWrapper from '../Wrappers/SubjectOROptionsWrapper'
import { QUIZ_QUESTIONS } from '@/lib/data'
import Image from 'next/image'

interface QuizProps {
  quizId: string
}

const optionslabels = 'abcdefghijklmnopqrstuvwzyz'.split('')

const Quiz: FC<QuizProps> = ({ quizId }) => {
  const [quesIndex, setQuesIndex] = useState(0)

  const question = QUIZ_QUESTIONS.find(
    (el) => el.title.toLowerCase() === quizId
  )?.questions

  const options = question?.[quesIndex].options || []

  return (
    <>
      <section className='flex flex-col gap-6 flex-1 self-stretch'>
        <em className='text-white text-opacity-50' id='infoLabel'>
          Question {quesIndex + 1} out of {question?.length}
        </em>
        <h1
          id='question'
          className='text-5xl flex flex-col gap-2 max-[700px]:text-4xl'>
          {question?.[quesIndex]?.ques}
        </h1>
        {/* Progress BAR */}
        <div
          className='w-[90%] p-[3px] h-[15px] mt-auto mb-[130px] cus-shadow bg-primaryLight rounded-full max-[1050px]:my-10 max-[1050px]:w-full'
          id='progressBarBOX'>
          <p
            id='progressBar'
            className='bg-secondary h-full transition-all rounded-full w-[50%]'
          />
        </div>
      </section>

      <section className='flex-1'>
        <QuizForm
          options={options}
          key={'QuizForm' + quesIndex}
          increaseIndex={() => setQuesIndex((lst) => lst + 1)}
        />
      </section>
    </>
  )
}

export default Quiz

const FORM_MODES = {
  submit: 'Submit Answer',
  next: 'Next Question',
  results: 'Show Results',
}

const QuizForm = ({
  options,
  increaseIndex,
}: {
  options: any
  increaseIndex: () => void
}) => {
  const [formMode, setFormMode] = useState<keyof typeof FORM_MODES>('submit')
  const [isAnswered, setIsAnswered] = useState(false)
  const [userAns, setUserAns] = useState<number>()
  const [error, setError] = useState('')

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formMode !== 'results' && !isAnswered)
      return setError('Please Select an Option')

    switch (formMode) {
      case 'submit':
        setFormMode('next')
        break
      case 'next':
        setFormMode('submit')
        increaseIndex()
        break

      default:
        ''
    }
  }

  return (
    <form id='answerForm' action='#' onSubmit={formSubmitHandler}>
      <p
        id='errorBox'
        className='text-center font-medium text-xl text-red-500 mb-5'>
        {error}
      </p>
      <SubjectOROptionsWrapper>
        {options.map((el: any, i: number) => (
          <article
            className={userAns === i && formMode === 'next' ? 'showAnswer' : ''}
            key={el.title}>
            <input
              type='radio'
              name='answers'
              id={`option${i}`}
              className='answersINP'
              hidden
              onChange={(e) => {
                setError('')
                !isAnswered && setIsAnswered(e.target.checked)
                e.target.checked && setUserAns(i)
              }}
              disabled={formMode === 'next'}
              value='right'
            />
            <label
              style={{ animationDelay: `0.${i}s` }}
              htmlFor={`option${i}`}
              role='button'
              className={`text-2xl max-[400px]:text-lg max-[700px]:text-xl w-full h-[90px] rounded-[24px] bg-primaryLight flex items-center gap-5 p-4 transition-all border-[4px] border-transparent comeIn ${
                el.isCorrect ? 'right' : 'wrong'
              }`}>
              <span
                className={`bg-[#F5F6FD]  aspect-square h-full rounded-[12px] transition-all flex items-center justify-center text-primary font-semibold text-2xl uppercase  ${
                  el.isCorrect ? 'right' : 'wrong'
                }`}>
                {optionslabels[i]}
              </span>
              {el.title}
              <Image
                src={`/icons/${
                  el.isCorrect ? 'icon-correct.svg' : 'icon-incorrect.svg'
                }`}
                className='ml-auto hidden h-full w-auto'
                alt='ans icon'
                width={40}
                height={40}
              />
            </label>
          </article>
        ))}
      </SubjectOROptionsWrapper>

      <button
        type='submit'
        id='submitButton'
        className='w-full h-[90px] mt-10 rounded-[26px] bg-secondary flex items-center text-2xl justify-center font-semibold gap-5 p-4 transition-all'>
        {FORM_MODES[formMode]}
      </button>
    </form>
  )
}
