import './globals.css'
import { Inter, Nunito } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({subsets: ['latin']})

export const metadata = {
  title: 'Skill Verse',
  description: 'The universe of skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
