import { Global, Module } from "@nestjs/common";
import { typeormProviders } from "../typeorm.providers";

@Global()
@Module({
  providers: [...typeormProviders],
  exports: [...typeormProviders],
})
export class TypeormModule {
}
