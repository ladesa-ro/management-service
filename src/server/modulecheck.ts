import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/server/nest/app.module";

async function modulecheck() {
  const app = await NestFactory.create(AppModule, { logger: ["error", "warn"] });
  await app.close();
  process.exit(0);
}

modulecheck().catch((err) => {
  console.error(err);
  process.exit(1);
});
