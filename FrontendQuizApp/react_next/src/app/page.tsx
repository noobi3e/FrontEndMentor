import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* MAIN QUIZ CONTAINER */}
      <main className='flex items-start mb-16 gap-20 max-[1215px]:gap-10 max-[1050px]:flex-col max-[1050px]:items-stretch max-[1050px]:gap-0 max-[700px]:mb-10 max-[550px]:mb-8 max-[400px]:mb-5'>
        {/* QUESTIONS SECTION */}
        <section className='flex flex-col gap-6 flex-1 self-stretch'>
          <em className='text-white text-opacity-50' id='infoLabel'>
            {/* QUESTION/STARTER LABEL */}
          </em>
          <h1
            id='question'
            className='text-5xl flex flex-col gap-2 max-[700px]:text-4xl'>
            {/* QUESTION/HEADER */}
          </h1>
          {/* Progress BAR */}
          <div
            className='w-[90%] p-[3px] h-[15px] mt-auto mb-[130px] cus-shadow bg-primaryLight rounded-full hidden max-[1050px]:my-10 max-[1050px]:w-full'
            id='progressBarBOX'>
            <p
              id='progressBar'
              className='bg-secondary h-full transition-all rounded-full w-0'
            />
          </div>
        </section>
        {/* OPTIONS SECTION */}
        <section className='flex-1'>
          <form id='answerForm' action='#'>
            <p
              id='errorBox'
              className='text-center font-medium text-xl text-red-500 mb-5'>
              {/* ERROR BOX */}
            </p>
            <div
              id='optionsContainer'
              className='flex flex-col gap-5 max-[1050px]:gap-6 max-[400px]:gap-4'>
              {/* OPTIONS OR SUBJECTS OR RESULT */}
            </div>
            <button
              type='submit'
              id='submitButton'
              className='w-full h-[90px] mt-10 rounded-[26px] bg-secondary flex items-center text-2xl justify-center font-semibold gap-5 p-4 transition-all'>
              {/* CTA for Play Again | Next | Submit Answers */}
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
