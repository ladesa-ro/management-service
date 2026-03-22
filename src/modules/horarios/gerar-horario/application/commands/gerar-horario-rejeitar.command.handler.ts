import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/server/access-context";
import type {
  IGerarHorarioRejeitarCommand,
  IGerarHorarioRejeitarCommandHandler,
} from "../../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";
import {
  GerarHorarioEntity,
  GerarHorarioStatus,
} from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioRejeitarCommandHandlerImpl implements IGerarHorarioRejeitarCommandHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<GerarHorarioEntity> {
    const entity = await this.gerarHorarioRepository.findOneBy({ id: command.id });
    ensureExists(entity, "GerarHorario", command.id);

    if (entity!.status !== GerarHorarioStatus.SUCESSO) {
      throw new BadRequestException(
        `Solicitacao ${command.id} nao pode ser rejeitada no status ${entity!.status}. Status esperado: SUCESSO.`,
      );
    }

    entity!.status = GerarHorarioStatus.REJEITADO;
    await this.gerarHorarioRepository.save(entity!);

    return entity!;
  }
}
