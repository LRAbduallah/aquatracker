import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { authService, type RegisterData } from '@/lib/authService';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirm: z.string(),
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegister?: (user: any) => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const registerData: RegisterData = {
        username: data.username!,
        email: data.email!,
        password: data.password!,
        password_confirm: data.password_confirm!,
        first_name: data.first_name!,
        last_name: data.last_name!,
      };
      const response = await authService.register(registerData);
      toast({
        title: "Registration successful",
        description: "Welcome to Algae Tracker!",
      });
      if (onRegister) {
        onRegister(response.data.user);
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.error || "Failed to create account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-[960px] px-40 py-5 max-md:px-5">
        <div className="w-full max-w-[480px] mx-auto">
          <div className="flex w-full flex-col items-stretch justify-center px-4 py-3">
            <div className="w-full min-h-80 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary-foreground rounded"></div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Algae Tracker</h2>
                <p className="text-muted-foreground mt-2">Environmental monitoring platform</p>
              </div>
            </div>
          </div>
          
          <div className="min-h-[67px] w-full text-[28px] text-foreground font-bold text-center leading-none pt-5 pb-3 px-4">
            <h1>Create Account</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...register('first_name')}
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                {errors.last_name && (
                  <p className="text-sm text-destructive">{errors.last_name.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register('username')}
                placeholder="Enter your username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
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
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password_confirm">Confirm Password</Label>
              <Input
                id="password_confirm"
                type="password"
                {...register('password_confirm')}
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
              {errors.password_confirm && (
                <p className="text-sm text-destructive">{errors.password_confirm.message}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="w-full text-sm text-muted-foreground font-normal text-center pt-1 pb-3 px-4">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-foreground hover:text-primary transition-colors underline"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};