import { apiRequest } from './client';

export async function fetchExamPlan(subject = 'Operating Systems', availableMinutes = 45, examDate = 'in 2 days') {
  return await apiRequest('/api/exam-plan', {
    method: 'POST',
    body: JSON.stringify({
      subject,
      available_minutes: availableMinutes,
      exam_date: examDate,
    }),
  });
}
