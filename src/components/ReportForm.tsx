import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useCreateAlgae } from '../hooks/useAlgae';

const reportSchema = z.object({
  locationName: z.string().min(2, 'Location name must be at least 2 characters'),
  latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  severityLevel: z.enum(['low', 'medium', 'high', 'critical'], {
    required_error: 'Please select a severity level',
  }),
});

type ReportFormData = z.infer<typeof reportSchema>;

export const ReportForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const [files, setFiles] = React.useState<FileList | null>(null);
  const createAlgae = useCreateAlgae();

  const onSubmit = async (data: ReportFormData) => {
    const formData = new FormData();
    formData.append('scientific_name', data.locationName); // Example mapping
    formData.append('description', `Severity: ${data.severityLevel}`);
    formData.append('location_id', '1'); // You may want to map this properly
    if (files && files.length > 0) {
      formData.append('image', files[0]);
    }
    try {
      await createAlgae.mutateAsync(formData);
      toast.success('Report submitted successfully!');
    } catch (e) {
      toast.error('Failed to submit report');
    }
  };

  const handlePinLocation = () => {
    console.log('Pin location on map');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Report Algae Bloom</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Submit a new algae bloom observation</p>
      </header>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="locationName">Location Name</Label>
          <Input
            id="locationName"
            {...register('locationName')}
            placeholder="Enter location name"
            disabled={isSubmitting}
          />
          {errors.locationName && (
            <p className="text-sm text-destructive">{errors.locationName.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              {...register('latitude', { valueAsNumber: true })}
              placeholder="Enter latitude"
              disabled={isSubmitting}
            />
            {errors.latitude && (
              <p className="text-sm text-destructive">{errors.latitude.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              {...register('longitude', { valueAsNumber: true })}
              placeholder="Enter longitude"
              disabled={isSubmitting}
            />
            {errors.longitude && (
              <p className="text-sm text-destructive">{errors.longitude.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-start">
          <Button 
            type="button" 
            variant="outline"
            className="w-full sm:w-auto"
          >
            Pin Location on Map
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="severityLevel">Severity Level</Label>
          <Select onValueChange={(value) => setValue('severityLevel', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          {errors.severityLevel && (
            <p className="text-sm text-destructive">{errors.severityLevel.message}</p>
          )}
        </div>
        
        <FileUpload
          title="Upload Photos or Drone Footage"
          description="Drag and drop files here, or browse"
          accept="image/*,video/*"
          onFilesSelected={setFiles}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </div>
  );
};
