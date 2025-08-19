import {
  pgTable,
  varchar,
  text,
  timestamp,
  date,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { Drizzle } from "../shared/drizzle";

export const clotheTable = pgTable("clothe", {
  ...Drizzle.id,
  ...Drizzle.timestamps,
  ...Drizzle.isActive,
  name: varchar("name", { length: 100 }).notNull(),
  codeqr: varchar("codeqr", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  size: varchar("size", { length: 20 }).notNull(),
  color: varchar("color", { length: 100 }).notNull(),
  material: varchar("material", { length: 100 }).notNull(),
  quantity: doublePrecision("quantity").notNull(),
  image: varchar("image", { length: 612 }),
  status: varchar("status", { length: 100 }).notNull(),
  costPrice: doublePrecision("costPrice").notNull(),
  sellingPrice: doublePrecision("sellingPrice").notNull(),
});
