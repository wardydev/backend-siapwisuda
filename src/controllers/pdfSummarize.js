const { PDFExtract } = require("pdf.js-extract");
const { calculateTokens } = require("../helper/index.js");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// split sentence
const splitSentence = (sentence, maxChunkSize) => {
  const sentenceChunks = [];

  let partialChunk = "";

  const words = sentence.split(" ");

  words.forEach((word) => {
    if (calculateTokens(partialChunk + word) < maxChunkSize) {
      partialChunk += word + ".";
    } else {
      sentenceChunks.push(partialChunk.trim());
      partialChunk = word + ".";
    }
  });
  if (partialChunk) {
    sentenceChunks.push(partialChunk.trim());
  }

  return sentenceChunks;
};

const splitTextIntoChunks = (text, maxChunkSize) => {
  const chunks = [];

  let currentChunk = "";

  const sentences = text.split(".");

  sentences.forEach((sentence) => {
    if (calculateTokens(currentChunk) > maxChunkSize) {
      const sentenceChunks = splitSentence(currentChunk, maxChunkSize);
      chunks.push(...sentenceChunks);
    }

    if (calculateTokens(currentChunk + sentence) < maxChunkSize) {
      currentChunk += sentence + ".";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + ".";
    }
  });
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
};

async function summariseChunk(chunk, maxWords, languagePrompt) {
  let condition = "";
  let language = "";
  if (maxWords) {
    condition = `Maksimal ${maxWords} kata`;
  }
  if (languagePrompt) {
    language = `dengan menggunakan bahasa ${languagePrompt} yang baik dan benar`;
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "user",
          content: `Tolong rangkumkan saya teks berikut ini untuk keperluan skripsi dengan bahasa yang ilmiah, ${condition} ${language}.\nTeks: """${chunk}"""`,
        },
      ],
      temperature: 1,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response);

    return {
      text: response?.choices[0]?.message?.content,
      totalTokens: response?.usage.total_tokens,
    };
  } catch (error) {
    console.log("summariseChunk error", error);
    throw new Error(error);
  }
}

const summariseChunks = async (chunks) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const summarisedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const { text } = await summariseChunk(chunk);
      await delay(200);
      return text;
    })
  );

  const concatenatedText = summarisedChunks.join(" ");

  return concatenatedText;
};

const summarizePdf = async (req, res) => {
  try {
    const { maxWords, language } = req.body;
    const pdfFile = req.file;

    if (maxWords < 100) {
      res.status(400).json({
        success: false,
        error: {
          code: 404,
          message: "Maksimal kata 100, Pastikan tidak lebih kecil dari 100.",
        },
      });
      return;
    }

    if (!language) {
      res.status(400).json({
        success: false,
        error: {
          code: 404,
          message: "Bahasa harus terpilih, Pastikan Kamu sudah memilih bahasa.",
        },
      });
      return;
    }

    const pdfExtract = new PDFExtract();

    const extractOptions = {
      firstPage: 1,
      lastPage: undefined,
      password: "",
      verbosity: -1,
      normalizeWhitespace: false,
      disableCombinedTextItems: false,
    };

    const data = await pdfExtract.extract(pdfFile.path, extractOptions);

    const pdfText = data.pages
      .map((page) => page.content.map((item) => item.str).join(" "))
      .join(" ");

    if (pdfText.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 404,
          message:
            "File hanya berupa teks, Pastikan tidak ada gambar atau elemen lain selain teks.",
        },
      });
      return;
    }

    let summarisedText = pdfText;

    const maxToken = 2000;
    while (calculateTokens(summarisedText) > maxToken) {
      const newChunks = splitTextIntoChunks(summarisedText, maxToken);
      summarisedText = await summariseChunks(newChunks);
    }

    summarisedText = await summariseChunk(summarisedText, maxWords, language);

    res.status(200).json({
      success: true,
      message: "Selamat!, File pdf berhasil di rangkum.",
      data: {
        text: summarisedText.text,
        tokens: summarisedText.totalTokens,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 404,
        message:
          "Terjadi kesalahan disisi server, Pastikan internet Anda terkoneksi.",
      },
    });
  }
};

module.exports = {
  summarizePdf,
};
