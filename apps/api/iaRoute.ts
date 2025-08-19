import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { ErrorResponses, validator } from "./common";
import { IA } from "@inventario/core";

export const iaRoute = new Hono().post(
  "/generate",
  describeRoute({
    tags: ["IA"],
    summary: "Generar una prenda con IA",
    description: "Genera una prenda de vestir para el inventario.",
    requestBody: {
      content: {
        "application/json": {
          schema: resolver(
            z.object({
              instructions: z.string().openapi({
                description: "Instrucciones para la IA",
                example: "Genera una nueva prenda de vestir",
              }),
            })
          ),
        },
      },
    },
    responses: {
      201: {
        description: "Generación iniciada exitosamente",
        content: {
          "application/json": {
            schema: resolver(
              z.object({
                data: z.literal("Ok"),
              })
            ),
            example: { data: "Ok" },
          },
        },
      },
      400: ErrorResponses[400],
      500: ErrorResponses[500],
    },
  }),
  validator(
    "json",
    z
      .object({
        instructions: z.string(),
      })
      .openapi({
        description: "Instrucciones para la IA",
        example: {
          instructions: "Genera una nueva prenda de vestir",
        },
      })
  ),
  async (c) => {
    const body = c.req.valid("json");
    await IA.generateClothe(body.instructions);
    return c.json({ data: "Ok" }, 201);
  }
);
