import React from 'react';
import '../../../style/AdminDashboard.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {borderRadius} from "@mui/system";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SaleHistoryChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                data: [5, 6, 7, 5, 7, 8, 7, 8],
                backgroundColor: '#1abc9c',
                borderRadius: 10,

            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, // Hide vertical gridlines
                },

            },
            y: {
                grid: {
                    display: true, // Show only horizontal gridlines
                    color: '#e0e0e0', // Custom gridline color
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 2, // Adjust step size for milestones
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                enabled: true, // Keep the tooltip if needed
            },
        },
    };

    return (
        <div>
        <div className='sale-history-header'>
            <h2 className='text-2xl font-semibold'>Sale History</h2>
        </div>
    <Bar className='p-5' data={data} options={options}/>
</div>
)
    ;
};

export default SaleHistoryChart;