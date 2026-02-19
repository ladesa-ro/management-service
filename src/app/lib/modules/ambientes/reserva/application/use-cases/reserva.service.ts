import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { UsuarioService } from "@/modules/acesso/usuario/application/use-cases/usuario.service";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import { type IReserva, Reserva } from "@/modules/ambientes/reserva";
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

@Injectable()
export class ReservaService
  extends BaseCrudService<
    IReserva,
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

  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    protected readonly repository: IReservaRepositoryPort,
    private readonly usuarioService: UsuarioService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<Partial<PersistInput<IReserva>>> {
    const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
      id: dto.ambiente.id,
    });
    const usuario = await this.usuarioService.findByIdStrict(accessContext, { id: dto.usuario.id });
    const domain = Reserva.criar({
      situacao: dto.situacao,
      rrule: dto.rrule,
      motivo: dto.motivo,
      tipo: dto.tipo,
      ambiente: { id: ambiente.id },
      usuario: { id: usuario.id },
    });
    return { ...domain, ambiente: { id: ambiente.id }, usuario: { id: usuario.id } };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
    current: ReservaFindOneOutputDto,
  ): Promise<Partial<PersistInput<IReserva>>> {
    const domain = Reserva.fromData(current);
    domain.atualizar({
      situacao: dto.situacao,
      rrule: dto.rrule,
      motivo: dto.motivo,
      tipo: dto.tipo,
    });
    const result: Partial<PersistInput<IReserva>> = {
      situacao: domain.situacao,
      rrule: domain.rrule,
      motivo: domain.motivo,
      tipo: domain.tipo,
    };

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      result.ambiente = { id: ambiente.id };
    }

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.findByIdSimpleStrict(accessContext, dto.usuario.id);
      result.usuario = { id: usuario.id };
    }

    return result;
  }
}
