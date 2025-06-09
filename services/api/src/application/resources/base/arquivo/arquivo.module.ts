import { Global, Module } from "@nestjs/common";
import { ArquivoController } from "./arquivo.controller";
import { ArquivoService } from "./arquivo.service";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoController],
  providers: [ArquivoService],
  exports: [ArquivoService],
})
export class ArquivoModule {}
