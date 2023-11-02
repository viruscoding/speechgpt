export async function azureOpenAICompletions(
  endpoint: string,
  apiKey: string,
  messages: string[],
  max_tokens: number,
  temperature: number,
  callback: (data: any) => void
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      messages: messages,
      max_tokens: max_tokens,
      temperature: temperature,
    }),
  };

  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      return err;
    });
}

export async function sendRequest(
  messages: string[],
  openaiApiKey: string,
  openaiHost: string,
  openaiModel: string,
  callback: (data: any) => void
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + openaiApiKey,
    },
    body: JSON.stringify({
      model: openaiModel || 'gpt-3.5-turbo',
      messages: messages,
    }),
  };

  const openaiHostAddress = openaiHost || 'api.openai.com';

  fetch('https://' + openaiHostAddress + '/v1/chat/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      return err;
    });
}
