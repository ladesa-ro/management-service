import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IGerarHorarioAceitarCommand,
  IGerarHorarioAceitarCommandHandler,
} from "../../domain/commands/gerar-horario-aceitar.command.handler.interface";
import { GerarHorario } from "../../domain/gerar-horario";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@DeclareImplementation()
export class GerarHorarioAceitarCommandHandlerImpl implements IGerarHorarioAceitarCommandHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<GerarHorario> {
    const domain = await this.gerarHorarioRepository.loadById(command.id);
    ensureExists(domain, GerarHorario.entityName, command.id);

    domain.aceitar();

    await this.gerarHorarioRepository.save(domain);

    return domain;
  }
}
