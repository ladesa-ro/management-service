import { Module } from "@nestjs/common";
import { OpenidConnectService } from "./domain/openid-connect.service";

@Module({
  imports: [],
  controllers: [],
  providers: [OpenidConnectService],
  exports: [OpenidConnectService],
})
export class OpenidConnectModule {
}
