import React, { useState } from 'react'
import ManageVideosHeader from '../components/manage-videos/ManageVideosHeader'
import VideoTable from '../components/manage-videos/VideoTable'

const ManageVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
        <ManageVideosHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <VideoTable selectedCategory={selectedCategory} />
    </div>
  )
}

export default ManageVideos