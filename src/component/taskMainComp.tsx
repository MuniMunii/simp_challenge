import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowHeadDownIcon } from "./icon";
export default function TaskMainComp() {
  const [openDropDown, setOpenDropdown] = useState<{
    open: boolean;
    value: "My State" | "Personal Errands" | "Urgent To-Do";
  }>({ open: false, value: "My State" });
  const options=["My State","Personal Errands","Urgent To-Do"]as const
  useEffect(() => {
    console.log(openDropDown.open);
  }, [openDropDown.open]);
  return (
    <div className="w-[692px] h-[677px] ml-[29px] mb-[42px] mr-[13px] mt-[18px]">
      <div className="w-full h-[40px]  pr-[10.1px] flex justify-between">
        <div className="w-[289px] h-full flex justify-center relative">
          <div
            onClick={() =>
              setOpenDropdown((prev) => ({ ...prev, open: !prev.open }))
            }
            className="cursor-pointer w-fit min-w-[118.55px] h-full flex items-center font-semibold border border-primary-gray pl-[14px] pr-[10px] gap-[7px] rounded-[5px]"
          >
            <p className="">{openDropDown.value}</p>
            {openDropDown.open ? (
              <div className="size-fit">
                <ArrowHeadDownIcon />
              </div>
            ) : (
              <div className="rotate-[180deg] size-fit">
                <ArrowHeadDownIcon />
              </div>
            )}
            <AnimatePresence>
              {openDropDown.open && (
                <div className="absolute bg-white z-50 top-[50px] left-0 w-[288px] h-[80px] border border-primary-gray rounded-[5px] flex flex-col">
                    {options.filter(option=>openDropDown.value!==option).map((key,index)=>(
                        <>
                            <button onClick={()=>setOpenDropdown((prev) => ({...prev,open:false,value:key }))} key={index+'button'} className="cursor-pointer w-full h-1/2 first:border-b first:border-b-primary-gray flex items-center justify-start px-[15px]">{key}</button>
                        </>
                    ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button
          type="button"
          className="w-[98.8px] h-full rounded-[5px] flex justify-center items-center font-semibold bg-primary-blue text-white "
        >
          New Task
        </button>
      </div>
      <div className="w-full h-[635px] overflow-y-auto">
        <div className="w-full h-[400px] bg-yellow-300"></div>
        <div className="w-full h-[400px] bg-yellow-300"></div>{" "}
        <div className="w-full h-[400px] bg-yellow-300"></div>
      </div>
    </div>
  );
}
