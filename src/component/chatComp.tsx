import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeftGrayIcon, CloseGrayIcon, NavigationMenuChat } from "./icon";
export default function ChatComp({
  openChat,
  setOpenChat,
}: {
  openChat: DummyTextProps;
  setOpenChat: React.Dispatch<React.SetStateAction<DummyTextProps | null>>;
}) {
  const refNewChat = useRef(null);
  const scrollContainerref = useRef(null);
  const chatInView = useInView(refNewChat, {
    root: scrollContainerref,
    margin: "0px",
    once: false,
  });
  useEffect(() => {
    console.log(chatInView);
  }, [chatInView]);
  const ChatMenu=()=>{
    const [openChatMenu,setOpenChatMenu]=useState<boolean>(false)
    const navRef=useRef<HTMLDivElement|null>(null)
    useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenChatMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };},[setOpenChatMenu])
    return (
        <>
    <div ref={navRef} onClick={()=>setOpenChatMenu(prev=>!prev)} className="size-fit cursor-pointer">
        <NavigationMenuChat/>
    </div>
    <AnimatePresence>
    {openChatMenu&&<motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} className="w-[126px] h-[80px] border rounded-[5px] border-[#BDBDBD] bg-white absolute top-[9px] flex flex-col">
        <div className="w-full h-1/2 border-b border-b-[#BDBDBD] text-primary-blue flex items-center justify-start px-[18px]">Edit</div>
        <div className="w-full h-1/2 text-indicator-Red flex items-center justify-start px-[18px]">Delete</div>
        </motion.div>}
    </AnimatePresence>
    </>
    )
  }
  const LoadingIconSupport = () => {
    return (
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.17128 24.3748L27.2356 10.0322L27.277 10.0902C27.2633 10.0708 27.2496 10.0515 27.2358 10.0322C23.2752 4.49158 15.5729 3.21073 10.0322 7.17136C4.49162 11.132 3.21075 18.8342 7.17128 24.3748Z"
          fill="#2F80ED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.17135 24.3749C7.17137 24.3749 7.17139 24.3749 7.17141 24.3749C11.132 29.9156 18.8344 31.1964 24.375 27.2358C29.9156 23.2752 31.1965 15.5729 27.2359 10.0322C27.2241 10.0157 27.2122 9.99924 27.2004 9.98282L27.2357 10.0322L7.17135 24.3749Z"
          fill="#F8F8F8"
        />
        <path
          d="M10.4407 23.7204C10.4407 24.6705 9.67048 25.4407 8.72036 25.4407C7.77023 25.4407 7 24.6705 7 23.7204C7 22.7702 7.77023 22 8.72036 22C9.67048 22 10.4407 22.7702 10.4407 23.7204Z"
          fill="#2F80ED"
        />
        <path
          d="M27.5257 10.9768C27.5257 11.9269 26.7554 12.6972 25.8053 12.6972C24.8552 12.6972 24.085 11.9269 24.085 10.9768C24.085 10.0267 24.8552 9.25644 25.8053 9.25644C26.7554 9.25644 27.5257 10.0267 27.5257 10.9768Z"
          fill="#2F80ED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.74389 22.5362C12.689 26.6561 18.4163 27.6086 22.5363 24.6635C26.6563 21.7184 27.6087 15.991 24.6636 11.8711C21.7185 7.75109 15.9912 6.79866 11.8712 9.74374C7.75123 12.6888 6.7988 18.4162 9.74389 22.5362Z"
          fill="#E9F3FF"
        />
      </svg>
    );
  };
  return (
    <>
      <div className="w-full h-[73.5px] border-b border-primary-gray relative">
        <p
          className="cursor-pointer absolute top-[23px] left-[25px]"
          onClick={() => setOpenChat(null)}
        >
          <ArrowLeftGrayIcon />
        </p>
        <h1
          className={`absolute top-[19.62px] left-[63.43px] right-[215.54px] ${
            openChat.type === "support"
              ? "bottom-[28.82px]"
              : "bottom-[38.61px]"
          } h-fit text-primary-blue text-left w-full max-w-[630px] font-semibold`}
        >
          {openChat.namaGroup}
        </h1>
        {openChat.type === "group" && (
          <p className="absolute top-[44.25px] left-[62.65px] bottom-[18.44px] text-xs text-[#333333] size-fit">
            {openChat.member?.length} Participant
            {(openChat.member ?? [])?.length >= 1 ? "s" : ""}
          </p>
        )}
        <p
          className="cursor-pointer absolute right-[21px] top-[28px] bottom-[20.5px]"
          onClick={() => setOpenChat(null)}
        >
          <CloseGrayIcon />
        </p>
      </div>
      <div className="w-full h-full flex flex-col justify-between px-5 pt-[13.5px] pb-[19px] relative">
        <div
          ref={scrollContainerref}
          className="w-full h-[573px] overflow-y-auto"
        >
            {openChat.history.find(key=>key.new===true) && !chatInView && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-[141px] z-50 h-[33.89px] flex items-center justify-center absolute bottom-[78px] left-[293px] right-[297px] text-primary-blue rounded-[5px] bg-sticker-1"
                    >
                      New Message
                    </motion.div>
                  )}
          {(() => {
            let lastRenderedDate: string | null = null;
            return openChat.history.map((key, index) => {
              const normalizedDate = key.date.replace(".", ",");
              const date = new Date(normalizedDate);
              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");
              const messageDate = new Date(key.date);
              const today = new Date();
              const formattedDate = messageDate.toISOString().split("T")[0];
              const formattedToday = today.toISOString().split("T")[0];
              const displayDate =
                formattedDate === formattedToday ? "Today" : key.date;
              const shouldRenderDate = lastRenderedDate !== formattedDate;
              lastRenderedDate = formattedDate;
              return (
                <React.Fragment key={index}>
                  {(shouldRenderDate&&openChat.type!=='support') && (
                    <div className="flex items-center justify-center mb-[1px]">
                      <div className="flex-grow border-t border-primary-darkGray"></div>
                      <span className="px-[27px] text-sm font-semibold text-primary-darkGray">
                        {displayDate}
                      </span>
                      <div className="flex-grow border-t border-primary-darkGray"></div>
                    </div>
                  )}
                  {key.new && (
                    <motion.div
                      ref={refNewChat}
                      className="flex items-center justify-center mb-[1px]"
                    >
                      <div className="flex-grow border-t border-indicator-Red"></div>
                      <span className="px-[27px] text-sm font-semibold text-indicator-Red">
                        New Messages
                      </span>
                      <div className="flex-grow border-t border-indicator-Red"></div>
                    </motion.div>
                  )}
                  <div
                    className={`w-full flex mb-[16.22px]  ${
                      key.name === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-full max-w-[518px] mx-[10px]  flex flex-col ${
                        key.name === "You" ? "items-end" : "items-start"
                      } justify-start`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          key.name === "You"
                            ? "text-chat-topMain2"
                            : index % 2 === 0
                            ? "text-chat-topMain1"
                            : "text-chat-topMain3"
                        }
                          ${
                            openChat.type === "support"
                              ? "!text-primary-blue"
                              : ""
                          }`}
                      >
                        {key.name}
                      </p>
                      <div className={`flex min-w-[300px] relative gap-[7px] justify-between ${key.name==='You'?'flex-row':'flex-row-reverse'}`}>
                        <ChatMenu/>
                      <div
                        className={`p-2.5 text-left w-fit rounded-[5px] mb-1 text-primary-darkGray ${
                          key.name === "You"
                            ? "bg-chat-Main2"
                            : index % 2 === 0
                            ? "bg-chat-Main1"
                            : "bg-chat-Main3"
                        } ${
                          openChat.type === "support" ? "!bg-[#f8f8f8]" : ""
                        }`}
                      >
                        <p className="text-sm">{key.chat}</p>
                        <p className="text-xs mr-auto w-fit mt-3">
                          {hours}:{minutes}
                        </p>
                      </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            });
          })()}
        </div>
        {openChat.type === "support" && (
          <div className="w-[670px] p-2.5 right-[21px] rounded-[5px] left-[17px] h-[54px] mt-top bg-[#E9F3FF] absolute bottom-[69px] flex items-center gap-[11px]">
            <motion.div
              transition={{ duration: 1, repeat: Infinity }}
              animate={{ rotate: 360 }}
            >
              <LoadingIconSupport />
            </motion.div>
            <p>Please wait while we connect you with one of our team</p>
          </div>
        )}
        <div className="w-full flex gap-[13px] mt-[25px]">
          <input
            placeholder="Type a new message"
            className="pl-[16px] py-[12.81px] flex w-full h-[40px] border-gray-400 border rounded-[5px]"
          ></input>
          <button
            type="button"
            className="w-[76px] h-[40px] bg-primary-blue rounded-[5px] px-4 py-2 font-semibold text-primary-white"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
