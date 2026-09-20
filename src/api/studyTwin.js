import { apiRequest } from './client';

export async function fetchStudyTwin(subjectCode = null) {
  const query = subjectCode && subjectCode !== 'all' ? `?subject_code=${encodeURIComponent(subjectCode)}` : '';
  return await apiRequest(`/api/study-twin${query}`);
}

export async function fetchSubjects() {
  return await apiRequest('/api/subjects');
}

export async function createCustomSubject(subjectData) {
  return await apiRequest('/api/subjects', {
    method: 'POST',
    body: JSON.stringify(subjectData),
  });
}
