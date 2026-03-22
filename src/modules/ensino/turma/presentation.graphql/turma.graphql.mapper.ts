import { AmbienteGraphqlMapper } from "@/modules/ambientes/ambiente/presentation.graphql/ambiente.graphql.mapper";
import { CursoGraphqlMapper } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.mapper";
import {
  TurmaCreateCommand,
  TurmaFindOneQuery,
  TurmaFindOneQueryResult,
  TurmaListQuery,
  TurmaUpdateCommand,
} from "@/modules/ensino/turma";
import { createListOutputMapper, mapDatedFields, mapImagemOutput } from "@/shared/mapping";
import {
  TurmaCreateInputGraphQlDto,
  TurmaFindOneOutputGraphQlDto,
  TurmaListInputGraphQlDto,
  TurmaListOutputGraphQlDto,
  TurmaUpdateInputGraphQlDto,
} from "./turma.graphql.dto";

export class TurmaGraphqlMapper {
  static toListInput(dto: TurmaListInputGraphQlDto | null): TurmaListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.ambientePadraoAula.nome"] = dto.filterAmbientePadraoAulaNome;
    input["filter.ambientePadraoAula.codigo"] = dto.filterAmbientePadraoAulaCodigo;
    input["filter.ambientePadraoAula.capacidade"] = dto.filterAmbientePadraoAulaCapacidade;
    input["filter.ambientePadraoAula.tipo"] = dto.filterAmbientePadraoAulaTipo;
    input["filter.curso.id"] = dto.filterCursoId;
    input["filter.curso.nome"] = dto.filterCursoNome;
    input["filter.curso.nomeAbreviado"] = dto.filterCursoNomeAbreviado;
    input["filter.curso.campus.id"] = dto.filterCursoCampusId;
    input["filter.curso.ofertaFormacao.id"] = dto.filterCursoOfertaFormacaoId;
    input["filter.curso.ofertaFormacao.nome"] = dto.filterCursoOfertaFormacaoNome;
    input["filter.curso.ofertaFormacao.slug"] = dto.filterCursoOfertaFormacaoSlug;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): TurmaFindOneQuery {
    const input = new TurmaFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: TurmaCreateInputGraphQlDto): TurmaCreateCommand {
    const input = new TurmaCreateCommand();
    input.periodo = dto.periodo;
    input.curso = { id: dto.curso.id };
    input.ambientePadraoAula = dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null;
    input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: TurmaUpdateInputGraphQlDto,
  ): TurmaFindOneQuery & TurmaUpdateCommand {
    const input = new TurmaFindOneQuery() as TurmaFindOneQuery & TurmaUpdateCommand;
    input.id = params.id;
    if (dto.periodo !== undefined) input.periodo = dto.periodo;
    if (dto.curso !== undefined) input.curso = { id: dto.curso.id };
    if (dto.ambientePadraoAula !== undefined) {
      input.ambientePadraoAula = dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null;
    }
    if (dto.imagemCapa !== undefined) {
      input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    }
    return input;
  }

  static toFindOneOutputDto(output: TurmaFindOneQueryResult): TurmaFindOneOutputGraphQlDto {
    const dto = new TurmaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.periodo = output.periodo;
    dto.curso = CursoGraphqlMapper.toFindOneOutputDto(output.curso);
    dto.ambientePadraoAula = output.ambientePadraoAula
      ? AmbienteGraphqlMapper.toFindOneOutputDto(output.ambientePadraoAula)
      : null;
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    TurmaListOutputGraphQlDto,
    TurmaGraphqlMapper.toFindOneOutputDto,
  );
}
