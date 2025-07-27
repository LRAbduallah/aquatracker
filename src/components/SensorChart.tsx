import React from 'react';

interface SensorChartProps {
  title: string;
  value: string;
  period: string;
  change: string;
  changeColor: string;
  chartImage?: string;
  chartType?: 'line' | 'bar';
}

export const SensorChart: React.FC<SensorChartProps> = ({
  title,
  value,
  period,
  change,
  changeColor,
  chartImage,
  chartType = 'line'
}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const zones = ['Zone A', 'Zone B', 'Zone C'];

  return (
    <article className="min-w-72 flex-1 shrink basis-[0%]">
      <h3 className="w-full text-white font-medium">{title}</h3>
      <p className="w-full overflow-hidden text-[32px] text-white font-bold whitespace-nowrap leading-none mt-2">
        {value}
      </p>
      <div className="flex w-full gap-1 mt-2">
        <span className="text-[rgba(158,173,184,1)] font-normal">{period}</span>
        <span className={`font-medium whitespace-nowrap ${changeColor}`}>{change}</span>
      </div>
      
      <div className="min-h-[180px] w-full text-[13px] text-[rgba(158,173,184,1)] font-bold whitespace-nowrap leading-loose flex-1 mt-2 py-4">
        {chartImage ? (
          <img
            src={chartImage}
            className="aspect-[2.91] object-contain w-full"
            alt={`${title} chart`}
          />
        ) : chartType === 'bar' ? (
          <div className="flex gap-6 px-3">
            {zones.map((zone, index) => (
              <div key={zone} className="flex flex-col items-stretch w-11">
                <div className="bg-[rgba(41,51,56,1)] flex min-h-[137px] w-full border-t-2 border-[rgba(117,117,117,1)]" />
                <div className="min-h-5 w-11 mt-6">
                  <div>{zone}</div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        
        {chartImage && (
          <div className="flex w-full gap-[40px_55px] justify-between mt-8">
            {months.map((month, index) => (
              <div key={month} className="w-[23px]">
                <div>{month}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
