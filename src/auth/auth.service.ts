import { FastifyInstance } from "fastify";
import signIn from "./auth.controller";

async function authService(fastify: FastifyInstance) {
  fastify.post("/", signIn);
}

export default authService;
