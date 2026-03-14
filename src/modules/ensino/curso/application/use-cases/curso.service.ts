import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type ICursoCreateCommand,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import {
  type ICursoDeleteCommand,
  ICursoDeleteCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import {
  type ICursoUpdateCommand,
  ICursoUpdateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import {
  type ICursoUpdateImagemCapaCommand,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import { ICursoGetImagemCapaQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "../dtos";
import type { ICursoUseCasePort } from "../ports";

@Injectable()
export class CursoService implements ICursoUseCasePort {
  constructor(
    @Inject(ICursoCreateCommandHandler)
    private readonly createHandler: ICursoCreateCommandHandler,
    @Inject(ICursoUpdateCommandHandler)
    private readonly updateHandler: ICursoUpdateCommandHandler,
    @Inject(ICursoDeleteCommandHandler)
    private readonly deleteHandler: ICursoDeleteCommandHandler,
    @Inject(ICursoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ICursoUpdateImagemCapaCommandHandler,
    @Inject(ICursoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ICursoGetImagemCapaQueryHandler,
    @Inject(ICursoListQueryHandler)
    private readonly listHandler: ICursoListQueryHandler,
    @Inject(ICursoFindOneQueryHandler)
    private readonly findOneHandler: ICursoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Curso", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as CursoFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as CursoFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: CursoCreateInputDto): Promise<CursoFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies ICursoCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies ICursoUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: CursoFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies ICursoDeleteCommand);
  }

  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    return this.getImagemCapaHandler.execute({ accessContext, id });
  }

  updateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({
      accessContext,
      dto,
      file,
    } satisfies ICursoUpdateImagemCapaCommand);
  }
}
