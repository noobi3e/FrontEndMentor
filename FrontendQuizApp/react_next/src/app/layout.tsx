import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import '../sass/main.scss'
import ModeToggleWrapper from '@/components/providers/ModeToggleWrapper'

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
        <ModeToggleWrapper>{children}</ModeToggleWrapper>
      </body>
    </html>
  )
}
