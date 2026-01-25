import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/v2/adapters/in/http/estado/dto";
import type { IEstadoRepositoryPort } from "../ports";

@Injectable()
export class EstadoService {
  constructor(
    @Inject("IEstadoRepositoryPort")
    private estadoRepository: IEstadoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null = null,
    selection?: string[],
  ): Promise<EstadoListOutputDto> {
    return this.estadoRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
    selection?: string[],
  ): Promise<EstadoFindOneOutputDto | null> {
    return this.estadoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
    selection?: string[],
  ): Promise<EstadoFindOneOutputDto> {
    const estado = await this.estadoRepository.findById(accessContext, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
