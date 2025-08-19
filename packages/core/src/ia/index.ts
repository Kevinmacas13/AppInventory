import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Config } from "../shared/config";
import { Clothe } from "../clothe";

export namespace IA {
  const google = createGoogleGenerativeAI({
    apiKey: Config.GEMINI_API_KEY,
  });

  export async function generateClothe(instructions: string): Promise<string> {
    const prompt = `
Genera un nuevo artículo de ropa basado en las siguientes instrucciones en español.
La salida debe ser un objeto JSON válido que coincida exactamente con el modelo Clothe.
No incluyas texto adicional ni explicaciones, solo JSON.

Campos:
- name (string)
- Barcode (string, único)
- category (string)
- size (string)
- color (string)
- material (string)
- quantity (number)
- image (string, siempre debe ser esta URL: "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg")
- status (string)
- costPrice (number)
- sellingPrice (number)

Instrucciones: ${instructions}

Formato de salida (solo JSON, sin markdown ni comentarios):
{
  "name": "string",
  "codeqr": "string",
  "category": "string",
  "size": "string",
  "color": "string",
  "material": "string",
  "quantity": 0,
  "image": "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg",
  "status": "string",
  "costPrice": 0,
  "sellingPrice": 0
}
`;

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      maxTokens: 4000,
    });

    const cleanedText = result.text.replace(/```json\s*|\s*```/g, "").trim();

    const jsonResult = JSON.parse(cleanedText);

    jsonResult.image =
      "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg";

    const clothe = Clothe.InfoSchema.omit({ id: true }).parse(jsonResult);

    const clotheId = await Clothe.create(clothe);

    return clothe.name;
  }
}
