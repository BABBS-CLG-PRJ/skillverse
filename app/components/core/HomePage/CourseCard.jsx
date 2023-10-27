const CourseCard = ({ cardData}) => {
  return (
    <div>
      <button
        className="flex flex-col  w-[360px] h-[300px] p-5 gap-1 border-2 border-[#652429]
         rounded-xl hover:scale-105 transition duration-300 ease-in-out
           bg-primary-body text-richblack-900  hover:shadow-[5px_6px_4px_0px_#7b341e,-8px_-7px_8px_0px_#fbd38d]
            
            "
      >
        <div
          className=" flex flex-col text-center p-2 border-b-4  border-richblack-900
            
         border-dashed"
        >
          <p
            className=" text-xl font-bold text-left mb-2"
            
          >
            {cardData.heading}
          </p>
          <p className=" text-left mb-6 text-base ">{cardData.description}</p>
        </div>
        <div className=" flex justify-between w-full p-3">
          <p>{cardData.level}</p>
          <p>{cardData.lessionNumber} Lessons</p>
        </div>
      </button>
    </div>
  );
};

export default CourseCard;
