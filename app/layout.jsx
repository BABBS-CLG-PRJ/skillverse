import './globals.css'
import { Inter, Nunito } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({subsets: ['latin']})
import Navbar from './components/common/Navbar'

import Link from 'next/link'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

export const metadata = {
  title: 'SkillVerse',    
  description: 'The universe of skills',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
      
      <div className='flex justify-center w-full h-full main'>
          <div className="gradient"/>
          </div>

        <Navbar/>
        <main className="app">{children}</main>
        <Footer/>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <Toaster/>
        </body>
    </html>
  )
}
