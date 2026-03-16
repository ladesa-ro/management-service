import { Body, Controller, Param, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";
import {
  TurmaDiarioConfigurarInputRestDto,
  TurmaDiarioConfigurarOutputRestDto,
  TurmaDiarioConfigurarParamsRestDto,
} from "./turma-diario-configurar.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/diarios")
export class TurmaDiarioConfigurarRestController {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
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

    await this.dataSource.transaction(async (manager) => {
      const diarioRepo = manager.getRepository(DiarioEntity);
      const diarioProfessorRepo = manager.getRepository(DiarioProfessorEntity);
      const now = new Date();

      for (const item of dto.diarios) {
        const diario = new DiarioEntity();
        diario.id = generateUuidV7();
        diario.ativo = true;
        (diario as any).turma = { id: params.turmaId };
        (diario as any).disciplina = { id: item.disciplinaId };
        (diario as any).calendarioLetivo = { id: dto.calendarioLetivoId };
        (diario as any).ambientePadrao = null;
        (diario as any).imagemCapa = null;
        diario.dateCreated = now;
        diario.dateUpdated = now;
        diario.dateDeleted = null;
        await diarioRepo.save(diario);

        for (const perfilId of item.professorPerfilIds) {
          const dp = new DiarioProfessorEntity();
          dp.id = generateUuidV7();
          dp.situacao = true;
          (dp as any).diario = { id: diario.id };
          (dp as any).perfil = { id: perfilId };
          dp.dateCreated = now;
          dp.dateUpdated = now;
          dp.dateDeleted = null;
          await diarioProfessorRepo.save(dp);
        }

        created++;
      }
    });

    return { created };
  }
}
