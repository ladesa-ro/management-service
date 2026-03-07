import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { UsuarioService } from "@/Ladesa.Management.Application/acesso/usuario/application/use-cases/usuario.service";
import { AmbienteService } from "@/Ladesa.Management.Application/ambientes/ambiente/application/use-cases/ambiente.service";
import { Reserva } from "@/Ladesa.Management.Application/ambientes/reserva";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "../dtos";
import { IReservaRepository, type IReservaUseCasePort } from "../ports";

@Injectable()
export class ReservaService
  extends BaseCrudService<
    Reserva,
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
    @Inject(IReservaRepository)
    protected readonly repository: IReservaRepository,
    private readonly usuarioService: UsuarioService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<Partial<PersistInput<Reserva>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
    current: ReservaFindOneOutputDto,
  ): Promise<Partial<PersistInput<Reserva>>> {
    const domain = Reserva.fromData({
      ...current,
      ambienteId: current.ambiente.id,
      usuarioId: current.usuario.id,
    } as unknown as Reserva);
    domain.atualizar({
      situacao: dto.situacao,
      rrule: dto.rrule,
      motivo: dto.motivo,
      tipo: dto.tipo,
    });
    const result: Partial<PersistInput<Reserva>> = {
      situacao: domain.situacao,
      rrule: domain.rrule,
      motivo: domain.motivo,
      tipo: domain.tipo,
    };

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      result.ambienteId = ambiente.id;
    }

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.findByIdSimpleStrict(accessContext, dto.usuario.id);
      result.usuarioId = usuario.id;
    }

    return result;
  }
}
