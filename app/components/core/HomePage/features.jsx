import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, BarChart3 } from 'lucide-react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-neutral-200">
              Personalized Learning Journey for Every Student
            </h2>

            <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
              <button
                type="button"
                onClick={() => setActiveTab('tab1')}
                className={`text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl transition-all duration-200 ${
                  activeTab === 'tab1' ? 'bg-white shadow-md' : ''
                } dark:hover:bg-neutral-700`}
              >
                <span className="flex gap-x-6">
                  <GraduationCap className={`shrink-0 mt-2 size-6 md:size-7 ${
                    activeTab === 'tab1' ? 'text-blue-600' : 'text-gray-800'
                  } dark:text-neutral-200`} />
                  <span className="grow">
                    <span className={`block text-lg font-semibold ${
                      activeTab === 'tab1' ? 'text-blue-600' : 'text-gray-800'
                    } dark:text-neutral-200`}>
                      Adaptive Learning Technology
                    </span>
                    <span className="block mt-1 text-gray-800 dark:text-neutral-200">
                      AI-powered system adjusts to your learning pace and style, ensuring optimal comprehension and retention.
                    </span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tab2')}
                className={`text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl transition-all duration-200 ${
                  activeTab === 'tab2' ? 'bg-white shadow-md' : ''
                } dark:hover:bg-neutral-700`}
              >
                <span className="flex gap-x-6">
                  <BarChart3 className={`shrink-0 mt-2 size-6 md:size-7 ${
                    activeTab === 'tab2' ? 'text-blue-600' : 'text-gray-800'
                  } dark:text-neutral-200`} />
                  <span className="grow">
                    <span className={`block text-lg font-semibold ${
                      activeTab === 'tab2' ? 'text-blue-600' : 'text-gray-800'
                    } dark:text-neutral-200`}>
                      Progress Analytics
                    </span>
                    <span className="block mt-1 text-gray-800 dark:text-neutral-200">
                      Detailed insights into your learning journey with real-time progress tracking and performance metrics.
                    </span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tab3')}
                className={`text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl transition-all duration-200 ${
                  activeTab === 'tab3' ? 'bg-white shadow-md' : ''
                } dark:hover:bg-neutral-700`}
              >
                <span className="flex gap-x-6">
                  <Award className={`shrink-0 mt-2 size-6 md:size-7 ${
                    activeTab === 'tab3' ? 'text-blue-600' : 'text-gray-800'
                  } dark:text-neutral-200`} />
                  <span className="grow">
                    <span className={`block text-lg font-semibold ${
                      activeTab === 'tab3' ? 'text-blue-600' : 'text-gray-800'
                    } dark:text-neutral-200`}>
                      Industry Certifications
                    </span>
                    <span className="block mt-1 text-gray-800 dark:text-neutral-200">
                      Earn recognized certificates and badges as you complete courses and demonstrate mastery of skills.
                    </span>
                  </span>
                </span>
              </button>
            </nav>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div>
                <div className={`${activeTab === 'tab1' ? 'block' : 'hidden'}`}>
                  <img 
                    className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" 
                    src="https://as1.ftcdn.net/jpg/08/94/95/10/1000_F_894951031_sk9N3LgPdLwdjfFD90Sj6NwRsQcXUCMR.jpg"
                    alt="Adaptive Learning Dashboard" 
                  />
                </div>

                <div className={`${activeTab === 'tab2' ? 'block' : 'hidden'}`}>
                  <img 
                    className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" 
                    src="https://lucid.app/systemTemplates/thumb/36ec2994-945f-463a-90e4-e0f6b6628e54/0/124/NULL/1600?clipToPage=false"
                    alt="Progress Analytics Dashboard" 
                  />
                </div>

                <div className={`${activeTab === 'tab3' ? 'block' : 'hidden'}`}>
                  <img 
                    className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20" 
                    src="https://images.klipfolio.com/website/public/bf9c6fbb-06bf-4f1d-88a7-d02b70902bd1/data-dashboard.png"
                    alt="Certification Platform" 
                  />
                </div>
              </div>

              <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
                <svg className="w-16 h-auto text-blue-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                  <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                  <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-neutral-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Features;