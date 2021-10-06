import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '@providers/prisma';
import { toNumber } from '@utils/formats';
import { IPost, IPostAuthorId } from './post.interface';

/* CRUD */

async function findUnique(
  request: FastifyRequest<{ Params: { slug: string } }>,
  reply: FastifyReply,
) {
  const post = await prisma.post.findFirst({
    where: {
      slug: request.params.slug,
    },
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
  });

  if (!post) {
    reply.statusCode = 404;
    return {};
  }
  return post;
}

async function create(
  request: FastifyRequest<{ Body: IPost; Params: IPostAuthorId }>,
) {
  const { body, params } = request;

  return prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      description: body.description,
      image: body.image,
      vip: body.vip,
      promoted: body.promoted,
      read_time: toNumber(body.read_time),
      authorId: toNumber(params.authorId),
      categoryId: toNumber(body.categoryId),
    },
  });
}

async function list(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
  }>,
) {
  const { query } = request;
  const limit = toNumber(query.limit) || 10;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.post.findMany({
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count();

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function update(
  request: FastifyRequest<{ Body: IPost; Params: { id: string } }>,
) {
  const { body, params } = request;

  return prisma.post.update({
    where: {
      id: toNumber(params.id),
    },
    data: {
      title: body.title,
      content: body.content,
      description: body.description,
      image: body.image,
      vip: body.vip,
      promoted: body.promoted,
      read_time: toNumber(body.read_time),
      categoryId: toNumber(body.categoryId),
    },
  });
}

async function remove(
  request: FastifyRequest<{
    Params: {
      id: string;
      authorId: string;
    };
  }>,
  reply: FastifyReply,
) {
  await prisma.post.deleteMany({
    where: {
      id: toNumber(request.params.id),
      authorId: toNumber(request.params.authorId),
    },
  });
  reply.statusCode = 204;
  return;
}

async function removeByAdmin(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  await prisma.post.delete({
    where: {
      id: toNumber(request.params.id),
    },
  });
  reply.statusCode = 204;
  return;
}

/* FILTERS */

async function listByCategory(
  request: FastifyRequest<{
    Params: {
      categoryId: string;
    };
  }>,
) {
  const { params } = request;

  return prisma.post.findMany({
    where: {
      categoryId: toNumber(params.categoryId),
    },
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    take: 4,
  });
}

async function listByAuthor(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
    Params: {
      authorId: number;
    };
  }>,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 8;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.post.findMany({
    where: {
      authorId: toNumber(params.authorId),
    },
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count({
    where: { authorId: toNumber(params.authorId) },
  });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function listByTrends(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
  }>,
) {
  const { query } = request;
  const limit = toNumber(query.limit) || 8;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.post.findMany({
    where: {
      promoted: true,
    },
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count({ where: { promoted: true } });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function listRelated(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply,
) {
  const { query, params } = request;
  const limit = toNumber(query.limit) || 8;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const post = await prisma.post.findUnique({
    where: { id: toNumber(params.id) },
  });

  if (!post) {
    reply.statusCode = 404;
    return {};
  }

  const data = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
    },
    include: {
      category: true,
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count({
    where: { categoryId: post.categoryId },
  });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function listVip(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
    };
  }>,
) {
  const { query } = request;
  const limit = toNumber(query.limit) || 3;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.post.findMany({
    where: {
      vip: true,
    },
    include: {
      category: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count({ where: { vip: true } });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

async function listBySearch(
  request: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      sortBy: string;
      text: string;
    };
  }>,
) {
  const { query } = request;
  const limit = toNumber(query.limit) || 8;
  const page = toNumber(query.page) || 1;
  const order = query.sortBy || 'id';

  const data = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: request.query.text,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: request.query.text,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      category: true,
      author: {
        select: {
          id: true,
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: [
      {
        [order]: 'desc',
      },
    ],
    take: limit,
    skip: (page - 1) * limit,
  });

  const count = await prisma.post.count({
    where: {
      OR: [
        {
          title: {
            contains: request.query.text,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: request.query.text,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return {
    totalPages: Math.ceil(count / limit),
    currentPage: toNumber(page),
    data,
  };
}

export {
  create,
  list,
  findUnique,
  update,
  remove,
  removeByAdmin,
  listByCategory,
  listByTrends,
  listRelated,
  listVip,
  listBySearch,
  listByAuthor,
};
