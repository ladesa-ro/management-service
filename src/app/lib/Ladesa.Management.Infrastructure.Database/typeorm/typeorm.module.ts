import { Global, Module } from "@nestjs/common";
import { CONFIG_PORT } from "@/Ladesa.Management.Application/@shared/application/ports/out/config";
import { CONFIG_INFRASTRUCTURE_DATABASE } from "../Config/IConfigInfrastructureDatabase";
import { typeormProviders } from "./typeorm.providers";
import { TypeormService } from "./typeorm.service";

@Global()
@Module({
  providers: [
    { provide: CONFIG_INFRASTRUCTURE_DATABASE, useExisting: CONFIG_PORT },
    ...typeormProviders,
    TypeormService,
  ],
  exports: [...typeormProviders, TypeormService],
})
export class TypeormModule {}
