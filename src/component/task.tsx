import {
  ArrowHeadDownIcon,
  BookmarkActiveIcon,
  BookmarkIcon,
  CalenderIcon,
  NavigationMenuChat,
  PenActiveIcon,
  PenIcon,
  TimeActiveIcon,
  TimeIcon,
} from "./icon";
import { useState, useEffect, useRef, type SetStateAction } from "react";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../calender.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import BookmarkDropdown from "./bookmarkDropdown";
const customLocale = {
  ...enGB,
  localize: {
    ...enGB.localize,
    day: (day: number) => {
      const dayName = ["M", "T", "W", "Th", "F", "S", "S"];
      return dayName[day];
    },
  },
};
registerLocale("custom", customLocale);
setDefaultLocale("custom");
export default function TaskComp({
  toggleHide,
  hideTask,
  updateTask,
  deleteTask,
  nameTask,
  endDate,
  date,
  task,
  checked,
  label,
  setDisableScroll
}: {
  setDisableScroll:React.Dispatch<SetStateAction<boolean>>
  toggleHide:()=>void;
  hideTask:boolean;
  index: number;
  updateTask: (updates: Partial<TaskProps>) => void;
  deleteTask:()=>void;
  nameTask: string;
  endDate: string;
  date: string;
  task: string;
  checked: boolean;
  label: LabelProps[] | undefined;
}) {
  const [openBookmark, setOpenBookmark] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const buttonDeleteRef=useRef<HTMLButtonElement|null>(null)
  //   pass as state first before saving into the parent state
  const [inputTitle, setInputTitle] = useState<string>(nameTask);
  const [inputTask, setInputTask] = useState<string>(task);
  const [endDateTaskState, setEndDateTaskState] = useState<Date | null>(null);
  const [bookmarkPosition, setBookmarkPosition] = useState({ top: 0, left: 0 });
  const bookmarkParentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (openBookmark && bookmarkParentRef.current) {
      requestAnimationFrame(() => {
        const rect = bookmarkParentRef.current!.getBoundingClientRect();
        setBookmarkPosition({
          top: rect.top + rect.height + window.scrollY,
          left: rect.left + window.scrollX,
        });
      });
    }
  }, [openBookmark]);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const clickToEdit = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };
  const startDate: any = new Date(date.split("/").reverse().join("-"));
  //   check if string empty
  const endDateTask: any = endDate.trim()
    ? new Date(endDate.split("/").reverse().join("-"))
    : null;
  const decreasingTime = endDateTask - startDate;
  const changeFormat = decreasingTime / (1000 * 3600 * 24);
  const TimeIsActive = endDate.trim() ? <TimeActiveIcon /> : <TimeIcon />;
  const editIsActive = inputTask==="No Description"||inputTask==='' ? <PenIcon /> : <PenActiveIcon />;
  const bookmarkIsActive =
    (label ?? [])?.length >= 1 ? <BookmarkActiveIcon /> : <BookmarkIcon />;
  //   changing date format to string
  useEffect(() => {
    if (endDateTaskState) {
      const day = String(endDateTaskState.getDate()).padStart(2, "0");
      const month = String(endDateTaskState.getMonth() + 1).padStart(2, "0");
      const year = endDateTaskState.getFullYear();
      //   save to the parent state
      updateTask({ endDate: `${day}/${month}/${year}` });
    }
  }, [endDateTaskState]);
  const bookmarkArray: LabelProps[] = [
    { type: "Important ASAP", color: "#E5F1FF" },
    { type: "Offline Meeting", color: "#FDCFA4" },
    { type: "Virtual Meeting", color: "#F9E9C3" },
    { type: "ASAP", color: "#AFEBDB" },
    { type: "Client Related", color: "#CBF1C2" },
    { type: "Self Task", color: "#CFCEF9" },
    { type: "Appointmens", color: "#F9E0FD" },
    { type: "Court Related", color: "#9DD0ED" },
  ];
  const BookmarkOptions = bookmarkArray.map((key, index) => {
    return (
      <button
        key={`${key.type}-${index}`}
        onClick={() => {
          updateTask({ label: [...(label || []), key] });
          setOpenBookmark(false);
          setDisableScroll(false)
        }}
        className="h-[28px] w-full flex justify-start items-center px-[12px] py-2 text-primary-darkGray cursor-pointer rounded-[5px]"
        style={{ backgroundColor: key.color }}
      >
        {key.type}
      </button>
    );
  });
  useEffect(()=>{
    const handleOutsideClickDelete=(event:MouseEvent)=>{
      if( buttonDeleteRef.current &&!buttonDeleteRef.current.contains(event.target as Node)){
        setOpenDelete(false)
      }
    }
  window.addEventListener('mousedown',handleOutsideClickDelete)
  return ()=>window.removeEventListener('mousedown',handleOutsideClickDelete)
  },[buttonDeleteRef.current])
  return (
    <div className="w-full h-fit border-b border-b-primary-gray py-[22px] first:pt-3 last:border-b-0   relative">
      <div className="flex justify-between min-h-5">
        <div className="flex justify-start items-start text-left gap-[22.5px]">
          <label className="flex items-center cursor-pointer relative mt-[3px]">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                updateTask({ checked: !checked });
                // toggleHide();
              }}
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
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <div
            className={`resize-none w-[335px] ${
              checked
                ? `text-primary-gray ${
                    hideTask ? "h-[26.5px]" : "h-fit"
                  } line-through overflow-hidden whitespace-nowrap`
                : "text-primary-darkGray "
            }`}
          >
            <TextareaAutosize
              value={inputTitle==='Type Task Title'?'':inputTitle}
              placeholder="Type Text Title"
              readOnly={checked}
              onFocus={() => {
                if (checked) updateTask({ checked: false });
                setInputTitle(nameTask);
              }}
              onBlur={() => {
                updateTask({ nameTask: inputTitle });
              }}
              onInput={(e) => setInputTitle(e.currentTarget.value)}
              className={`h-fit resize-none w-[335px]
                ${inputTitle==='Type Task Title'||inputTitle===''?'border border-primary-gray w-[380px] px-[14px] py-2.5 rounded-[5px] flex items-center':''}
                 ${
                checked
                  ? `text-primary-gray line-through ${
                      hideTask ? "" : "overflow-hidden"
                    } `
                  : "text-primary-darkGray"
              }`}
            />
          </div>
        </div>
        <div className="min-w-[219px] h-5 mr-[34px] flex text-sm items-center justify-end">
          {!checked && (
            <p className="text-indicator-Red">
              {!endDate.trim()
                ? ""
                : endDateTask <= startDate
                ? "Invalid Date"
                : `${changeFormat} Day${changeFormat === 1 ? "" : "s"} left`}
            </p>
          )}
          <p className="ml-[19px] text-primary-darkGray">{date}</p>
          {!hideTask ? (
            <p
              onClick={() => {
                toggleHide();
              }}
              className="rotate-180 mr-[15px] ml-[10px] size-fit cursor-pointer"
            >
              <ArrowHeadDownIcon />
            </p>
          ) : (
            <p
              onClick={() => {
                toggleHide()
              }}
              className="mr-[15px] ml-[10px] size-fit cursor-pointer"
            >
              <ArrowHeadDownIcon />
            </p>
          )}
          <button onClick={()=>setOpenDelete(prev=>!prev)} className="relative cursor-pointer size-fit">
            <NavigationMenuChat />
            {openDelete&&<button ref={buttonDeleteRef} onClick={()=>deleteTask()} className="cursor-pointer w-[126px] h-[43px] text-indicator-Red absolute top-4 right-0 border border-primary-gray rounded-[5px] text-left pl-[18.39px] z-30 bg-white">Delete</button>}
          </button>
        </div>
      </div>
      {!hideTask && (
        <div className="w-[547px] min-h-[108px] ml-10 mt-[12.73px]">
          {/* date input */}
          <div className="w-fit flex items-center gap-[19.67px]">
            {TimeIsActive}
            <div className="w-[193px] h-10 rounded-[5px] relative">
              <div className="absolute right-4 top-3">
                <CalenderIcon />
              </div>
              <DatePicker
              className="cursor-pointer"
                locale={"custom"}
                placeholderText="DD/MM/YY"
                selected={endDateTaskState || endDateTask}
                onChange={(date) => setEndDateTaskState(date as Date)}
                dateFormat={"dd/MM/yy"}
              />
            </div>
          </div>
          <div className=" w-full h-fit flex gap-[23px] mt-[13px]">
            <button onClick={clickToEdit} className="size-fit cursor-pointer">
              {editIsActive}
            </button>
            <TextareaAutosize
            placeholder="No Description"
              ref={textAreaRef}
              value={inputTask==='No Description'?'':inputTask}
              readOnly={checked}
              onFocus={() => {
                if (checked) updateTask({ checked: false });
                setInputTask(task);
              }}
              onBlur={() => {
                updateTask({ task: inputTask });
              }}
              onInput={(e) => setInputTask(e.currentTarget.value)}
              className="w-full h-full resize-none text-primary-darkGray"
            />
          </div>
          <div
            ref={bookmarkParentRef}
            className=" w-[619px] h-fit relative flex items-center pr-[9.45px] pb-[13px] pt-[7px] gap-[18px] mt-[15px]  bg-[#F9F9F9]"
          >
            <button
              onClick={() => {setOpenBookmark((prev) => !prev);setDisableScroll(true)}}
              className="cursor-pointer size-fit"
            >
              {bookmarkIsActive}
            </button>
            <div className="flex flex-wrap gap-2.5">
              {label?.map((key, index) => {
                return (
                  <div
                    key={`${key.type}-${index}`}
                    className="w-fit rounded-[5px] flex px-3 py-2 justify-center items-center font-semibold text-primary-darkGray"
                    style={{ backgroundColor: key.color }}
                  >
                    {key.type}
                  </div>
                );
              })}
            </div>
            {openBookmark && (
              // <div className="w-[277px] h-fit absolute left-0 top-11 bg-white border border-primary-gray z-50 p-[15px] gap-[11px] flex flex-col rounded-[5px]">
              //   {BookmarkOptions}
              // </div>
              <BookmarkDropdown position={bookmarkPosition}>
                {BookmarkOptions}
              </BookmarkDropdown>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
