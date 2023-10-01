//Author:Supratik De//
import React from 'react'
import ContactUsForm from '../core/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-center text-4xl font-extrabold text-black'>
        Get in Touch
      </h1>  
      <p className='text-center text-richblack-900 text-2xl mt-3'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
