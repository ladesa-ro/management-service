import { Module } from "@nestjs/common";
import { OpenidConnectModule } from "../openid-connect";
import { JwksRsaClientService } from "./jwks-rsa-client.service";

@Module({
  imports: [OpenidConnectModule],
  providers: [JwksRsaClientService],
  exports: [JwksRsaClientService],
})
export class JwksRsaClientModule {}
