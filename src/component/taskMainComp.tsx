import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowHeadDownIcon } from "./icon";
import TaskComp from "./task";
export default function TaskMainComp() {
  const [openDropDown, setOpenDropdown] = useState<{
    open: boolean;
    value: "My State" | "Personal Errands" | "Urgent To-Do";
  }>({ open: false, value: "My State" });
  const [DummyTaskState,setDummyTaskState]=useState<TaskProps[]>([
    {
    nameTask:'Close off Case #012920- RODRIGUES, Amiguel',
    date:'12/06/2021',
    endDate:'14/06/2021',
    checked:false,
    task:'Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!',
    label:[]
  },
{
    nameTask:'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203',
    date:'14/06/2021',
    endDate:'18/06/2021',
    checked:false,
    task:'All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.',
    label:[]
  },
{
    nameTask:'Set up with Dr Blake',
    date:'22/06/2021',
    endDate:'02/07/2021',
    checked:false,
    task:'No Description',
    label:[]
  }
  ])
  const options=["My State","Personal Errands","Urgent To-Do"]as const
  useEffect(()=>{console.log(DummyTaskState)},[DummyTaskState])
  // useEffect(()=>{setDummyTaskState(prev=>[...prev,...DummyTaskState])},[dummyTask])
  // useEffect(() => {
  //   console.log(openDropDown.open);
  // }, [openDropDown.open]);
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
      <div className="w-full h-[615px] mt-5 overflow-y-auto">
        {DummyTaskState.map((task,index)=>{
          const updateTask=(index:number,updates:Partial<TaskProps>)=>{
            setDummyTaskState(prev=>prev.map((task,i)=>i===index?{...task,...updates}:task))
          }
          return (<TaskComp label={task.label} updateTask={updateTask} key={`${task.nameTask}-${index}`} index={index} task={task.task} date={task.date} endDate={task.endDate} checked={task.checked} nameTask={task.nameTask}/>)})}
      </div>
    </div>
  );
} 
