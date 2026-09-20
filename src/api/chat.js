import { apiRequest } from './client';

export async function sendChatMessage(message, conversationId = null, documentIds = null, subject = 'CS-301') {
  return await apiRequest('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
      document_ids: documentIds,
      subject
    }),
  });
}

export async function fetchConversations() {
  return await apiRequest('/api/conversations');
}

export async function fetchConversationMessages(conversationId) {
  return await apiRequest(`/api/conversations/${conversationId}/messages`);
}
