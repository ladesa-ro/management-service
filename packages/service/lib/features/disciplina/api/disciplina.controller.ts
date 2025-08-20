import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { DisciplinaService } from "../domain/disciplina.service";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get("/")
  async disciplinaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaList") dto: IAppRequest<"DisciplinaList">) {
    const domain: IDomain.DisciplinaListInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async disciplinaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaFindOneById") dto: IAppRequest<"DisciplinaFindOneById">) {
    const domain: IDomain.DisciplinaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async disciplinaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaCreate") dto: IAppRequest<"DisciplinaCreate">) {
    const domain: IDomain.DisciplinaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async disciplinaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaUpdateOneById") dto: IAppRequest<"DisciplinaUpdateOneById">) {
    const domain: IDomain.DisciplinaFindOneInput & IDomain.DisciplinaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async disciplinaGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaGetImagemCapa") dto: IAppRequest<"DisciplinaGetImagemCapa">) {
    const domain: IDomain.DisciplinaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, domain.id);
  }

  @Put("/:id/imagem/capa")
  async disciplinaImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisciplinaSetImagemCapa") dto: IAppRequest<"DisciplinaSetImagemCapa">,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const domain: IDomain.DisciplinaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async disciplinaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisciplinaDeleteOneById") dto: IAppRequest<"DisciplinaDeleteOneById">) {
    const domain: IDomain.DisciplinaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, domain);
  }
}
