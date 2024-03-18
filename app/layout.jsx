'use client'
import './globals.css'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
// export const metadata = {
//   title: 'SkillVerse',    
//   description: 'The universe of skills',
  
// }

export default function RootLayout({ children }) {
  const pathname = usePathname();
  let a=true;
  if(pathname==="/dashboard"||pathname==="/dashboard/profile" ||pathname==="/dashboard/coursebuilder"|| pathname ==="/dashboard/settings" || pathname ==="/dashboard/courses"){
    a=false;
  }
  else{
    a=true;
  }
  return (
    <html lang="en">

      <body className='overflow-x-hidden  bg-[#F6FFF8]'>
      {a && <div className='z-999'>
        <Navbar/>
        </div>}
        <main className="app">{children}</main>
        {a && <Footer/>}
        
        <Toaster/>

        </body>
    </html>
  )
}
