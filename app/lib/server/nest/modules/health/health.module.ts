import { Module } from "@nestjs/common";
import { HealthRestController } from "./rest";

@Module({
  controllers: [HealthRestController],
})
export class HealthModule {}
