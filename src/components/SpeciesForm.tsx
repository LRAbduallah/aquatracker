import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useCreateAlgae } from '../hooks/useAlgae';

const speciesSchema = z.object({
  speciesName: z.string().min(2, 'Species name must be at least 2 characters'),
  classification: z.string().min(2, 'Classification must be at least 2 characters'),
  characteristics: z.string().min(10, 'Characteristics must be at least 10 characters'),
  habitats: z.string().min(10, 'Habitats description must be at least 10 characters'),
});

type SpeciesFormData = z.infer<typeof speciesSchema>;

export const SpeciesForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SpeciesFormData>({
    resolver: zodResolver(speciesSchema),
  });

  const [files, setFiles] = React.useState<FileList | null>(null);
  const createAlgae = useCreateAlgae();

  const onSubmit = async (data: SpeciesFormData) => {
    const formData = new FormData();
    formData.append('scientific_name', data.speciesName);
    formData.append('class_name', data.classification);
    formData.append('description', data.characteristics);
    formData.append('family', ''); // Add if available
    formData.append('genus', ''); // Add if available
    formData.append('species', data.speciesName);
    formData.append('order', ''); // Add if available
    formData.append('location_id', '1'); // You may want to map this properly
    if (files && files.length > 0) {
      formData.append('image', files[0]);
    }
    try {
      await createAlgae.mutateAsync(formData);
      toast.success('Species added successfully!');
    } catch (e) {
      toast.error('Failed to add species');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Add New Algae Species</h1>
        <p className="text-muted-foreground mt-2">Add a new algae species to the database</p>
      </header>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="speciesName">Species Name</Label>
          <Input
            id="speciesName"
            {...register('speciesName')}
            placeholder="Enter common name"
            disabled={isSubmitting}
          />
          {errors.speciesName && (
            <p className="text-sm text-destructive">{errors.speciesName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="classification">Scientific Classification</Label>
          <Input
            id="classification"
            {...register('classification')}
            placeholder="e.g., Chlorophyta"
            disabled={isSubmitting}
          />
          {errors.classification && (
            <p className="text-sm text-destructive">{errors.classification.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="characteristics">Characteristics</Label>
          <Textarea
            id="characteristics"
            {...register('characteristics')}
            placeholder="Describe the characteristics of this species..."
            rows={4}
            disabled={isSubmitting}
          />
          {errors.characteristics && (
            <p className="text-sm text-destructive">{errors.characteristics.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="habitats">Typical Habitats</Label>
          <Textarea
            id="habitats"
            {...register('habitats')}
            placeholder="Describe typical habitats where this species is found..."
            rows={4}
            disabled={isSubmitting}
          />
          {errors.habitats && (
            <p className="text-sm text-destructive">{errors.habitats.message}</p>
          )}
        </div>
        
        <FileUpload
          title="Upload Images"
          description="Drag and drop images here, or click to browse"
          accept="image/*"
          onFilesSelected={setFiles}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding Species...' : 'Add Species'}
          </Button>
        </div>
      </form>
    </div>
  );
};
