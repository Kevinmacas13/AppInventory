export interface InventoryItem {
  id: string;
  name: string;
  codeqr: string;
  // category: "T-Shirts" | "Jeans" | "Dresses" | "Sweaters" | "Jackets";
  category: string;
  size: string;
  // size: "XS" | "S" | "M" | "L" | "XL";
  color: string;
  material: string;
  quantity: number;
  image?: string | null;
  status: string;
  costPrice: number;
  sellingPrice: number;
}
