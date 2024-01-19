import Subjects from '@/components/Subjects/Subjects'
import SubjectOROptionsWrapper from '@/components/Wrappers/SubjectOROptionsWrapper'

export default function Home() {
  return (
    <>
      {/* MAIN QUIZ CONTAINER */}
      <main className='flex items-start mb-16 gap-20 max-[1215px]:gap-10 max-[1050px]:flex-col max-[1050px]:items-stretch max-[1050px]:gap-0 max-[700px]:mb-10 max-[550px]:mb-8 max-[400px]:mb-5'>
        {/* QUESTIONS SECTION */}
        <section className='flex flex-col gap-6 flex-1 self-stretch'>
          <h1
            id='question'
            className='text-5xl flex flex-col gap-2 max-[700px]:text-4xl'>
            <span className='font-thin'> Welcome to the </span>
            <strong className='text-6xl font-medium'>Frontend Quiz !</strong>
          </h1>
          <em className='text-white text-opacity-50' id='infoLabel'>
            Pick a Subject to Get Started
          </em>
        </section>
        {/* OPTIONS SECTION */}
        <section className='flex-1'>
          <SubjectOROptionsWrapper>
            <Subjects />
          </SubjectOROptionsWrapper>
        </section>
      </main>
    </>
  )
}
