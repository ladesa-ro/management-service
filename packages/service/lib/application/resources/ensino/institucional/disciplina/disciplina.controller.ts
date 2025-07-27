import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisciplinaService } from "./disciplina.service";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get("/")
  async disciplinaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisciplinaFindAll") dto: IAppRequest<"DisciplinaFindAll">,
  ): Promise<LadesaTypings.DisciplinaListOperationOutput["success"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  @Get("/:id")
  async disciplinaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaFindById") dto: IAppRequest<"DisciplinaFindById">) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async disciplinaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaCreate") dto: IAppRequest<"DisciplinaCreate">) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async disciplinaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaUpdate") dto: IAppRequest<"DisciplinaUpdate">) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async disciplinaGetImagemCapa(@AccessContextHttp() accessContext: AccessContext) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async disciplinaImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @UploadedFile() file: Express.Multer.File) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, { id }, file);
  }

  @Delete("/:id")
  async disciplinaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaDeleteOneById") dto: IAppRequest<"DisciplinaDeleteOneById">) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
