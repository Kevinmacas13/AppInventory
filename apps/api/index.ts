import "dotenv/config";
import { Hono } from "hono";
import { clothesRoute } from "./clothesRoute";
import { openAPISpecs } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { HTTPException } from "hono/http-exception";
import { ErrorCodes } from "./error";

import { cors } from "hono/cors";

import { iaRoute } from './iaRoute';

const app = new Hono();
app.use("*", cors());
const route = app
  .route("/api/clothes", clothesRoute)
  .route("/api/ia", iaRoute)
  .get(
    "/openapi",
    openAPISpecs(app, {
      documentation: {
        info: {
          title: "Hono API",
          version: "1.0.0",
          description: "Greeting API",
        },
        servers: [
          { url: "http://localhost:3001", description: "Local Server" },
        ],
      },
    })
  )
  .get(
    "/docs",
    Scalar({
      theme: "saturn",
      url: "/openapi",
    })
  )
  .onError((error, c) => {
    if (error instanceof HTTPException) {
      console.error("http error:", error);
      return c.json(
        {
          type: "validation",
          code: ErrorCodes.Validation.INVALID_PARAMETER,
          message: "Invalid request",
        },
        400
      );
    }

    console.error("unhandled error:", error);
    return c.json(
      {
        type: "internal",
        code: ErrorCodes.Server.INTERNAL_ERROR,
        message: "Internal server error",
      },
      500
    );
  });
export type AppType = typeof route;

export default {
  port: 3001,
  fetch: app.fetch,
};
