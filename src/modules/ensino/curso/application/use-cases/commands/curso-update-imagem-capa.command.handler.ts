import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
  saveEntityImagemField,
} from "@/modules/@shared";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import {
  type ICursoUpdateImagemCapaCommand,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../ports";

@Injectable()
export class CursoUpdateImagemCapaCommandHandlerImpl
  implements ICursoUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly imagemService: ImagemService,
  ) {}

  async execute({ accessContext, dto, file }: ICursoUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    if (!current) {
      throw new ResourceNotFoundError("Curso", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "curso:update",
      { dto: { id: current.id } },
      current.id,
    );

    return saveEntityImagemField(
      current.id,
      file,
      "imagemCapa",
      this.imagemService,
      this.repository,
    );
  }
}
