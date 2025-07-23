import { Module } from "@nestjs/common";
import { AuthenticationPassportModule } from "./passport";
import { RequestActorModule } from "./request-actor";

@Module({
  imports: [AuthenticationPassportModule, RequestActorModule],
})
export class AuthenticationModule {}
