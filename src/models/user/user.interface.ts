interface IUser {
  username: string;
  password: string;
  fullName: string;
  role: "author" | "king";
  avatar: string | null;
  last_logged?: Date | null;
}

export { IUser };
