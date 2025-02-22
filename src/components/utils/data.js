export const generateTimeSeriesData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      time: `${String(hour).padStart(2, '0')}:00`,
      efficiency: 75 + Math.random() * 20,
      workers: Math.floor(15 + Math.random() * 15),
      equipment: Math.floor(8 + Math.random() * 8),
      predicted: 80 + Math.random() * 15,
      workCompletion: 85 + Math.random() * 15,
      laborUtilization: 70 + Math.random() * 25
    }));
  };