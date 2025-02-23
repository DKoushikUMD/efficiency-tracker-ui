import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";

/* --------------------- MetricCard --------------------- */
const MetricCard = ({
  title,
  value,
  change,
  trend,
  colorClass = "bg-white",
}) => (
  <div
    className={`${colorClass} rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105`}
  >
    <h4 className="text-gray-600 text-sm mb-2">{title}</h4>
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-800">{value}</span>
      <span
        className={`flex items-center ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend === "up" ? (
          <ArrowUpRight className="h-5 w-5" />
        ) : (
          <ArrowDownRight className="h-5 w-5" />
        )}
        <span className="ml-1 font-semibold">{change}</span>
      </span>
    </div>
  </div>
);

/* --------------------- generateHistoricData --------------------- */
const generateHistoricData = () => {
  // Sample data for 7 days
  const days = Array.from({ length: 7 }, (_, i) => i);
  return days.map((day) => ({
    date: `2025-02-${String(15 + day).padStart(2, "0")}`,
    efficiency: 70 + Math.random() * 20,
    laborUtilization: 65 + Math.random() * 20,
    output: Math.floor(80 + Math.random() * 40),
  }));
};

const HistoricSummaryReport = () => {
  // State for date-range filters
  const [range, setRange] = useState("7d");

  // Generate sample data
  const chartData = generateHistoricData();

  // Handler for changing date range
  const handleRangeChange = (newRange) => {
    setRange(newRange);
    // You could fetch data for that new range here
  };

  // Navigation back to the main dashboard
  const handleBack = () => {
    // Example: use React Router, or do window.location.href
    window.location.href = "/blueprint"; // or wherever you want to go
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="flex items-center bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Historic Summary
            </h1>
            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    "http://3.83.15.74:8000/reports"
                  );
                  const data = await response.json();
                  // Open new tab and display the JSON data
                  const newTab = window.open();
                  newTab.document.write(`
                    <html>
                      <head>
                        <title>AI Generated Reports</title>
                        <style>
                          body { 
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background-color: #f5f5f5;
                          }
                          pre {
                            background-color: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            overflow-x: auto;
                          }
                        </style>
                      </head>
                      <body>
                        <h1>AI Generated Reports</h1>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                      </body>
                    </html>
                  `);
                } catch (error) {
                  console.error("Error fetching reports:", error);
                  alert("Error fetching AI reports. Please try again.");
                }
              }}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 px-3 py-1 rounded-md border text-sm"
            >
              View AI Reports (JSON)
            </button>
          </div>
          {/* Date Range Filters */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <button
              onClick={() => handleRangeChange("7d")}
              className={`px-3 py-1 rounded-md border text-sm ${
                range === "7d"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Last 7 days
            </button>
            <button
              onClick={() => handleRangeChange("30d")}
              className={`px-3 py-1 rounded-md border text-sm ${
                range === "30d"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Last 30 days
            </button>
            <button
              onClick={() => handleRangeChange("90d")}
              className={`px-3 py-1 rounded-md border text-sm ${
                range === "90d"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Last 90 days
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <MetricCard
            title="Avg. Efficiency"
            value="82%"
            change="+2.1%"
            trend="up"
          />
          <MetricCard
            title="Avg. Labor Utilization"
            value="88%"
            change="-1.5%"
            trend="down"
          />
          <MetricCard
            title="Total Output"
            value="12.3k"
            change="+5.4%"
            trend="up"
          />
          <MetricCard title="Downtime" value="6%" change="+0.4%" trend="down" />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Historic Trends
            </h2>
            <BarChart className="h-6 w-6 text-gray-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#2563eb"
                strokeWidth={2}
                name="Efficiency (%)"
              />
              <Line
                type="monotone"
                dataKey="laborUtilization"
                stroke="#10b981"
                strokeWidth={2}
                name="Labor Util. (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Daily Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-500">
                    Efficiency
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-500">
                    Labor Utilization
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-500">
                    Output
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item) => (
                  <tr key={item.date} className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.efficiency.toFixed(1)}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.laborUtilization.toFixed(1)}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricSummaryReport;
