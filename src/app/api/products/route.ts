import { db } from "@/db";

export const POST = async () => {
  try {
    const products = await db.query({
      topK: 12,
      vector: [0, 0, 0.1],
      includeMetadata: true,
    });
    console.log(products, "products");
    return new Response(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error));
  }
};
