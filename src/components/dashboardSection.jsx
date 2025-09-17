import Widget from "./widget.jsx";
import annotationPlugin from "chartjs-plugin-annotation";
import LineFillChart from "./lineFillChart.jsx";
import DonutChart from "./donutChart.jsx"
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import useDataStore from "../data/dataStore.js";
Chart.register(annotationPlugin);
Chart.register(CategoryScale);

const chartMap = {
    "DonutChart": DonutChart,
    "LineChart": LineFillChart
}

export default function DashboardSection({ title, setManagerVisible }) {
    const widgetsData = useDataStore(state => state.sections.find(s => s.title === title).widgets);
    const toggleWidget = useDataStore(state => state.toggleWidget)
    const addWidget = <Widget title="">
        <button className="active:bg-slate-300 border-gray-400 border-1 bg-white px-2 py-1 rounded-lg" onClick={() => setManagerVisible(true)}>
            Add Widget +
        </button>
    </Widget>

    return <div className="px-3">
        <div className="text-sm font-bold mb-2">{title}</div>
        <div id="widgetRow" className="flex flex-row flex-wrap gap-3">
            {
                widgetsData
                    .filter(widget => widget.visible)
                    .map((widget) => {
                        const ChartComponent = chartMap[widget.type];
                        return <Widget
                            title={widget.title}
                            key={widget.widgetId}
                            removeSelf={toggleWidget.bind(null, title, widget.widgetId)}
                        >
                            <ChartComponent chartData={widget.data} />
                        </Widget>
                    })
            }
            {
                widgetsData.reduce((acc, widget) => acc + (widget.visible ? 1 : 0), 0) < 3 && addWidget
            }
        </div>
    </div>
}