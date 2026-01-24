import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { GerarHorarioService } from "../domain/gerar-horario.service";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Publica mensagem para geracao de horario" })
  @ApiOkResponse()
  async gerarHorarioPublishMessage(): Promise<void> {
    return this.gerarHorarioService.publishMessage();
  }
}
