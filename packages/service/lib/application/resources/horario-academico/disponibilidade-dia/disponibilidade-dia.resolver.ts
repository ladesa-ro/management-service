import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@Resolver()
export class DisponibilidadeDiaResolver {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  async disponibilidadeDiaFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaFindAll") dto: IAppRequest<"DisponibilidadeDiaFindAll">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(accessContext, dto);
  }

  async disponibilidadeDiaFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaFindOneById") dto: IAppRequest<"DisponibilidadeDiaFindOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  async disponibilidadeDiaCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaCreate") dto: IAppRequest<"DisponibilidadeDiaCreate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  async disponibilidadeDiaUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaUpdate") dto: IAppRequest<"DisponibilidadeDiaUpdate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  async disponibilidadeDiaOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaOneById") dto: IAppRequest<"DisponibilidadeDiaOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
