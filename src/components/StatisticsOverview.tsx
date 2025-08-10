"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database,
  MapPin,
  Users,
  LineChart,
  Microscope,
  FlaskConical
} from "lucide-react";

interface StatisticsProps {
  stats: {
    totalCollections: number;
    uniqueLocations: number;
    uniqueClasses: number;
    uniqueFamilies: number;
    uniqueCollectors: number;
    recentCollections: Array<{
      id: number;
      scientific_name: string;
      collector: string;
      collection_date: string;
      location: {
        properties: {
          name: string;
        };
      };
    }>;
    classDistribution: Record<string, number>;
  };
}

export const StatisticsOverview: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
              Total Collections
            </CardTitle>
            <Database className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.totalCollections}</div>
            <p className="text-xs text-muted-foreground leading-tight">
              Total algae specimens collected
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
              Collection Sites
            </CardTitle>
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.uniqueLocations}</div>
            <p className="text-xs text-muted-foreground leading-tight">
              Unique locations visited
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
              Classes Found
            </CardTitle>
            <Microscope className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.uniqueClasses}</div>
            <p className="text-xs text-muted-foreground leading-tight">
              Distinct algae classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
              Active Collectors
            </CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stats.uniqueCollectors}</div>
            <p className="text-xs text-muted-foreground leading-tight">
              Contributing researchers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Recent Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentCollections.map((collection) => (
              <div
                key={collection.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-2 sm:gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base break-words">{collection.scientific_name}</p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{collection.location.properties.name}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right space-y-1 flex-shrink-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(collection.collection_date).toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm break-words">{collection.collector}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Class Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.classDistribution).map(([className, count]) => (
              <div key={className} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-medium truncate flex-1">{className}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${(count / stats.totalCollections) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
