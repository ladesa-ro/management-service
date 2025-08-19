import { Global, Module } from "@nestjs/common";
import { ArquivoController } from "./api/arquivo.controller";
import { ArquivoService } from "./domain/arquivo.service";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoController],
  providers: [ArquivoService],
  exports: [ArquivoService],
})
export class ArquivoModule {}
