import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

/**
 * Mapeador de dados entre domínio e TypeORM
 */
export class EstagiarioMapper {
  /**
   * Converte entidade TypeORM para domínio
   */
  static toDomain(entity: EstagiarioTypeormEntity): Estagiario {
    const formatDateToISOString = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      if (typeof date === "string") return date;
      return (date as Date).toISOString();
    };

    const formatDateToDateString = (date: Date | string | null | undefined): string => {
      if (!date) return new Date().toISOString();
      if (typeof date === "string") return date;
      return (date as Date).toISOString();
    };

    const estagiario = Estagiario.load({
      id: entity.id,
      idPerfilFk: entity.idPerfilFk,
      idCursoFk: entity.idCursoFk,
      idTurmaFk: entity.idTurmaFk,
      telefone: entity.telefone,
      emailInstitucional: entity.emailInstitucional,
      dataNascimento:
        typeof entity.dataNascimento === "string"
          ? entity.dataNascimento
          : (entity.dataNascimento as Date).toISOString().split("T")[0],
      dateCreated: formatDateToDateString(entity.dateCreated),
      dateUpdated: formatDateToDateString(entity.dateUpdated),
      dateDeleted: formatDateToISOString(entity.dateDeleted),
    });
    return estagiario;
  }

  /**
   * Converte domínio para TypeORM
   */
  static toPersistence(estagiario: Estagiario): EstagiarioTypeormEntity {
    const entity = new EstagiarioTypeormEntity();
    entity.id = estagiario.id || generateUuidV7();
    entity.idPerfilFk = estagiario.idPerfilFk;
    entity.idCursoFk = estagiario.idCursoFk;
    entity.idTurmaFk = estagiario.idTurmaFk;
    entity.telefone = estagiario.telefone;
    entity.emailInstitucional = estagiario.emailInstitucional || null;
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
  static toOutputDto(entity: EstagiarioTypeormEntity): EstagiarioFindOneQueryResult {
    const formatDateToISOString = (date: Date | string | null | undefined): string => {
      if (!date) return new Date().toISOString();
      if (typeof date === "string") return date;
      return (date as Date).toISOString();
    };

    const dataNascimentoFormatted =
      typeof entity.dataNascimento === "string"
        ? entity.dataNascimento
        : (entity.dataNascimento as Date).toISOString().split("T")[0];

    return {
      id: entity.id,
      idPerfilFk: entity.idPerfilFk,
      idCursoFk: entity.idCursoFk,
      idTurmaFk: entity.idTurmaFk,
      telefone: entity.telefone,
      emailInstitucional: entity.emailInstitucional,
      dataNascimento: dataNascimentoFormatted,
      ativo: !entity.dateDeleted,
      dateCreated: formatDateToISOString(entity.dateCreated),
      dateUpdated: formatDateToISOString(entity.dateUpdated),
    };
  }

  /**
   * Converte domínio para DTO output
   */
  static domainToOutputDto(estagiario: Estagiario): EstagiarioFindOneQueryResult {
    return {
      id: estagiario.id!,
      idPerfilFk: estagiario.idPerfilFk,
      idCursoFk: estagiario.idCursoFk,
      idTurmaFk: estagiario.idTurmaFk,
      telefone: estagiario.telefone,
      emailInstitucional: estagiario.emailInstitucional || null,
      dataNascimento: estagiario.dataNascimento,
      ativo: estagiario.ativo,
      dateCreated: estagiario.dateCreated,
      dateUpdated: estagiario.dateUpdated,
    };
  }
}
