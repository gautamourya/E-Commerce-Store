// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { asyncSignupUser } from "@/store/actions/UserAction";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
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
//   FormDescription,
// } from "@/components/ui/form";


// // Validation Schema
// const signupSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Enter a valid email"),
//     password: z.string().min(6, "At least 6 characters required"),
//     confirmPassword: z.string(),
//     acceptTerms: z.boolean().refine((value) => value === true, {
//       message: "You must accept the terms",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

// export default function SignupPage() {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
 

//   const form = useForm({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       acceptTerms: false,
//     },
//   });

//   const onSubmit = (signupdata) => {
//     setLoading(true);
//     dispatch(asyncSignupUser(signupdata));
//     console.log(signupdata);

//     setTimeout(() => setLoading(false), 2000);
//     router.push("/")

    
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
//       <Card
//         className="
//           w-full max-w-lg 
//           shadow-xl 
//           rounded-2xl 
//           border border-gray-200 
//           bg-white 
//           transition-all 
//           duration-300 
//           hover:shadow-2xl
//         "
//       >
//         <CardHeader className="space-y-2 pb-4">
//           <CardTitle className="text-3xl font-bold text-center">
//             Sign Up
//           </CardTitle>
//           <CardDescription className="text-center text-sm text-muted-foreground">
//             Create your account to continue
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {/* NAME + EMAIL */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John Deo" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="you@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* PASSWORD + CONFIRM PASSWORD aligned */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* PASSWORD */}
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="••••••••"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription className="text-xs">
//                         Minimum 6 characters
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* CONFIRM PASSWORD — FIXED ALIGNMENT */}
//                 <FormField
//                   control={form.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Confirm Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Re-enter password"
//                           {...field}
//                         />
//                       </FormControl>

//                       {/* Added description to match height → Alignment PERFECT */}
//                       <FormDescription className="opacity-0 select-none">
//                         placeholder text
//                       </FormDescription>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* TERMS CHECKBOX */}
//               <FormField
//                 control={form.control}
//                 name="acceptTerms"
//                 render={({ field }) => (
//                   <FormItem className="flex items-start gap-3 p-3 border rounded-lg shadow-sm">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>

//                     <div>
//                       <FormLabel className="text-sm font-medium">
//                         I agree to the Terms
//                       </FormLabel>
//                       <FormDescription className="text-xs">
//                         By signing up you accept our Terms & Privacy Policy.
//                       </FormDescription>
//                       <FormMessage />
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               {/* SUBMIT */}
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Creating account..." : "Sign Up"}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-primary font-semibold ml-1">
//             Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { asyncSignupUser } from "@/store/actions/UserAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormDescription,
} from "@/components/ui/form";


const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms",
  }),
});

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (signupdata) => {
    setLoading(true);
    dispatch(asyncSignupUser(signupdata));
    console.log(signupdata);

    setTimeout(() => setLoading(false), 2000);
    router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <Card
        className="
          w-full max-w-lg 
          shadow-xl 
          rounded-2xl 
          border border-gray-200 
          bg-white 
          transition-all 
          duration-300 
          hover:shadow-2xl
        "
      >
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-3xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Create your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Deo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* PASSWORD + PHONE NUMBER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PASSWORD */}
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
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Minimum 6 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PHONE NUMBER */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>

                      {/* height alignment same as password */}
                      <FormDescription className="opacity-0 select-none">
                        placeholder
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* TERMS CHECKBOX */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 p-3 border rounded-lg shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div>
                      <FormLabel className="text-sm font-medium">
                        I agree to the Terms
                      </FormLabel>
                      <FormDescription className="text-xs">
                        By signing up you accept our Terms & Privacy Policy.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold ml-1">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
