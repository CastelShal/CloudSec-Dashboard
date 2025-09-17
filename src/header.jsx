export default function Header(){
    return <div className="flex stretch h-11 mt-1 py-2 px-2 sm:px-6 bg-white text-sm rounded-lg">
        <div className="mr-auto items-center flex "><span className="hidden sm:inline">Home &gt;&nbsp;</span> <span className="text-blue-700 font-bold">Dashboard V2</span></div>
        <div className="flex">
            <label htmlFor="searchBar"></label>
            <div className="flex items-center gap-2 rounded-sm bg-slate-200">
                <div className="w-5 h-5">
                    <svg className="w-full h-auto ml-2 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <input className="block min-w-25 max-w-60 focus:outline-0" id="searchBar" type="text" placeholder="Search Anything"/>
            </div>
            <div className="flex items-center ml-4">
                <button className="min-w-5 active:bg-slate-300 sm:p-2 rounded-full">
                    <img src="bell.svg" className="w-5 h-5 text-gray-600 cursor-pointer" fill="black" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    </img>
                </button>
            </div>
            
        </div>
    </div>
}