import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { AppConfigModule } from "@/infrastructure-antigo/config";

@Module({
  imports: [NestConfigModule.forRoot({isGlobal: true}), AppConfigModule],
  providers: [],
})
export class DataSourceModule {
}
