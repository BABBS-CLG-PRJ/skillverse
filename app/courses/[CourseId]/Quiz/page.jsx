'use client'
import React from 'react'
import WebcamCapture from '../../../components/common/WebcamCapture'
import { useSearchParams } from 'next/navigation'
const QuizVerification = () => {
  const searchParams = useSearchParams();
  return (
    <div >
        <WebcamCapture />
        {searchParams.get('quiz')}
    </div>
  )
}

export default QuizVerification