import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IGerarHorarioRejeitarCommand,
  IGerarHorarioRejeitarCommandHandler,
} from "../../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import { GerarHorario } from "../../domain/gerar-horario";
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
  ): Promise<GerarHorario> {
    const domain = await this.gerarHorarioRepository.loadById(command.id);
    ensureExists(domain, GerarHorario.entityName, command.id);

    domain.rejeitar();

    await this.gerarHorarioRepository.save(domain);

    return domain;
  }
}
