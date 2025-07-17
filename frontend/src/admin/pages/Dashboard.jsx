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
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  const [activity, setActivity] = useState(null);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState(null);

  const [performance, setPerformance] = useState(null);
  const [performanceLoading, setPerformanceLoading] = useState(true);
  const [performanceError, setPerformanceError] = useState(null);

  const [topProducts, setTopProducts] = useState(null);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [topProductsError, setTopProductsError] = useState(null);

  const [engagement, setEngagement] = useState(null);
  const [engagementLoading, setEngagementLoading] = useState(true);
  const [engagementError, setEngagementError] = useState(null);

  useEffect(() => {
    setStatsLoading(true);
    fetchDashboardStats()
      .then(res => setStats(res.data.data))
      .catch(err => setStatsError(err.message))
      .finally(() => setStatsLoading(false));

    setActivityLoading(true);
    fetchRecentActivity()
      .then(res => setActivity(res.data.data))
      .catch(err => setActivityError(err.message))
      .finally(() => setActivityLoading(false));

    setPerformanceLoading(true);
    fetchPerformanceOverview()
      .then(res => setPerformance(res.data.data))
      .catch(err => setPerformanceError(err.message))
      .finally(() => setPerformanceLoading(false));

    setTopProductsLoading(true);
    fetchTopProducts()
      .then(res => setTopProducts(res.data.data))
      .catch(err => setTopProductsError(err.message))
      .finally(() => setTopProductsLoading(false));

    setEngagementLoading(true);
    fetchUserEngagement()
      .then(res => setEngagement(res.data.data))
      .catch(err => setEngagementError(err.message))
      .finally(() => setEngagementLoading(false));
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <DashboardStats stats={stats} loading={statsLoading} error={statsError} />
      <div className="p-6 flex items-center gap-4">
        <div className="flex-[2]">
          <PerformanceOverview data={performance} loading={performanceLoading} error={performanceError} />
        </div>
        <div className="flex-[1]">
          <RecentActivity activity={activity} loading={activityLoading} error={activityError} />
        </div>
      </div>
      <div className="p-6 flex gap-4">
        <TopProducts products={topProducts} loading={topProductsLoading} error={topProductsError} />
        <UserEngagement engagement={engagement} loading={engagementLoading} error={engagementError} />
      </div>
    </div>
  );
};

export default Dashboard;