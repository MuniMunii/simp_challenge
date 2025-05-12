import type React from "react";
import ReactDOM from "react-dom";
export default function BookmarkDropdown({children,position}:{children:React.ReactNode,position:{top:number,left:number}}){
    const portalRoot=document.getElementById('portal-root')
    if(!portalRoot)return null;
    return ReactDOM.createPortal(
        <div style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }} className="w-[277px] h-fit absolute bg-white border border-primary-gray z-50 p-[15px] gap-[11px] flex flex-col rounded-[5px]">
        {children}
        </div>,
        portalRoot
    )
}