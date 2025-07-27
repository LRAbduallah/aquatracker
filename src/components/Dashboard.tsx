import React from 'react';
import { MetricCard } from './MetricCard';
import { SensorChart } from './SensorChart';

export const Dashboard: React.FC = () => {
  const metrics = [
    { title: 'Active Zones', value: '12' },
    { title: 'Risk Alerts', value: '3' },
    { title: 'Total Locations', value: '50' },
    { title: 'Latest Update', value: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of algae growth and water quality metrics</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
          />
        ))}
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Algae Detection Map</h2>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/80659df07037b33e150edb3721a6eef88b689f25?placeholderIfAbsent=true"
              className="w-full h-64 md:h-80 object-cover"
              alt="Algae Detection Map"
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Growth Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SensorChart
              title="Zone A Growth"
              value="+15%"
              period="Last 30 Days"
              change="+15%"
              changeColor="text-green-500"
              chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/512acdec6e5eacf59e2f0b989913c5d4f41bdb83?placeholderIfAbsent=true"
            />
            <SensorChart
              title="Zone B Growth"
              value="-5%"
              period="Last 30 Days"
              change="-5%"
              changeColor="text-red-500"
              chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/bbf77e16a57059845c996a6ec0ea3f966db1105e?placeholderIfAbsent=true"
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Water Quality Metrics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SensorChart
              title="pH Levels"
              value="7.2"
              period="Current"
              change="+0.2"
              changeColor="text-green-500"
              chartType="bar"
            />
            <SensorChart
              title="Turbidity"
              value="2.5 NTU"
              period="Current"
              change="-0.1"
              changeColor="text-red-500"
              chartType="bar"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
