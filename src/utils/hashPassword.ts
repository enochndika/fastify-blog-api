import bcrypt from "bcryptjs";

type Args = {
  data: {
    password: string;
  };
};

async function hashPassword(args: Args) {
  const salt = await bcrypt.genSalt(10);
  args.data.password = await bcrypt.hash(args.data.password, salt);
  return;
}

export default hashPassword;
