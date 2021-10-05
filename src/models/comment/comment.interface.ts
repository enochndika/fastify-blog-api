interface IComment {
  content: string;
  userId: number;
  postId: number;
}

interface IPostAuthorId {
  authorId: number;
}

export { IComment };
