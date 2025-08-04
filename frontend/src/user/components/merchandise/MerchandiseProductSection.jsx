import React, { useState, useEffect, useRef } from "react";
import CategoryNavigation from "../shared/CategoryNavigation";
import Pagination from "../shared/Pagination";
import PaymentModal from "../shared/PaymentModal";
import PaymentForm from "../shared/PaymentForm";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/user/product/ProductsContext'; // Import the context

export const MerchandiseProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Magickal Oils");
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Use the products context
  const { 
    products, 
    filteredProducts, 
    productsLoading, 
    productsError, 
    fetchProducts,
    updateFilters,
    clearFilters 
  } = useProducts();

  // Track if we've already tried to fetch products
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    setIsActive(true);
    // Fetch products when component mounts (only once)
    if (!hasFetched && products.length === 0 && !productsLoading) {
      setHasFetched(true);
      fetchProducts().catch(console.error);
    }
  }, [hasFetched, products.length, productsLoading, fetchProducts]);

  // Handle URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const productName = searchParams.get('product');

    if (category) {
      setSelectedCategory(category);
    }

    if (productName) {
      const product = products.find(p => p.name === productName);
      if (product) {
        setSelectedProduct(product);
        setIsPaymentModalOpen(true);
        setTimeout(() => {
          scrollToGrid();
        }, 100);
      }
    }
  }, [searchParams, products]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter products by category when category changes
  useEffect(() => {
    if (selectedCategory) {
      updateFilters({ category: selectedCategory });
    } else {
      clearFilters();
    }
  }, [selectedCategory, updateFilters, clearFilters]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const scrollToGrid = () => {
    if (gridRef.current) {
      const headerOffset = 100;
      const elementPosition = gridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(scrollToGrid, 100);
  };

  const handleBuyNowClick = (product) => {
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
    setTimeout(scrollToGrid, 100);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedProduct(null);
  };

  // Get unique categories from products and filter to only show allowed ones
  const allowedCategories = ["Magickal Oils", "Licenses", "Healing Tools", "Books & Journals"];
  const availableCategories = [...new Set(products.map(p => p.category))].filter(
    category => allowedCategories.includes(category)
  );

  // Only show products from allowed categories
  const categoryFilteredProducts = filteredProducts.filter(
    product => allowedCategories.includes(product.category)
  );

  // Calculate pagination
  const totalPages = Math.ceil(categoryFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = categoryFilteredProducts.slice(startIndex, endIndex);

  // Loading state
  if (productsLoading) {
    return (
      <div className="py-16">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-[#213721]">Loading products...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (productsError) {
    return (
      <div className="py-16">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading products: {productsError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* Only show CategoryNavigation if we have available categories */}
      {availableCategories.length > 0 && (
        <CategoryNavigation
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryChange}
          pageType="merchandise"
          availableCategories={availableCategories}
        />
      )}
      <section 
        className={`px-8 md:px-16 lg:px-24 xl:px-32 py-12 bg-white text-black transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        ref={gridRef}
      >
        {currentProducts.length === 0 && !productsLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#213721]">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, idx) => (
              <div key={product.id || product._id || idx}>
                <ProductCard 
                  id={product.id || product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        {selectedProduct && (
          <div>
            <PaymentForm onClose={handleClosePaymentModal} />
          </div>
        )}
      </PaymentModal>
    </div>
  );
};

export const ProductCard = ({ id, name, price, image, imageUrl, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-preview/${name.replace(/\s/g, '-')}`);
  };

  // Format price if it's a number
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `${price.toFixed(2)}`;
    }
    return price;
  };

  // Use imageUrl if available, fallback to image
  const imageSrc = imageUrl || image;

  return (
    <div 
      className="border-2 border-[#C8D8C0] rounded-lg bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full pt-[50%]">
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error('Image failed to load:', imageSrc);
              // Optional: Set a fallback image
              // e.target.src = '/path/to/fallback-image.jpg';
            }}
          />
        </div>
      </div>
      <div className="p-4 mx-3">
        <h4 className="font-medium text-[20px] text-[#213721] mb-2 font-mono group-hover:text-[#617C5F] transition-colors duration-300">
          {name}
        </h4>
        {description && (
          <p className="text-sm text-[#617C5F] mb-2 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-[16px] text-[#213721] font-serif font-semibold group-hover:text-[#617C5F] transition-colors duration-300">
            {formatPrice(price)}
          </p>
          <div className="text-lg text-green-950">★ ★ ★ ★ ☆</div>
        </div>
      </div>
      <div className="px-6 pb-4 mt-auto">
      </div>
    </div>
  );
};