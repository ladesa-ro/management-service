import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { BaseCrudService } from "@/v2/core/shared";
import { UsuarioService } from "@/core/usuario/application/use-cases/usuario.service";
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

  async reservaFindAll(
    accessContext: AccessContext,
    dto: ReservaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async reservaFindById(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade com IReservaUseCasePort

  async reservaFindByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async reservaFindByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async reservaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async reservaCreate(
    accessContext: AccessContext,
    dto: ReservaCreateInput,
  ): Promise<ReservaFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async reservaUpdate(
    accessContext: AccessContext,
    dto: ReservaFindOneInput & ReservaUpdateInput,
  ): Promise<ReservaFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async reservaDeleteOneById(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  /**
   * Hook para adicionar relacionamentos com Ambiente e Usuario durante criação
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: ReservaEntity,
    dto: ReservaCreateInput,
  ): Promise<void> {
    const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.ambiente.id,
    });
    this.repository.merge(entity, { ambiente: { id: ambiente.id } });

    const usuario = await this.usuarioService.usuarioFindByIdStrict(accessContext, {
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
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      this.repository.merge(entity, { ambiente: { id: ambiente.id } });
    }

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(
        accessContext,
        dto.usuario.id,
      );
      this.repository.merge(entity, { usuario: { id: usuario.id } });
    }
  }
}
