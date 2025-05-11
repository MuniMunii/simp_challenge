import {
  ArrowDownIcon,
  ArrowHeadDownIcon,
  BookmarkActiveIcon,
  BookmarkIcon,
  CalenderIcon,
  MenuIcon,
  NavigationMenuChat,
  PenActiveIcon,
  PenIcon,
  TimeActiveIcon,
  TimeIcon,
} from "./icon";
import { useState,forwardRef, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../calender.css"
import { registerLocale,setDefaultLocale } from "react-datepicker";
import {enGB} from 'date-fns/locale/en-GB';
const customLocale={
    ...enGB,
    localize:{
        ...enGB.localize,
        day:(day:number)=>{
            const dayName=['M','T',"W","Th",'F','S','S']
            return dayName[day]
        }
    }
}
registerLocale('custom',customLocale)
setDefaultLocale('custom')
export default function TaskComp({
  updateTask,
  nameTask,
  endDate,
  date,
  task,
  checked,
  index,
  label
}: {
  index: number;
  updateTask: (index: number, updates: Partial<TaskProps>) => void;
  nameTask: string;
  endDate: string;
  date: string;
  task: string;
  checked: boolean;
  label:LabelProps[]|undefined
}) {
  const [hideTask, setHideTask] = useState<boolean>(false);
    const [openBookmark, setOpenBookmark] = useState<boolean>(false);
//   pass as state first before saving into the parent state
const [inputTitle, setInputTitle] = useState<string>(nameTask);
const [inputTask, setInputTask] = useState<string>(task);
  const [endDateTaskState,setEndDateTaskState]=useState<Date|null>(null)
  const startDate:any = new Date(date.split("/").reverse().join("-"));
//   check if string empty
  const endDateTask:any =endDate.trim()?new Date(endDate.split("/").reverse().join("-")):null
  const decreasingTime = endDateTask - startDate;
  const changeFormat = decreasingTime / (1000 * 3600 * 24);
  const TimeIsActive=endDate.trim()?<TimeActiveIcon/>:<TimeIcon/>
    const editIsActive=inputTask.trim()?<PenActiveIcon/>:<PenIcon/>
    const bookmarkIsActive=label===undefined?<BookmarkActiveIcon/>:<BookmarkIcon/>
//   changing date format to string
useEffect(() => {
    if (endDateTaskState) {
      const day = String(endDateTaskState.getDate()).padStart(2,'0');
      const month = String(endDateTaskState.getMonth() + 1).padStart(2,'0');
      const year = endDateTaskState.getFullYear();
    //   save to the parent state
      updateTask(index, { endDate: `${day}/${month}/${year}` });
    }
  }, [endDateTaskState]);
  const bookmarkArray:LabelProps[]=[{type:'Important ASAP',color:'#E5F1FF'},{type:'Offline Meeting',color:'#FDCFA4'},{type:'Virtual Meeting',color:'#F9E9C3'},{type:'ASAP',color:'#AFEBDB'},{type:'Client Related',color:'#CBF1C2'},{type:'Self Task',color:'#CFCEF9'},{type:'Appointmens',color:'#F9E0FD'},{type:'Court Related',color:'#9DD0ED'}]
  const BookmarkOptions=bookmarkArray.map((key,index)=>{return <button onClick={()=>updateTask(index,{label:[...(label||[]),key]})} className="w-[246px] h-[28px] flex justify-start items-center px-[14px] text-primary-darkGray" style={{backgroundColor:key.color}}>{key.type}</button>})
  return (
    <div className="w-full h-fit border-b border-b-primary-gray py-[19px]">
      <div className="flex justify-between min-h-5">
        <div className="flex justify-start items-start text-left gap-[22.5px]">
          <label className="flex items-center cursor-pointer relative mt-[3px]">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {updateTask(index, { checked: !checked });setHideTask(true)}}
              className="peer size-[18px] cursor-pointer transition-all appearance-none border-primary-gray border"
              id="check"
            />
            <span className="absolute text-primary-gray opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <div className={`resize-none w-[335px] ${
              checked
                ? `text-primary-gray ${hideTask?'h-[30px]':'h-fit'} line-through overflow-hidden whitespace-nowrap`
                : "text-primary-darkGray "
            }`}>
          <TextareaAutosize
            value={inputTitle}
            readOnly={checked}
            onFocus={() => {
              if (checked) updateTask(index, { checked: false });
              setInputTitle(nameTask);
            }}
            onBlur={() => {
              updateTask(index, { nameTask: inputTitle });
            }}
            onInput={(e) => setInputTitle(e.currentTarget.value)}
            className={`h-fit resize-none w-[335px] ${
              checked
                ? `text-primary-gray line-through ${hideTask?'':'overflow-hidden'} `
                : "text-primary-darkGray"
            }`}
          />
          </div>
        </div>
        <div className="min-w-[219px] h-5 mr-[34px] flex text-sm items-center justify-end">
          {!checked && (
            <p className="text-indicator-Red">
              {endDateTask<=startDate?'Invalid Date':`${changeFormat} Day${changeFormat === 1 ? "" : "s"} left`}
            </p>
          )}
          <p className="ml-[19px] text-primary-darkGray">{date}</p>
          {!hideTask ? (
            <p
              onClick={() => {
                setHideTask((prev) => !prev);
              }}
              className="rotate-180 mr-[15px] ml-[10px] size-fit"
            >
              <ArrowHeadDownIcon />
            </p>
          ) : (
            <p
              onClick={() => {
                setHideTask((prev) => !prev);
              }}
              className="mr-[15px] ml-[10px] size-fit"
            >
              <ArrowHeadDownIcon />
            </p>
          )}
          <p>
            <NavigationMenuChat />
          </p>
        </div>
      </div>
      {!hideTask&&<div className="w-[547px] min-h-[108px] ml-10 mt-[12.73px]">
        {/* date input */}
        <div className="w-fit flex items-center gap-[19.67px]">
            {TimeIsActive}
            <div className="w-[193px] h-10 rounded-[5px] relative">
                <div className="absolute right-4 top-3"><CalenderIcon/></div>
            <DatePicker locale={'custom'} placeholderText="DD/MM/YY" selected={endDateTaskState||endDateTask} onChange={(date)=>setEndDateTaskState(date as Date)} dateFormat={'dd/MM/yy'}/>
            </div>
        </div>
        <div className=" w-full h-fit flex gap-[23px] mt-[13px]">
            {editIsActive}
            <TextareaAutosize 
            value={inputTask}
            readOnly={checked}
            onFocus={() => {
              if (checked) updateTask(index, { checked: false });
              setInputTask(task);
            }}
            onBlur={() => {
              updateTask(index,{ task:inputTask});
            }}
            onInput={(e) => setInputTask(e.currentTarget.value)} className="w-full h-full resize-none text-primary-darkGray"/>
        </div>
        <div className=" w-full h-fit flex gap-[23px] mt-[15px] border border-gray-600">
            {bookmarkIsActive}
        </div>
      </div>}
    </div>
  );
}
