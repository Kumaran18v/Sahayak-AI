import { apiRequest } from './client';

export async function fetchDocuments() {
  return await apiRequest('/api/documents');
}

export async function uploadDocument(file, tags = 'General') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', tags);

  return await apiRequest('/api/documents/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function deleteDocument(documentId) {
  return await apiRequest(`/api/documents/${documentId}`, {
    method: 'DELETE',
  });
}
