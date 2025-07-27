import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, className = '' }) => {
  return (
    <article className={`border min-w-[158px] flex-1 shrink basis-[0%] p-6 rounded-lg border-[rgba(61,74,84,1)] border-solid ${className}`}>
      <h3 className="w-full text-base font-medium text-white">{title}</h3>
      <p className="w-full text-2xl font-bold whitespace-nowrap leading-none mt-2 text-white">
        {value}
      </p>
    </article>
  );
};
