export default function Widget({title, removeSelf, children}){
    return (
        <div className="flex flex-col bg-white rounded-lg pt-2 shadow-md flex-1 shrink-0  min-w-85">
            <div className="flex">
                <div className="text-sm font-bold mb-2 px-4 mr-auto">{title}</div>
                {title !== "" ? 
                <button onClick={removeSelf} className="w-7 h-7 mr-2">
                    <img src="close.svg" alt="Delete Widget" className="w-7 h-7 hover:scale-120 active:scale-140 rounded-full"/>
                </button> 
                : <></>}
            </div>
            <div className="relative flex-1 px-4 pb-4 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
