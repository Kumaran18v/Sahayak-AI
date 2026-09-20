import { apiRequest } from './client';

export async function transcribeAudioBlob(blob, filename = 'voice_prompt.wav') {
  const formData = new FormData();
  formData.append('audio', blob, filename);

  return await apiRequest('/api/voice/transcribe', {
    method: 'POST',
    body: formData,
  });
}
