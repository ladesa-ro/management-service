import { ValidationError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioRepository } from "../../domain/repositories";
import { IUsuarioAvailabilityChecker } from "../../domain/services";

@DeclareImplementation()
export class UsuarioAvailabilityCheckerImpl implements IUsuarioAvailabilityChecker {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
  ) {}

  async ensureAvailable(
    dto: { email?: string | null; matricula?: string | null },
    excludeUsuarioId: string | null = null,
  ): Promise<void> {
    let isEmailAvailable = true;
    let isMatriculaAvailable = true;

    if (dto.email) {
      isEmailAvailable = await this.repository.isEmailAvailable(dto.email, excludeUsuarioId);
    }

    if (dto.matricula) {
      isMatriculaAvailable = await this.repository.isMatriculaAvailable(
        dto.matricula,
        excludeUsuarioId,
      );
    }

    if (isEmailAvailable && isMatriculaAvailable) {
      return;
    }

    const details = [
      ...(!isEmailAvailable
        ? [
            {
              field: "email",
              message: "O e-mail informado nao esta disponivel.",
              rule: "email-is-available",
            },
          ]
        : []),
      ...(!isMatriculaAvailable
        ? [
            {
              field: "matricula",
              message: "A matricula informada nao esta disponivel.",
              rule: "matricula-is-available",
            },
          ]
        : []),
    ];

    throw new ValidationError(details);
  }
}
