import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { BlocoRestMapper } from "@/modules/ambientes/bloco/presentation.rest";
import {
  DisciplinaCreateCommand,
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaUpdateCommand,
} from "@/modules/ensino/disciplina";
import {
  DisciplinaCreateInputRestDto,
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  DisciplinaListOutputRestDto,
  DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";

export class DisciplinaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(DisciplinaFindOneQuery);

  static toListInput = createListInputMapper(DisciplinaListQuery, ["filter.id"]);

  static toCreateInput(dto: DisciplinaCreateInputRestDto): DisciplinaCreateCommand {
    const input = new DisciplinaCreateCommand();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.cargaHoraria = dto.cargaHoraria;
    return input;
  }

  static toUpdateInput(
    params: DisciplinaFindOneInputRestDto,
    dto: DisciplinaUpdateInputRestDto,
  ): DisciplinaFindOneQuery & DisciplinaUpdateCommand {
    const input = new DisciplinaFindOneQuery() as DisciplinaFindOneQuery & DisciplinaUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.nomeAbreviado !== undefined) {
      input.nomeAbreviado = dto.nomeAbreviado;
    }
    if (dto.cargaHoraria !== undefined) {
      input.cargaHoraria = dto.cargaHoraria;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: DisciplinaFindOneQueryResult): DisciplinaFindOneOutputRestDto {
    const dto = new DisciplinaFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.cargaHoraria = output.cargaHoraria;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DisciplinaListOutputRestDto,
    DisciplinaRestMapper.toFindOneOutputDto,
  );
}
