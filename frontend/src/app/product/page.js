"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProductsApi } from "@/store/actions/ProductAction";

export default function Product() {
  const router = useRouter();

  // ---------- Local State ----------
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isInitialLoad = useRef(true); // 🔥 Ye ref hamesha true rahega initial load ke liye
  const skipCount = useRef(0); // 🔥 Track skip count

  const limit = 4;

  // ---------- Navigation ----------
  const getProductDetails = useCallback((productId) => {
    router.push(`/product/${productId}`);
  }, [router]);

  // ---------- Load Products ----------
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      
      // 🔥 Use ref for accurate skip count
      const currentSkip = skipCount.current;
      
      const data = await fetchProductsApi({ skip: currentSkip, limit });

      if (data.products?.length > 0) {
        setProducts((prev) => {
          const existingIds = new Set(prev.map(p => p._id));
          const newProducts = data.products.filter(p => !existingIds.has(p._id));
          skipCount.current += newProducts.length; // 🔥 Update skip
          return [...prev, ...newProducts];
        });
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // ---------- ONLY Initial Load ----------
  useEffect(() => {
    let mounted = true;

    const initialLoad = async () => {
      if (!isInitialLoad.current || loading) return; // 🔥 Prevent multiple calls
      
      try {
        setLoading(true);
        skipCount.current = 0; // 🔥 Reset skip
        setProducts([]); // 🔥 Clear products
        
        const data = await fetchProductsApi({ skip: 0, limit });
        
        if (mounted) {
          setProducts(data.products || []);
          setHasMore(data.hasMore || false);
          isInitialLoad.current = false; // 🔥 Mark as done
          skipCount.current = data.products?.length || 0;
        }
      } catch (error) {
        console.error("Error loading initial products:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initialLoad();

    return () => {
      mounted = false; // 🔥 Cleanup
      isInitialLoad.current = true; // 🔥 Reset for next visit
    };
  }, []); // 🔥 EMPTY DEPENDENCY = SIRF EK BAAR CHALEGA!

  // 🔥 Reset on route focus (when coming back)
  useEffect(() => {
    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        isInitialLoad.current = true;
        skipCount.current = 0;
        setProducts([]);
        setHasMore(true);
        setLoading(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
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
            Discover our curated selection of premium products.
          </p>
        </section>

        {/* ---------- Summary ---------- */}
        <p className="mb-6 text-xs sm:text-sm text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> products
        </p>

        {/* ---------- Empty State ---------- */}
        {products.length === 0 && !loading && (
          <div className="py-16 text-center text-gray-500">
            No products available.
          </div>
        )}

        {/* ---------- Infinite Scroll ---------- */}
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={<div className="mt-8 text-center text-sm text-gray-500">Loading...</div>}
          endMessage={
            <p className="mt-8 text-center text-sm text-gray-500">
              No more products to load
            </p>
          }
        >
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
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
