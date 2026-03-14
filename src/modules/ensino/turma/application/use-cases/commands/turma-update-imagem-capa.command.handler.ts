import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
  saveEntityImagemField,
} from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type ITurmaUpdateImagemCapaCommand,
  ITurmaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";

@Injectable()
export class TurmaUpdateImagemCapaCommandHandlerImpl
  implements ITurmaUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: ITurmaUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    if (!current) {
      throw new ResourceNotFoundError("Turma", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "turma:update",
      { dto: { id: current.id } },
      current.id,
    );

    return saveEntityImagemField(
      current.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}
