"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProductsApi } from "@/store/actions/ProductAction";

export default function Product() {
  const router = useRouter();

  // ---------- Local State ----------
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 4 ;

  // ---------- Navigation ----------
  const getProductDetails = (productId) => {
    router.push(`/product/${productId}`);
  };

  // ---------- Load Products ----------
  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const skip = products.length; // 🔥 infinite scroll key

      const data = await fetchProductsApi({ skip, limit });

      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------- First Load ----------
  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F7F8] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ---------- Heading ---------- */}
        <section className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.25em] uppercase">
            Our Collection
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium products. Find the perfect
            match for your lifestyle and elevate your everyday essentials.
          </p>
        </section>

        {/* ---------- Summary ---------- */}
        <p className="mb-6 text-xs sm:text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{products.length}</span> products
        </p>

        {/* ---------- Empty State ---------- */}
        {products.length === 0 && !loading && (
          <div className="py-16 text-center text-gray-500">
            No products available.
          </div>
        )}

        {/* ---------- Infinite Scroll Wrapper ---------- */}
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={
            <div className="mt-8 text-center text-sm text-gray-500">
              Loading...
            </div>
          }
          endMessage={
            <p className="mt-8 text-center text-sm text-gray-500">
              No more products 
            </p>
          }
        >

          {/* ---------- Product Grid ---------- */}
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id || product.id}
                className="
                  flex flex-col overflow-hidden rounded-3xl bg-white 
                  border border-gray-100 shadow-sm 
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-200
                "
              >
                {/* Image */}
                <div className="relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-52 w-full object-cover sm:h-56"
                    />
                  ) : (
                    <div className="h-52 w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                  {product.category && (
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                      {product.category}
                    </p>
                  )}

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase rounded-full border border-gray-900 px-3 py-1 hover:bg-gray-900 hover:text-white transition-colors"
                      onClick={() => getProductDetails(product._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

