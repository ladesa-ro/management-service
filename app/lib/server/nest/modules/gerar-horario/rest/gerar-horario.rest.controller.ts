import { Controller, Get, NotFoundException } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GerarHorarioService } from "@/core/gerar-horario";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioRestController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  @Get("/")
  @ApiOperation({
    summary: "Publica mensagem para geracao de horario",
    operationId: "gerarHorarioPublish",
  })
  @ApiOkResponse({ type: String })
  async publishMessage(): Promise<string | NotFoundException> {
    return this.gerarHorarioService.publishMessage();
  }
}
