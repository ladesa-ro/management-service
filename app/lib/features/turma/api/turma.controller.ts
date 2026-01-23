import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { TurmaService } from "../domain/turma.service";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  async turmaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaList") dto: IAppRequest<"TurmaList">) {
    const domain: IDomain.TurmaListInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async turmaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaFindOneById") dto: IAppRequest<"TurmaFindOneById">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async turmaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaCreate") dto: IAppRequest<"TurmaCreate">) {
    const domain: IDomain.TurmaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async turmaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaUpdateOneById") dto: IAppRequest<"TurmaUpdateOneById">) {
    const domain: IDomain.TurmaFindOneInput & IDomain.TurmaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async turmaGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaGetImagemCapa") dto: IAppRequest<"TurmaGetImagemCapa">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaGetImagemCapa(accessContext, domain.id);
  }

  @Put("/:id/imagem/capa")
  async turmaImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaSetImagemCapa") dto: IAppRequest<"TurmaSetImagemCapa">, @UploadedFile() file: Express.Multer.File) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async turmaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("TurmaDeleteOneById") dto: IAppRequest<"TurmaDeleteOneById">) {
    const domain: IDomain.TurmaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.turmaService.turmaDeleteOneById(accessContext, domain);
  }
}
