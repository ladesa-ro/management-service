import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IDiarioConfigurarRepository } from "@/modules/ensino/turma/domain/repositories";
import {
  TurmaDiarioConfigurarInputRestDto,
  TurmaDiarioConfigurarOutputRestDto,
  TurmaDiarioConfigurarParamsRestDto,
} from "./turma-diario-configurar.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/diarios")
export class TurmaDiarioConfigurarRestController {
  constructor(
    @DeclareDependency(IDiarioConfigurarRepository)
    private readonly diarioConfigurarRepository: IDiarioConfigurarRepository,
  ) {}

  @Post("/configurar")
  @ApiOperation({
    summary: "Configura diarios da turma em lote (disciplinas + professores)",
    operationId: "turmaDiarioConfigurar",
  })
  @ApiCreatedResponse({ type: TurmaDiarioConfigurarOutputRestDto })
  @ApiForbiddenResponse()
  async configurar(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: TurmaDiarioConfigurarParamsRestDto,
    @Body() dto: TurmaDiarioConfigurarInputRestDto,
  ): Promise<TurmaDiarioConfigurarOutputRestDto> {
    let created = 0;

    for (const item of dto.diarios) {
      const diarioId = generateUuidV7();

      await this.diarioConfigurarRepository.createDiario({
        id: diarioId,
        ativo: true,
        turmaId: params.turmaId,
        disciplinaId: item.disciplinaId,
        calendarioLetivoId: dto.calendarioLetivoId,
      });

      for (const perfilId of item.professorPerfilIds) {
        await this.diarioConfigurarRepository.createDiarioProfessor({
          id: generateUuidV7(),
          situacao: true,
          diarioId: diarioId,
          perfilId: perfilId,
        });
      }

      created++;
    }

    return { created };
  }
}
