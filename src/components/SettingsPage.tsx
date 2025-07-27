import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';

const accountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

type AccountFormData = z.infer<typeof accountSchema>;

interface LocationItem {
  id: string;
  name: string;
  coordinates: string;
}

export const SettingsPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  const locations: LocationItem[] = [
    {
      id: '1',
      name: 'Charles River',
      coordinates: '42.3601° N, 71.0589° W',
    },
    {
      id: '2',
      name: 'Santa Monica Bay',
      coordinates: '34.0522° N, 118.2437° W',
    },
    {
      id: '3',
      name: 'Hudson River',
      coordinates: '40.7128° N, 74.0060° W',
    }
  ];

  const onSubmit = async (data: AccountFormData) => {
    console.log('Account updated:', data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    toast.success('Account updated successfully!');
  };

  const handleAddLocation = () => {
    toast.info('Add location feature coming soon!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and application preferences</p>
      </header>
      
      <div className="grid gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Update your account information and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...register('currentPassword')}
                    placeholder="Enter current password"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...register('newPassword')}
                    placeholder="Enter new password"
                    disabled={isSubmitting}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Account'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Locations</CardTitle>
            <CardDescription>
              Manage your frequently accessed monitoring locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.coordinates}</p>
                  </div>
                </div>
              ))}
              
              <Button
                onClick={handleAddLocation}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
