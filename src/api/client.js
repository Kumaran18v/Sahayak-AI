const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Accept': 'application/json',
  };

  // If body is not FormData, set Content-Type to application/json
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        errorJson = { detail: errorText || `HTTP ${response.status} Error` };
      }
      throw new Error(errorJson.detail || `Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(`[API Connection Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export { API_BASE_URL };
