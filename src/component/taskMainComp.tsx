import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowHeadDownIcon, LoadingIcon } from "./icon";
import TaskComp from "./task";
import { v4 } from "uuid";
export default function TaskMainComp() {
  const [hideTask, setHideTask] = useState<Record<string, boolean>>({});
  const [methodFetch, setMethodFetch] = useState<MethodFetch>("POST");
  const [disableScroll, setDisableScroll] = useState<boolean>(false);
  const [openDropDown, setOpenDropdown] = useState<{
    open: boolean;
    value: "My State" | "Personal Errands" | "Urgent To-Do";
  }>({ open: false, value: "My State" });
  const [loadingEffect, setLoadingEffect] = useState<boolean>(true);
  // Loading Effect when changing type of task
  useEffect(() => {
    let Timer;
    Timer = setTimeout(() => setLoadingEffect(false), 1500);
    return () => clearTimeout(Timer);
  }, [openDropDown.value]);
  const openDropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonDropdownRef = useRef<HTMLDivElement | null>(null);
  const [DummyTaskState, setDummyTaskState] = useState<TaskProps[]>([
    // {
    //   id:12,
    //   nameTask: "Close off Case #012920- RODRIGUES, Amiguel",
    //   date: "12/06/2021",
    //   endDate: "14/06/2021",
    //   checked: false,
    //   task: "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    //   label: [],
    //   type: "My State",
    // },
    // {
    // id:15,
    //   nameTask:
    //     "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    //   date: "14/06/2021",
    //   endDate: "18/06/2021",
    //   checked: false,
    //   task: "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
    //   label: [],
    //   type: "My State",
    // },
    // {
    //   id:14,
    //   nameTask: "Set up with Dr Blake",
    //   date: "22/06/2021",
    //   endDate: "02/07/2021",
    //   checked: false,
    //   task: "No Description",
    //   label: [],
    //   type: "My State",
    // },
  ]);
  const options = ["My State", "Personal Errands", "Urgent To-Do"] as const;
  function addTask() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const id = v4();
    const task: TaskProps = {
      id,
      nameTask: "Type Task Title",
      date: `${day}/${month}/${year}`,
      endDate: "",
      checked: false,
      task: "No Description",
      label: [],
      type: openDropDown.value,
    };
    setDummyTaskState((prev) => [task, ...prev]);
    setHideTask((prev) => ({
      ...prev,
      [id]: false,
    }));
  }
  // debugging
  useEffect(() => {
    console.log(DummyTaskState);
  }, [DummyTaskState]);
  useEffect(() => {
    console.log("Type: ", openDropDown.value);
  }, [openDropDown.value]);
  useEffect(() => {
    const handleOutsideClickDelete = (event: MouseEvent) => {
      if (
        openDropdownRef.current &&
        buttonDropdownRef.current &&
        !openDropdownRef.current.contains(event.target as Node) &&
        !buttonDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown((prev) => ({ ...prev, open: false }));
      }
    };
    if (openDropDown.open) {
      window.addEventListener("mousedown", handleOutsideClickDelete);
    }
    return () =>
      window.removeEventListener("mousedown", handleOutsideClickDelete);
  }, [openDropDown.open]);
  // Mock API Get Task
  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(
        "https://dummyjson.com/c/9c39-046c-40e8-a49b",
        { method: "get" }
      );
      const data = await response.json();
      if (response.ok) {
        setDummyTaskState(data);
        console.log("Get task :", data);
      }
    };
    getTask();
  }, []);
  // Mock API POST Task
  useEffect(() => {
    const fetchPostTask = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "post",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(DummyTaskState),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(`${methodFetch} Task Success :`, data);
      }
    };
    fetchPostTask();
  }, [DummyTaskState, methodFetch]);
  return (
    <div className="w-[692px] h-[677px] ml-[29px] mb-[42px] mr-[13px] mt-[18px]">
      <div className="w-full h-[40px] pr-[10.1px] flex justify-between">
        <div className="w-[289px] h-full flex justify-center relative">
          <div
            ref={buttonDropdownRef}
            onClick={() =>
              setOpenDropdown((prev) => ({ ...prev, open: !prev.open }))
            }
            className="cursor-pointer w-fit min-w-[118.55px] h-full flex items-center font-semibold border border-primary-gray pl-[14px] pr-[10px] gap-[7px] rounded-[5px]"
          >
            <p className="">{openDropDown.value}</p>
            {openDropDown.open ? (
              <div className="size-fit rotate-[180deg]">
                <ArrowHeadDownIcon />
              </div>
            ) : (
              <div className="size-fit">
                <ArrowHeadDownIcon />
              </div>
            )}
            <AnimatePresence>
              {openDropDown.open && (
                <div
                  ref={openDropdownRef}
                  className="absolute bg-white z-50 top-[50px] left-0 w-[288px] h-[80px] border border-primary-gray rounded-[5px] flex flex-col"
                >
                  {options
                    .filter((option) => openDropDown.value !== option)
                    .map((key, index) => (
                      <button
                        onClick={() => {
                          setTimeout(() => {
                            setOpenDropdown({ open: false, value: key });
                          }, 0);
                        }}
                        key={index + "button"}
                        className="cursor-pointer w-full h-1/2 first:border-b first:border-b-primary-gray flex items-center justify-start px-[15px]"
                      >
                        {key}
                      </button>
                    ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            addTask();
            setMethodFetch("POST");
          }}
          className="w-[98.8px] cursor-pointer h-full rounded-[5px] flex justify-center items-center font-semibold bg-primary-blue text-white "
        >
          New Task
        </button>
      </div>
      <div
        className={`w-full h-[615px] mt-5 ${
          disableScroll ? "overflow-y-hidden" : "overflow-y-auto"
        } relative`}
      >
        {loadingEffect ? (
          <div className="w-full h-[615px] flex flex-col justify-center items-center">
            <LoadingIcon />
            <p>Loading Task List</p>
          </div>
        ) : (
          DummyTaskState?.filter(
            (task) => task.type === openDropDown.value
          ).map((task, index) => {
            const updateTask = (updates: Partial<TaskProps>) => {
              setDummyTaskState((prev) =>
                prev.map((child) =>
                  child.id === task.id ? { ...child, ...updates } : child
                )
              );
            };
            const deleteTask = () => {
              setDummyTaskState((prev) =>
                prev.filter((child) => child.id !== task.id)
              );
            };
            const toggleHide = (taskId: string) => {
              setHideTask((prev) => ({
                ...prev,
                [taskId]: !prev[taskId],
              }));
            };
            return (
              <TaskComp
                setMethodFetch={setMethodFetch}
                setDisableScroll={setDisableScroll}
                hideTask={hideTask[task.id] ?? false}
                toggleHide={() => toggleHide(task.id)}
                label={task.label}
                updateTask={updateTask}
                deleteTask={deleteTask}
                key={`${task.nameTask}-${index}`}
                index={DummyTaskState.findIndex(
                  (child) => child.id === task.id
                )}
                task={task.task}
                date={task.date}
                endDate={task.endDate}
                checked={task.checked}
                nameTask={task.nameTask}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
