import React, { useEffect, useState } from 'react';
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
import {getCountOrdersByMonthAndYear} from "../../State/Admin/Action"; // adjust import as needed

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SaleHistoryChart = () => {
    const [orderData, setOrderData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);

    // Fetch order data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getCountOrdersByMonthAndYear();
                console.log(response);
                const data = response.data.result;
                console.log(data);
                setOrderData(data);

                // Extract unique years for ComboBox
                const uniqueYears = [...new Set(data.map(item => item[0]))];
                setYears(uniqueYears);

            } catch (error) {
                console.error("Error fetching order data", error);
            }
        };

        fetchOrders();
    }, []);

    // Filter data for the selected year and format it for the chart
    const getMonthlyData = () => {
        const monthlyData = Array(12).fill(0); // Initialize array for 12 months with 0 values

        orderData.forEach(([year, month, totalOrders]) => {
            if (year === selectedYear) {
                monthlyData[month - 1] = totalOrders; // month is 1-based in API
            }
        });

        return monthlyData;
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                data: getMonthlyData(),
                backgroundColor: '#1abc9c',
                borderRadius: 10,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                grid: { display: true, color: '#e0e0e0' },
                beginAtZero: true,
                ticks: { stepSize: 10 },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    };

    return (
        <div>
            <div className='sale-history-header flex justify-between items-center'>
                <h2 className='text-2xl font-semibold'>Sale History</h2>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className='year-select'
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <Bar className='p-5' data={data} options={options} />
        </div>
    );
};

export default SaleHistoryChart;
