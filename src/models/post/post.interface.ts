interface IPost {
  title: string;
  content?: string | number | boolean | undefined;
  description: string;
  image: Array<string>;
  promoted: boolean;
  vip?: boolean;
  read_time: number;
  fakeContent?: string;
  authorId: number;
}

interface IPostAuthorId {
  authorId: number;
}

export { IPost, IPostAuthorId };
