import { prefixes } from "../shared/id";
export namespace Examples {
  export const Id = (prefix: keyof typeof prefixes) =>
    `${prefixes[prefix]}_XXXXXXXXXXXXXXXXXXXXXXXXXX`;

  export const Clothe = {
    id: Id("clothe"),
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
  };
}
