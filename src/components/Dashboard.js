import React, { useState, useMemo, useEffect } from "react";
import {
  AlertCircle,
  Wrench,
  Users,
  Activity,
  BarChart,
  Clock,
  TrendingUp,
  Map,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return +val.toFixed(decimals);
}

function getCurrentTimeString() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const MetricCard = ({ title, value, change, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105">
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

const ProgressBar = ({ label, value, max, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-300`}
        style={{ width: `${(parseInt(value, 10) / max) * 100}%` }}
      />
    </div>
  </div>
);

const EquipmentCard = ({ name }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:shadow-2xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
        Active
      </span>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Utilization</span>
        <span className="font-medium text-gray-800">
          {(75 + Math.random() * 20).toFixed(1)}%
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Location</span>
        <span className="font-medium text-gray-800">
          Zone {String.fromCharCode(65 + getRandomInt(0, 3))}
        </span>
      </div>
    </div>
  </div>
);

const generateTimeSeriesData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map((hour) => ({
    time: `${String(hour).padStart(2, "0")}:00`,
    efficiency: 75 + Math.random() * 20,
    workers: Math.floor(15 + Math.random() * 15),
    equipment: Math.floor(8 + Math.random() * 8),
    predicted: 80 + Math.random() * 15,
    workCompletion: 85 + Math.random() * 15,
    laborUtilization: 70 + Math.random() * 25,
  }));
};

const BlueprintDashboard = () => {
  const [activeTab, setActiveTab] = useState("blueprint");
  const [selectedZone, setSelectedZone] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const timeSeriesData = useMemo(() => generateTimeSeriesData(), []);

  const [randomWorkers, setRandomWorkers] = useState(0);
  const [randomEquipment, setRandomEquipment] = useState(0);
  const [randomActivity, setRandomActivity] = useState(0);
  const [sampleData, setSampleData] = useState({ zones: [], alerts: [] });

  const [analytics, setAnalytics] = useState({
    overallEfficiency: 0,
    overallEfficiencyChange: 0,
    overallEfficiencyTrend: "up",
    laborUtilization: 0,
    laborUtilizationChange: 0,
    laborUtilizationTrend: "up",
    taskCompletion: 0,
    taskCompletionChange: 0,
    taskCompletionTrend: "up",
    qualityScore: 0,
    qualityScoreChange: 0,
    qualityScoreTrend: "up",
    activeTime: 0,
    breakTime: 0,
    downtime: 0,
    tasksCompleted: 0,
    tasksTotal: 0,
    avgCompletionTime: 0,
    qualityCompliance: 0,
    reworkRate: 0,
  });

  const equipmentNames = [
    "Excavator",
    "Bulldozer",
    "Crane",
    "Loader",
    "Dump Truck",
    "Forklift",
    "Backhoe",
    "Concrete Mixer",
    "Compactor",
    "Grader",
  ];
  const [randomEquipmentList, setRandomEquipmentList] = useState([]);

  const [predictions, setPredictions] = useState({
    peakEfficiency: 0,
    peakTime: 0,
    bottleneckZone: "",
    bottleneckMessage: "",
    staffingWorkers: 0,
    staffingZone: "",
    riskAssessment: [],
    recommendedShifts: 0,
    equipmentRelocation: 0,
    expectedGain: 0,
    weatherForecast: "",
    weatherProbability: 0,
    weatherImpact: 0,
  });

  useEffect(() => {
    setLastUpdated(getCurrentTimeString());
    setRandomWorkers(getRandomInt(50, 60));
    setRandomEquipment(getRandomInt(25, 30));
    setRandomActivity(getRandomInt(70, 83));

    const alertCount = getRandomInt(1, 2);
    const newAlerts = Array.from({ length: alertCount }, (_, i) => ({
      id: i + 1,
      zone: `Zone ${String.fromCharCode(65 + i)}`,
      type: i % 2 === 0 ? "Low Activity" : "High Density",
      message:
        i % 2 === 0
          ? "Prolonged idle time detected"
          : "Worker concentration above threshold",
    }));

    const zoneAActivity = getRandomFloat(0.3, 0.9);
    const zoneBActivity = getRandomFloat(0.3, 0.9);
    const zoneCActivity = getRandomFloat(0.3, 0.9);
    setSampleData({
      zones: [
        { id: 1, name: "Zone A", activity: zoneAActivity },
        { id: 2, name: "Zone B", activity: zoneBActivity },
        { id: 3, name: "Zone C", activity: zoneCActivity },
      ],
      alerts: newAlerts,
    });

    const oe = getRandomInt(80, 90);
    const oeChg = getRandomFloat(-3, 3);
    const lu = getRandomInt(85, 95);
    const luChg = getRandomFloat(-3, 3);
    const tc = getRandomInt(75, 90);
    const tcChg = getRandomFloat(-3, 3);
    const qs = getRandomInt(90, 98);
    const qsChg = getRandomFloat(-3, 3);

    const at = getRandomInt(400, 480);
    const brk = getRandomInt(30, 60);
    const dt = getRandomInt(20, 50);
    const tasksComp = getRandomInt(40, 60);
    const tasksT = getRandomInt(tasksComp, 65);
    const avgCt = getRandomInt(30, 60);
    const qc = getRandomInt(85, 99);
    const rw = getRandomFloat(2, 6);
    setAnalytics({
      overallEfficiency: oe,
      overallEfficiencyChange: oeChg,
      overallEfficiencyTrend: oeChg >= 0 ? "up" : "down",

      laborUtilization: lu,
      laborUtilizationChange: luChg,
      laborUtilizationTrend: luChg >= 0 ? "up" : "down",

      taskCompletion: tc,
      taskCompletionChange: tcChg,
      taskCompletionTrend: tcChg >= 0 ? "up" : "down",

      qualityScore: qs,
      qualityScoreChange: qsChg,
      qualityScoreTrend: qsChg >= 0 ? "up" : "down",

      activeTime: at,
      breakTime: brk,
      downtime: dt,
      tasksCompleted: tasksComp,
      tasksTotal: tasksT,
      avgCompletionTime: avgCt,
      qualityCompliance: qc,
      reworkRate: rw,
    });

    const copyNames = [...equipmentNames];
    const chosen = [];
    for (let i = 0; i < 3; i++) {
      const idx = getRandomInt(0, copyNames.length - 1);
      chosen.push(copyNames[idx]);
      copyNames.splice(idx, 1);
    }
    setRandomEquipmentList(chosen);

    const peakEff = getRandomInt(85, 99);
    const peakTime = getRandomInt(10, 17);
    const bottleneck = `Zone ${String.fromCharCode(65 + getRandomInt(0, 2))}`;
    const staffZone = `Zone ${String.fromCharCode(65 + getRandomInt(0, 2))}`;
    const staffWorkers = getRandomInt(2, 5);
    const possibleBottleneckMsgs = [
      "Resource shortage predicted",
      "Machine downtime predicted",
      "Material delay predicted",
    ];
    const bMsg =
      possibleBottleneckMsgs[
        getRandomInt(0, possibleBottleneckMsgs.length - 1)
      ];
    const riskA = getRandomInt(30, 45);
    const riskB = getRandomInt(30, 45);
    const riskC = getRandomInt(30, 45);
    const recShifts = getRandomInt(1, 3);
    const eqRelocation = getRandomInt(1, 5);
    const expGain = getRandomInt(10, 20);
    const weatherOpts = ["Light Rain", "Sunny", "Overcast", "Storm"];
    const wChoice = weatherOpts[getRandomInt(0, weatherOpts.length - 1)];
    const wProb = getRandomInt(40, 90);
    const wImpact = -getRandomInt(5, 15);
    setPredictions({
      peakEfficiency: peakEff,
      peakTime: peakTime,
      bottleneckZone: bottleneck,
      bottleneckMessage: bMsg,
      staffingWorkers: staffWorkers,
      staffingZone: staffZone,
      riskAssessment: [riskA, riskB, riskC],
      recommendedShifts: recShifts,
      equipmentRelocation: eqRelocation,
      expectedGain: expGain,
      weatherForecast: wChoice,
      weatherProbability: wProb,
      weatherImpact: wImpact,
    });
  }, []);

  const handleSaveReport = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("http://3.83.15.74:8000/run-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Keep the original 5000ms delay
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setIsSaved(true);
    } catch (error) {
      console.error("Error saving report:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const goToHistoricSummary = () => {
    window.location.href = "/historic-summary";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-7xl space-y-8">
        <div className="flex items-center space-x-4">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex-1 flex items-center justify-between">
            <div className="flex space-x-4">
              {[
                { id: "blueprint", icon: Map, label: "Blueprint" },
                { id: "analytics", icon: BarChart, label: "Analytics" },
                { id: "equipment", icon: Wrench, label: "Equipment" },
                { id: "predictions", icon: TrendingUp, label: "Predictions" },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-2 rounded-lg transition-colors duration-300 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Last updated: {lastUpdated}</span>
            </div>
          </div>
          <div>
            {!isSaving && !isSaved && (
              <button
                onClick={handleSaveReport}
                className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Save Report
              </button>
            )}
            {isSaving && (
              <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <Zap className="h-5 w-5 text-blue-600 animate-spin" />
                <span className="text-blue-600 font-medium">
                  Saving Report...
                </span>
              </div>
            )}
            {isSaved && (
              <button
                onClick={goToHistoricSummary}
                className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                View Historic Summary
              </button>
            )}
          </div>
        </div>

        {activeTab === "blueprint" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Workers</p>
                    <p className="text-xl font-bold">{randomWorkers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Active Equipment</p>
                    <p className="text-xl font-bold">{randomEquipment}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Overall Activity</p>
                    <p className="text-xl font-bold">{randomActivity}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Active Alerts</p>
                    <p className="text-xl font-bold">
                      {sampleData.alerts.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Factory Layout
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Activity Level:
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs">Low</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-xs">Medium</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs">High</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <svg
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    viewBox="0 0 800 600"
                    style={{ cursor: "pointer" }}
                  >
                    {sampleData.zones[0] && (
                      <>
                        <path
                          d="M100,100 C150,80 250,80 300,100 C350,120 350,180 300,200 C250,220 150,220 100,200 C50,180 50,120 100,100"
                          className={`transition-all duration-300 ${
                            selectedZone?.id === 1
                              ? "stroke-blue-500 stroke-2"
                              : "stroke-gray-400"
                          }`}
                          fill={`hsl(${
                            sampleData.zones[0].activity * 120
                          }, 70%, 50%)`}
                          fillOpacity={selectedZone?.id === 1 ? "0.9" : "0.7"}
                          onClick={() => setSelectedZone(sampleData.zones[0])}
                        />
                        <text
                          x="200"
                          y="150"
                          textAnchor="middle"
                          fill="white"
                          className="font-bold"
                        >
                          <tspan x="200" dy="0">
                            Zone A
                          </tspan>
                          <tspan x="200" dy="20" className="text-sm">
                            {(sampleData.zones[0].activity * 100).toFixed(1)}%
                            Active
                          </tspan>
                        </text>
                      </>
                    )}
                    {sampleData.zones[1] && (
                      <>
                        <path
                          d="M450,250 L600,200 L700,300 L600,400 L450,350 Z"
                          className={`transition-all duration-300 ${
                            selectedZone?.id === 2
                              ? "stroke-blue-500 stroke-2"
                              : "stroke-gray-400"
                          }`}
                          fill={`hsl(${
                            sampleData.zones[1].activity * 120
                          }, 70%, 50%)`}
                          fillOpacity={selectedZone?.id === 2 ? "0.9" : "0.7"}
                          onClick={() => setSelectedZone(sampleData.zones[1])}
                        />
                        <text
                          x="575"
                          y="300"
                          textAnchor="middle"
                          fill="white"
                          className="font-bold"
                        >
                          <tspan x="575" dy="0">
                            Zone B
                          </tspan>
                          <tspan x="575" dy="20" className="text-sm">
                            {(sampleData.zones[1].activity * 100).toFixed(1)}%
                            Active
                          </tspan>
                        </text>
                      </>
                    )}
                    {sampleData.zones[2] && (
                      <>
                        <path
                          d="M150,300 Q200,280 250,300 T350,300 T450,300 Q500,350 450,400 Q400,450 350,400 T250,400 T150,400 Q100,350 150,300"
                          className={`transition-all duration-300 ${
                            selectedZone?.id === 3
                              ? "stroke-blue-500 stroke-2"
                              : "stroke-gray-400"
                          }`}
                          fill={`hsl(${
                            sampleData.zones[2].activity * 120
                          }, 70%, 50%)`}
                          fillOpacity={selectedZone?.id === 3 ? "0.9" : "0.7"}
                          onClick={() => setSelectedZone(sampleData.zones[2])}
                        />
                        <text
                          x="300"
                          y="350"
                          textAnchor="middle"
                          fill="white"
                          className="font-bold"
                        >
                          <tspan x="300" dy="0">
                            Zone C
                          </tspan>
                          <tspan x="300" dy="20" className="text-sm">
                            {(sampleData.zones[2].activity * 100).toFixed(1)}%
                            Active
                          </tspan>
                        </text>
                      </>
                    )}
                  </svg>
                </div>
              </div>
              <div className="space-y-6">
                {selectedZone ? (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {selectedZone.name} Details
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedZone.activity > 0.7
                            ? "bg-green-100 text-green-700"
                            : selectedZone.activity > 0.4
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedZone.activity > 0.7
                          ? "High Activity"
                          : selectedZone.activity > 0.4
                          ? "Medium Activity"
                          : "Low Activity"}
                      </span>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Activity Level</span>
                        <span className="font-medium">
                          {(selectedZone.activity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${selectedZone.activity * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-600">Workers</span>
                          </div>
                          <p className="text-2xl font-bold mt-2">
                            {Math.floor(randomWorkers / 3)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-green-500" />
                            <span className="text-gray-600">Equipment</span>
                          </div>
                          <p className="text-2xl font-bold mt-2">
                            {Math.floor(randomEquipment / 3)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temperature</span>
                          <span className="font-medium text-gray-800">
                            23°C
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Humidity</span>
                          <span className="font-medium text-gray-800">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Noise Level</span>
                          <span className="font-medium text-gray-800">
                            72 dB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Select a zone to view details
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  {sampleData.alerts.map((alert) => (
                    <Alert key={alert.id} variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <div className="ml-2">
                        <AlertTitle className="font-semibold">
                          {alert.zone} - {alert.type}
                        </AlertTitle>
                        <AlertDescription className="mt-1 text-sm">
                          {alert.message}
                        </AlertDescription>
                      </div>
                    </Alert>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-6">
              <MetricCard
                title="Overall Efficiency"
                value={`${analytics.overallEfficiency}%`}
                change={`${analytics.overallEfficiencyChange > 0 ? "+" : ""}${
                  analytics.overallEfficiencyChange
                }%`}
                trend={analytics.overallEfficiencyTrend}
              />
              <MetricCard
                title="Labor Utilization"
                value={`${analytics.laborUtilization}%`}
                change={`${analytics.laborUtilizationChange > 0 ? "+" : ""}${
                  analytics.laborUtilizationChange
                }%`}
                trend={analytics.laborUtilizationTrend}
              />
              <MetricCard
                title="Task Completion"
                value={`${analytics.taskCompletion}%`}
                change={`${analytics.taskCompletionChange > 0 ? "+" : ""}${
                  analytics.taskCompletionChange
                }%`}
                trend={analytics.taskCompletionTrend}
              />
              <MetricCard
                title="Quality Score"
                value={`${analytics.qualityScore}%`}
                change={`${analytics.qualityScoreChange > 0 ? "+" : ""}${
                  analytics.qualityScoreChange
                }%`}
                trend={analytics.qualityScoreTrend}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Performance Metrics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="workCompletion"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="laborUtilization"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Resource Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="workers"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="equipment"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Time Distribution
                </h3>
                <div className="space-y-6">
                  <ProgressBar
                    label="Active Time"
                    value={analytics.activeTime}
                    max="480"
                    color="bg-green-500"
                  />
                  <ProgressBar
                    label="Break Time"
                    value={analytics.breakTime}
                    max="480"
                    color="bg-blue-500"
                  />
                  <ProgressBar
                    label="Downtime"
                    value={analytics.downtime}
                    max="480"
                    color="bg-red-500"
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Task Metrics
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Tasks Completed</span>
                    <span className="font-semibold text-gray-800">
                      {analytics.tasksCompleted}/{analytics.tasksTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Completion Time</span>
                    <span className="font-semibold text-gray-800">
                      {analytics.avgCompletionTime}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quality Compliance</span>
                    <span className="font-semibold text-gray-800">
                      {analytics.qualityCompliance}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rework Rate</span>
                    <span className="font-semibold text-orange-600">
                      {analytics.reworkRate}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  Efficiency Factors
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Worker Density</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-2">
                        Optimal
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equipment Utilization</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-2">
                        High
                      </span>
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Process Adherence</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-2">
                        Good
                      </span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Resource Allocation</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-2">
                        Review
                      </span>
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "equipment" && (
          <div className="grid grid-cols-3 gap-6">
            {randomEquipmentList.map((name, idx) => (
              <EquipmentCard key={idx} name={name} />
            ))}
          </div>
        )}

        {activeTab === "predictions" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#2563eb"
                      name="Historical"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#10b981"
                      name="Predicted"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Predictive Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-700">
                          Peak Efficiency
                        </span>
                        <span className="font-semibold text-blue-600">
                          {predictions.peakEfficiency}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Expected at {predictions.peakTime}:00
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-yellow-700">
                          Potential Bottleneck
                        </span>
                        <span className="font-semibold text-yellow-600">
                          {predictions.bottleneckZone}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {predictions.bottleneckMessage}
                      </p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-700">
                          Optimal Staffing
                        </span>
                        <span className="font-semibold text-green-600">
                          +{predictions.staffingWorkers} workers
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Recommended for {predictions.staffingZone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Risk Assessment
                  </h3>
                  <div className="space-y-4">
                    {["Zone A", "Zone B", "Zone C"].map((zone, index) => (
                      <div
                        key={zone}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600">{zone}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${predictions.riskAssessment[index]}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[40px]">
                            {predictions.riskAssessment[index]}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Resource Optimization
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Recommended Shifts</span>
                    <span className="font-medium text-gray-800">
                      +{predictions.recommendedShifts} Evening
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Equipment Relocation</span>
                    <span className="font-medium text-gray-800">
                      {predictions.equipmentRelocation} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Expected Gain</span>
                    <span className="font-medium text-green-600">
                      +{predictions.expectedGain}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Weather Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Forecast</span>
                    <span className="font-medium text-gray-800">
                      {predictions.weatherForecast}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Probability</span>
                    <span className="font-medium text-gray-800">
                      {predictions.weatherProbability}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Productivity Impact</span>
                    <span
                      className={`font-medium ${
                        predictions.weatherImpact < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {predictions.weatherImpact}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueprintDashboard;
