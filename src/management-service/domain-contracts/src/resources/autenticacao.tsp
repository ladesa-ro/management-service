using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Dados de entrada para autenticação. */
model AuthLoginInput {
  /** Matrícula SIAPE. */
  matriculaSiape: string;

  /** Senha do usuário. */
  senha: string;
}
