import { z } from "zod";
import { Common } from "../shared/common";
import { Examples } from "../examples";
import { Drizzle } from "../shared/drizzle";
import { clotheTable } from "./clothe.sql";
import { and, eq } from "drizzle-orm";
import { fn } from "../shared/fn";
import { createID } from "../shared/id";

export namespace Clothe {
  export const InfoSchema = z
    .object({
      id: z.string().openapi({
        description: Common.IdDescription,
        example: Examples.Clothe.id,
      }),
      name: z.string().openapi({
        description: "Name of the Clothe.",
        example: Examples.Clothe.name,
      }),
      codeqr: z.string().openapi({
        description: "Code qr of the Clothe.",
        example: Examples.Clothe.codeqr,
      }),
      color: z.string().openapi({
        description: "Color of the Clothe.",
        example: Examples.Clothe.color,
      }),
      image: z.string().url().nullish().openapi({
        description: "URL of the Clothe image.",
        example: Examples.Clothe.image,
      }),
      category: z.string().openapi({
        description: "Category of the Clothe.",
        example: Examples.Clothe.category,
      }),
      size: z.string().openapi({
        description: "size of the Clothe.",
        example: Examples.Clothe.size,
      }),
      quantity: z.number().openapi({
        description: "Quantity of the Clothe in units.",
        example: Examples.Clothe.quantity,
      }),
      status: z.string().openapi({
        description: "Status of the Clothe.",
        example: Examples.Clothe.status,
      }),
      material: z.string().openapi({
        description: "Status of the Clothe.",
        example: Examples.Clothe.material,
      }),
      costPrice: z.number().openapi({
        description: "Quantity of the Clothe in units.",
        example: Examples.Clothe.costPrice,
      }),
      sellingPrice: z.number().openapi({
        description: "Quantity of the Clothe in units.",
        example: Examples.Clothe.sellingPrice,
      }),
    })
    .openapi({
      ref: "Clothe",
      description: "A collection of cards with a theme or purpose.",
      example: Examples.Clothe,
    });

  export type InfoType = z.infer<typeof InfoSchema>;

  function serialize(input: typeof clotheTable.$inferSelect): InfoType {
    return {
      id: input.id,
      name: input.name,
      codeqr: input.codeqr,
      status: input.status,
      color: input.color,
      image: input.image,
      category: input.category,
      size: input.size,
      quantity: input.quantity,
      material: input.material,
      costPrice: input.costPrice,
      sellingPrice: input.sellingPrice,
    };
  }

  export const list = async () => {
    const select = await Drizzle.db
      .select()
      .from(clotheTable)
      .where(eq(clotheTable.isActive, true));
    return select.map(serialize);
  };

  export const create = fn(InfoSchema.partial({ id: true }), async (data) => {
    const id = data.id || createID("clothe");
    await Drizzle.db.insert(clotheTable).values({ ...data, id });
    return id;
  });

  export const update = fn(InfoSchema, async (data) => {
    await Drizzle.db
      .update(clotheTable)
      .set({ ...data, timeUpdated: new Date() })
      .where(eq(clotheTable.id, data.id));
    return data.id;
  });

  export const getDetail = fn(InfoSchema.pick({ id: true }), async ({ id }) => {
    const select = await Drizzle.db
      .select()
      .from(clotheTable)
      .where(and(eq(clotheTable.id, id), eq(clotheTable.isActive, true)));
    return select.map(serialize).at(0);
  });

  export const deactivate = fn(
    InfoSchema.pick({ id: true }),
    async ({ id }) => {
      await Drizzle.db
        .update(clotheTable)
        .set({ isActive: false, timeDeleted: new Date() })
        .where(eq(clotheTable.id, id));
      return id;
    }
  );
}
export { clotheTable };
