import { GerarHorarioService } from "@ladesa-ro/management-management-service.domain";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  //

  @Get("/")
  async modalidadeFindAll() {
    return this.gerarHorarioService.publishMessage();
  }
  //
}
