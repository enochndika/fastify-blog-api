import { IFastify } from "@utils/fastifyInterface";
import * as userController from "./user.controller";

async function userService(fastify: IFastify) {
  fastify.get("/", userController.list);
  fastify.post("/", userController.create);
  fastify.delete("/:id", userController.remove);
}

export default userService;
