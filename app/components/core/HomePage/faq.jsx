import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Skillverse track my learning progress?",
      answer: "Skillverse uses advanced analytics to track your course completion, quiz scores, and engagement metrics. You can view your progress dashboard anytime to see how far you've come and what's next in your learning journey."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Skillverse is fully responsive and works seamlessly across all devices. Download our mobile app or access the platform through your browser to learn on the go."
    },
    {
      question: "What types of courses does Skillverse offer?",
      answer: "Our platform offers a diverse range of courses including technical skills, soft skills, leadership development, and industry-specific training. All courses are curated by experts and regularly updated."
    },
    {
      question: "How does Skillverse ensure content quality?",
      answer: "We maintain high standards through our rigorous content review process. Each course undergoes expert evaluation, regular updates, and incorporates user feedback to ensure you're getting the most current and valuable learning experience."
    },
    {
      question: "Can I get certificates for completed courses?",
      answer: "Absolutely! Upon completing a course, you'll receive a verified digital certificate that you can add to your LinkedIn profile or resume. Our certificates are industry-recognized and showcase your newly acquired skills."
    },
    {
      question: "What support options are available?",
      answer: "We offer 24/7 technical support, dedicated learning advisors, and an active community forum. Whether you need help with course content, technical issues, or career guidance, our support team is always ready to assist."
    }
  ];

  return (
    <div className="w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-3xl mx-auto mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white text-center">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full py-6 px-6 text-left transition-all duration-500 ease-in-out 
                rounded-lg flex items-center justify-between relative
                bg-white dark:bg-neutral-800
                hover:bg-gradient-to-r hover:from-amber-200 hover:to-orange-200 
                dark:hover:from-amber-900/40 dark:hover:to-orange-800/40
                group
                ${openIndex === index ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-800/30' : ''}
                shadow-sm hover:shadow-md`}
            >
              <div className="flex items-center w-full">
                <div className="w-full pr-8">
                  <h3 className={`md:text-lg font-semibold transition-colors duration-300
                    ${openIndex === index 
                      ? 'text-amber-800 dark:text-amber-200' 
                      : 'text-gray-800 dark:text-neutral-200 group-hover:text-amber-800 dark:group-hover:text-amber-200'}`}>
                    {faq.question}
                  </h3>
                </div>
                <div className="absolute right-6">
                  <svg
                    className={`size-5 transition-all duration-300 ease-in-out
                      ${openIndex === index 
                        ? 'rotate-180 text-amber-600 dark:text-amber-300' 
                        : 'text-gray-500 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </button>
            
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden
                ${openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'}`}
            >
              <p className="px-6 py-4 text-gray-500 dark:text-neutral-400 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-800/10 rounded-b-lg">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;