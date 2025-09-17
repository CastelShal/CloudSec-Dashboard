import { useState } from "react";
import useDataStore from "../data/dataStore.js";
import { useEffect, useRef } from "react";

export default function WidgetManager({ setManagerVisible }) {
    const sections = useDataStore(state => state.sections);

    const [show, setShow] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        if (document) {
            document.body.style.overflow = 'hidden';
        }
        setShow(true);
    }, []);

    function handleClose(event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            setShow(false);
            if (document) {
                document.body.style.overflow = 'auto';
            }
            setTimeout(() => setManagerVisible(false), 200);
        }
    }

    return (
        <div
            className="fixed inset-0 h-full w-full backdrop-blur-sm"
            onClick={handleClose}
        >
            <div ref={modalRef} className={`border-2 border-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-130 sm:h-130 rounded-2xl p-4 bg-white flex flex-col transition-all duration-200 ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <TabbedContainer sections={sections} />
                <div className="flex justify-end mt-4">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-full text-lg font-bold" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

function TabbedContainer({ sections }) {
    const [activeTab, setActiveTab] = useState(sections[0]?.title);
    return <>
        <div className="text-center font-bold text-xl sm:text-2xl">Widget Manager</div>
        <div className="flex-1">
            <div className="flex border-b mb-2">
                {sections.map(section => (
                    <button
                        key={section.title}
                        className={`px-4 py-2 font-sm sm:font-base ${activeTab === section.title
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(section.title)}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto">
                <SectionTab section={sections.find(sec => sec.title === activeTab)} />
            </div>
        </div>
    </>
}

function SectionTab({ section }) {
    const [input, setInput] = useState("");
    const toggleWidget = useDataStore(state => state.toggleWidget);
    return <div>
        <div className="flex items-center gap-2 rounded-sm bg-slate-200 mb-5 py-1 px-5">
            <svg className="w-5 h-5 ml-2 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" id="searchText" value={input} className="focus:outline-0 w-full min-w-20 px-3 text-base py-1 rounded-lg block" onInput={(e) => setInput(e.target.value)} />
            <button onClick={() => setInput("")}>Clear</button>
        </div>
        {section.widgets.filter(widget => widget.title.toLowerCase().includes(input.toLowerCase())).map(widget => (
            <WidgetItem key={widget.widgetId} toggleWidget={toggleWidget.bind(null, section.title, widget.widgetId)} widget={widget} />
        ))}
    </div>
}

function WidgetItem({ widget, toggleWidget }) {
    return (
        <div className="border py-2 px-5 rounded-2xl mb-2 flex justify-between items-center">
            <span className="sm:text-lg font-semibold">{widget.title}</span>
            {widget.visible ?
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => toggleWidget(widget.widgetId)}>Remove</button> :
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => toggleWidget(widget.widgetId)}>Add</button>
            }
        </div>
    )
}

