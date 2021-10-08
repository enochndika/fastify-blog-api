import main from './app.main';
import { IFastify } from '@utils/fastifyInterface';

const server: IFastify = main({
  logger: true,
});

const port = process.env.PORT || 80;

server.listen(port, '0.0.0.0').then((r) => console.log(r));

export default server;
