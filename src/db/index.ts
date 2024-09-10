import { Index } from "@upstash/vector";

import * as dotenv from "dotenv";

dotenv.config();

export type Product = {
  id: string;
  name: string;
  imageId: string;
  price: number;
  size: "S" | "M" | "L";
  color: "white" | "beige" | "blue" | "green" | "purple";
};

export const db = new Index<Product>({
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  url: process.env.UPSTASH_REDIS_REST_URL,
});
