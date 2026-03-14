import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { IEstadoFindOneQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import { IEstadoListQueryHandler } from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "../dtos";
import type { IEstadoUseCasePort } from "../ports";

@Injectable()
export class EstadoService implements IEstadoUseCasePort {
  constructor(
    @Inject(IEstadoListQueryHandler)
    private readonly listHandler: IEstadoListQueryHandler,
    @Inject(IEstadoFindOneQueryHandler)
    private readonly findOneHandler: IEstadoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null = null,
  ): Promise<EstadoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto });
  }

  findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto });
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Estado", dto.id);
    }

    return entity;
  }
}
