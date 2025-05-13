import type React from "react";
import ReactDOM from "react-dom";
import { useState,useEffect } from "react";
export default function BookmarkDropdown({children,position}:{children:React.ReactNode,position:{top:number,left:number}}){
    const portalRoot=document.getElementById('portal-root')
      const [adjustedTop, setAdjustedTop] = useState(position.top);
  useEffect(() => {
    const dropdownHeight = 200;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - position.top;
    if (spaceBelow < dropdownHeight) {
      setAdjustedTop(position.top - dropdownHeight);
    } else {
      setAdjustedTop(position.top);
    }
  }, [position.top]);
    if(!portalRoot)return null;
    return ReactDOM.createPortal(
        <div style={{
        top: `${adjustedTop}px`,
        left: `${position.left}px`,
      }} className="w-[277px] h-fit absolute bg-white border border-primary-gray z-50 p-[15px] gap-[11px] flex flex-col rounded-[5px]">
        {children}
        </div>,
        portalRoot
    )
}