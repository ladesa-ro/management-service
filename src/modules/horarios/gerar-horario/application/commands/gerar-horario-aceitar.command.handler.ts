import { BadRequestException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import type {
  IGerarHorarioAceitarCommand,
  IGerarHorarioAceitarCommandHandler,
} from "../../domain/commands/gerar-horario-aceitar.command.handler.interface";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";
import {
  GerarHorarioDuracao,
  GerarHorarioEntity,
  GerarHorarioStatus,
} from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioAceitarCommandHandlerImpl implements IGerarHorarioAceitarCommandHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<GerarHorarioEntity> {
    const entity = await this.gerarHorarioRepository.findOneBy({ id: command.id });
    ensureExists(entity, "GerarHorario", command.id);

    if (entity!.status !== GerarHorarioStatus.SUCESSO) {
      throw new BadRequestException(
        `Solicitacao ${command.id} nao pode ser aceita no status ${entity!.status}. Status esperado: SUCESSO.`,
      );
    }

    entity!.status = GerarHorarioStatus.ACEITO;
    entity!.duracao = GerarHorarioDuracao.PERMANENTE;
    await this.gerarHorarioRepository.save(entity!);

    return entity!;
  }
}
