import { AutorizacaoService } from "@ladesa-ro/management-management-service.domain";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("autorizacao")
@Controller("/autorizacao")
export class AutorizacaoController {
  constructor(readonly autorizacaoService: AutorizacaoService) {}
}
