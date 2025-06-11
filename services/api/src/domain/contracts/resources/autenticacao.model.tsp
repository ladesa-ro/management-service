using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Dados de entrada para autenticação. */
model AuthLoginInputView {
  /** Matrícula SIAPE. */
  matriculaSiape: string;

  /** Senha do usuário. */
  senha: string;
}
