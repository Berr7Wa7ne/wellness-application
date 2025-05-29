import React from 'react'
import DashboardStats from '../components/dashboard/DashboardStats'
import PerformanceOverview from '../components/dashboard/PerformanceOverview'
import RecentActivity from '../components/dashboard/RecentActivity'
import TopProducts from '../components/dashboard/TopProducts'
import UserEngagement from '../components/dashboard/UserEngagement'
const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4'>
      <DashboardStats />
      <div className="p-6 flex items-center gap-4">
  <div className="flex-[2]">
    <PerformanceOverview />
  </div>
  <div className="flex-[1]">
    <RecentActivity />
  </div>
</div>
<div className="p-6 flex gap-4">
      <TopProducts />
      <UserEngagement />
    </div>
    </div>
  )
}

export default Dashboard