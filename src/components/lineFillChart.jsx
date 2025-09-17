import { Line } from "react-chartjs-2";

export default function LineFillChart({ chartData }) {
    return <Line data={chartData} 
    options={{
        maintainAspectRatio: true,
        responsive: true,
    }} />;
}