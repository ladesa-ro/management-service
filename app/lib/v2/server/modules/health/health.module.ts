import { Module } from "@nestjs/common";
import { HealthController } from "./controllers";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
