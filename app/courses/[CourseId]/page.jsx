'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import RatingStars from '../../components/common/RatingStars';
import QuizCard from '../../components/common/QuizCard';
import CommentSection from '../../components/common/CommentSection';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import RazorpayPayment from '../../components/common/RazorpayPayment';
import { useCookies } from 'next-client-cookies';

const CoursePage = ({ params }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [name, setName] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [bestCoupon, setBestCoupon] = useState("");
  const cookieStore = useCookies();

  const handlePaymentSuccess = async (paymentData) => {
    await handleBuyCourse(paymentData);
    setEnrollmentLoading(false);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    setEnrollmentLoading(false);
    toast.error('Payment failed. Please try again.');
  };

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(`/api/addcoupon?courseId=${params.CourseId}&price=${courseData?.price}`);
        setBestCoupon(response.data.bestCouponCode);
      } catch (error) {
        console.error('Error fetching coupon:', error);
      }
    };

    courseData && fetchCoupon();
  }, [params.CourseId, courseData]); // Add params.CourseId as a dependency to rerun the effect when it changes
  // Scroll handler with footer detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      const footer = document.querySelector('footer');
      const card = document.querySelector('.course-card');

      if (footer && card) {
        const footerTop = footer.getBoundingClientRect().top;
        const cardHeight = card.offsetHeight;
        const cardBottom = window.innerHeight - 96; // 24px from top

        if (footerTop <= cardBottom) {
          // Add absolute positioning when reaching footer
          card.style.position = 'absolute';
          card.style.top = `${footerTop - cardHeight - 48}px`; // Some spacing from footer
        } else {
          // Keep fixed positioning when above footer
          card.style.position = 'fixed';
          card.style.top = '96px';
        }
      }

      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courseResponse, quizResponse, instructorResponse] = await Promise.all([
          axios.post("/api/getcourse", {
            courseId: params.CourseId,
          }),
          axios.post("/api/getquiz", {
            courseId: params.CourseId,
          }),
          axios.post("/api/fetchname", {
            courseId: params.CourseId,
          })
        ]);

        setCourseData(courseResponse.data.courseDetails);
        setQuizzes(quizResponse.data.quizzes || []);
        setName(instructorResponse.data.name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!courseData) {
          setLoading(false);
        } else {
          setQuizzes([]);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params.CourseId]);

  // User authentication
  useEffect(() => {
    const fetchUserInfo = async () => {
      const authToken = localStorage.getItem("authtoken");
      if (authToken) {
        try {
          const response = await axios.post("/api/verifytoken", {
            token: authToken,
          });
          setUser(response.data.decodedToken.userObject);
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  // Calculate totals
  useEffect(() => {
    if (courseData) {
      setTotalRatings(courseData.reviews?.length || 0);
      setTotalPrice(courseData.price || 0);
      let lectures = 0;
      let materials = 0;

      courseData.curriculum.forEach((section) => {
        lectures += section.lectures.length;
        section.lectures.forEach((lecture) => {
          materials += lecture.supplementaryMaterial.length;
        });
      });

      setTotalLectures(lectures);
      setTotalMaterials(materials);
    }
  }, [courseData]);

  // Check enrollment
  useEffect(() => {
    if (user && courseData) {
      const userIdStr = user._id.toString();
      setIsEnrolled(courseData.studentsEnrolled.includes(userIdStr));
    }
  }, [user, courseData]);


  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value.trim();
    const userId = localStorage.getItem("userId");

    if (!couponCode || !userId) {
      setCouponMessage("Please enter a valid coupon code or login.");
      toast.error("Please enter a valid coupon code or login.");
      return;
    }

    try {
      // Make API call to validate and apply the coupon
      // console.log(couponCode)
      // console.log(userId)


      const response = await axios.put("/api/addcoupon", {
        couponCode: couponCode,
        userId: userId,
      });
      // console.log(response.data)

      const { success, coupon } = response.data;

      if (coupon.isActive) {
        let newPrice = totalPrice;

        if (coupon.discountType === "percentage") {
          // Calculate percentage discount
          const discountAmount = Math.round((coupon.discountValue / 100) * totalPrice);
          newPrice = Math.max(0, totalPrice - discountAmount);
        } else if (coupon.discountType === "fixed") {
          // Calculate fixed discount
          newPrice = Math.max(0, totalPrice - coupon.discountValue);
        }

        setTotalPrice(newPrice);
        setCouponMessage(success);
        setBestCoupon(null);
        toast.success(success);
      } else {
        setCouponMessage("This coupon is no longer active.");
        toast.error("This coupon is no longer active.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      const errorMessage = error.response?.data?.error || "Failed to apply coupon.";
      setCouponMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      // Reset the coupon input field
      e.target.elements.couponCode.value = "";
    }
  };


  const handleBuyCourse = async (paymentData) => {
    if (!user) {
      toast.error("Please log in to enroll in the course.");
      return;
    }
    setEnrollmentLoading(true);
    try {
      await axios.post("/api/buycourse", {
        courseId: params.CourseId,
        uid: user._id.toString(),
        orderhistory: paymentData
      });
      setIsEnrolled(true);
      toast.success("Enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Error enrolling. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Handles when user clicks on a user and redirects to video streaming page
  const handleLectureClick = async (videoUrl, lectureId) => {
    try {
      const lectureData = cookieStore.get(`${lectureId}`);
      if (!lectureData) {
        const authToken = cookieStore.get("authtoken");
        const response = await axios.post('/api/streamvideo', {
          "courseId": courseData._id,
          "videoId": videoUrl,
          "authToken": authToken
        });
        if (response.data.success) {
          const signedUrl = response.data.signedUrl;
          const expiresUTC = new Date(response.data.expires); // Convert to Date object

          cookieStore.set(
            `${lectureId}`,
            JSON.stringify({
              lectureId: lectureId,
              signedUrl: signedUrl
            }),
            {
              expires: expiresUTC, // Now a Date object
              secure: true,
              sameSite: 'strict',
              path: '/'
            }
          );
        } else {
          // Handle unsuccessful response
          console.error("Failed to stream video:", response.data);
          return;
        }
      }
      cookieStore.set(
        `currLectureId`,
        lectureId,
        {
          expires: new Date(Date.now() + 10000), // 10 seconds from now
          secure: true,
          sameSite: 'strict',
          path: '/'
        }
      );
      router.push(`/coursepage/${courseData._id}`)

    } catch (error) {
      // Handle errors from axios or other parts
      console.error("Error in handleLectureClick:", error);
    }
  };


  if (loading) {
    return <Loading />;
  }

  if (!courseData) {
    return <div>Loading course data...</div>;
  }

  // Course Card Component
  const CourseCard = () => (
    <div className={`course-card fixed top-24 right-8 w-96 bg-white rounded-xl shadow-lg transform transition-all duration-300 p-6 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
      <img
        src={courseData.imageUrl}
        alt={courseData.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{courseData.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">₹{totalPrice}</span>
          <span className="text-red-500 line-through">₹{courseData.price + 1000}</span>
        </div>

        {!isEnrolled && bestCoupon && (
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <div class="relative w-full">
              <input
                type="text"
                name="couponCode"
                placeholder="Enter coupon code"
                class="w-full px-4 pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🎟️</span>
            </div>
            {bestCoupon && (
              <div className="mt-2 flex items-center bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 shadow-md w-full">
                <span className="text-yellow-600 text-lg mr-2">
                  <Tag size={24} />
                </span>
                <p className="text-sm font-semibold text-yellow-700">
                  Best Coupon Available: <span className="font-bold text-yellow-800">{bestCoupon}</span>
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Apply Coupon
            </button>
          </form>
        )}

        {couponMessage && (
          <p className={couponMessage.includes("successfully") ? "text-green-500" : "text-red-500"}>
            {couponMessage}
          </p>
        )}

        {user ? (
          isEnrolled ? (
            <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-2 rounded-lg">
              Enrolled
            </button>
          ) : !bestCoupon ? (
            // <button
            //   onClick={handleBuyCourse}
            //   disabled={enrollmentLoading}
            //   className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            // >
            //   {enrollmentLoading ? "Processing..." : "Proceed for Payment"}
            // </button>
            <RazorpayPayment
              amount={totalPrice}
              businessName="Skillverse"
              description={`Course Payment ${courseData.title}`}
              prefillData={{
                name: user.firstName + user.lastName,
                email: user.email,
                contact: ''
              }}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            >
              <button
                disabled={enrollmentLoading}
                className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                {enrollmentLoading ? "Processing..." : "Proceed for Payment"}
              </button>
            </RazorpayPayment>
          ) : (
            <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-2 rounded-lg">
              Price: ₹{totalPrice} Add coupon to buy
            </button>
          )
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Login to Buy
          </button>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-center text-gray-600">30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );

  // Main Content Section
  const MainContent = () => (
    <div className="w-full max-w-4xl">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      > */}
        <h1 className="text-4xl font-bold">{courseData.title}</h1>
        <p className="text-lg text-gray-600">{courseData.description}</p>

        <div className="flex items-center space-x-4">
          <RatingStars Review_Count={courseData.rating} />
          <span>({totalRatings} ratings)</span>
          <span className="font-bold">Created by {name}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">📹</span>
            <p className="mt-2">{totalLectures} lectures</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl">📄</span>
            <p className="mt-2">{totalMaterials} resources</p>
          </div>
        </div>
      {/* </motion.div> */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <div className="space-y-4">
          {courseData.curriculum.map((section, index) => (
            <div
              key={index}
              className="border rounded-lg p-4"
            >
              <h3 className="font-bold">{section.sectionTitle}</h3>
              <div className="mt-2 space-y-2">
                {section.lectures.map((lecture, idx) => (
                  <button onClick={() => {
                    handleLectureClick(lecture.videoUrl, lecture._id)
                  }} key={idx}>
                    <div key={idx} className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <span>📹</span>
                      <span>{lecture.lectureTitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} isEnrolled={isEnrolled} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No quizzes available for this course yet.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <CommentSection courseId={params.CourseId} courseData={courseData} />
      </div>
    </div>
  );

  return (
    <div className='min-h-[100dvh] w-full bg-red-500 flex flex-col lg:flex-row px-5'>
      <div className='bg-green-500 min-h-[100dvh] w-full lg:w-2/3'>
        <MainContent />
      </div>
      <div className='bg-purple-500 min-h-[100dvh] w-full lg:w-1/3'></div>
    </div>
    // <div className="min-h-screen bg-gray-50">
    //   <div className="container relative mx-auto py-8 px-4 flex">
    //     <div className="w-full pr-96">
    //       <MainContent />
    //     </div>
    //     <CourseCard />
    //   </div>
    //   <footer className="bg-gray-900 text-white py-12">
    //     <div className="container mx-auto px-4">
    //       <div className="text-center">
    //         <p>© 2024 Course Platform. All rights reserved.</p>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default CoursePage;