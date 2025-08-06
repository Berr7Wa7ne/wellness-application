import React, { useState, useEffect, useRef } from 'react';
import { VideosCard } from './VideosCard';
import CategoryNavigation from '../shared/CategoryNavigation';
import Pagination from '../shared/Pagination';
import { useVideos } from '../../../context/user/video/VideoContext';
import { useSearchParams } from 'react-router-dom';

export const VideoGrid = () => {
  const { videos, loading, error } = useVideos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Get selected category from URL params or default to "Meditation Videos"
  const selectedCategory = searchParams.get('category') || "Meditation Videos";

  // Debug logs
  useEffect(() => {
    console.log('All video categories:', videos.map(v => v.category?.name || v.category));
    console.log('All video statuses:', videos.map(v => v.status));
    console.log('Selected category:', selectedCategory);
  }, [videos, selectedCategory]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  // Robust filter for published videos by selected category
  const publishedVideos = videos.filter(
    v =>
      v.status === 'Published' &&
      (
        (typeof v.category === 'object' && v.category?.name?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) ||
        (typeof v.category === 'string' && v.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase())
      )
  );
  console.log('Published videos:', publishedVideos);

  // Calculate pagination
  const totalPages = Math.ceil(publishedVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = publishedVideos.slice(startIndex, endIndex);

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

  const handleCategoryChange = (category) => {
    // Update URL parameters to persist the selected category
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', category);
    setSearchParams(newSearchParams);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#213721]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
  <section className="px-6 md:px-20 py-16" ref={gridRef}>
      <div className="mb-8 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-300 italic text-center mb-6">Categories</h2>
        <CategoryNavigation
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryChange}
          pageType="videos"
          availableCategories={["Meditation Videos", "Audio Guides"]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVideos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No videos found for this category.
          </div>
        ) : (
          currentVideos.map((video, index) => (
            <div
              key={video._id || index}
              className="transition-all duration-500 ease-in-out transform animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <VideosCard img={video.imageUrl} title={video.title} desc={video.duration} />
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="animate-fade-in-up animation-delay-500">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};