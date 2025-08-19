using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Dados de entrada para autenticação. */
model AuthLoginInput {
  /** Matrícula SIAPE. */
  matriculaSiape: string;

  /** Senha do usuário. */
  senha: string;
}
