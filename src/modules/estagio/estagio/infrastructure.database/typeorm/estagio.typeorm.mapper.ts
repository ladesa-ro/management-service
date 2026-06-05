import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries";
import { createMapper } from "@/shared/mapping";
import { getNowISO } from "@/utils/date";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain Aggregate)
// ============================================================================

export const entityToDomain = createMapper<EstagioTypeormEntity, Estagio>((entity) => {
  if (!entity) {
    throw new Error("EstagioTypeormMapper.entityToDomain received null/undefined entity");
  }

  return Estagio.load({
    id: entity.id,
    campus: entity.campus?.id ? { id: entity.campus.id } : ({ id: "" } as any),
    empresa: { id: entity.empresa.id },
    CursoReferencia: entity.CursoReferencia ? { id: entity.CursoReferencia.id } : null,
    estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,
    usuarioOrientador: entity.usuarioOrientador ? { id: entity.usuarioOrientador.id } : null,
    cargaHoraria: entity.cargaHoraria,
    dataInicio: entity.dataInicio,
    dataFim: entity.dataFim,
    status: entity.status,
    nomeSupervisor: entity.nomeSupervisor,
    emailSupervisor: entity.emailSupervisor,
    telefoneSupervisor: entity.telefoneSupervisor,
    aditivo: entity.aditivo,
    tipoAditivo: entity.tipoAditivo,
    horariosEstagio: (entity.horariosEstagio ?? [])
      .filter((horario) => !horario.dateDeleted)
      .map((horario) => ({
        id: horario.id,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFim: horario.horaFim,
      })),
    // Campos adicionais do CSV
    dataPrevistaFim: entity.dataPrevistaFim ?? null,
    nomeSeguradora: entity.nomeSeguradora ?? null,
    numeroApoliceSeguro: entity.numeroApoliceSeguro ?? null,
    visitasRealizadas: entity.visitasRealizadas ?? null,
    visitasJustificadas: entity.visitasJustificadas ?? null,
    visitasAVencer: entity.visitasAVencer ?? null,
    visitasNaoRealizadas: entity.visitasNaoRealizadas ?? null,
    resumoPendencias: entity.resumoPendencias ?? null,
    encerramentoPor: entity.encerramentoPor ?? null,
    motivacaoDesligamento: entity.motivacaoDesligamento ?? null,
    motivoRescisao: entity.motivoRescisao ?? null,
    mediaNotasSupervisor:
      entity.mediaNotasSupervisor != null ? Number(entity.mediaNotasSupervisor) : null,
    foiOuSeraContratado: entity.foiOuSeraContratado ?? null,
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
    dateDeleted: entity.dateDeleted,
  });
});

// ============================================================================
// Domínio → Persistência (Domain Aggregate → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<Estagio, EstagioTypeormEntity>((estagio) => {
  const entity = Object.assign(Object.create(EstagioTypeormEntity.prototype), {
    id: estagio.id || generateUuidV7(),
    campus: estagio.campus?.id ? { id: estagio.campus.id } : null,
    empresa: { id: estagio.empresa.id },
    CursoReferencia: estagio.CursoReferencia ? { id: estagio.CursoReferencia.id } : null,
    estagiario: estagio.estagiario ? { id: estagio.estagiario.id } : null,
    usuarioOrientador: estagio.usuarioOrientador ? { id: estagio.usuarioOrientador.id } : null,
    cargaHoraria: estagio.cargaHoraria,
    dataInicio: estagio.dataInicio,
    dataFim: estagio.dataFim,
    status: estagio.status,
    nomeSupervisor: estagio.nomeSupervisor,
    emailSupervisor: estagio.emailSupervisor,
    telefoneSupervisor: estagio.telefoneSupervisor,
    aditivo: estagio.aditivo,
    tipoAditivo: estagio.tipoAditivo,
    // Campos adicionais do CSV
    dataPrevistaFim: estagio.dataPrevistaFim ?? null,
    nomeSeguradora: estagio.nomeSeguradora ?? null,
    numeroApoliceSeguro: estagio.numeroApoliceSeguro ?? null,
    visitasRealizadas: estagio.visitasRealizadas ?? null,
    visitasJustificadas: estagio.visitasJustificadas ?? null,
    visitasAVencer: estagio.visitasAVencer ?? null,
    visitasNaoRealizadas: estagio.visitasNaoRealizadas ?? null,
    resumoPendencias: estagio.resumoPendencias ?? null,
    encerramentoPor: estagio.encerramentoPor ?? null,
    motivacaoDesligamento: estagio.motivacaoDesligamento ?? null,
    motivoRescisao: estagio.motivoRescisao ?? null,
    mediaNotasSupervisor: estagio.mediaNotasSupervisor ?? null,
    foiOuSeraContratado: estagio.foiOuSeraContratado ?? null,
    dateCreated: estagio.dateCreated,
    dateUpdated: estagio.dateUpdated,
    dateDeleted: estagio.dateDeleted,
  });
  return entity;
});

// ============================================================================
// Horário → Persistência
// ============================================================================

export function horarioToPersistence(
  idEstagioFk: string,
  horario: IHorarioEstagio,
): HorarioEstagioTypeormEntity | null {
  // If both times are missing, skip creating a persistence entity
  const horaInicio = horario.horaInicio ?? null;
  const horaFim = horario.horaFim ?? null;

  if (!horaInicio && !horaFim) return null;

  // If one side is missing, mirror the existing one to avoid inserting nulls
  const start = horaInicio ?? horaFim!;
  const end = horaFim ?? horaInicio!;

  const entity = new HorarioEstagioTypeormEntity();
  entity.id = horario.id || generateUuidV7();
  Object.assign(entity, { estagio: { id: idEstagioFk } });
  entity.diaSemana = horario.diaSemana;
  entity.horaInicio = start;
  entity.horaFim = end;
  entity.dateCreated = getNowISO();
  entity.dateUpdated = getNowISO();
  entity.dateDeleted = null;
  return entity;
}

// ============================================================================
// Persistência → Query Result (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<
  EstagioTypeormEntity,
  EstagioFindOneQueryResult
>((entity) => {
  if (!entity) {
    throw new Error(
      "EstagioTypeormMapper.entityToFindOneQueryResult received null/undefined entity",
    );
  }

  return {
    id: entity.id,
    campus: entity.campus?.id ? { id: entity.campus.id } : null,
    empresa: { id: entity.empresa.id },
    CursoReferencia: entity.CursoReferencia ? { id: entity.CursoReferencia.id } : null,
    estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,

    usuarioOrientador: entity.usuarioOrientador ? { id: entity.usuarioOrientador.id } : null,

    nomeSupervisor: entity.nomeSupervisor,
    emailSupervisor: entity.emailSupervisor,
    telefoneSupervisor: entity.telefoneSupervisor,

    aditivo: entity.aditivo,
    tipoAditivo: entity.tipoAditivo,

    cargaHoraria: entity.cargaHoraria,
    dataInicio: entity.dataInicio,
    dataFim: entity.dataFim,
    status: entity.status,

    horariosEstagio: (entity.horariosEstagio ?? [])
      .filter((horario) => !horario.dateDeleted)
      .map((horario) => ({
        id: horario.id,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFim: horario.horaFim,
      })),

    // Campos adicionais do CSV
    dataPrevistaFim: entity.dataPrevistaFim ?? null,
    nomeSeguradora: entity.nomeSeguradora ?? null,
    numeroApoliceSeguro: entity.numeroApoliceSeguro ?? null,
    visitasRealizadas: entity.visitasRealizadas ?? null,
    visitasJustificadas: entity.visitasJustificadas ?? null,
    visitasAVencer: entity.visitasAVencer ?? null,
    visitasNaoRealizadas: entity.visitasNaoRealizadas ?? null,
    resumoPendencias: entity.resumoPendencias ?? null,
    encerramentoPor: entity.encerramentoPor ?? null,
    motivacaoDesligamento: entity.motivacaoDesligamento ?? null,
    motivoRescisao: entity.motivoRescisao ?? null,
    mediaNotasSupervisor:
      entity.mediaNotasSupervisor != null ? Number(entity.mediaNotasSupervisor) : null,
    foiOuSeraContratado: entity.foiOuSeraContratado ?? null,

    ativo: !entity.dateDeleted,
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
  };
});
