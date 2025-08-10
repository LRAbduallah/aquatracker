import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { authService, type UserProfile } from '@/lib/authService';

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserProfileModalProps {
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onLogout }) => {
  const [open, setOpen] = React.useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (open && authService.isAuthenticated()) {
      loadUserProfile();
    }
  }, [open]);

  const loadUserProfile = async () => {
    try {
      const response = await authService.getProfile();
      setUserProfile(response.data);
      setValue('first_name', response.data.first_name);
      setValue('last_name', response.data.last_name);
      setValue('email', response.data.email);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Update profile
      await authService.updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });

      // Change password if provided
      if (data.currentPassword && data.newPassword) {
        await authService.changePassword({
          old_password: data.currentPassword,
          new_password: data.newPassword,
          new_password_confirm: data.confirmPassword!,
        });
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.response?.data?.error || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setOpen(false);
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      setOpen(false);
      onLogout();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] mx-2 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Profile
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              {...register('first_name')}
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <p className="text-sm text-destructive">{errors.first_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              {...register('last_name')}
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <p className="text-sm text-destructive">{errors.last_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword')}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register('newPassword')}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-sm text-destructive">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-3 sm:pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
            
            <Separator />
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};