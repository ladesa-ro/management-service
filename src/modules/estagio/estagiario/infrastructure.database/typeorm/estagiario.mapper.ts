import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { dateToDateString, dateToISO, isoToDate } from "@/shared/mapping/transforms";
import { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

export class EstagiarioMapper {
  static toDomain(entity: EstagiarioTypeormEntity): Estagiario {
    return Estagiario.load({
      id: entity.id,
      perfil: {
        id: entity.perfil?.id ?? (entity as unknown as Record<string, string>).id_perfil_fk,
      },
      curso: {
        id: entity.curso?.id ?? (entity as unknown as Record<string, string>).id_curso_fk,
      },
      turma: {
        id: entity.turma?.id ?? (entity as unknown as Record<string, string>).id_turma_fk,
      },
      telefone: entity.telefone,
      emailInstitucional: entity.emailInstitucional,
      dataNascimento: dateToDateString(entity.dataNascimento) as string,
      dateCreated: dateToISO(entity.dateCreated) as string,
      dateUpdated: dateToISO(entity.dateUpdated) as string,
      dateDeleted: dateToISO(entity.dateDeleted) as string | null,
    });
  }

  static toPersistence(estagiario: Estagiario): EstagiarioTypeormEntity {
    const entity = new EstagiarioTypeormEntity();
    entity.id = estagiario.id || generateUuidV7();
    entity.telefone = estagiario.telefone;
    entity.emailInstitucional = estagiario.emailInstitucional || null;
    entity.dataNascimento = isoToDate(estagiario.dataNascimento) as Date;
    entity.perfil = { id: estagiario.perfil.id } as unknown as typeof entity.perfil;
    entity.curso = { id: estagiario.curso.id } as unknown as typeof entity.curso;
    entity.turma = { id: estagiario.turma.id } as unknown as typeof entity.turma;
    entity.dateCreated = isoToDate(estagiario.dateCreated) as Date;
    entity.dateUpdated = isoToDate(estagiario.dateUpdated) as Date;
    entity.dateDeleted = isoToDate(estagiario.dateDeleted) as Date | null;
    return entity;
  }

  static toOutputDto(entity: EstagiarioTypeormEntity): EstagiarioFindOneQueryResult {
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
      dataNascimento: dateToDateString(entity.dataNascimento) as string,
      ativo: !entity.dateDeleted,
      dateCreated: dateToISO(entity.dateCreated) as string,
      dateUpdated: dateToISO(entity.dateUpdated) as string,
      dateDeleted: entity.dateDeleted ? (dateToISO(entity.dateDeleted) as string) : null,
    };
  }

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
