import { PrismaClient } from "@prisma/client";
import hashPassword from "@utils/hashPassword";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const { model, args, action } = params;
  if (model == "User" && action == "create") {
    await hashPassword(args);
  }
  return next(params);
});

export default prisma;
