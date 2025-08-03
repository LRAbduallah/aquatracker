import React, { useState, useEffect } from 'react';
import { useLocations } from '@/hooks/useLocations';
import { FilterBar } from '@/components/FilterBar';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAlgaeList, useDeleteAlgae } from '@/hooks/useAlgae';
import { Algae } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Leaf,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

type SortField = 'scientific_name' | 'common_name' | 'class_name' | 'collection_date';
type SortOrder = 'asc' | 'desc';

export default function AlgaeListPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    class_name: '',
    order: '',
    family: '',
    search: '',
    location: undefined as number | undefined,
  });
  const [sort, setSort] = useState<{ field: SortField; order: SortOrder }>({
    field: 'scientific_name',
    order: 'asc',
  });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = 
    useAlgaeList({
      ...filters
    });

  const deleteAlgae = useDeleteAlgae();

  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allAlgae = data?.pages.flatMap(page => page.data.results) ?? [];

  const sortedAlgae = [...allAlgae].sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];
    return sort.order === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Taxonomy options extraction
  const taxonomyOptions = {
    classes: Array.from(new Set(allAlgae.map(a => a.class_name).filter(Boolean))),
    orders: Array.from(new Set(allAlgae.map(a => a.order).filter(Boolean))),
    families: Array.from(new Set(allAlgae.map(a => a.family).filter(Boolean))),
  };

  // Locations extraction
  const { data: locationsData } = useLocations();
  const locations = locationsData?.data?.results?.features || [];
  
  const handleSortChange = (field: SortField) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this algae specimen?")) {
      try {
        await deleteAlgae.mutateAsync(id);
        toast.success("Algae specimen deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete algae specimen.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Algae Catalog
          </h1>
          <p className="text-muted-foreground text-lg">Discover and manage algae specimens</p>
        </div>
        <Button 
          onClick={() => navigate('/algae/new')}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Specimen
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          taxonomyOptions={taxonomyOptions}
          locations={locations}
        />
      </div>

      {/* Sort Controls */}
      <div className="mb-8 p-4 backdrop-blur-sm rounded-xl border shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-white flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Sort by:
          </span>
          {[
            { field: 'scientific_name', label: 'Scientific Name' },
            { field: 'common_name', label: 'Common Name' },
            { field: 'class_name', label: 'Class' },
          ].map(({ field, label }) => (
            <Button
              key={field}
              variant={sort.field === field ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange(field as SortField)}
              className={sort.field === field 
                ? 'bg-green-500 hover:bg-green-600 shadow-md' 
                : 'border-green-200'
              }
            >
              {label}
              {sort.field === field && (
                <span className="ml-2">
                  {sort.order === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-500"></div>
            <p className="text-muted-foreground">Loading specimens...</p>
          </div>
        </div>
      )}

      {/* Algae Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedAlgae.map((algae: Algae) => (
          <Card 
            key={algae.id} 
            className="group overflow-hidden bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg hover:cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
            onClick={() => navigate(`/algae/${algae.id}`)}
          >
            <CardHeader className="p-0 relative">
              <div className="relative w-full h-56 overflow-hidden">
                {algae.image ? (
                  <img
                    src={algae.image}
                    alt={algae.common_name || algae.scientific_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <Leaf className="h-16 w-16 text-green-500/60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action buttons overlay */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-gray-800/90 hover:bg-gray-700 border-gray-600 text-gray-300 shadow-lg"
                    onClick={() => navigate(`/algae/${algae.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-gray-800/90 hover:bg-red-900/80 text-red-400 border-gray-600 shadow-lg"
                    onClick={() => handleDelete(algae.id)}
                    disabled={deleteAlgae.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Class badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-gray-800/90 text-green-400 font-medium shadow-lg border-gray-700"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    {algae.class_name}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-100 line-clamp-1 mb-1">
                  {algae.scientific_name}
                </h3>
                {algae.common_name && (
                  <p className="text-sm text-green-400 font-medium line-clamp-1">
                    {algae.common_name}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Info className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">Family:</span>
                  <span className="font-medium text-gray-200 flex-1 text-right">
                    {algae.family}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">Collected:</span>
                  <span className="font-medium text-gray-200 flex-1 text-right">
                    {new Date(algae.collection_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading More Trigger */}
      <div
        ref={loadMoreRef}
        className="h-20 flex items-center justify-center mt-12"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-200 border-t-green-500" />
            <p className="text-muted-foreground">Loading more specimens...</p>
          </div>
        ) : hasNextPage ? (
          <p className="text-muted-foreground">Scroll to load more...</p>
        ) : sortedAlgae.length > 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-2">You've reached the end!</p>
            <p className="text-sm text-gray-500">
              Showing {sortedAlgae.length} specimen{sortedAlgae.length !== 1 ? 's' : ''}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}