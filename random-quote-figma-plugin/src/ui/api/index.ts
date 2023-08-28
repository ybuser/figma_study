import { Quote } from '../../shared';

// [{ text: 'quotes', author: 'yunseo' }, { text: 'quotes2', author: null }] 과 같은 포맷으로 응답하는 인용문 목록 API
const apiUrl = "https://type.fit/api/quotes";

export async function requestQuotes() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data as Quote[];
}