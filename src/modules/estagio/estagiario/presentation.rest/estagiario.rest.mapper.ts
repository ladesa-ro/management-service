import {
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
} from "@/modules/estagio/estagiario/domain/queries";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
  mapFieldsIfDefined,
} from "@/shared/mapping";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";

export class EstagiarioRestMapper {
  static toFindOneInput = createFindOneInputMapper(EstagiarioFindOneQuery);

  static toListInput = createListInputMapper(EstagiarioListQuery, [
    "filter.id",
    "filter.idPerfilFk",
    "filter.idCursoFk",
    "filter.idTurmaFk",
  ]);

  static toCreateInput(dto: EstagiarioCreateInputRestDto): EstagiarioCreateCommand {
    const input = new EstagiarioCreateCommand();
    input.idPerfilFk = dto.idPerfilFk;
    input.idCursoFk = dto.idCursoFk;
    input.idTurmaFk = dto.idTurmaFk;
    input.telefone = dto.telefone;
    input.emailInstitucional = dto.emailInstitucional;
    input.dataNascimento = dto.dataNascimento;
    return input;
  }

  static toUpdateInput(
    params: EstagiarioFindOneInputRestDto,
    dto: EstagiarioUpdateInputRestDto,
  ): EstagiarioFindOneQuery & EstagiarioUpdateCommand {
    const input = new EstagiarioFindOneQuery() as EstagiarioFindOneQuery & EstagiarioUpdateCommand;
    input.id = params.id;
    mapFieldsIfDefined(input, dto, [
      "idPerfilFk",
      "idCursoFk",
      "idTurmaFk",
      "telefone",
      "emailInstitucional",
      "dataNascimento",
    ]);
    return input;
  }

  static toFindOneOutputDto(output: EstagiarioFindOneQueryResult): EstagiarioFindOneOutputRestDto {
    const dto = new EstagiarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.idPerfilFk = output.idPerfilFk;
    dto.idCursoFk = output.idCursoFk;
    dto.idTurmaFk = output.idTurmaFk;
    dto.telefone = output.telefone;
    dto.emailInstitucional = output.emailInstitucional;
    dto.dataNascimento = output.dataNascimento;
    dto.ativo = output.ativo;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EstagiarioListOutputRestDto,
    EstagiarioRestMapper.toFindOneOutputDto,
  );
}
