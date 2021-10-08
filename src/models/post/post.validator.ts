const postSchema = {
  body: {
    type: 'object',
    required: ['title', 'description', 'image', 'read_time', 'categoryId'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      image: {
        type: 'array',
        maxItems: 1,
        items: { type: 'string' },
      },
      read_time: { type: 'string' },
      categoryId: { type: 'number' },
    },
  },
};

export default postSchema;
