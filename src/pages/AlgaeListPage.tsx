import React, { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAlgaeList, useDeleteAlgae } from '@/hooks/useAlgae';
import { Algae } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, SortAsc, SortDesc, Eye, Edit, Trash2 } from 'lucide-react';
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Algae Catalog</h1>
          <p className="text-muted-foreground">Manage and explore algae specimens</p>
        </div>
        <Button onClick={() => navigate('/algae/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Specimen
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search algae..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Input
                placeholder="Filter by class..."
                value={filters.class_name}
                onChange={(e) => handleFilterChange('class_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Order</label>
              <Input
                placeholder="Filter by order..."
                value={filters.order}
                onChange={(e) => handleFilterChange('order', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Family</label>
              <Input
                placeholder="Filter by family..."
                value={filters.family}
                onChange={(e) => handleFilterChange('family', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Controls */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-sm font-medium flex items-center">Sort by:</span>
        {['scientific_name', 'common_name', 'class_name', 'collection_date'].map((field) => (
          <Button
            key={field}
            variant={sort.field === field ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange(field as SortField)}
          >
            {field.replace('_', ' ')}
            {sort.field === field && (
              <span className="ml-1">
                {sort.order === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Algae Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedAlgae.map((algae: Algae) => (
          <Card key={algae.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              {algae.image && (
                <div className="relative w-full h-48">
                  <img
                    src={algae.image}
                    alt={algae.common_name || algae.scientific_name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1 mb-1">
                {algae.scientific_name}
              </h3>
              {algae.common_name && (
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                  {algae.common_name}
                </p>
              )}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Class:</span>
                  <Badge variant="secondary">{algae.class_name}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Family:</span>
                  <span className="font-medium">{algae.family}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex justify-between items-center w-full">
                <p className="text-xs text-muted-foreground">
                  Collected: {new Date(algae.collection_date).toLocaleDateString()}
                </p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/algae/${algae.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/algae/${algae.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(algae.id)}
                    disabled={deleteAlgae.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Loading More Trigger */}
      <div
        ref={loadMoreRef}
        className="h-20 flex items-center justify-center mt-8"
      >
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        ) : hasNextPage ? (
          <p className="text-muted-foreground">Loading more...</p>
        ) : (
          <p className="text-muted-foreground">No more algae to load</p>
        )}
      </div>
    </div>
  );
} 