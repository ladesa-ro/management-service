using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Aula. */
model Aula {
  ...EntityIdUuid;

  /** Data da aula. */
  data: date;

  /** Modalidade da aula. */
  modalidade: string | null;

  /** Intervalo de Tempo associado à aula. */
  intervaloDeTempo: IntervaloDeTempo;

  /** Diário associado à aula. */
  diario: Diario;

  /** Ambiente associado à aula. */
  ambiente: Ambiente | null;

  ...EntityDated;
}
