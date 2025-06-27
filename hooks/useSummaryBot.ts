import axios from "axios";

const URI = "https://fe95-102-208-220-207.ngrok-free.app";

const PDF_SUMMARY_API = `${URI}/extract-pdf-text`;
export const llm_summarize_book = async (
  pdfBase64,
  bookName: string,
  userPrompt = "Please summarize this book for me. I want to know what it is about, its main themes, and any key takeaways."
) => {
  try {
    console.log("sent to llm for summarization");
    const response = await axios.post(
      PDF_SUMMARY_API,
      { pdfBase64: pdfBase64, fileName: bookName, question: userPrompt },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Response from LLM:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error summarizing book:", error);
  }
};
