import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AutorizacaoService } from "@/v2/core/autorizacao/application/use-cases/autorizacao.service";

@ApiTags("autorizacao")
@Controller("/autorizacao")
export class AutorizacaoController {
  constructor(readonly autorizacaoService: AutorizacaoService) {}
}
