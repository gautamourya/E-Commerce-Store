// // "use client";

// // import { useParams } from "next/navigation";
// // import { useDispatch } from "react-redux";
// // import { asyncsingleProduct } from "@/store/actions/ProductAction";
// // import { useEffect } from "react";
// // import { useState } from "react";

// // export default function singleProduct() {
// //   const { productId } = useParams();
// //   const dispatch = useDispatch();
// //   const [product, setproduct] = useState(null);
// //     console.log("product = ", product);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       const product = await dispatch(asyncsingleProduct(productId));
// //       setproduct(product.product);

// //     };

// //     fetchProduct();
// //   }, [productId]);



// //   return (
// //     <div>
// //       <h1>{product?.id}</h1>
// //         <h2>{product?.name}</h2>
// //         <p>{product?.description}</p>
// //         <p>Price: ${product?.price}</p>
// //         <p>Category: {product?.category}</p>
// //         <img src={product?.image} alt={product?.name} width="300" />
// //     </div>
// //   );
// // }


// "use client";

// import { useParams } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { asyncsingleProduct } from "@/store/actions/ProductAction";
// import { useEffect, useState } from "react";

// export default function SingleProduct() {
//   const { productId } = useParams();
//   const dispatch = useDispatch();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       const product = await dispatch(asyncsingleProduct(productId));
//       setProduct(product.product); // 👈 thunk already returns product
//       setLoading(false);
//     };

//     if (productId) {
//       fetchProduct();
//     }
    
//   }, [productId]);

//   // 🔄 Loading UI
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // ❌ Safety check
//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>Price: ₹{product.price}</p>
//       <p>Category: {product.category}</p>
//       <img src={product.image} alt={product.name} width="300" />
//     </div>
//   );
// }


"use client";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { asyncsingleProduct } from "@/store/actions/ProductAction";
import { useEffect, useState } from "react";

export default function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await dispatch(asyncsingleProduct(productId));
      setProduct(product.product);
      setLoading(false);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* IMAGE */}
          <div className="flex items-center justify-center bg-gray-100 p-6 lg:p-10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[520px] object-cover rounded-2xl"
            />
          </div>

          {/* DETAILS */}
          <div className="p-6 lg:p-12 flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-widest uppercase">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-bold">
              ₹{product.price}
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>✔ Premium Quality</p>
              <p>✔ Comfort Fit</p>
              <p>✔ Performance Ready</p>
              <p>✔ Durable Design</p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 rounded-full border border-black font-semibold hover:bg-black hover:text-white transition">
                ADD TO CART
              </button>

              <button className="px-10 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition">
                BUY NOW
              </button>
            </div>

            <p className="mt-6 text-xs uppercase tracking-wider text-gray-400">
              Category: {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
