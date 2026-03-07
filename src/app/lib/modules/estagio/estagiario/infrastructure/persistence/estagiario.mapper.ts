import { v4 as uuidv4 } from "uuid";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario.domain";
import type { EstagiarioFindOneOutputDto } from "@/modules/estagio/estagiario/application/dtos";
import { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

/**
 * Mapeador de dados entre domínio e TypeORM
 */
export class EstagiarioMapper {
  /**
   * Converte entidade TypeORM para domínio
   */
  static toDomain(entity: EstagiarioTypeormEntity): Estagiario {
    const estagiario = Estagiario.fromData({
      id: entity.id,
      idPerfilFk: entity.idPerfilFk,
      idCursoFk: entity.idCursoFk,
      idTurmaFk: entity.idTurmaFk,
      telefone: entity.telefone,
      dataNascimento: entity.dataNascimento.toISOString().split("T")[0],
      dateCreated: entity.dateCreated.toISOString(),
      dateUpdated: entity.dateUpdated.toISOString(),
      dateDeleted: entity.dateDeleted ? entity.dateDeleted.toISOString() : null,
    });
    return estagiario;
  }

  /**
   * Converte domínio para TypeORM
   */
  static toPersistence(estagiario: Estagiario): EstagiarioTypeormEntity {
    const entity = new EstagiarioTypeormEntity();
    entity.id = estagiario.id || uuidv4();
    entity.idPerfilFk = estagiario.idPerfilFk;
    entity.idCursoFk = estagiario.idCursoFk;
    entity.idTurmaFk = estagiario.idTurmaFk;
    entity.telefone = estagiario.telefone;
    entity.dataNascimento = new Date(estagiario.dataNascimento);
    entity.perfil = { id: estagiario.idPerfilFk } as any;
    entity.curso = { id: estagiario.idCursoFk } as any;
    entity.turma = { id: estagiario.idTurmaFk } as any;
    entity.dateCreated = new Date(estagiario.dateCreated);
    entity.dateUpdated = new Date(estagiario.dateUpdated);
    entity.dateDeleted = estagiario.dateDeleted ? new Date(estagiario.dateDeleted) : null;
    return entity;
  }

  /**
   * Converte TypeORM para DTO output
   */
  static toOutputDto(entity: EstagiarioTypeormEntity): EstagiarioFindOneOutputDto {
    return {
      id: entity.id,
      idPerfilFk: entity.idPerfilFk,
      idCursoFk: entity.idCursoFk,
      idTurmaFk: entity.idTurmaFk,
      telefone: entity.telefone,
      dataNascimento: entity.dataNascimento.toISOString().split("T")[0],
      ativo: !entity.dateDeleted,
      dateCreated: entity.dateCreated.toISOString(),
      dateUpdated: entity.dateUpdated.toISOString(),
    };
  }

  /**
   * Converte domínio para DTO output
   */
  static domainToOutputDto(estagiario: Estagiario): EstagiarioFindOneOutputDto {
    return {
      id: estagiario.id!,
      idPerfilFk: estagiario.idPerfilFk,
      idCursoFk: estagiario.idCursoFk,
      idTurmaFk: estagiario.idTurmaFk,
      telefone: estagiario.telefone,
      dataNascimento: estagiario.dataNascimento,
      ativo: estagiario.isAtivo(),
      dateCreated: estagiario.dateCreated,
      dateUpdated: estagiario.dateUpdated,
    };
  }
}
