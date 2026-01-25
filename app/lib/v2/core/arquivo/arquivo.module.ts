import { Global, Module } from "@nestjs/common";
import { ArquivoController } from "@/v2/adapters/in/http/arquivo/arquivo.controller";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoController],
  providers: [ArquivoService],
  exports: [ArquivoService],
})
export class ArquivoModule {}
