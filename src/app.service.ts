const services = [
  {
    name: import('@models/auth/auth.service'),
    prefix: '/api/auth',
  },
  {
    name: import('@models/user/user.service'),
    prefix: '/api/users',
  },
  {
    name: import('@models/post/post.service'),
    prefix: '/api/posts',
  },
  {
    name: import('@models/category/category.service'),
    prefix: '/api/post-categories',
  },
  {
    name: import('@models/comment/comment.service'),
    prefix: '/api/comments',
  },
  {
    name: import('@models/childComment/childComment.service'),
    prefix: '/api/child-comments',
  },
  {
    name: import('@models/reportComment/reportComment.service'),
    prefix: '/api/report-comments',
  },
  {
    name: import('@models/reportChildComment/reportChildComment.service'),
    prefix: '/api/report-child-comments',
  },
  {
    name: import('@models/reportPost/reportPost.service'),
    prefix: '/api/report-posts',
  },
  {
    name: import('@models/likePost/likePost.service'),
    prefix: '/api/like-posts',
  },
  {
    name: import('@models/upload/upload.service'),
    prefix: '/api/upload',
  },
];

export default services;
