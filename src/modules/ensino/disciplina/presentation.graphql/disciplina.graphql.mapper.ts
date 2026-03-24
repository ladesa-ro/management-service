import {
  DisciplinaCreateCommand,
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaUpdateCommand,
} from "@/modules/ensino/disciplina";
import { createListOutputMapper, mapDatedFields, mapImagemOutput } from "@/shared/mapping";
import {
  DisciplinaCreateInputGraphQlDto,
  DisciplinaFindOneOutputGraphQlDto,
  DisciplinaListInputGraphQlDto,
  DisciplinaListOutputGraphQlDto,
  DisciplinaUpdateInputGraphQlDto,
} from "./disciplina.graphql.dto";

export class DisciplinaGraphqlMapper {
  static toListInput(dto: DisciplinaListInputGraphQlDto | null): DisciplinaListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new DisciplinaListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.diarios.id"] = dto.filterDiariosId;
    return input;
  }

  static toFindOneInput(id: string): DisciplinaFindOneQuery {
    const input = new DisciplinaFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: DisciplinaCreateInputGraphQlDto): DisciplinaCreateCommand {
    const input = new DisciplinaCreateCommand();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.cargaHoraria = dto.cargaHoraria;
    input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DisciplinaUpdateInputGraphQlDto,
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
    if (dto.imagemCapa !== undefined) {
      input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DisciplinaFindOneQueryResult,
  ): DisciplinaFindOneOutputGraphQlDto {
    const dto = new DisciplinaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.nomeAbreviado = output.nomeAbreviado;
    dto.cargaHoraria = output.cargaHoraria;
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DisciplinaListOutputGraphQlDto,
    DisciplinaGraphqlMapper.toFindOneOutputDto,
  );
}
