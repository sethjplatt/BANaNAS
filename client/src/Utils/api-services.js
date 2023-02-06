const API = 'https://api.data-banana.com'
let OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

export async function getSubCategories(selected) {
  const response = await fetch(`${API}/api/${selected}`)
  return response.json()
}

export async function getDescription(selectedCategory, selectedSubCategory) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}`)
  return response.json()
}

export async function getMetrics(selectedCategory, selectedSubCategory, country) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}/${country}/1970/2022`)
  return response.json()
}

export async function getFilterCategories() {
  const response = await fetch(`${API}/api/Filters`)
  return response.json()
}

export async function getFilteredCategoryYears(category, param1) {
  const response = await fetch(`${API}/api/Filters/${category}/${param1}`)
  const data = await response.json()
  const yearStrings = Object.keys(data)
  const years = yearStrings.map(year => parseInt(year))
  return years;
}

export async function getBananaFact() {
  const response = await fetch(`${API}/bananaFact`)
  return response.json()
}

export async function getBananas() {
  const response = await fetch(`${API}/bananas`)
  return response.json()
}

export async function getGlobalData(category, subCategory) {
  const response = await fetch(`${API}/global/${category}}/${subCategory}`)
  return response.json()
}

export async function getConclusion(data1what, data1where, data2what, data2where, rIndex){
  const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  const prompt = `Given that the r-index of ${data1what} in ${data1where} and ${data2what} in ${data2where} is ${rIndex}, respond with a humerous, sarcastic conclusion about their relationship from the perspective of an imaginary politician from ${data1where} that would mistake correlation for causation. Make sure to refrerence both countries in your response. keep the response under 60 words`;
  // const prompt = `In the context of a satirical debate between two imaginary political figures, what would be an accusing punchline to emphasize the fact that ${data1where} ${data1what} has a ${rIndex} correlation index to the ${data2what} of the ${data2where}? It should be funny. Keep the response under 75 words`;

  const apiKey = OPEN_AI_API_KEY;
  
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };



  const data = {
    prompt: prompt,
    max_tokens: 150,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  })

  let conclusion = await response.json();
  conclusion = conclusion.choices[0].text;
  conclusion = conclusion.slice(2);
  conclusion = conclusion.replace(/^"|"$/g, '');
  console.log(conclusion);
  return conclusion;
}