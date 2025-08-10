"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Filter, 
  Search, 
  CalendarIcon,
  MapPin,
  Microscope,
  Tag,
  Users
} from "lucide-react";

export interface FilterBarProps {
  filters: {
    class_name: string;
    order: string;
    family: string;
    location?: number;
    search: string;
    collector?: string;
    dateFrom?: Date;
    dateTo?: Date;
  };
  onFilterChange: (key: string, value: string | number | Date | undefined) => void;
  taxonomyOptions: {
    classes: string[];
    orders: string[];
    families: string[];
  };
  locations: Array<{ id: number; properties: { name: string } }>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters = {
    class_name: 'all',
    order: 'all',
    family: 'all',
    search: '',
    collector: '',
    location: undefined,
    dateFrom: undefined,
    dateTo: undefined,
  },
  onFilterChange,
  taxonomyOptions = { classes: [], orders: [], families: [] },
  locations = [],
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search algae specimens..."
                  value={filters?.search || ''}
                  onChange={(e) => onFilterChange('search', e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Taxonomy Filters */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Class
              </Label>
              <Select
                value={filters?.class_name || ''}
                onValueChange={(value) => onFilterChange('class_name', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {(taxonomyOptions?.classes || []).map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Order
              </Label>
              <Select
                value={filters?.order || ''}
                onValueChange={(value) => onFilterChange('order', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {(taxonomyOptions?.orders || []).map((order) => (
                    <SelectItem key={order} value={order}>
                      {order}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Family
              </Label>
              <Select
                value={filters?.family || ''}
                onValueChange={(value) => onFilterChange('family', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Families</SelectItem>
                  {(taxonomyOptions?.families || []).map((family) => (
                    <SelectItem key={family} value={family}>
                      {family}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Select
                value={filters?.location?.toString() || ""}
                onValueChange={(value) => onFilterChange('location', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {(locations || []).map((location) => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.properties.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Collector Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Collector
              </Label>
              <Input
                placeholder="Filter by collector"
                value={filters?.collector || ""}
                onChange={(e) => onFilterChange('collector', e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Collection Date Range
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters?.dateFrom ? (
                        filters.dateFrom.toLocaleDateString()
                      ) : (
                        "From date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date) => onFilterChange('dateFrom', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters?.dateTo ? (
                        filters.dateTo.toLocaleDateString()
                      ) : (
                        "To date"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date) => onFilterChange('dateTo', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          {/* Clear Filters */}
          <div className="flex justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => {
                onFilterChange('class_name', '');
                onFilterChange('order', '');
                onFilterChange('family', '');
                onFilterChange('location', undefined);
                onFilterChange('collector', '');
                onFilterChange('dateFrom', undefined);
                onFilterChange('dateTo', undefined);
                onFilterChange('search', '');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}