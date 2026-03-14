import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type IBlocoCreateCommand,
  IBlocoCreateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import {
  type IBlocoDeleteCommand,
  IBlocoDeleteCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import {
  type IBlocoUpdateCommand,
  IBlocoUpdateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import {
  type IBlocoUpdateImagemCapaCommand,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { IBlocoGetImagemCapaQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-get-imagem-capa.query.handler.interface";
import { IBlocoListQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "../dtos";
import type { IBlocoUseCasePort } from "../ports";

@Injectable()
export class BlocoService implements IBlocoUseCasePort {
  constructor(
    @Inject(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @Inject(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @Inject(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
    @Inject(IBlocoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IBlocoUpdateImagemCapaCommandHandler,
    @Inject(IBlocoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IBlocoGetImagemCapaQueryHandler,
    @Inject(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @Inject(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as BlocoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as BlocoFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: BlocoCreateInputDto): Promise<BlocoFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies IBlocoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies IBlocoUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: BlocoFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies IBlocoDeleteCommand);
  }

  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    return this.getImagemCapaHandler.execute({ accessContext, id });
  }

  updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({
      accessContext,
      dto,
      file,
    } satisfies IBlocoUpdateImagemCapaCommand);
  }
}
