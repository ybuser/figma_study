import { Quote } from '../../shared';

// [{ text: 'quotes', author: 'yunseo' }, { text: 'quotes2', author: null }] 과 같은 포맷으로 응답하는 인용문 목록 API
const apiUrl = "https://type.fit/api/quotes";

export async function requestQuotes() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data as Quote[];
}


const FIGMA_API_ENDPOINT = "https://api.figma.com/v1/";

export async function getTeamComponents(teamKey: string, accessToken: string) {
    const response = await fetch(`${FIGMA_API_ENDPOINT}teams/${teamKey}/components`, {
        method: "GET",
        headers: {
            'X-FIGMA-TOKEN': accessToken,
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}
