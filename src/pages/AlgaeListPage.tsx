import React, { useState, useEffect } from 'react';
import { useLocations } from '@/hooks/useLocations';
import { FilterBar } from '@/components/FilterBar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAlgaeAll, useDeleteAlgae } from '@/hooks/useAlgae';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
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
import { authService } from '@/lib/authService';

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
  const [deleteDialogState, setDeleteDialogState] = useState<{ isOpen: boolean; algaeId: number | null }>({
    isOpen: false,
    algaeId: null,
  });
  const isAuthenticated = authService.isAuthenticated();

const { data: allAlgaeData, isLoading } = 
    useAlgaeAll();

  const deleteAlgae = useDeleteAlgae();

// Client-side fetch once; no infinite scroll


const allAlgae = (allAlgaeData as Algae[] | undefined) ?? [];

const filteredAlgae = allAlgae.filter((a: Algae) => {
  const matchesClass = !filters.class_name || (a.class_name?.toLowerCase() === filters.class_name.toLowerCase());
  const matchesOrder = !filters.order || (a.order?.toLowerCase() === filters.order.toLowerCase());
  const matchesFamily = !filters.family || (a.family?.toLowerCase() === filters.family.toLowerCase());
  const matchesSearch = !filters.search || [a.scientific_name, a.common_name, a.family, a.class_name]
    .some(v => v?.toLowerCase().includes(filters.search.toLowerCase()));
  const matchesLocation = !filters.location || ((a as any).location === filters.location || (a as any).location_id === filters.location);
  return matchesClass && matchesOrder && matchesFamily && matchesSearch && matchesLocation;
});

const sortedAlgae = [...filteredAlgae].sort((a, b) => {
  const aValue = String((a as any)[sort.field] ?? '');
  const bValue = String((b as any)[sort.field] ?? '');
  return sort.order === 'asc' 
    ? aValue.localeCompare(bValue)
    : bValue.localeCompare(aValue);
});

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Taxonomy options extraction
const taxonomyOptions = {
  classes: Array.from(new Set(allAlgae.map(a => a.class_name).filter((v): v is string => Boolean(v)))),
  orders: Array.from(new Set(allAlgae.map(a => a.order).filter((v): v is string => Boolean(v)))),
  families: Array.from(new Set(allAlgae.map(a => a.family).filter((v): v is string => Boolean(v)))),
};

  // Locations extraction
  const { data: locationsData } = useLocations();
  const locations = locationsData?.data?.results ? 
    locationsData.data.results.map(loc => ({
      id: loc.id,
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: loc.coordinates
      },
      properties: {
        name: loc.name,
        description: loc.description,
        created_at: loc.created_at,
        updated_at: loc.updated_at
      }
    })) : [];
  
  const handleSortChange = (field: SortField) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDeleteClick = (id: number) => {
    setDeleteDialogState({ isOpen: true, algaeId: id });
  };

  const handleDelete = async () => {
    if (!deleteDialogState.algaeId) return;
    
    try {
      await deleteAlgae.mutateAsync(deleteDialogState.algaeId);
      toast.success("Algae specimen deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete algae specimen.");
    } finally {
      setDeleteDialogState({ isOpen: false, algaeId: null });
    }
  };

return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
            Algae Catalog
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Discover and manage algae specimens</p>
        </div>
        {isAuthenticated && (
          <Button 
            onClick={() => navigate('/algae/new')}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
            size="default"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Add Specimen</span>
            <span className="hidden sm:inline">Add New Specimen</span>
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 sm:mb-8">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          taxonomyOptions={taxonomyOptions}
          locations={locations}
        />
      </div>

      {/* Sort Controls */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 backdrop-blur-sm rounded-xl border shadow-sm">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          <span className="text-xs sm:text-sm font-semibold text-white flex items-center">
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
                : 'border-green-200 text-xs sm:text-sm'
              }
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{field === 'scientific_name' ? 'Scientific' : field === 'common_name' ? 'Common' : 'Class'}</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedAlgae.map((algae: Algae) => (
          <Card 
            key={algae.id} 
            className="group overflow-hidden bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg hover:cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
            onClick={() => navigate(`/algae/${algae.id}`)}
          >
            <CardHeader className="p-0 relative">
              <div className="relative w-full h-40 sm:h-48 lg:h-56 overflow-hidden">
                {algae.image_url ? (
                  <img
                    src={algae.image_url}
                    alt={algae.common_name || algae.scientific_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <Leaf className="h-12 w-12 sm:h-16 sm:w-16 text-green-500/60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action buttons overlay */}
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-gray-800/90 hover:bg-gray-700 border-gray-600 text-gray-300 shadow-lg"
                      onClick={() => navigate(`/algae/${algae.id}/edit`)}
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-gray-800/90 hover:bg-red-900/80 text-red-400 border-gray-600 shadow-lg"
                      onClick={() => handleDeleteClick(algae.id)}
                      disabled={deleteAlgae.isPending}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}

                {/* Class badge */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-gray-800/90 text-green-400 font-medium shadow-lg border-gray-700 text-xs"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    {algae.class_name}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 line-clamp-1 mb-1">
                  {algae.scientific_name}
                </h3>
                {algae.common_name && (
                  <p className="text-xs sm:text-sm text-green-400 font-medium line-clamp-1">
                    {algae.common_name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Info className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">Family:</span>
                  <span className="font-medium text-gray-200 flex-1 text-right truncate">
                    {algae.family}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">Collected:</span>
                  <span className="font-medium text-gray-200 flex-1 text-right">
                    {new Date(algae.collection_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: window.innerWidth < 640 ? 'numeric' : 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      <ConfirmationDialog
        isOpen={deleteDialogState.isOpen}
        onClose={() => setDeleteDialogState({ isOpen: false, algaeId: null })}
        onConfirm={handleDelete}
        title="Delete Algae Specimen"
        description="Are you sure you want to delete this algae specimen? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteAlgae.isPending}
      />
    </div>
  );
}