import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authService } from "@/lib/authService";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };
      await authService.login(credentials);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } catch (error: any) {
      // Prevent navigation or reload, just show toast
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2 sm:px-4">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <img
              src="/favicon.png"
              alt="AquaTrack"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded"
              onError={(e) => {
                const fallback = document.createElement("div");
                fallback.className =
                  "w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center";
                fallback.innerHTML =
                  '<svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                e.currentTarget.parentNode?.replaceChild(
                  fallback,
                  e.currentTarget
                );
              }}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">AquaTracker</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Environmental monitoring platform
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Enter your username"
                  disabled={isSubmitting}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
