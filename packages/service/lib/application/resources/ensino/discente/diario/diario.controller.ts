import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioService } from "./diario.service";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  @Get("/")
  async diarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioFindAll") dto: IAppRequest<"DiarioFindAll">): Promise<LadesaTypings.DiarioListOperationOutput["success"]> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  @Get("/:id")
  async diarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioFindById") dto: IAppRequest<"DiarioFindById">) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async diarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioCreate") dto: IAppRequest<"DiarioCreate">) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  @Patch("/:id")
  async diarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioUpdate") dto: IAppRequest<"DiarioUpdate">) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async diarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioDeleteOneById") dto: IAppRequest<"DiarioDeleteOneById">) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
