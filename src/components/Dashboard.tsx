import React from 'react';
import { MetricCard } from './MetricCard';
import { SensorChart } from './SensorChart';
import { useLocations } from '../hooks/useLocations';
import { useAlgaeList } from '../hooks/useAlgae';
import { useStatistics } from '@/hooks/useStatistics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin, Calendar, TrendingUp, Plus, Users, BarChart3, Database, Building2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: locationsResponse, isLoading: isLoadingLocations } = useLocations();
  const { data: algaeData, isLoading: isLoadingAlgae } = useAlgaeList();
  const { data: statsResponse, isLoading: isLoadingStats, error: statsError } = useStatistics();
  
  const locations = locationsResponse?.data?.results?.features || [];
  const algae = algaeData?.pages?.[0]?.data?.results || [];
  
  const latestAlgae = algae.slice(0, 5);
  const totalAlgae = algaeData?.pages?.[0]?.data?.count || 0;
  const totalLocations = locations.length;

  // Main metrics (existing)
  const metrics = [
    { 
      title: 'Total Algae Species', 
      value: isLoadingAlgae ? '...' : totalAlgae.toString(),
      icon: Leaf,
      color: 'text-green-600'
    },
    { 
      title: 'Collection Locations', 
      value: isLoadingLocations ? '...' : totalLocations.toString(),
      icon: MapPin,
      color: 'text-blue-600'
    },
    { 
      title: 'Recent Additions', 
      value: latestAlgae.length.toString(),
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    { 
      title: 'Latest Update', 
      value: latestAlgae.length > 0 ? new Date(latestAlgae[0].created_at).toLocaleDateString() : 'N/A',
      icon: Calendar,
      color: 'text-purple-600'
    },
  ];

  // Statistics metrics (new)
  const statisticsMetrics = [
    {
      title: 'Total Collections',
      value: isLoadingStats ? '...' : (statsResponse?.data.total_collections ?? 0).toString(),
      icon: Database,
      color: 'text-indigo-600'
    },
    {
      title: 'Unique Classes',
      value: isLoadingStats ? '...' : (statsResponse?.data.unique_classes ?? 0).toString(),
      icon: BarChart3,
      color: 'text-emerald-600'
    },
    {
      title: 'Unique Families',
      value: isLoadingStats ? '...' : (statsResponse?.data.unique_families ?? 0).toString(),
      icon: Building2,
      color: 'text-cyan-600'
    },
    {
      title: 'Unique Collectors',
      value: isLoadingStats ? '...' : (statsResponse?.data.unique_collectors ?? 0).toString(),
      icon: Users,
      color: 'text-pink-600'
    },
  ];

  const recentCollections = statsResponse?.data.recent_collections ?? [];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of algae specimens and collection data</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/algae/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Algae
          </Button>
          <Button variant="outline" onClick={() => navigate('/locations')}>
            <MapPin className="h-4 w-4 mr-2" />
            View Locations
          </Button>
        </div>
      </header>
      
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Algae Specimens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Recent Algae Specimens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestAlgae.map((algae) => (
                <div key={algae.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {algae.image && (
                      <img 
                        src={algae.image} 
                        alt={algae.scientific_name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{algae.scientific_name}</h4>
                      <p className="text-sm text-muted-foreground">{algae.class_name}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/algae/${algae.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
              {latestAlgae.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Leaf className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No algae specimens found</p>
                </div>
              )}
            </div>
            {latestAlgae.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/algae')}
                >
                  View All Specimens
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Collection Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Collection Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {locations.slice(0, 5).map((location) => (
                <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h4 className="font-medium">{location.properties.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {location.geometry.coordinates[1].toFixed(4)}, {location.geometry.coordinates[0].toFixed(4)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/locations/${location.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
              {locations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No locations found</p>
                </div>
              )}
            </div>
            {locations.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/locations')}
                >
                  View All Locations
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Growth Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SensorChart
              title="Algae Species Growth"
              value="+15%"
              period="Last 30 Days"
              change="+15%"
              changeColor="text-green-500"
              chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/512acdec6e5eacf59e2f0b989913c5d4f41bdb83?placeholderIfAbsent=true"
            />
            <SensorChart
              title="Collection Sites"
              value="+8%"
              period="Last 30 Days"
              change="+8%"
              changeColor="text-blue-500"
              chartImage="https://api.builder.io/api/v1/image/assets/04a7aa9e6811400f96a0b330187abaf9/bbf77e16a57059845c996a6ec0ea3f966db1105e"
            />
          </div>
        </section>
      </div>

      {/* Statistics Section - Added at the end */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Collection Statistics</h2>
        </div>
        
        {/* Statistics Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsMetrics.map((metric, index) => (
            <MetricCard
              key={`stats-${index}`}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Recent Collections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Recent Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : statsError ? (
              <div className="text-center py-8 text-destructive">
                <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Failed to load recent collections</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentCollections.map((collection) => (
                  <div key={collection.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{collection.scientific_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {collection.scientific_name} • Collected by {collection.collector}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(collection.collection_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentCollections.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No recent collections found</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};