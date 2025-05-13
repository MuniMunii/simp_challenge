import {
  SearchIconGray,
  UserGrayIcon,
  UserIcon,
  LoadingIcon,
} from "./icon";
import React, { useState, useEffect, type SetStateAction } from "react";
import ChatComp from "./chatComp";
export default function InboxComp({
  setIsLoadingEffect,
  loadingEffect,
  isActive,
}: {
  setIsLoadingEffect:React.Dispatch<SetStateAction<boolean>>
  isActive: "task" | "inbox" | null;
  loadingEffect: boolean;
}) {
  const [openChat, setOpenChat] = useState<DummyTextProps | null>(null);
  const [dummyText, setDummyText] = useState<DummyTextProps[] | undefined>([]);
  // const dummyChat = [
  //   {
  //       type: "group",
  //       namaGroup: "I-587-AMARKHIL,Obaidullah [Affirmative filling with ZHN]",
  //       member: ["Mary Hilda", "You","Obaidullah Amarkhil"],
  //       history: [
  //         {
  //           name: "Mary Hilda",
  //           chat: "Just fill me in for his update yea?",
  //           date: "June 08,2021 19:32",
  //         },
  //         {
  //           name: "You",
  //           chat: "No Worries. it will be completed ASAP,i've asked hum yesterday",
  //           date: "June 08,2021 19:32",
  //         },
  //         {
  //           name: "Mary Hilda",
  //           chat: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
  //           date: "June 09,2021 19:32",
  //         },
  //         {
  //           name: "You",
  //           chat: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
  //           date: "June 09,2021 19:32",
  //         },
  //         {
  //           name: "Mary Hilda",
  //           chat: "Sure thing ,Claren.",
  //           date: "June 09,2021 19:32",
  //         },
  //         {
  //           name: "Obaidullah Amarkhill",
  //           chat: "Morning,I'll try to do them",
  //           date: "June 09,2021 19:32",
  //           new: true
  //         },
  //       ],
  //     },
  //   {
  //     type: "group",
  //     namaGroup: "109220-Naturalization",
  //     member: ["Cameron Phillips", "You"],
  //     history: [
  //       {
  //         name: "Cameron Phillips",
  //         chat: "Please Check This",
  //         date: "January 1.2021 19:10",
  //       },
  //     ],
  //   },
  //   {
  //     type: "group",
  //     namaGroup:
  //       "Jeannete Moraima Guaman Chamba (Hutton-1-589) [Hutto Follow Up - Brief Service]",
  //     member: ["Ellen", "You"],
  //     history: [
  //       {
  //         name: "Ellen",
  //         chat: "Hey, Please read.",
  //         date: "02/06/2021 10:45",
  //       },
  //       {
  //         name: "You",
  //         chat: "Hey, Please read.",
  //         date: "02/06/2021 10:45",
  //       },
  //     ],
  //   },
  //   {
  //     type: "group",
  //     namaGroup: "8405-Diana SALAZAR MUNGUIA",
  //     member: ["Cameron Phillips", "You"],
  //     history: [
  //       {
  //         name: "Cameron Philips",
  //         member: ["Cameron Phillips"],
  //         chat: "I understand your initial concerns and thats very valid, Elizabeth But You...",
  //         date: "01/06/2021 12:19",
  //       },
  //     ],
  //   },
  //   {
  //     type: "support",
  //     namaGroup: "FastVisa Support",
  //     history: [
  //       {
  //         name: "FastVisa Support",
  //         chat: "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
  //         date: "January 1.2021 19:10",
  //       },
  //       {
  //         name: "You",
  //         chat: "Hi, I need help with something can you help me ?",
  //         date: "January 1.2021 19:10",
  //       },
  //     ],
  //   },
  // ];
  //   Mock fetch get messages
  useEffect(() => {
    setIsLoadingEffect(true)
        const fetchPostDummyMessages = async () => {
        const response = await fetch(
          "https://dummyjson.com/c/3bbe-18f5-4250-a1ec",
          {
            method: "get",
          }
        );
        const data = await response.json();
        if (response.ok) {
              setIsLoadingEffect(false)
          console.log("get Messages Success :", data);
          setDummyText(data);
        }
      };
    if (isActive === "inbox") {
      fetchPostDummyMessages();
    }
  }, []);
      // Mock API POST Task
  useEffect(()=>{
    const fetchPostTask = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(dummyText),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("POST Messages Success :", data);
        }
      };
    fetchPostTask()
  },[dummyText])
  if (openChat) {
    return (
      <ChatComp openChat={openChat} setOpenChat={setOpenChat} setDummyText={setDummyText}/>
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
                className="border-b cursor-pointer mb-[22px] pb-[22px] relative border-b-primary-gray last:border-none flex items-start justify-start"
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
                        <p className="max-w-[518px] text-ellipsis break-words">{lastHistory.chat}</p>
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
