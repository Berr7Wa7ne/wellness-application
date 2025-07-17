import api from '../../context/api/config';

export const fetchDashboardStats = () => api.get('/admin/stats');
export const fetchRecentActivity = () => api.get('/admin/recent-activity');
export const fetchPerformanceOverview = () => api.get('/admin/performance-overview');
export const fetchTopProducts = () => api.get('/admin/top-products');
export const fetchUserEngagement = () => api.get('/admin/user-engagement'); 