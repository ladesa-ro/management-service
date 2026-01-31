import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { UsuarioService } from "@/core/usuario/application/use-cases/usuario.service";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  ReservaCreateInput,
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
  ReservaUpdateInput,
} from "../dtos";
import type { IReservaRepositoryPort, IReservaUseCasePort } from "../ports";
import { RESERVA_REPOSITORY_PORT } from "../ports";

/**
 * Service centralizado para o módulo Reserva.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IReservaUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class ReservaService
  extends BaseCrudService<
    ReservaEntity,
    ReservaListInput,
    ReservaListOutput,
    ReservaFindOneInput,
    ReservaFindOneOutput,
    ReservaCreateInput,
    ReservaUpdateInput
  >
  implements IReservaUseCasePort
{
  protected readonly resourceName = "Reserva";
  protected readonly createAction = "reserva:create";
  protected readonly updateAction = "reserva:update";
  protected readonly deleteAction = "reserva:delete";
  protected readonly createFields = ["situacao", "motivo", "tipo", "rrule"] as const;
  protected readonly updateFields = ["situacao", "motivo", "tipo", "rrule"] as const;

  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    protected readonly repository: IReservaRepositoryPort,
    private readonly usuarioService: UsuarioService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: ReservaEntity,
    dto: ReservaCreateInput,
  ): Promise<void> {
    const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
      id: dto.ambiente.id,
    });
    this.repository.merge(entity, { ambiente: { id: ambiente.id } });

    const usuario = await this.usuarioService.findByIdStrict(accessContext, {
      id: dto.usuario.id,
    });
    this.repository.merge(entity, { usuario: { id: usuario.id } });
  }

  /**
   * Hook para atualizar relacionamentos opcionais durante update
   */
  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: ReservaEntity,
    dto: ReservaFindOneInput & ReservaUpdateInput,
    _current: ReservaFindOneOutput,
  ): Promise<void> {
    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      this.repository.merge(entity, { ambiente: { id: ambiente.id } });
    }

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.findByIdSimpleStrict(accessContext, dto.usuario.id);
      this.repository.merge(entity, { usuario: { id: usuario.id } });
    }
  }
}
