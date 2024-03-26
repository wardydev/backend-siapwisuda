const { Configuration, OpenAiApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAiApi(configuration);

const completionPDFSummarize = async (prompt) => {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 1,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
};

module.exports = {
  completionPDFSummarize,
};
