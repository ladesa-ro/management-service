import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { CursoService } from "../domain/curso.service";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  @Get("/")
  async cursoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoList") dto: IAppRequest<"CursoList">) {
    const domain: IDomain.CursoListInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async cursoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoFindOneById") dto: IAppRequest<"CursoFindOneById">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async cursoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoCreate") dto: IAppRequest<"CursoCreate">) {
    const domain: IDomain.CursoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoUpdateOneById") dto: IAppRequest<"CursoUpdateOneById">) {
    const domain: IDomain.CursoFindOneInput & IDomain.CursoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async cursoGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoGetImagemCapa") dto: IAppRequest<"CursoGetImagemCapa">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoGetImagemCapa(accessContext, domain.id);
  }

  @Put("/:id/imagem/capa")
  async cursoImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoSetImagemCapa") dto: IAppRequest<"CursoSetImagemCapa">, @UploadedFile() file: Express.Multer.File) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async cursoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("CursoDeleteOneById") dto: IAppRequest<"CursoDeleteOneById">) {
    const domain: IDomain.CursoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.cursoService.cursoDeleteOneById(accessContext, domain);
  }
}
