import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import '../sass/main.scss'
import ModeToggleWrapper from '@/components/providers/ModeToggleWrapper'
import Header from '@/components/Header/Header'
import UIContextProvider from '@/components/providers/UIContextProvider'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frontend Quiz App',
  description: 'Created Frontend Quiz App using Next.JS to make it FullStack',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={rubik.className}>
        <UIContextProvider>
          <ModeToggleWrapper>
            <div className='w-[1400px] mx-auto max-[1400px]:w-full max-[1400px]:px-16 max-[700px]:px-10 max-[550px]:px-5'>
              <Header />
              {children}
            </div>
          </ModeToggleWrapper>
        </UIContextProvider>
      </body>
    </html>
  )
}
