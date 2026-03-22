import { ensureExists, ValidationError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IGerarHorarioRejeitarCommand,
  IGerarHorarioRejeitarCommandHandler,
} from "../../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import { GerarHorarioStatus, type IGerarHorario } from "../../domain/gerar-horario.types";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@DeclareImplementation()
export class GerarHorarioRejeitarCommandHandlerImpl implements IGerarHorarioRejeitarCommandHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<IGerarHorario> {
    const entity = await this.gerarHorarioRepository.findOneBy({ id: command.id });
    ensureExists(entity, "GerarHorario", command.id);

    if (entity.status !== GerarHorarioStatus.SUCESSO) {
      throw ValidationError.fromField(
        "status",
        `Solicitacao ${command.id} nao pode ser rejeitada no status ${entity.status}. Status esperado: SUCESSO.`,
      );
    }

    entity.status = GerarHorarioStatus.REJEITADO;
    await this.gerarHorarioRepository.save(entity);

    return entity;
  }
}
