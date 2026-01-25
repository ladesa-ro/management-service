import { Controller, Get, NotFoundException } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GerarHorarioService } from "@/v2/core/gerar-horario/application/use-cases/gerar-horario.service";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Publica mensagem para geracao de horario" })
  @ApiOkResponse({ type: String })
  async gerarHorarioPublishMessage(): Promise<string | NotFoundException> {
    return this.gerarHorarioService.publishMessage();
  }
}
