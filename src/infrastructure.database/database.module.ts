import { Global, Module } from "@nestjs/common";
import { AppTypeormConnectionProvider } from "./typeorm/connection/app-typeorm-connection.provider";

@Global()
@Module({
  providers: [AppTypeormConnectionProvider],
  exports: [AppTypeormConnectionProvider],
})
export class DatabaseModule {}
