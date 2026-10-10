import Tesseract from "tesseract.js";

export async function extractText(
  image: File
): Promise<string> {
  const result = await Tesseract.recognize(
    image,
    "eng",
  );

  return result.data.text;
}
