import { apiRequest } from './client';

export async function fetchSystemStatus() {
  return await apiRequest('/api/system/status');
}

export async function fetchHardwarePerformance() {
  return await apiRequest('/api/system/performance');
}

export async function seedDemoData() {
  return await apiRequest('/api/demo/seed', { method: 'POST' });
}
