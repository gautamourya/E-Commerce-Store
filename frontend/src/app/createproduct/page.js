"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { zodResolver } from "@hookform/resolvers/zod";
import { asyncCreateProduct } from "@/store/actions/ProductAction";
import ProtectedRoute from "@/components/protectedroute/ProtectedRoute";
import { useRouter } from "next/navigation";

// ✅ Zod schema: updated for file upload (image)
const productSchema = z.object({
  image: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Product image is required",
    }),
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  price: z.coerce
    .number({
      invalid_type_error: "Price is required",
    })
    .positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
});

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: undefined,
      name: "",
      description: "",
      price: "",
      category: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // ✅ image preview
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data) => {
    setLoading(true);

const formData = new FormData();

  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("image", data.image[0]);

  console.log("Product Data:", data);


    dispatch(asyncCreateProduct(formData));        

    setTimeout(() => {
      setLoading(false);
      // reset(); // agar form clear karna ho
    }, 1000);
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
        <div
          className="
            w-full max-w-xl 
            bg-white 
            border border-gray-200 
            rounded-2xl 
            shadow-xl 
            hover:shadow-2xl 
            transition-all 
            duration-300
          "
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-center">Create Product</h1>
            <p className="mt-1 text-center text-sm text-gray-500">
              Add a new product with image, details and category.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
            {/* Image Upload + Preview */}
            <div>
              <label className="block text-sm font-medium text-[#1B2228]">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    } else {
                      setPreviewUrl(null);
                    }
                  },
                })}
                className="
                  block w-full text-sm text-gray-900
                  file:mr-4 file:rounded-md file:border-0 
                  file:bg-blue-50 file:px-4 file:py-2 
                  file:text-sm file:font-semibold 
                  file:text-blue-700 hover:file:bg-blue-100
                  cursor-pointer
                "
              />

              {errors.image && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}

              {/* Preview */}
              {previewUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={previewUrl}
                      alt="Product preview"
                      className="h-20 w-20 rounded-lg border object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    This is how your product image will look.
                  </p>
                </div>
              )}
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#1B2228]">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register("name")}
                className="
                  w-full rounded-lg border border-gray-300 
                  px-3 py-2 text-sm 
                  focus:outline-none focus:ring-2 
                  focus:ring-blue-200 focus:border-blue-500
                "
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Product Description – fixed height, no resize */}
            <div>
              <label className="block text-sm font-medium text-[#1B2228]">
                Product Description
              </label>
              <textarea
                placeholder="Write a short product description"
                {...register("description")}
                className="
                  w-full h-28 rounded-lg border border-gray-300 
                  px-3 py-2 text-sm 
                  focus:outline-none focus:ring-2 
                  focus:ring-blue-200 focus:border-blue-500 
                  resize-none
                "
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price + Category in grid (responsive) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-[#1B2228]">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 499"
                  {...register("price")}
                  className="
                    w-full rounded-lg border border-gray-300 
                    px-3 py-2 text-sm 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-200 focus:border-blue-500
                  "
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#1B2228]">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shoes, Mobile, Book"
                  {...register("category")}
                  className="
                    w-full rounded-lg border border-gray-300 
                    px-3 py-2 text-sm 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-200 focus:border-blue-500
                  "
                />
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className=" w-full rounded-lg bg-[#030712] px-4 py-2.5 text-sm font-semibold text-white  hover:bg-[#1f2937] transition-all duration-200"
            >
              {loading ? "Saving..." : "Create Product"}
            </button>
          </form>

          <div className="h-3" />
        </div>
      </div>
    </ProtectedRoute>
  );
}

