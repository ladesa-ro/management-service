import { Module } from "@nestjs/common";
import { IdentityProviderModule } from "../../integrations/identity-provider/identity-provider.module";
import { RequestActorService } from "./request-actor.service";

@Module({
  imports: [IdentityProviderModule],
  providers: [RequestActorService],
  exports: [RequestActorService],
})
export class RequestActorModule {}
