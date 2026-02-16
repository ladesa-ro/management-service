import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { AmbienteRestMapper } from "@/modules/ambientes/ambiente/presentation/rest";
import { BlocoRestMapper } from "@/modules/ambientes/bloco/presentation/rest";
import { CursoRestMapper } from "@/modules/ensino/curso/presentation/rest";
import {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaUpdateInputDto,
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

  static toFindOneInput = createFindOneInputMapper(TurmaFindOneInputDto);

  static toListInput = createListInputMapper(TurmaListInputDto, [
    "filter.id",
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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    TurmaListOutputRestDto,
    TurmaRestMapper.toFindOneOutputDto,
  );
}
