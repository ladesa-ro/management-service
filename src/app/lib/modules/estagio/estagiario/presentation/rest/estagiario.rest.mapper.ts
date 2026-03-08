import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import type {
  EstagiarioCreateInputDto,
  EstagiarioFindOneInputDto,
  EstagiarioFindOneOutputDto,
  EstagiarioListInputDto,
  EstagiarioListOutputDto,
  EstagiarioUpdateInputDto,
} from "@/modules/estagio/estagiario/application/dtos";

/**
 * Mapeador de DTOs REST para aplicação
 */
export class EstagiarioRestMapper {
  static toCreateInput(dto: EstagiarioCreateInputRestDto): EstagiarioCreateInputDto {
    return {
      idPerfilFk: dto.idPerfilFk,
      idCursoFk: dto.idCursoFk,
      idTurmaFk: dto.idTurmaFk,
      telefone: dto.telefone,
      dataNascimento: dto.dataNascimento,
    };
  }

  static toUpdateInput(dto: EstagiarioUpdateInputRestDto): EstagiarioUpdateInputDto {
    return {
      idPerfilFk: dto.idPerfilFk,
      idCursoFk: dto.idCursoFk,
      idTurmaFk: dto.idTurmaFk,
      telefone: dto.telefone,
      dataNascimento: dto.dataNascimento,
    };
  }

  static toFindOneInput(dto: EstagiarioFindOneInputRestDto): EstagiarioFindOneInputDto {
    return {
      id: dto.id,
    };
  }

  static toListInput(dto: EstagiarioListInputRestDto): EstagiarioListInputDto {
    const normalizeIdArray = (value: string | string[] | undefined): string[] | undefined => {
      if (!value) return undefined;
      const arr = Array.isArray(value) ? value : [value];
      const filtered = arr.filter((id) => id && id.trim());
      return filtered.length > 0 ? filtered : undefined;
    };

    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      filterIdPerfilFk: normalizeIdArray(dto["filter.idPerfilFk"]),
      filterIdCursoFk: normalizeIdArray(dto["filter.idCursoFk"]),
      filterIdTurmaFk: normalizeIdArray(dto["filter.idTurmaFk"]),
    };
  }

  static toFindOneOutputDto(
    data: EstagiarioFindOneOutputDto,
  ): EstagiarioFindOneOutputRestDto {
    return {
      id: data.id,
      idPerfilFk: data.idPerfilFk,
      idCursoFk: data.idCursoFk,
      idTurmaFk: data.idTurmaFk,
      telefone: data.telefone,
      dataNascimento: data.dataNascimento,
      ativo: data.ativo,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
    };
  }

  static toListOutputDto(data: EstagiarioListOutputDto): EstagiarioListOutputRestDto {
    return {
      data: data.data.map((item) => this.toFindOneOutputDto(item)),
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  }
}
