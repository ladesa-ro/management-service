import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { Redis } from "ioredis";
import type { ServerOptions } from "socket.io";

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor?: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const redisHost = process.env.REDIS_HOST;
    if (!redisHost) {
      console.log("RedisIoAdapter: REDIS_HOST não configurado, usando adaptador em memória.");
      return;
    }

    const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);
    const pubClient = new Redis({ host: redisHost, port: redisPort });
    const subClient = pubClient.duplicate();

    this.adapterConstructor = createAdapter(pubClient, subClient);
    console.log(`RedisIoAdapter: Conectado ao Redis em ${redisHost}:${redisPort} para WebSocket pub/sub.`);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    }
    return server;
  }
}
