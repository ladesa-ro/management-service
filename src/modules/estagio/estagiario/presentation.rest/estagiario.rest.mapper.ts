import { PerfilRestMapper } from "@/modules/acesso/perfil/presentation.rest/perfil.rest.mapper";
import { CursoRestMapper } from "@/modules/ensino/curso/presentation.rest/curso.rest.mapper";
import { TurmaRestMapper } from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
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
    "filter.perfil.id",
    "filter.curso.id",
    "filter.turma.id",
  ]);

  static toCreateInput(dto: EstagiarioCreateInputRestDto): EstagiarioCreateCommand {
    const input = new EstagiarioCreateCommand();
    input.perfil = { id: dto.perfil.id };
    input.curso = { id: dto.curso.id };
    input.turma = { id: dto.turma.id };
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
    if (dto.perfil !== undefined) {
      input.perfil = { id: dto.perfil.id };
    }
    if (dto.curso !== undefined) {
      input.curso = { id: dto.curso.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.telefone !== undefined) {
      input.telefone = dto.telefone;
    }
    if (dto.emailInstitucional !== undefined) {
      input.emailInstitucional = dto.emailInstitucional;
    }
    if (dto.dataNascimento !== undefined) {
      input.dataNascimento = dto.dataNascimento;
    }
    return input;
  }

  static toFindOneOutputDto(output: EstagiarioFindOneQueryResult): EstagiarioFindOneOutputRestDto {
    const dto = new EstagiarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.perfil = PerfilRestMapper.toFindOneOutputDto(output.perfil);
    dto.curso = CursoRestMapper.toFindOneOutputDto(output.curso);
    dto.turma = TurmaRestMapper.toFindOneOutputDto(output.turma);
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
