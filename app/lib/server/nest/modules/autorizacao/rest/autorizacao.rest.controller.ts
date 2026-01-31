import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AutorizacaoService } from "@/modules/autorizacao";

@ApiTags("autorizacao")
@Controller("/autorizacao")
export class AutorizacaoRestController {
  constructor(readonly autorizacaoService: AutorizacaoService) {}
}
