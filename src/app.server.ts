import main from './app.main';
import { IFastify } from '@utils/fastifyInterface';

const server: IFastify = main({
  logger: true,
});

const port = process.env.PORT || 80;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

export default server;
