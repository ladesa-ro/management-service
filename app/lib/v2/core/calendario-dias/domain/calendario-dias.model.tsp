using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Input para obter o calendário de um determinado ano e mês. */
model GetCalendarioInput {
  /** Identificador do calendário */
  idCalendario: int32;

  /** Ano a ser consultado */
  ano: int16;

  /** Mês a ser consultado (opcional) */
  mes?: int8;
}

/** Retorno da consulta de calendário. */
model GetCalendarioOutput {
  /** Lista dos dias do calendário */
  dias: DiaCalendario[];
}
