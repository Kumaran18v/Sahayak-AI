import { apiRequest } from './client';

export async function fetchQuizQuestions(limit = 10, subjectCode = null) {
  const query = subjectCode && subjectCode !== 'all' ? `&subject_code=${encodeURIComponent(subjectCode)}` : '';
  return await apiRequest(`/api/quiz/questions?limit=${limit}${query}`);
}

export async function submitQuizAnswer(questionId, selectedKey) {
  return await apiRequest('/api/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      question_id: questionId,
      selected_key: selectedKey,
    }),
  });
}

export async function generateCustomQuiz(topic, numberOfQuestions = 3) {
  return await apiRequest('/api/quiz/generate', {
    method: 'POST',
    body: JSON.stringify({
      topic,
      number_of_questions: numberOfQuestions,
    }),
  });
}
