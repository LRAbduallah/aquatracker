"use client";

import React from 'react';
import { useStatistics } from '@/hooks/useStatistics';
import { StatisticsOverview } from '@/components/StatisticsOverview';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DefaultDashboard() {
  const { data: statsResponse, isLoading, error } = useStatistics();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center text-destructive">
            Failed to load statistics. Please try again later.
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    totalCollections: statsResponse?.data.total_collections ?? 0,
    uniqueLocations: statsResponse?.data.unique_locations ?? 0,
    uniqueClasses: statsResponse?.data.unique_classes ?? 0,
    uniqueFamilies: statsResponse?.data.unique_families ?? 0,
    uniqueCollectors: statsResponse?.data.unique_collectors ?? 0,
    recentCollections: statsResponse?.data.recent_collections ?? [],
    classDistribution: statsResponse?.data.class_distribution ?? {},
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <StatisticsOverview stats={stats} />
    </div>
  );
}
