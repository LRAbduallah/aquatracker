import React from 'react';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  icon: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <section className="w-full px-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex w-full items-stretch gap-2 flex-1 flex-wrap h-full mt-2">
          <div className="flex flex-col items-center w-10">
            {index > 0 && (
              <div className="bg-[rgba(61,74,84,1)] flex min-h-2 w-0.5" />
            )}
            <img
              src={item.icon}
              className="aspect-[1] object-contain w-6 mt-1 rounded-xl"
              alt={item.title}
            />
            {index < items.length - 1 && (
              <div className="bg-[rgba(61,74,84,1)] flex min-h-8 w-0.5 mt-1" />
            )}
          </div>
          <div className="min-w-60 text-base flex-1 shrink basis-[0%] py-3">
            <h3 className="w-full text-white font-medium">{item.title}</h3>
            <p className="w-full text-[rgba(158,173,184,1)] font-normal">{item.date}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
