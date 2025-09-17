import { useState } from "react";
import DashboardSection from "./components/dashboardSection.jsx"
import useDataStore from "./data/dataStore.js";
import WidgetManager from "./components/widgetManager.jsx";

export default function Dashboard() {
    const [managerVisible, setManagerVisible] = useState(false);
    const sections = useDataStore((state) => state.sections)
    return <div className="my-5 sm:px-6 flex flex-col gap-5">
        <DashboardHeader setManagerVisible={setManagerVisible} />
        {sections.map((section) => {
            if (section.widgets.some(w => w.visible)) {
                return <DashboardSection title={section.title} setManagerVisible={setManagerVisible} />
            }
        })
        }
        {managerVisible && <WidgetManager setManagerVisible={setManagerVisible} />}
    </div>
}

function DashboardHeader({ setManagerVisible }) {
    const buttonStyle = "active:bg-slate-300 border-gray-400 border-1 bg-white px-2 py-1 rounded-lg"
    return <div className="text-sm flex gap-4 self-stretch">
        <div className="font-bold text-sm sm:text-xl mr-auto">CNAPP Dashboard</div>
        <button className={buttonStyle} onClick={() => setManagerVisible(true)}>
            Add Widget +
        </button>
        <button className={buttonStyle}>
            <img src="reload.svg" alt="reload" className="w-5 h-5" />
        </button>
        <button className={buttonStyle}>
            <img src="kebab.svg" alt="reload" className="w-5 h-5" onClick={() => setManagerVisible(true)} />
        </button>
    </div>
}



