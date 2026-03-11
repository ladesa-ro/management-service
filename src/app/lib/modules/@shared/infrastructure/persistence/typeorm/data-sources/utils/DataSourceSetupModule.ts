import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { AppConfigModule } from "@/Ladesa.Management.Infrastructure.Config";

@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true }), AppConfigModule],
  providers: [
    // ...
  ],
})
export class DataSourceSetupModule {}
