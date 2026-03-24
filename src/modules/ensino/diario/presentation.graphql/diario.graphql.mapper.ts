import type { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente";
import {
  DiarioCreateCommand,
  DiarioFindOneQuery,
  DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioUpdateCommand,
} from "@/modules/ensino/diario";
import type { DisciplinaFindOneQueryResult } from "@/modules/ensino/disciplina";
import type { TurmaFindOneQueryResult } from "@/modules/ensino/turma";
import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.mapper";
import { createListOutputMapper, mapDatedFields, mapImagemOutput } from "@/shared/mapping";
import {
  AmbienteFindOneOutputForDiarioGraphQlDto,
  DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  DiarioUpdateInputGraphQlDto,
  DisciplinaFindOneOutputForDiarioGraphQlDto,
  TurmaFindOneOutputForDiarioGraphQlDto,
} from "./diario.graphql.dto";

export class DiarioGraphqlMapper {
  static toListInput(dto: DiarioListInputGraphQlDto | null): DiarioListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.turma.id"] = dto.filterTurmaId;
    input["filter.disciplina.id"] = dto.filterDisciplinaId;
    input["filter.calendarioLetivo.id"] = dto.filterCalendarioLetivoId;
    input["filter.ambientePadrao.id"] = dto.filterAmbientePadraoId;
    return input;
  }

  static toFindOneInput(id: string): DiarioFindOneQuery {
    const input = new DiarioFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: DiarioCreateInputGraphQlDto): DiarioCreateCommand {
    const input = new DiarioCreateCommand();
    input.ativo = dto.ativo;
    input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    input.turma = { id: dto.turma.id };
    input.disciplina = { id: dto.disciplina.id };
    input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: DiarioUpdateInputGraphQlDto,
  ): DiarioFindOneQuery & DiarioUpdateCommand {
    const input = new DiarioFindOneQuery() as DiarioFindOneQuery & DiarioUpdateCommand;
    input.id = id;
    if (dto.ativo !== undefined) {
      input.ativo = dto.ativo;
    }
    if (dto.calendarioLetivo !== undefined) {
      input.calendarioLetivo = { id: dto.calendarioLetivo.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.disciplina !== undefined) {
      input.disciplina = { id: dto.disciplina.id };
    }
    if (dto.ambientePadrao !== undefined) {
      input.ambientePadrao = dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null;
    }
    if (dto.imagemCapa !== undefined) {
      input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    }
    return input;
  }

  private static mapTurma(turma: TurmaFindOneQueryResult): TurmaFindOneOutputForDiarioGraphQlDto {
    const dto = new TurmaFindOneOutputForDiarioGraphQlDto();
    dto.id = turma.id;
    dto.periodo = turma.periodo;
    mapDatedFields(dto, turma);
    return dto;
  }

  private static mapDisciplina(
    disciplina: DisciplinaFindOneQueryResult,
  ): DisciplinaFindOneOutputForDiarioGraphQlDto {
    const dto = new DisciplinaFindOneOutputForDiarioGraphQlDto();
    dto.id = disciplina.id;
    dto.nome = disciplina.nome;
    dto.nomeAbreviado = disciplina.nomeAbreviado;
    dto.cargaHoraria = disciplina.cargaHoraria;
    mapDatedFields(dto, disciplina);
    return dto;
  }

  private static mapAmbiente(
    ambiente: AmbienteFindOneQueryResult | null,
  ): AmbienteFindOneOutputForDiarioGraphQlDto | null {
    if (!ambiente) return null;
    const dto = new AmbienteFindOneOutputForDiarioGraphQlDto();
    dto.id = ambiente.id;
    dto.nome = ambiente.nome;
    dto.descricao = ambiente.descricao;
    dto.codigo = ambiente.codigo;
    dto.capacidade = ambiente.capacidade;
    dto.tipo = ambiente.tipo;
    mapDatedFields(dto, ambiente);
    return dto;
  }

  static toFindOneOutputDto(output: DiarioFindOneQueryResult): DiarioFindOneOutputGraphQlDto {
    const dto = new DiarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.calendarioLetivo = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(
      output.calendarioLetivo,
    );
    dto.turma = this.mapTurma(output.turma);
    dto.disciplina = this.mapDisciplina(output.disciplina);
    dto.ambientePadrao = this.mapAmbiente(output.ambientePadrao);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioListOutputGraphQlDto,
    DiarioGraphqlMapper.toFindOneOutputDto,
  );
}
