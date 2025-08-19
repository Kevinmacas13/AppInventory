/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "inventario",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const web = new sst.aws.StaticSite("web", {
      path: "apps/inventario-app/dist",
    });

    const api = new sst.aws.Function("api", {
      handler: "apps/api/handler.handler",
      url: true,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL as string,
      },
    });

    return {
      api: api.url,
      web: web.url,
    };
  },
});
