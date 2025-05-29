import React from 'react'
import ManageVideosHeader from '../components/manage-videos/ManageVideosHeader'
import VideoTable from '../components/manage-videos/VideoTable'

const ManageVideos = () => {
  return (
    <div>
        <ManageVideosHeader />
        <VideoTable />
    </div>
  )
}

export default ManageVideos