import type { SetStateAction } from "react";
import {
  InboxActiveIcon,
  InboxIcon,
  QuicksButton,
  TaskActiveIcon,
  TaskIcon,
} from "./icon";
import { motion, AnimatePresence } from "framer-motion";
export default function QuickMenu({isActive,setIsActive,isOpen,setIsOpen}:{isOpen:boolean,isActive:"inbox"|"task"|null,setIsActive:React.Dispatch<SetStateAction<"inbox"|"task"|null>>,setIsOpen:React.Dispatch<SetStateAction<boolean>>}){
    return (
        <motion.div
        id="floating-button"
        aria-controls="floating-panel"
        aria-expanded={!!isActive}
        aria-haspopup='true'
          className={`flex z-40 flex-row-reverse items-center absolute right-[34px] bottom-[27px] rounded-full ${
            isActive
              ? "overflow-visible gap-[16px] !right-[49px]"
              : "overflow-hidden gap-[26px]"
          }`}
        >
          <AnimatePresence>
            {isActive && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 180, rotate: 360 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", damping: 20 }}
                  onClick={() => setIsActive(null)}
                  className="size-[68px] bg-primary-darkGray rounded-full relative z-10"
                >
                  {isActive === "inbox" ? (
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      className="bg-indicator-warmBlue absolute left-[15px] flex justify-center items-center size-[68px] rounded-full z-20"
                    >
                      <InboxActiveIcon active={true} />
                    </motion.div>
                  ) : (
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      className="bg-indicator-warmOrange absolute left-[15px] flex justify-center items-center size-[68px] rounded-full z-20"
                    >
                      <TaskActiveIcon active={true} />
                    </motion.div>
                  )}
                </motion.div>
                {isActive==="inbox" ? (
                  <motion.div
                  onClick={()=>setIsActive('task')}
                    initial={{ opacity: 0, x: 180, rotate: 360 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: 360, rotate: 360 }}
                    transition={{ delay: 0.4, type: "spring", damping: 20 }}
                    className="size-[60px] rounded-full flex justify-center items-center bg-white"
                  >
                    <TaskIcon />
                  </motion.div>
                ) : (
                  <motion.div
                  onClick={()=>setIsActive('inbox')}
                    initial={{ opacity: 0, x: 180, rotate: 360 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: 360, rotate: 360 }}
                    transition={{ delay: 0.4, type: "spring", damping: 20 }}
                    className="size-[60px] rounded-full flex justify-center items-center bg-white"
                  >
                    <InboxIcon />
                  </motion.div>
                )}
              </>
            )}
            {!isActive && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                type="button"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setIsActive(null);
                }}
              >
                <QuicksButton />
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.button
                  onClick={() => {
                    setIsActive("task");
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: 180, rotate: 360 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 360, rotate: 360 }}
                  transition={{ delay: 0.1, type: "spring", damping: 20 }}
                  className="size-[60px] rounded-full bg-primary-iconBg flex items-center justify-center"
                >
                  <TaskIcon />
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsActive("inbox");
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: 180, rotate: 360 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 360, rotate: 360 }}
                  transition={{ delay: 0.2, type: "spring", damping: 20 }}
                  className="size-[60px] rounded-full bg-primary-iconBg flex items-center justify-center"
                >
                  <InboxIcon />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </motion.div>
    )
}