const services = [
  {
    name: import('./auth/auth.service'),
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
];

export default services;
