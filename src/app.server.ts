import main from './app.main';
import { IFastify } from '@utils/fastifyInterface';

const server: IFastify = main({
  logger: true,
});

server.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

export default server;
