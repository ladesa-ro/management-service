import { Controller, NotFoundException, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GerarHorarioService } from "@/modules/gerar-horario";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioRestController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  @Post("/")
  @ApiOperation({
    summary: "Publica mensagem para geracao de horario",
    operationId: "gerarHorarioPublish",
  })
  @ApiCreatedResponse({ type: String })
  async publishMessage(): Promise<string | NotFoundException> {
    return this.gerarHorarioService.publishMessage();
  }
}
