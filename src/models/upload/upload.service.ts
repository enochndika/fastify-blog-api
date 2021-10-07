import { IFastify } from '@utils/fastifyInterface';
import { uploadFile } from '@models/upload/upload.controller';

async function uploadService(fastify: IFastify) {
  fastify.post(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    uploadFile,
  );
}

export default uploadService;
