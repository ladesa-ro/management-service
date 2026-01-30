import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/core/estado/application/dtos";
import type { IEstadoRepositoryPort, IEstadoUseCasePort } from "@/core/estado/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class EstadoService implements IEstadoUseCasePort {
  constructor(
    @Inject("IEstadoRepositoryPort")
    private readonly estadoRepository: IEstadoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: EstadoListInput | null = null,
  ): Promise<EstadoListOutput> {
    return this.estadoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInput,
  ): Promise<EstadoFindOneOutput | null> {
    return this.estadoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EstadoFindOneInput,
  ): Promise<EstadoFindOneOutput> {
    const estado = await this.estadoRepository.findById(accessContext, dto);

    if (!estado) {
      throw new ResourceNotFoundError("Estado", dto.id);
    }

    return estado;
  }
}
