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
    <main className="min-w-60 overflow-hidden flex-1 shrink basis-[0%] max-w-[960px]">
      <section className="flex w-full gap-[12px_0px] justify-between flex-wrap p-4">
        <div className="min-w-72 w-[328px]">
          <h1 className="w-full text-[32px] text-white font-bold whitespace-nowrap leading-none">
            Dashboard
          </h1>
          <p className="w-full text-sm text-[rgba(158,173,184,1)] font-normal mt-3">
            Overview of algae growth and water quality metrics
          </p>
        </div>
      </section>
      
      <section className="flex w-full gap-4 text-white flex-wrap p-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
          />
        ))}
      </section>
      
      <section className="min-h-[60px] w-full text-[22px] text-white font-bold leading-none pt-5 pb-3 px-4">
        <h2>Algae Detection Map</h2>
      </section>
      
      <section className="flex w-full px-4 py-3">
        <img
          src="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/80659df07037b33e150edb3721a6eef88b689f25?placeholderIfAbsent=true"
          className="aspect-[1.78] object-contain w-full min-w-60 flex-1 shrink basis-[0%] rounded-lg"
          alt="Algae Detection Map"
        />
      </section>
      
      <section className="min-h-[60px] w-full text-[22px] text-white font-bold leading-none pt-5 pb-3 px-4">
        <h2>Growth Trends</h2>
      </section>
      
      <section className="flex w-full gap-4 text-base flex-wrap px-4 py-6">
        <SensorChart
          title="Zone A Growth"
          value="+15%"
          period="Last 30 Days"
          change="+15%"
          changeColor="text-[rgba(10,217,92,1)]"
          chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/512acdec6e5eacf59e2f0b989913c5d4f41bdb83?placeholderIfAbsent=true"
        />
        <SensorChart
          title="Zone B Growth"
          value="-5%"
          period="Last 30 Days"
          change="-5%"
          changeColor="text-[rgba(250,94,56,1)]"
          chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/bbf77e16a57059845c996a6ec0ea3f966db1105e?placeholderIfAbsent=true"
        />
      </section>
      
      <section className="min-h-[60px] w-full text-[22px] text-white font-bold leading-none pt-5 pb-3 px-4">
        <h2>Water Quality Metrics</h2>
      </section>
      
      <section className="flex w-full gap-4 text-base flex-wrap px-4 py-6">
        <SensorChart
          title="pH Levels"
          value="7.2"
          period="Current"
          change="+0.2"
          changeColor="text-[rgba(10,217,92,1)]"
          chartType="bar"
        />
        <SensorChart
          title="Turbidity"
          value="2.5 NTU"
          period="Current"
          change="-0.1"
          changeColor="text-[rgba(250,94,56,1)]"
          chartType="bar"
        />
      </section>
    </main>
  );
};
