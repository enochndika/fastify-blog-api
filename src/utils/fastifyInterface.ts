import http from "http";
import { FastifyInstance } from "fastify";

export interface IFastify
  extends FastifyInstance<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse
  > {
  authenticate?: any;
}
