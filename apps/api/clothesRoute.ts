// import { zValidator } from '@hono/zod-validator'
import { Hono } from "hono";
import { Examples, Clothe } from "@inventario/core";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { ErrorResponses, validator } from "./common";

export const clothesRoute = new Hono()
  .post(
    "/",
    describeRoute({
      tags: ["Clothe"],
      summary: "Crea un nuevo Clothe",
      description: "Crea un nuevo Clothe para el usuario",
      requestBody: {
        content: {
          "application/json": {
            schema: resolver(Clothe.InfoSchema.partial({ id: true })),
            example: Examples.Clothe,
          },
        },
      },
      responses: {
        201: {
          description: "Respuesta exitosa",
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
    validator("json", Clothe.InfoSchema.partial({ id: true })),
    async (c) => {
      const body = c.req.valid("json");
      await Clothe.create(body);
      return c.json({ data: "Ok" }, 201);
    }
  )
  .get(
    "/",
    describeRoute({
      tags: ["Clothe"],
      summary: "Lista all the clothes",
      description: "List all the clothes of the company.",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: resolver(
                z.object({
                  data: Clothe.InfoSchema.array().openapi({
                    description: "Lista de Clothes",
                    example: [Examples.Clothe],
                  }),
                })
              ),
              example: {
                data: [Examples.Clothe],
              },
            },
          },
          description: "A list of clothes.",
        },
        500: ErrorResponses[500],
      },
    }),
    async (c) => {
      const animals = await Clothe.list();
      return c.json({ data: animals }, 200);
    }
  )
  .get(
    "/:id",
    describeRoute({
      tags: ["Clothe"],
      summary: "Obtener Clothe por ID",
      description: "Recupera un Clothe específico por su ID.",
      responses: {
        200: {
          description: "Respuesta exitosa",
          content: {
            "application/json": {
              schema: resolver(
                z.object({
                  data: Clothe.InfoSchema,
                })
              ),
              example: { data: Examples.Clothe },
            },
          },
        },
        400: ErrorResponses[400],
        404: ErrorResponses[404],
        500: ErrorResponses[500],
      },
    }),
    validator("param", Clothe.InfoSchema.pick({ id: true })),
    async (c) => {
      const id = c.req.valid("param").id;
      const clothe = await Clothe.getDetail({ id });

      if (!clothe) {
        return c.json(
          {
            type: "not_found",
            code: "resource_not_found",
            message: "The requested resource could not be found",
          },
          404
        );
      }

      return c.json({ data: clothe }, 200);
    }
  )
  .put(
    "/:id",
    describeRoute({
      tags: ["Clothe"],
      summary: "Update Clothe by ID",
      description: "Update a clothe by ID.",
      requestBody: {
        content: {
          "application/json": {
            schema: resolver(Clothe.InfoSchema),
            example: Examples.Clothe,
          },
        },
      },
      responses: {
        200: {
          description: "Respuesta exitosa",
          content: {
            "application/json": {
              schema: resolver(
                z.object({
                  data: Clothe.InfoSchema,
                })
              ),
              example: { data: Examples.Clothe },
            },
          },
        },
        400: ErrorResponses[400],
        404: ErrorResponses[404],
        500: ErrorResponses[500],
      },
    }),
    validator("json", Clothe.InfoSchema),
    async (c) => {
      const id = c.req.param("id");
      const body = c.req.valid("json");
      await Clothe.update({ ...body, id });
      return c.json({ data: "Ok" }, 200);
    }
  )
  .delete(
    "/:id",
    describeRoute({
      tags: ["Clothe"],
      summary: "Delete a clothe by ID",
      description: "Delete a clothe by ID.",
      responses: {
        204: {
          description: "Without content. Clothes was eliminated.",
        },
        400: ErrorResponses[400],
        404: ErrorResponses[404],
        500: ErrorResponses[500],
      },
    }),
    validator("param", Clothe.InfoSchema.pick({ id: true })),
    async (c) => {
      const id = c.req.param("id");
      await Clothe.deactivate({ id });
      return c.body(null, 204);
    }
  );
