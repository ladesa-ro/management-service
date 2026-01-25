import { Module } from "@nestjs/common";
import { HealthController } from "./http";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
