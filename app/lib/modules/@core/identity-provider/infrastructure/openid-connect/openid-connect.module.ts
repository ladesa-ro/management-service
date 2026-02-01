import { Module } from "@nestjs/common";
import { OpenidConnectService } from "./openid-connect.service";

@Module({
  providers: [OpenidConnectService],
  exports: [OpenidConnectService],
})
export class OpenidConnectModule {}
