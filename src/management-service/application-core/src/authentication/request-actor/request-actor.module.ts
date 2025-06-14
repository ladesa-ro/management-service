import { Module } from "@nestjs/common";
import { IdentityProviderModule } from "../../../../../infrastructure/management-service/integrations/identity-provider/identity-provider.module";
import { RequestActorService } from "./request-actor.service";

@Module({
  imports: [IdentityProviderModule],
  providers: [RequestActorService],
  exports: [RequestActorService],
})
export class RequestActorModule {}
