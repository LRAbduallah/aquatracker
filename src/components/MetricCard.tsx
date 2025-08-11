import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  color = "text-primary",
  className = '' 
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">{title}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">{value}</p>
          </div>
          {Icon && (
            <div className={`p-1.5 sm:p-2 rounded-lg bg-muted ${color} flex-shrink-0`}>
              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
