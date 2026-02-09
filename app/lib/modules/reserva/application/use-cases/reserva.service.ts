import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import type { ReservaEntity } from "@/modules/reserva/infrastructure/persistence/typeorm";
import { UsuarioService } from "@/modules/usuario/application/use-cases/usuario.service";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
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
    ReservaListInputDto,
    ReservaListOutputDto,
    ReservaFindOneInputDto,
    ReservaFindOneOutputDto,
    ReservaCreateInputDto,
    ReservaUpdateInputDto
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
    dto: ReservaCreateInputDto,
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
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
    _current: ReservaFindOneOutputDto,
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
