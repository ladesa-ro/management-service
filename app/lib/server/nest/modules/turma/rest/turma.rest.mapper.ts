import {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "@/modules/ensino/turma";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { BlocoRestMapper } from "@/server/nest/modules/bloco/rest";
import { CursoRestMapper } from "@/server/nest/modules/curso/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  TurmaCreateInputRestDto,
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
  TurmaListInputRestDto,
  TurmaListOutputRestDto,
  TurmaUpdateInputRestDto,
} from "./turma.rest.dto";

export class TurmaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: TurmaFindOneInputRestDto): TurmaFindOneInputDto {
    const input = new TurmaFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: TurmaListInputRestDto | null): TurmaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.ambientePadraoAula.nome"] = dto["filter.ambientePadraoAula.nome"];
    input["filter.ambientePadraoAula.codigo"] = dto["filter.ambientePadraoAula.codigo"];
    input["filter.ambientePadraoAula.capacidade"] = dto["filter.ambientePadraoAula.capacidade"];
    input["filter.ambientePadraoAula.tipo"] = dto["filter.ambientePadraoAula.tipo"];
    input["filter.curso.id"] = dto["filter.curso.id"];
    input["filter.curso.nome"] = dto["filter.curso.nome"];
    input["filter.curso.nomeAbreviado"] = dto["filter.curso.nomeAbreviado"];
    input["filter.curso.campus.id"] = dto["filter.curso.campus.id"];
    input["filter.curso.ofertaFormacao.id"] = dto["filter.curso.ofertaFormacao.id"];
    input["filter.curso.ofertaFormacao.nome"] = dto["filter.curso.ofertaFormacao.nome"];
    input["filter.curso.ofertaFormacao.slug"] = dto["filter.curso.ofertaFormacao.slug"];
    return input;
  }

  static toCreateInput(dto: TurmaCreateInputRestDto): TurmaCreateInputDto {
    const input = new TurmaCreateInputDto();
    input.periodo = dto.periodo;
    input.curso = { id: dto.curso.id };
    input.ambientePadraoAula = dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null;
    return input;
  }

  static toUpdateInput(
    params: TurmaFindOneInputRestDto,
    dto: TurmaUpdateInputRestDto,
  ): TurmaFindOneInputDto & TurmaUpdateInputDto {
    const input = new TurmaFindOneInputDto() as TurmaFindOneInputDto & TurmaUpdateInputDto;
    input.id = params.id;
    if (dto.periodo !== undefined) {
      input.periodo = dto.periodo;
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

  static toFindOneOutputDto(output: TurmaFindOneOutputDto): TurmaFindOneOutputRestDto {
    const dto = new TurmaFindOneOutputRestDto();
    dto.id = output.id;
    dto.periodo = output.periodo;
    dto.curso = CursoRestMapper.toFindOneOutputDto(output.curso);
    dto.ambientePadraoAula = output.ambientePadraoAula
      ? AmbienteRestMapper.toFindOneOutputDto(output.ambientePadraoAula)
      : null;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: TurmaListOutputDto): TurmaListOutputRestDto {
    const dto = new TurmaListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
