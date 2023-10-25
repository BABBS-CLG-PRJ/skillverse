export default function Tab({ tabData, field, setField }) {
  let enabled
return (
    <div>
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex relative bg-[#1F1E20] p-2 gap-x-1 my-6 rounded-full w-[226px]"
      >
         {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>{ setField(tab.type)}}
            className={`${
              enabled=(field === "Student")?false:true,
              field===tab.type?"text-black":"text-white"
            } py-2 px-5 rounded-full transition-all duration-200 z-10 font-bold `}
          >
            {tab.tabName }
          </button>
        ))}
        <span
          id="toggle"
          className={`${
            enabled
              ? "translate-x-[95px] transition all duration-1000"
              : "translate-x-1 transition all duration-1000"
          }py-2 px-3 w-28 h-[40px] -z-2 absolute bg-primary-yellow rounded-full`}
        ></span>

       

        {/* <span
          className={`${ 
            enabled ? 'translate-x-[95px]' : 'translate-x-1'
          }  -z-2 inline-block py-2 px-5 rounded-full transform  bg-primary-yellow transition`}
        /> */}
      </div>
    </div>
  );
}
