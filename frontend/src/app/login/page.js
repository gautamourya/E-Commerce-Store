"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { asyncLoginuser } from "@/store/actions/UserAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast, ToastContainer } from "react-toastify";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
 

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  
  const onSubmit = async (logindetail) => {
    setLoading(true);
     const res = await dispatch(asyncLoginuser(logindetail))    
     if (res){
      toast.success("Login successful")
      router.push("/");  
     }else {
      toast.error("User not found")
     }

    setTimeout(() => {
      setLoading(false);
    }, 2000);


  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <Card
        className="
          w-full max-w-md 
          bg-white 
          border border-gray-200 
          rounded-2xl 
          shadow-xl 
          transition-all 
          duration-300 
          hover:shadow-2xl
        "
      >
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Login to access your dashboard and manage products.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot password */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?
            <Link href="/signup" className="font-semibold text-primary ml-1 hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

