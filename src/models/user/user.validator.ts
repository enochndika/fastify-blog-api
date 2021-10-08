const userSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'fullName'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      fullName: { type: 'string' },
    },
  },
};

export default userSchema;
