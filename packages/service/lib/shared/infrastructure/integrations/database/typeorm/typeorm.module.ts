import { Global, Module } from "@nestjs/common";
import { typeormProviders } from "./typeorm.providers";
import { TypeormService } from "./typeorm.service";

@Global()
@Module({
  providers: [
    // ...
    ...typeormProviders,
    TypeormService,
  ],
  exports: [
    // ...
    ...typeormProviders,
    TypeormService,
  ],
})
export class TypeormModule {}
