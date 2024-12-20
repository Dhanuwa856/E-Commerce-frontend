import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import moment from "moment";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [todayOrderCount, setTodayOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [error, setError] = useState(null);

  const dashboardMetricsURL = `${
    import.meta.env.VITE_API_URL
  }/orders/dashboard-metrics/`;
  const dashBoardChartURL = `${
    import.meta.env.VITE_API_URL
  }/orders/get-dash-chart/`;

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await axios.get(dashboardMetricsURL);
        setProductCount(response.data.productCount);
        setTodayOrderCount(response.data.ordersToday);
        setTotalRevenue(response.data.totalRevenue);
      } catch (err) {
        setError("Failed to fetch dashboard metrics. Please try again later.");
      }
    };

    fetchDashboardMetrics();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(dashBoardChartURL);
        const { sales, orderStatus, categories, categoryCounts } =
          response.data;

        // Line Chart Data
        setLineData({
          labels: Array.from({ length: 6 }, (_, i) =>
            moment()
              .subtract(5 - i, "months")
              .format("MMM")
          ), // Generate last 6 months' names dynamically
          datasets: [
            {
              label: "Sales ($)",
              data: sales.slice(-6) || [], // Use the last 6 months' sales data
              borderColor: "#0A97B0",
              backgroundColor: "rgba(10, 151, 176, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        });

        // Bar Chart Data
        setBarData({
          labels: ["Pending", "Shipped", "Canceled", "Delivered"],
          datasets: [
            {
              label: "Orders",
              data: orderStatus || [],
              backgroundColor: ["#FFC107", "#0A97B0", "#DC3545", "#28A745"],
            },
          ],
        });

        // Doughnut Chart Data
        setDoughnutData({
          labels: categories || [],
          datasets: [
            {
              label: "Category Share",
              data: categoryCounts || [],
              backgroundColor: ["#0A97B0", "#FFC107", "#28A745"],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to fetch chart data. Please try again later.");
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-gray-100 p-6 overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card: Total Revenue */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-2">Total Revenue</h2>
          <p className="text-2xl font-bold text-[#0A97B0]">${totalRevenue}</p>
        </div>

        {/* Card: Orders Today */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-2">Orders Today</h2>
          <p className="text-2xl font-bold text-[#FFC107]">
            {todayOrderCount} Orders
          </p>
        </div>

        {/* Card: Products in Stock */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-2">Products in Stock</h2>
          <p className="text-2xl font-bold text-[#28A745]">
            {productCount} Products
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Line Chart: Sales Analytics */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Sales Analytics</h2>
          {lineData ? <Line data={lineData} /> : <p>Loading...</p>}
        </div>

        {/* Bar Chart: Orders Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Orders Status</h2>
          {barData ? <Bar data={barData} /> : <p>Loading...</p>}
        </div>

        {/* Doughnut Chart: Category Performance */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Category Performance</h2>
          {doughnutData ? <Doughnut data={doughnutData} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
