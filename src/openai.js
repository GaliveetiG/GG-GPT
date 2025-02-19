const { Configuration, OpenAIApi } = require('openai');

// Correct the apiKey property name
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: 'gpt-3.5-turbo-instruct',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return res.data.choices[0].text;
}





