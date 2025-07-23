import { Module } from "@nestjs/common";
import { OpenidConnectService } from "./openid-connect.service";

@Module({
  imports: [],
  controllers: [],
  providers: [OpenidConnectService],
  exports: [OpenidConnectService],
})
export class OpenidConnectModule {}
