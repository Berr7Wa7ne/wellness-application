import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Newsletter } from '../components/shared/Newsletter';
import { AddToCartModal } from '../components/shared/AddToCartModal';
import { ProductDetails } from '../components/product/ProductDetails';
import { RelatedProductsSection } from '../components/product/RelatedProductsSection';
import { useProductPreviewLogic } from '../hooks/useProductPreviewLogic';
import { useCategories } from '../../context/user/category/CategoryContext';

const ProductPreview = ({ handleAddToCart }) => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  if (categoriesLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#617C5F]"></div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
  if (categoriesError) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold">{categoriesError}</p>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  const categoryColors = {};
  categories.forEach(cat => {
    categoryColors[cat.name] = `${cat.backgroundColor} ${cat.textColor}`;
  });

  const { 
    product,
    relatedProducts,
    isAddToCartModalOpen,
    handleCloseAddToCartModal,
    handleBuyNow,
    setIsAddToCartModalOpen,
    isLoading,
  } = useProductPreviewLogic();

  const handleLocalAddToCart = (product) => {
    handleAddToCart(product);
    setIsAddToCartModalOpen(true);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#617C5F]"></div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold">Product not found.</p>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-28 md:flex md:items-start lg:px-24 xl:px-32">
        <div className="md:w-1/2">
          <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            {/* Category Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium`}
              style={{
                backgroundColor: categories.find(cat => cat.name === product.category)?.backgroundColor,
                color: categories.find(cat => cat.name === product.category)?.textColor
              }}
            >
              {product.category}
            </div>
          </div>
        </div>
        <ProductDetails
          product={product}
          handleAddToCart={handleLocalAddToCart}
          handleBuyNow={handleBuyNow}
        />
      </div>

      <RelatedProductsSection relatedProducts={relatedProducts} categories={categories} />

      <Newsletter />
      <Footer />

      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={handleCloseAddToCartModal}
        productName={product ? product.name : ''}
        productPrice={product ? product.price : ''}
      />
    </div>
  );
};

export default ProductPreview;
