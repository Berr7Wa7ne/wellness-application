import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../context/api/config';

export const useProductPreviewLogic = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    api.get(`/public/products/slug/${slug}`)
      .then(res => {
        setProduct(res.data.data);
        // Fetch related products by category, excluding the current product
        api.get(`/public/products/related/${res.data.data.category}/${res.data.data._id}`)
          .then(r => setRelatedProducts(r.data.data))
          .catch(() => setRelatedProducts([]));
        setIsLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setRelatedProducts([]);
        setIsLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => setIsAddToCartModalOpen(true);
  const handleCloseAddToCartModal = () => setIsAddToCartModalOpen(false);
  const handleBuyNow = () => {
    if (product) {
    // Implement buy now logic here (e.g., redirect to checkout)
      alert(`Buying ${product.name} now!`);
    }
  };


  return {
    product,
    relatedProducts,
    isAddToCartModalOpen,
    setIsAddToCartModalOpen,
    handleAddToCart,
    handleCloseAddToCartModal,
    handleBuyNow,
    navigate,
    isLoading,
  };
};
