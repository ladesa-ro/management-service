import { createListOutputMapper } from "@/modules/@shared/application/mappers";
import { PerfilRestMapper } from "@/modules/acesso/perfil/presentation.rest";
import {
  DiarioProfessorBulkReplaceCommand,
  DiarioProfessorListQuery,
} from "../domain";
import type { DiarioProfessorFindOneQueryResult } from "../domain/queries";
import { DiarioRestMapper } from "./diario.rest.mapper";
import {
  DiarioProfessorBulkReplaceInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
  DiarioProfessorListInputRestDto,
  DiarioProfessorListOutputRestDto,
  DiarioProfessorParentParamsRestDto,
} from "./diario-professor.rest.dto";

export class DiarioProfessorRestMapper {
  static toListInput(
    parentParams: DiarioProfessorParentParamsRestDto,
    dto: DiarioProfessorListInputRestDto,
  ): DiarioProfessorListQuery {
    const input = new DiarioProfessorListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto["filter.id"];
    input["filter.diario.id"] = [parentParams.diarioId];
    input["filter.perfil.id"] = dto["filter.perfil.id"];
    input["filter.perfil.usuario.id"] = dto["filter.perfil.usuario.id"];
    return input;
  }

  static toBulkReplaceInput(
    parentParams: DiarioProfessorParentParamsRestDto,
    dto: DiarioProfessorBulkReplaceInputRestDto,
  ): DiarioProfessorBulkReplaceCommand {
    const input = new DiarioProfessorBulkReplaceCommand();
    input.diarioId = parentParams.diarioId;
    input.professores = dto.professores.map((p) => ({
      perfilId: p.perfilId,
      situacao: p.situacao,
    }));
    return input;
  }

  static toFindOneOutputDto(
    output: DiarioProfessorFindOneQueryResult,
  ): DiarioProfessorFindOneOutputRestDto {
    const dto = new DiarioProfessorFindOneOutputRestDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.perfil = PerfilRestMapper.toFindOneOutputDto(output.perfil);
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioProfessorListOutputRestDto,
    DiarioProfessorRestMapper.toFindOneOutputDto,
  );
}
