import { useState, useEffect } from "react";
import "./App.css";
import QuickMenu from "./component/QuickMenu";
import { SearchIcon } from "./component/icon";
import InboxComp from "./component/InboxComp";
import { AnimatePresence, motion } from "framer-motion";
import TaskMainComp from "./component/taskMainComp";
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
  return (
    <>
    <div className="relative bg-primary-darkGray border-l border-l-primary-gray ml-auto h-[58px] w-[1635px]">
          <div className="absolute top-[19px] bottom-[23px] left-[26px]">
            <SearchIcon />
          </div>
        </div>
      <div className="ml-auto border-l border-l-primary-gray h-[1022px] w-[1635px] relative text-[#333333]">
          <AnimatePresence>
          {isActive && (
          <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
            id="floating-panel"
            role="region"
            aria-labelledby="floating-button"
            className="absolute bottom-[110px] right-[34px]  w-[734px] h-[737px] rounded-[5px] bg-white flex flex-col"
          >
            {isActive === "inbox" ? <InboxComp isActive={isActive} loadingEffect={loadingEffect}/> : (
              <TaskMainComp/>
            )}
          </motion.div>
          )}
          </AnimatePresence>
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
