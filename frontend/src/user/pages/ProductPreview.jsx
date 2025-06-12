import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Newsletter } from '../components/shared/Newsletter';
import { AddToCartModal } from '../components/shared/AddToCartModal';
import { ProductDetails } from '../components/product/ProductDetails';
import { RelatedProductsSection } from '../components/product/RelatedProductsSection';
import { useProductPreviewLogic } from '../hooks/useProductPreviewLogic';

const categoryColors = {
  'Magickal Oils': "bg-[#FFE4E1] text-[#FF6B6B]",
  'Meditation Videos': "bg-[#E0F2F1] text-[#26A69A]",
  'Licenses': "bg-[#E8F5E9] text-[#66BB6A]",
  'Audio Guides': "bg-[#FFF3E0] text-[#FFA726]",
  'Healing Tools': "bg-[#E3F2FD] text-[#42A5F5]",
  'Books & Journals': "bg-[#F3E5F5] text-[#AB47BC]",
};

const ProductPreview = ({ handleAddToCart }) => {
  const { 
    product,
    relatedProducts,
    isAddToCartModalOpen,
    handleCloseAddToCartModal,
    handleBuyNow,
    setIsAddToCartModalOpen,
  } = useProductPreviewLogic();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

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
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            {/* Category Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[product.category] || 'bg-gray-100 text-gray-800'}`}>
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

      <RelatedProductsSection relatedProducts={relatedProducts} />

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
