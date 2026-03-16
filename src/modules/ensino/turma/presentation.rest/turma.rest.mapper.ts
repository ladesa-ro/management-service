import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { AmbienteRestMapper } from "@/modules/ambientes/ambiente/presentation.rest";
import { BlocoRestMapper } from "@/modules/ambientes/bloco/presentation.rest";
import { CursoRestMapper } from "@/modules/ensino/curso/presentation.rest";
import {
  TurmaCreateCommand,
  TurmaFindOneQuery,
  TurmaFindOneQueryResult,
  TurmaListQuery,
  TurmaUpdateCommand,
} from "@/modules/ensino/turma";
import {
  TurmaCreateInputRestDto,
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
  TurmaListOutputRestDto,
  TurmaUpdateInputRestDto,
} from "./turma.rest.dto";

export class TurmaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(TurmaFindOneQuery);

  static toListInput = createListInputMapper(TurmaListQuery, [
    "filter.id",
    "filter.periodo",
    "filter.ambientePadraoAula.nome",
    "filter.ambientePadraoAula.codigo",
    "filter.ambientePadraoAula.capacidade",
    "filter.ambientePadraoAula.tipo",
    "filter.curso.id",
    "filter.curso.nome",
    "filter.curso.nomeAbreviado",
    "filter.curso.campus.id",
    "filter.curso.ofertaFormacao.id",
    "filter.curso.ofertaFormacao.nome",
    "filter.curso.ofertaFormacao.slug",
  ]);

  static toCreateInput(dto: TurmaCreateInputRestDto): TurmaCreateCommand {
    const input = new TurmaCreateCommand();
    input.periodo = dto.periodo;
    input.nome = dto.nome ?? null;
    input.curso = { id: dto.curso.id };
    input.ambientePadraoAula = dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null;
    return input;
  }

  static toUpdateInput(
    params: TurmaFindOneInputRestDto,
    dto: TurmaUpdateInputRestDto,
  ): TurmaFindOneQuery & TurmaUpdateCommand {
    const input = new TurmaFindOneQuery() as TurmaFindOneQuery & TurmaUpdateCommand;
    input.id = params.id;
    if (dto.periodo !== undefined) {
      input.periodo = dto.periodo;
    }
    if (dto.nome !== undefined) {
      input.nome = dto.nome ?? null;
    }
    if (dto.curso !== undefined) {
      input.curso = { id: dto.curso.id };
    }
    if (dto.ambientePadraoAula !== undefined) {
      input.ambientePadraoAula = dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: TurmaFindOneQueryResult): TurmaFindOneOutputRestDto {
    const dto = new TurmaFindOneOutputRestDto();
    dto.id = output.id;
    dto.periodo = output.periodo;
    dto.nome = output.nome ?? null;
    dto.curso = CursoRestMapper.toFindOneOutputDto(output.curso);
    dto.ambientePadraoAula = output.ambientePadraoAula
      ? AmbienteRestMapper.toFindOneOutputDto(output.ambientePadraoAula)
      : null;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    TurmaListOutputRestDto,
    TurmaRestMapper.toFindOneOutputDto,
  );
}
