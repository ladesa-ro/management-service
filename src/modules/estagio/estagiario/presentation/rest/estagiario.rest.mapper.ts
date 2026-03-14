import type {
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "@/modules/estagio/estagiario/domain/queries";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";

/**
 * Mapeador de DTOs REST para aplicação
 */
export class EstagiarioRestMapper {
  static toCreateInput(dto: EstagiarioCreateInputRestDto): EstagiarioCreateCommand {
    return {
      idPerfilFk: dto.idPerfilFk,
      idCursoFk: dto.idCursoFk,
      idTurmaFk: dto.idTurmaFk,
      telefone: dto.telefone,
      emailInstitucional: dto.emailInstitucional,
      dataNascimento: dto.dataNascimento,
    };
  }

  static toUpdateInput(dto: EstagiarioUpdateInputRestDto): EstagiarioUpdateCommand {
    return {
      idPerfilFk: dto.idPerfilFk,
      idCursoFk: dto.idCursoFk,
      idTurmaFk: dto.idTurmaFk,
      telefone: dto.telefone,
      emailInstitucional: dto.emailInstitucional,
      dataNascimento: dto.dataNascimento,
    };
  }

  static toFindOneInput(dto: EstagiarioFindOneInputRestDto): EstagiarioFindOneQuery {
    return {
      id: dto.id,
    };
  }

  static toListInput(dto: EstagiarioListInputRestDto): EstagiarioListQuery {
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

  static toFindOneOutputDto(data: EstagiarioFindOneQueryResult): EstagiarioFindOneOutputRestDto {
    return {
      id: data.id,
      idPerfilFk: data.idPerfilFk,
      idCursoFk: data.idCursoFk,
      idTurmaFk: data.idTurmaFk,
      telefone: data.telefone,
      emailInstitucional: data.emailInstitucional,
      dataNascimento: data.dataNascimento,
      ativo: data.ativo,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
    };
  }

  static toListOutputDto(data: EstagiarioListQueryResult): EstagiarioListOutputRestDto {
    return {
      data: data.data.map((item) => this.toFindOneOutputDto(item)),
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  }
}
