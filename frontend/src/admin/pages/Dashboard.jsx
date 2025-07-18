import React, { useEffect, useState } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';
import RecentActivity from '../components/dashboard/RecentActivity';
import TopProducts from '../components/dashboard/TopProducts';
import UserEngagement from '../components/dashboard/UserEngagement';
import {
  fetchDashboardStats,
  fetchRecentActivity,
  fetchPerformanceOverview,
  fetchTopProducts,
  fetchUserEngagement
} from '../api/dashboard';

const Dashboard = () => {
  // State for each widget
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  const [activity, setActivity] = useState(null);
  const [activityError, setActivityError] = useState(null);

  const [performance, setPerformance] = useState(null);
  const [performanceError, setPerformanceError] = useState(null);

  const [topProducts, setTopProducts] = useState(null);
  const [topProductsError, setTopProductsError] = useState(null);

  const [engagement, setEngagement] = useState(null);
  const [engagementError, setEngagementError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchDashboardStats().then(res => setStats(res.data.data)).catch(err => setStatsError(err.message)),
      fetchRecentActivity().then(res => setActivity(res.data.data)).catch(err => setActivityError(err.message)),
      fetchPerformanceOverview().then(res => setPerformance(res.data.data)).catch(err => setPerformanceError(err.message)),
      fetchTopProducts().then(res => setTopProducts(res.data.data)).catch(err => setTopProductsError(err.message)),
      fetchUserEngagement().then(res => setEngagement(res.data.data)).catch(err => setEngagementError(err.message)),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#213721]"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <DashboardStats stats={stats} error={statsError} />
      <div className="p-6 flex items-center gap-4">
        <div className="flex-[2]">
          <PerformanceOverview data={performance} error={performanceError} />
        </div>
        <div className="flex-[1]">
          <RecentActivity activity={activity} error={activityError} />
        </div>
      </div>
      <div className="p-6 flex gap-4">
        <TopProducts products={topProducts} error={topProductsError} />
        <UserEngagement engagement={engagement} error={engagementError} />
      </div>
    </div>
  );
};

export default Dashboard;