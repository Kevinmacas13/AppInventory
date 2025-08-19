import type { AppType } from "@inventario/api";
export type { InferRequestType, InferResponseType } from "hono/client";
const { hc } = require("hono/dist/client") as typeof import("hono/client"); // Importing Hono client
export const client = hc<AppType>(
  "https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/"
  // "http://localhost:3001"
);
