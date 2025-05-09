import {
  SearchIconGray,
  UserGrayIcon,
  UserIcon,
  LoadingIcon,
  ArrowLeftGrayIcon,
  CloseGrayIcon,
} from "./icon";
import React, { useState, useEffect,useRef } from "react";
import {motion,useInView}from "framer-motion"
interface HistoryProps {
  name: string | null;
  chat: string;
  date: string;
  new?:boolean
}
interface DummyTextProps {
  type: string;
  namaGroup: string;
  member?: string[];
  history: HistoryProps[];
}
export default function InboxComp({
  loadingEffect,
  isActive,
}: {
  isActive: "task" | "inbox" | null;
  loadingEffect: boolean;
}) {
  const [openChat, setOpenChat] = useState<DummyTextProps | null>();
  const [dummyText, setDummyText] = useState<DummyTextProps[] | undefined>();
  const refNewChat=useRef(null)
  const scrollContainerref=useRef(null)
  const chatInView=useInView(refNewChat,{root:scrollContainerref,margin:'0px',once:false})
  useEffect(()=>{console.log(chatInView)},[chatInView])
  const dummyChat = [
    {
        type: "group",
        namaGroup: "I-587-AMARKHIL,Obaidullah [Affirmative filling with ZHN]",
        member: ["Mary Hilda", "You","Obaidullah Amarkhil"],
        history: [
          {
            name: "Mary Hilda",
            chat: "Just fill me in for his update yea?",
            date: "June 08,2021 19:32",
          },
          {
            name: "You",
            chat: "No Worries. it will be completed ASAP,i've asked hum yesterday",
            date: "June 08,2021 19:32",
          },
          {
            name: "Mary Hilda",
            chat: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
            date: "June 09,2021 19:32",
          },
          {
            name: "You",
            chat: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
            date: "June 09,2021 19:32",
          },
          {
            name: "Mary Hilda",
            chat: "Sure thing ,Claren.",
            date: "June 09,2021 19:32",
          },
          {
            name: "Obaidullah Amarkhill",
            chat: "Morning,I'll try to do them",
            date: "June 09,2021 19:32",
            new: true
          },
        ],
      },
    {
      type: "group",
      namaGroup: "109220-Naturalization",
      member: ["Cameron Phillips", "You"],
      history: [
        {
          name: "Cameron Phillips",
          chat: "Please Check This",
          date: "January 1.2021 19:10",
        },
      ],
    },
    {
      type: "group",
      namaGroup:
        "Jeannete Moraima Guaman Chamba (Hutton-1-589) [Hutto Follow Up - Brief Service]",
      member: ["Ellen", "You"],
      history: [
        {
          name: "Ellen",
          chat: "Hey, Please read.",
          date: "02/06/2021 10:45",
        },
        {
          name: "You",
          chat: "Hey, Please read.",
          date: "02/06/2021 10:45",
        },
      ],
    },
    {
      type: "group",
      namaGroup: "8405-Diana SALAZAR MUNGUIA",
      member: ["Cameron Phillips", "You"],
      history: [
        {
          name: "Cameron Philips",
          member: ["Cameron Phillips"],
          chat: "I understand your initial concerns and thats very valid, Elizabeth But You...",
          date: "01/06/2021 12:19",
        },
      ],
    },
    {
      type: "support",
      namaGroup: "FastVisa Support",
      history: [
        {
          name: null,
          chat: "Hey There! Welcome to your inbox.",
          date: "January 1.2021 19:10",
        },
      ],
    },
  ];
  //   Mock fetch Post
  useEffect(() => {
    if (isActive === "inbox") {
      const fetchPostDummyMessages = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(dummyChat),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("POST Messages Success :", data);
          setDummyText(dummyChat);
        }
      };
      fetchPostDummyMessages();
    }
  }, [isActive,dummyChat]);

  if (openChat) {
    return (
      <>
        <div className="w-full h-[73.5px] border-b border-primary-gray relative">
          <p
            className="absolute top-[23px] left-[25px]"
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
            className="absolute right-[21px] top-[28px] bottom-[20.5px]"
            onClick={() => setOpenChat(null)}
          >
            <CloseGrayIcon />
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-between px-5 pt-[13.5px] pb-[19px] relative">
          <div ref={scrollContainerref} className="w-full h-[573px] overflow-y-scroll">
          {!chatInView&&<motion.div initial={{opacity:0}} exit={{opacity:0}} animate={{opacity:1}}className="w-[141px] h-[33.89px] flex items-center justify-center absolute bottom-[78px] left-[293px] right-[297px] text-primary-blue rounded-[5px] bg-sticker-1">New Message</motion.div>}
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
                    {shouldRenderDate && (
                      <div className="flex items-center justify-center mb-[1px]">
                        <div className="flex-grow border-t border-primary-darkGray"></div>
                        <span className="px-[27px] text-sm font-semibold text-primary-darkGray">
                          {displayDate}
                        </span>
                        <div className="flex-grow border-t border-primary-darkGray"></div>
                      </div>
                    )}
                    {key.new && (
                      <motion.div ref={refNewChat} className="flex items-center justify-center mb-[1px]">
                        <div className="flex-grow border-t border-indicator-Red"></div>
                        <span className="px-[27px] text-sm font-semibold text-indicator-Red">
                          New Messages
                        </span>
                        <div className="flex-grow border-t border-indicator-Red"></div>
                      </motion.div>
                    )}
                    <div
                      className={`w-full flex mb-[16.22px] ${
                        key.name === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`w-fit min-w-[127px] mx-[10px] max-w-[581px] flex flex-col ${
                          key.name === "You" ? "items-end" : "items-start"
                        } justify-start`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            key.name === "You"
                              ? "text-chat-topMain2"
                              : index % 2 === 0
                              ? "text-chat-topMain1"
                              : "text-chat-topMain3"
                          }`}
                        >
                          {key.name}
                        </p>
                        <div
                          className={`p-2.5 text-left rounded-[5px] mb-1 text-primary-darkGray ${
                            key.name === "You"
                              ? "bg-chat-Main2"
                              : index % 2 === 0
                              ? "bg-chat-Main1"
                              : "bg-chat-Main3"
                          }`}
                        >
                          <p className="text-sm">{key.chat}</p>
                          <p className="text-xs mr-auto w-fit mt-3">
                            {hours}:{minutes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              });
            })()}
          </div>
          <div className="w-full flex gap-[13px] mt-[25px]">
            <input placeholder="Type a new message" className="pl-[16px] py-[12.81px] flex w-full h-[40px] border-gray-400 border rounded-[5px]"></input>
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
  return (
    <div className="w-full box-border mx-auto h-full py-[24px] px-[32px]">
      {/* navbar */}
      <div className="flex mb-[22px] justify-between items-center px-[58px] h-[32px] border border-primary-gray rounded-[5px]">
        <p>Search</p>
        <SearchIconGray />
      </div>
      {/* Loading Effect */}
      <div
        className={`w-full h-[635px] overflow-y-auto ${
          loadingEffect ? "flex flex-col justify-center items-center" : ""
        }`}
      >
        {loadingEffect ? (
          <div>
            <LoadingIcon />
            <p>Loading Chat...</p>
          </div>
        ) : (
          dummyText?.map((key, index) => {
            const lastHistory = key.history[key.history.length - 1];
            return (
              <div
                key={`${key.namaGroup}`}
                onClick={() => setOpenChat(key)}
                className="border-b mb-[22px] pb-[22px] relative border-b-primary-gray last:border-none flex items-start justify-start"
              >
                {key.type === "group" ? (
                  <>
                    <div className="mr-[34px] size-[34px] rounded-full flex items-center justify-center relative bg-primary-white">
                      <UserGrayIcon />
                      <div className="size-[34px] rounded-full absolute left-[17px] bg-primary-blue flex justify-center items-center">
                        <UserIcon />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col items-start justify-start text-left text-primary-darkGray ">
                        {index === 0 && (
                          <div className="size-[10px] rounded-full bg-indicator-Red absolute bottom-[38px] right-0"></div>
                        )}
                        <div className="flex gap-[16px]">
                          <p className="w-fit max-w-[414.73px] text-primary-blue font-semibold">
                            {key.namaGroup}
                          </p>
                          <p>{lastHistory.date}</p>
                        </div>
                        <p className="font-semibold">{lastHistory.name}:</p>
                        <p>{lastHistory.chat}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ml-[11px] mr-[23px] size-[34px] rounded-full flex items-center justify-center relative bg-primary-blue text-primary-white">
                      F
                    </div>
                    <div>
                      <div className="flex flex-col items-start justify-start text-left text-primary-darkGray">
                        <div className="flex gap-[16px]">
                          <p className="w-fit max-w-[414.73px] text-primary-blue font-semibold">
                            {key.namaGroup}
                          </p>
                          <p>{lastHistory.date}</p>
                        </div>
                        <p>{lastHistory.chat}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
