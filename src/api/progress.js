import { apiRequest } from './client';

export async function fetchProgressAnalytics() {
  return await apiRequest('/api/progress');
}
