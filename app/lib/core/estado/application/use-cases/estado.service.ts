import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { IEstadoRepositoryPort, IEstadoUseCasePort } from "@/core/estado/application/ports";
import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput
} from "@/core/estado/application/dtos";

/**
 * Service centralizado para o módulo Estado.
 * Implementa todos os use cases definidos em IEstadoUseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
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
      throw new NotFoundException();
    }

    return estado;
  }
}
