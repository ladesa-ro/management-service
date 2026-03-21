import { BadRequestException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IGerarHorarioRejeitarCommand,
  IGerarHorarioRejeitarCommandHandler,
} from "../../domain/commands/gerar-horario-rejeitar.command.handler.interface";
import {
  GerarHorarioEntity,
  GerarHorarioStatus,
} from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioRejeitarCommandHandlerImpl implements IGerarHorarioRejeitarCommandHandler {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    command: IGerarHorarioRejeitarCommand,
  ): Promise<GerarHorarioEntity> {
    const repo = this.appTypeormConnection.getRepository(GerarHorarioEntity);
    const entity = await repo.findOneBy({ id: command.id });
    ensureExists(entity, "GerarHorario", command.id);

    if (entity!.status !== GerarHorarioStatus.SUCESSO) {
      throw new BadRequestException(
        `Solicitacao ${command.id} nao pode ser rejeitada no status ${entity!.status}. Status esperado: SUCESSO.`,
      );
    }

    entity!.status = GerarHorarioStatus.REJEITADO;
    await repo.save(entity!);

    return entity!;
  }
}
