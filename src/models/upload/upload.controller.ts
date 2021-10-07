import fs from 'fs';
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
  const path = files?.picture?.path;
  const data = await cloudinaryUpload(path);

  if (data) {
    await fs.unlinkSync(path);
    reply.send(data);
  }
}

export { uploadFile };
