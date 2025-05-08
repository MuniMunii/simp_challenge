import { useState, useEffect } from "react";
import "./App.css";
import QuickMenu from "./component/QuickMenu";
import { SearchIcon, SearchIconGray, UserIcon } from "./component/icon";
import { motion } from "framer-motion";
function App() {
  const [isActive, setIsActive] = useState<"inbox" | "task" | null>(null);
  const [loadingEffect, setLoadingEffect] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    setLoadingEffect(true);
    if (isActive === "inbox") {
      timer = setTimeout(() => setLoadingEffect(false), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActive]);
  const dummyText = [
    {
      type: "group",
      namaGroup: "109220-Naturalization",
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
      history: [
        {
          name: "Ellen",
          chat: "Hey, Please read.",
          date: "January 1.2021 19:10",
        },
      ],
    },
    {
      type: "group",
      namaGroup: "8405-Diana SALAZAR MUNGUIA",
      history: [
        {
          name: "Cameron Philips",
          chat: "I understand your initial concerns and thats very valid, Elizabeth But You...",
          date: "January 1.2021 19:10",
        },
      ],
    },
    {
      type: "support",
      namaGroup: "FastVisa Support",
      history: [
        {
          chat: "Hey There! Welcome to your inbox.",
          date: "January 1.2021 19:10",
        },
      ],
    },
  ];
  const LoadingIcon = () => {
    return (
      <motion.div
        className="rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <svg
          width="86"
          height="86"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.8009 60.5045L67.6057 24.9025L67.6796 25.0058C67.6551 24.9713 67.6306 24.9369 67.606 24.9025C57.7747 11.1492 38.6557 7.96983 24.9024 17.8011C11.1492 27.6323 7.96978 46.7513 17.8009 60.5045Z"
            fill="#C4C4C4"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M67.6058 24.9025L17.8009 60.5047L17.7771 60.4715C17.785 60.4826 17.7929 60.4936 17.8008 60.5047C27.6321 74.2579 46.7511 77.4373 60.5044 67.6061C74.2577 57.7748 77.4371 38.6557 67.6058 24.9025Z"
            fill="#F8F8F8"
          />
          <path
            d="M26.3985 59.0807C26.3985 61.4391 24.4866 63.351 22.1282 63.351C19.7697 63.351 17.8578 61.4391 17.8578 59.0807C17.8578 56.7222 19.7697 54.8103 22.1282 54.8103C24.4866 54.8103 26.3985 56.7222 26.3985 59.0807Z"
            fill="#C4C4C4"
          />
          <path
            d="M68.3256 27.2472C68.3256 29.6056 66.4137 31.5175 64.0553 31.5175C61.6968 31.5175 59.7849 29.6056 59.7849 27.2472C59.7849 24.8887 61.6968 22.9768 64.0553 22.9768C66.4137 22.9768 68.3256 24.8887 68.3256 27.2472Z"
            fill="#C4C4C4"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.1859 55.9403C31.4963 66.1671 45.7131 68.5313 55.9399 61.2208C66.1666 53.9104 68.5308 39.6937 61.2204 29.4669C53.9099 19.2401 39.6932 16.8759 29.4664 24.1864C19.2396 31.4968 16.8755 45.7135 24.1859 55.9403Z"
            fill="white"
          />
        </svg>
      </motion.div>
    );
  };
  return (
    <>
      <div className="h-full w-full relative text-[#333333]">
        <div className="relative bg-primary-darkGray w-full h-[58px]">
          <div className="absolute top-[19px] bottom-[23px] left-[26px]">
            <SearchIcon />
          </div>
        </div>
        {isActive && (
          <div
            id="floating-panel"
            role="region"
            aria-labelledby="floating-button"
            className="absolute bottom-[110px] right-[34px] py-[24px] px-[32px] w-[734px] h-[737px] bg-white flex flex-col"
          >
            {isActive === "inbox" ? (
              <div className="w-full box-border mx-auto h-full">
                {/* navbar */}
                <div className="flex mb-[22px] justify-between items-center px-[58px] h-[32px] border border-primary-gray rounded-[5px]">
                  <p>Search</p>
                  <SearchIconGray />
                </div>
                {/* Loading Effect */}
                <div
                  className={`w-full h-[635px] border border-gray-400 overflow-y-auto ${
                    loadingEffect
                      ? "flex flex-col justify-center items-center"
                      : ""
                  }`}
                >
                  {loadingEffect ? (
                    <div>
                      <LoadingIcon />
                      <p>Loading Chat...</p>
                    </div>
                  ) : (
                    dummyText.map((key, index) => {
                      return (
                        <div className="border-b mb-[22px] border-b-primary-gray flex  justify-start">
                          {key.type === "group" ? (
                            <div className="mr-[34px] size-[34px] rounded-full flex items-center justify-center relative bg-primary-white">
                              <UserIcon />
                              <div className="size-[34px] rounded-full absolute left-[17px] bg-primary-blue flex justify-center items-center">
                                <UserIcon />
                              </div>
                            </div>
                          ) : (
                            <div className="size-[34px] rounded-full flex justify-center items-center bg-primary-blue font-semibold">
                              F
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              "this Task"
            )}
          </div>
        )}
        <QuickMenu
          isActive={isActive}
          setIsActive={setIsActive}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}

export default App;
