import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaService } from "./turma.service";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  async turmaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaFindAll") dto: IAppRequest<"TurmaFindAll">): Promise<LadesaTypings.TurmaListOperationOutput["success"]> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  @Get("/:id")
  async turmaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaFindById") dto: IAppRequest<"TurmaFindById">) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async turmaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaCreate") dto: IAppRequest<"TurmaCreate">) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async turmaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaUpdate") dto: IAppRequest<"TurmaUpdate">) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async turmaGetImagemCapa(@AccessContextHttp() accessContext: AccessContext) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async turmaImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @UploadedFile() file: Express.Multer.File) {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, { id }, file);
  }

  @Delete("/:id")
  async turmaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDeleteOneById") dto: IAppRequest<"TurmaDeleteOneById">) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
