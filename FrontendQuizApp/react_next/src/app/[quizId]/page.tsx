import Quiz from '@/components/Quiz/Quiz'
import React from 'react'

const QuizPage = ({ params: { quizId } }: { params: { quizId: string } }) => {
  return (
    <main className='flex items-start mb-16 gap-20 max-[1215px]:gap-10 max-[1050px]:flex-col max-[1050px]:items-stretch max-[1050px]:gap-0 max-[700px]:mb-10 max-[550px]:mb-8 max-[400px]:mb-5'>
      <Quiz quizId={quizId} />
    </main>
  )
}

export default QuizPage
