
"use client";

import { useState } from "react";
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

import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

/* ================= Schema (UNCHANGED) ================= */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Invalid password "),
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

    const res = await dispatch(asyncLoginuser(logindetail));
      console.log(res)
    if (res) {
      console.log( "Login successful")
      toast.success("Login successful");
      router.push("/");
    } else {
      console.log( "Login failed")
      toast.error("User not found");
    }

    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#1c1c1c]">
      {/* ================= LEFT : LOGIN ================= */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-white">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="space-y-4 px-0">
              <CardTitle className="text-4xl font-bold text-white">
                Log in
              </CardTitle>
              <CardDescription className="text-gray-400">
                Use your email or another service to continue.
              </CardDescription>
            </CardHeader>

            {/* ================= GOOGLE LOGIN ================= */}
            <CardContent className="px-0 space-y-4">
              <Button
                type="button"
                className="w-full h-12 text-base bg-[#4285F4] hover:bg-[#357ae8] text-white flex items-center justify-center gap-3"
              >
                <FcGoogle className="text-xl bg-white rounded-full p-0.5" />
                Continue with Google
              </Button>

              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex-1 h-px bg-gray-700" />
                or
                <div className="flex-1 h-px bg-gray-700" />
              </div>
            </CardContent>

            {/* ================= FORM ================= */}
            <CardContent className="px-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full h-12 text-base bg-black border-gray-700 text-white"
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
                        <FormLabel className="text-gray-300">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-12 text-base bg-black border-gray-700 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end text-sm">
                    <Link
                      href="#"
                      className="text-gray-400 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-gray-200 text-black hover:bg-white"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="px-0 pt-6 text-sm text-gray-400">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="ml-1 text-white hover:underline"
              >
                Sign up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* ================= RIGHT : GRADIENT (DESKTOP ONLY) ================= */}
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6, #38bdf8)",
          }}
        />
      </div>
    </div>
  );
}


// "use client";

// import { use, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import * as z from "zod";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { asyncLoginuser } from "@/store/actions/UserAction";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast, ToastContainer } from "react-toastify";

// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function LoginPage() {
 
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
  
 

//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

  
//   const onSubmit = async (logindetail) => {
//     setLoading(true);
//      const res = await dispatch(asyncLoginuser(logindetail))    
//      if (res){
//       toast.success("Login successful")
//       router.push("/");  
//      }else {
//       toast.error("User not found")
//      }

//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);


//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
//       <Card
//         className="
//           w-full max-w-md 
//           bg-white 
//           border border-gray-200 
//           rounded-2xl 
//           shadow-xl 
//           transition-all 
//           duration-300 
//           hover:shadow-2xl
//         "
//       >
//         <CardHeader className="space-y-2">
//           <CardTitle className="text-3xl font-bold text-center">
//             Login
//           </CardTitle>
//           <CardDescription className="text-center text-muted-foreground">
//             Login to access your dashboard and manage products.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="you@example.com"
//                         autoComplete="email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         autoComplete="current-password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Forgot password */}
//               <div className="flex items-center justify-between text-xs sm:text-sm">
//                 <Link
//                   href="#"
//                   className="text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="text-center text-sm">
//           <p className="text-muted-foreground">
//             Don&apos;t have an account?
//             <Link href="/signup" className="font-semibold text-primary ml-1 hover:underline">
//               Create one
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
