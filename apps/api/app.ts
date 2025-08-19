import { Hono } from "hono";
import { clothesRoute } from "./clothesRoute";
import { openAPISpecs } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { HTTPException } from "hono/http-exception";
import { ErrorCodes } from "./error";
import { cors } from "hono/cors";
import { iaRoute } from "./iaRoute";

const app = new Hono();

const routes = app
  .use(
    cors({
      origin:
        "https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/",
    })
  )
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
          {
            url: "https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/",
            description: "Staging server",
          },
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
    // Handle HTTP exceptions
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

    // Handle any other errors as internal server errors
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

export type ApiType = typeof routes;

export default routes;
