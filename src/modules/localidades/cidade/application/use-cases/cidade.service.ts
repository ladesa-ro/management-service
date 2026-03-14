import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { ICidadeFindOneQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-find-one.query.handler.interface";
import { ICidadeListQueryHandler } from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "../dtos";
import type { ICidadeUseCasePort } from "../ports";

@Injectable()
export class CidadeService implements ICidadeUseCasePort {
  constructor(
    @Inject(ICidadeListQueryHandler)
    private readonly listHandler: ICidadeListQueryHandler,
    @Inject(ICidadeFindOneQueryHandler)
    private readonly findOneHandler: ICidadeFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null = null,
  ): Promise<CidadeListOutputDto> {
    return this.listHandler.execute({ accessContext, dto });
  }

  findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto });
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Cidade", dto.id);
    }

    return entity;
  }
}
