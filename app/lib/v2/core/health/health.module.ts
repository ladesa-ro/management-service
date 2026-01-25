import { Module } from "@nestjs/common";
import { HealthController } from "@/v2/adapters/in/http/health/health.controller";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
