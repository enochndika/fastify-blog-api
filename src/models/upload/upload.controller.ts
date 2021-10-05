import { FastifyReply, FastifyRequest } from 'fastify';
import cloudinaryUpload from '@models/upload/cloudinary';

async function uploadFile(
  request: FastifyRequest<{
    Body: {
      image: Array<string>;
    };
  }>,
  reply: FastifyReply,
) {
  const files = request.files as any;
  const data = await cloudinaryUpload(files?.image.path);

  reply.send(data);
}

export { uploadFile };
