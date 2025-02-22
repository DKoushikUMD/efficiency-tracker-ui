import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Wrench, Users, Activity, BarChart, Clock, TrendingUp, Map, 
         Calendar, Zap, ArrowUpRight, ArrowDownRight, Filter, Settings } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import _ from 'lodash';
import RoutesComponent from "./routes/Routes";

// Helper function for time series data
const generateTimeSeriesData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    time: `${String(hour).padStart(2, '0')}:00`,
    efficiency: 75 + Math.random() * 20,
    workers: Math.floor(15 + Math.random() * 15),
    equipment: Math.floor(8 + Math.random() * 8),
    temperature: 20 + Math.random() * 10,
    noise: 60 + Math.random() * 20,
    incidents: Math.random() > 0.8 ? 1 : 0,
    productivity: 80 + Math.random() * 15,
    workCompletion: 85 + Math.random() * 15,
    laborUtilization: 70 + Math.random() * 25,
    taskCompletion: 75 + Math.random() * 20,
    qualityScore: 90 + Math.random() * 10,
    downtime: Math.floor(Math.random() * 30),
    activeTime: Math.floor(480 - Math.random() * 60),
    breaks: Math.floor(2 + Math.random() * 2)
  }));
};

const BlueprintDashboard = () => {
  const [activeTab, setActiveTab] = useState('blueprint');
  const [selectedZone, setSelectedZone] = useState(null);

  // Sample data
  const sampleData = {
    zones: [
      { id: 1, name: 'Zone A', x: 50, y: 50, width: 150, height: 100, activity: 0.8 },
      { id: 2, name: 'Zone B', x: 250, y: 50, width: 100, height: 150, activity: 0.4 },
      { id: 3, name: 'Zone C', x: 50, y: 200, width: 200, height: 100, activity: 0.6 }
    ],
    alerts: [
      { id: 1, zone: 'Zone B', type: 'Low Activity', message: 'Prolonged idle time detected' },
      { id: 2, zone: 'Zone A', type: 'High Density', message: 'Worker concentration above threshold' }
    ],
    metrics: {
      activeWorkers: 24,
      equipmentUtilization: 78,
      alertCount: 2
    }
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(), []);

  const getHeatMapColor = (activity) => {
    const hue = (1 - activity) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h4 className="text-sm text-gray-500">Overall Efficiency</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">87%</span>
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    +3.2%
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h4 className="text-sm text-gray-500">Labor Utilization</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">92%</span>
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    +5.7%
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h4 className="text-sm text-gray-500">Task Completion</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">83%</span>
                  <span className="text-red-500 flex items-center">
                    <ArrowDownRight className="h-4 w-4" />
                    -1.5%
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h4 className="text-sm text-gray-500">Quality Score</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">95%</span>
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-4 w-4" />
                    +2.1%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#2563eb" name="Efficiency" />
                    <Line type="monotone" dataKey="workCompletion" stroke="#10b981" name="Work Completion" />
                    <Line type="monotone" dataKey="laborUtilization" stroke="#f59e0b" name="Labor Utilization" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Resource Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="workers" fill="#3b82f6" />
                    <Bar dataKey="equipment" fill="#10b981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Time</span>
                      <span>7h 45m</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Break Time</span>
                      <span>45m</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Downtime</span>
                      <span>30m</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Task Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Tasks Completed</span>
                    <span className="font-semibold">47/56</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Completion Time</span>
                    <span className="font-semibold">42m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quality Compliance</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rework Rate</span>
                    <span className="font-semibold text-yellow-600">4.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Efficiency Factors</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Worker Density</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Optimal</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Equipment Utilization</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">High</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Process Adherence</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Good</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resource Allocation</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Need Review</span>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'predictions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Efficiency Predictions</h3>
                  <select className="border rounded p-2">
                    <option>Next 4 Hours</option>
                    <option>Next 8 Hours</option>
                    <option>Next 24 Hours</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#2563eb" 
                      name="Historical"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#10b981" 
                      strokeDasharray="5 5" 
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Predictive Insights</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Peak Efficiency</span>
                        <span className="text-blue-600">94%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Expected at 14:00</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Potential Bottleneck</span>
                        <span className="text-yellow-600">Zone B</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Resource shortage predicted</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Optimal Staffing</span>
                        <span className="text-green-600">+3 workers</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Recommended for Zone C</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
                  <div className="space-y-3">
                    {['Zone A', 'Zone B', 'Zone C'].map((zone) => (
                      <div key={zone} className="flex items-center justify-between">
                        <span>{zone}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Equipment Maintenance Forecast</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Next Maintenance Due</span>
                    <span className="font-medium">48 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Affected Equipment</span>
                    <span className="font-medium">Excavator EQ001</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Impact Level</span>
                    <span className="font-medium text-yellow-600">Medium</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Resource Optimization</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Recommended Shifts</span>
                    <span className="font-medium">+2 Evening</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Equipment Relocation</span>
                    <span className="font-medium">3 units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expected Gain</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Weather Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Forecast</span>
                    <span className="font-medium">Light Rain</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Probability</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Productivity Impact</span>
                    <span className="font-medium text-red-600">-8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'equipment':
        return (
          <div className="grid grid-cols-3 gap-6">
            {/* Equipment cards would go here */}
            <div className="col-span-3 bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Equipment Status</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Equipment {item}</span>
                      <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Utilization:</span>
                        <span>{75 + Math.random() * 20}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span>Zone {String.fromCharCode(64 + item)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-lg shadow-lg p-4">
              <div className="relative w-full h-96 border border-gray-200 rounded">
                {sampleData.zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="absolute cursor-pointer transition-colors duration-200 border-2 border-gray-400 rounded"
                    style={{
                      left: `${zone.x}px`,
                      top: `${zone.y}px`,
                      width: `${zone.width}px`,
                      height: `${zone.height}px`,
                      backgroundColor: getHeatMapColor(zone.activity),
                      opacity: 0.6,
                    }}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                      {zone.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {selectedZone && (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h2 className="text-lg font-semibold mb-4">{selectedZone.name} Details</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Activity Level:</span>
                      <span className="font-semibold">{selectedZone.activity * 100}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workers Present:</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment Active:</span>
                      <span className="font-semibold">3</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {sampleData.alerts.map((alert) => (
                  <Alert key={alert.id} variant="destructive">
                    <Activity className="h-4 w-4" />
                    <AlertTitle>{alert.zone} - {alert.type}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          {[
            { id: 'blueprint', icon: Map, label: 'Blueprint' },
            { id: 'analytics', icon: BarChart, label: 'Analytics' },
            { id: 'equipment', icon: Wrench, label: 'Equipment' },
            { id: 'predictions', icon: TrendingUp, label: 'Predictions' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">Last updated: 5m ago</span>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default BlueprintDashboard;