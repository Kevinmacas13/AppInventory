import { client, InferResponseType } from "@/services/client";
// import type { InventoryItem } from "./types";
export type InventoryItem = InferResponseType<
  typeof client.api.clothes.$get
>["data"][0];
export const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Classic White Tee",
    codeqr: "1202",
    category: "T-Shirts",
    size: "M",
    color: "White",
    material: "Cotton",
    quantity: 50,
    image: "https://placehold.co/400x400.png",
    status:
      "A timeless crewneck t-shirt made from 100% organic cotton. Soft, durable, and versatile.",
    costPrice: 10.5,
    sellingPrice: 24.99,
  },
  {
    id: "2",
    name: "Slim Fit Denim Jeans",
    codeqr: "1202",
    category: "Jeans",
    size: "L",
    color: "Blue",
    material: "Denim",
    quantity: 30,
    image: "https://placehold.co/400x400.png",
    status:
      "A timeless crewneck t-shirt made from 100% organic cotton. Soft, durable, and versatile.",
    costPrice: 35.0,
    sellingPrice: 79.99,
  },
];
