import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  type ITurmaCreateCommand,
  ITurmaCreateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import {
  type ITurmaDeleteCommand,
  ITurmaDeleteCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import {
  type ITurmaUpdateCommand,
  ITurmaUpdateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import {
  type ITurmaUpdateImagemCapaCommand,
  ITurmaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ITurmaGetImagemCapaQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "../dtos";

@Injectable()
export class TurmaService {
  constructor(
    @Inject(ITurmaCreateCommandHandler)
    private readonly createHandler: ITurmaCreateCommandHandler,
    @Inject(ITurmaUpdateCommandHandler)
    private readonly updateHandler: ITurmaUpdateCommandHandler,
    @Inject(ITurmaDeleteCommandHandler)
    private readonly deleteHandler: ITurmaDeleteCommandHandler,
    @Inject(ITurmaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ITurmaUpdateImagemCapaCommandHandler,
    @Inject(ITurmaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ITurmaGetImagemCapaQueryHandler,
    @Inject(ITurmaListQueryHandler)
    private readonly listHandler: ITurmaListQueryHandler,
    @Inject(ITurmaFindOneQueryHandler)
    private readonly findOneHandler: ITurmaFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto> {
    return this.listHandler.execute({ accessContext, dto, selection });
  }

  findById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto, selection });
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError("Turma", dto.id);
    }

    return entity;
  }

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.findById(accessContext, { id } as TurmaFindOneInputDto, selection);
  }

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, { id } as TurmaFindOneInputDto, selection);
  }

  create(accessContext: AccessContext, dto: TurmaCreateInputDto): Promise<TurmaFindOneOutputDto> {
    return this.createHandler.execute({ accessContext, dto } satisfies ITurmaCreateCommand);
  }

  update(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.updateHandler.execute({ accessContext, dto } satisfies ITurmaUpdateCommand);
  }

  deleteOneById(accessContext: AccessContext, dto: TurmaFindOneInputDto): Promise<boolean> {
    return this.deleteHandler.execute({ accessContext, dto } satisfies ITurmaDeleteCommand);
  }

  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    return this.getImagemCapaHandler.execute({ accessContext, id });
  }

  updateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({
      accessContext,
      dto,
      file,
    } satisfies ITurmaUpdateImagemCapaCommand);
  }
}
