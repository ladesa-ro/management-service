import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { CONFIG_PORT } from "@/Ladesa.Management.Application/@shared/application/ports/out/config";
import { AppConfigModule } from "@/Ladesa.Management.Infrastructure.Config";
import { CONFIG_INFRASTRUCTURE_DATABASE } from "../../../Config/IConfigInfrastructureDatabase";

@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true }), AppConfigModule],
  providers: [
    {
      provide: CONFIG_INFRASTRUCTURE_DATABASE,
      useExisting: CONFIG_PORT,
    },
  ],
})
export class DataSourceSetupModule {}
