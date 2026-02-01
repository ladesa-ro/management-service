import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/modules/estado/application/dtos";
import {
  ESTADO_REPOSITORY_PORT,
  type IEstadoRepositoryPort,
  type IEstadoUseCasePort,
} from "@/modules/estado/application/ports";

@Injectable()
export class EstadoService implements IEstadoUseCasePort {
  constructor(
    @Inject(ESTADO_REPOSITORY_PORT)
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
