import { addAliases } from "module-alias";

addAliases({
  "@utils": `${__dirname}/utils`,
  "@models": `${__dirname}/models`,
  "@auth": `${__dirname}/auth`,
  "@plugins": `${__dirname}/plugins`,
  "@providers": `${__dirname}/providers`,
});

import fastify from "fastify";
import "make-promises-safe";
import dotenv from "dotenv";
import jwt from "fastify-jwt";
import authenticate from "./plugins/authorization";

dotenv.config();

function main(opts = {}) {
  const app = fastify(opts);

  /* Middlewares*/
  app.register(jwt, {
    secret: process.env.JWT_SECRET || "12345",
  });
  app.register(authenticate);

  /* Routes Middlewares*/
  app.register(import("./auth/auth.service"), { prefix: "/api/auth" });
  app.register(import("./models/user/user.service"), { prefix: "/api/users" });
  app.register(import("./models/post/post.service"), { prefix: "/api/posts" });

  return app;
}

export default main;
