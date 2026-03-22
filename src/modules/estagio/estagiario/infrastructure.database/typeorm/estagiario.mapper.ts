import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { getNowISO } from "@/utils/date";
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
      if (!date) return getNowISO();
      if (typeof date === "string") return date;
      return (date as Date).toISOString();
    };

    const estagiario = Estagiario.load({
      id: entity.id,
      perfil: {
        id: entity.perfil?.id ?? (entity as unknown as Record<string, string>).id_perfil_fk,
      },
      curso: { id: entity.curso?.id ?? (entity as unknown as Record<string, string>).id_curso_fk },
      turma: { id: entity.turma?.id ?? (entity as unknown as Record<string, string>).id_turma_fk },
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
    entity.telefone = estagiario.telefone;
    entity.emailInstitucional = estagiario.emailInstitucional || null;
    entity.dataNascimento = new Date(estagiario.dataNascimento);
    entity.perfil = { id: estagiario.perfil.id } as unknown as typeof entity.perfil;
    entity.curso = { id: estagiario.curso.id } as unknown as typeof entity.curso;
    entity.turma = { id: estagiario.turma.id } as unknown as typeof entity.turma;
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
      if (!date) return getNowISO();
      if (typeof date === "string") return date;
      return (date as Date).toISOString();
    };

    const dataNascimentoFormatted =
      typeof entity.dataNascimento === "string"
        ? entity.dataNascimento
        : (entity.dataNascimento as Date).toISOString().split("T")[0];

    return {
      id: entity.id,
      perfil: (entity.perfil ?? {
        id: (entity as unknown as Record<string, string>).id_perfil_fk,
      }) as unknown as EstagiarioFindOneQueryResult["perfil"],
      curso: (entity.curso ?? {
        id: (entity as unknown as Record<string, string>).id_curso_fk,
      }) as unknown as EstagiarioFindOneQueryResult["curso"],
      turma: (entity.turma ?? {
        id: (entity as unknown as Record<string, string>).id_turma_fk,
      }) as unknown as EstagiarioFindOneQueryResult["turma"],
      telefone: entity.telefone,
      emailInstitucional: entity.emailInstitucional,
      dataNascimento: dataNascimentoFormatted,
      ativo: !entity.dateDeleted,
      dateCreated: formatDateToISOString(entity.dateCreated),
      dateUpdated: formatDateToISOString(entity.dateUpdated),
      dateDeleted: entity.dateDeleted ? entity.dateDeleted.toISOString() : null,
    };
  }

  /**
   * Converte domínio para DTO output
   */
  static domainToOutputDto(estagiario: Estagiario): EstagiarioFindOneQueryResult {
    return {
      id: estagiario.id!,
      perfil: estagiario.perfil as unknown as EstagiarioFindOneQueryResult["perfil"],
      curso: estagiario.curso as unknown as EstagiarioFindOneQueryResult["curso"],
      turma: estagiario.turma as unknown as EstagiarioFindOneQueryResult["turma"],
      telefone: estagiario.telefone,
      emailInstitucional: estagiario.emailInstitucional || null,
      dataNascimento: estagiario.dataNascimento,
      ativo: estagiario.ativo,
      dateCreated: estagiario.dateCreated,
      dateUpdated: estagiario.dateUpdated,
      dateDeleted: estagiario.dateDeleted ?? null,
    };
  }
}
