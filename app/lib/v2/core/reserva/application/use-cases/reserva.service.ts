import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import type { AccessContext } from "@/infrastructure/access-context";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "@/v2/adapters/in/http/reserva/dto";
import type { IReservaRepositoryPort } from "../ports";

@Injectable()
export class ReservaService {
  constructor(
    @Inject("IReservaRepositoryPort")
    private reservaRepository: IReservaRepositoryPort,
    private usuarioService: UsuarioService,
    private ambienteService: AmbienteService,
  ) {}

  async reservaFindAll(
    accessContext: AccessContext,
    dto: ReservaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto> {
    return this.reservaRepository.findAll(accessContext, dto, selection);
  }

  async reservaFindById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null> {
    return this.reservaRepository.findById(accessContext, dto, selection);
  }

  async reservaFindByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto> {
    const reserva = await this.reservaRepository.findById(accessContext, dto, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null> {
    return this.reservaRepository.findByIdSimple(accessContext, id, selection);
  }

  async reservaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto> {
    const reserva = await this.reservaRepository.findByIdSimple(accessContext, id, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaCreate(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    await accessContext.ensurePermission("reserva:create", { dto } as any);

    const dtoReserva = pick(dto, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    const usuario = await this.usuarioService.usuarioFindByIdStrict(accessContext, { id: dto.usuario.id });

    this.reservaRepository.merge(reserva, {
      usuario: {
        id: usuario.id,
      },
    });

    await this.reservaRepository.save(reserva);

    return this.reservaFindByIdStrict(accessContext, { id: reserva.id });
  }

  async reservaUpdate(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    const currentReserva = await this.reservaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("reserva:update", { dto }, dto.id);

    const dtoReserva = pick(dto, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = {
      id: currentReserva.id,
    } as ReservaEntity;

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.usuario.id);

      this.reservaRepository.merge(reserva, {
        usuario: {
          id: usuario.id,
        },
      });
    }

    await this.reservaRepository.save(reserva);

    return this.reservaFindByIdStrict(accessContext, { id: reserva.id });
  }

  async reservaDeleteOneById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("reserva:delete", { dto }, dto.id);

    const reserva = await this.reservaFindByIdStrict(accessContext, dto);

    if (reserva) {
      await this.reservaRepository.softDeleteById(reserva.id);
    }

    return true;
  }
}
