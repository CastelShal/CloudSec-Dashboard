import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ chartData }) {
    return <div className="max-h-full">
        <Doughnut data={chartData}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
                plugins: {
                    legend: { position: 'right' },
                    annotation: {
                        annotations: {
                            dLabel: {
                                type: 'doughnutLabel',
                                content: ({ chart }) => ['Total',
                                    chart.getDatasetMeta(0).total,
                                ],
                                font: [{ size: 15 }, { size: 20 }],
                                color: ['black']
                            }
                        }
                    }
                }
            }}
        />
    </div>
}