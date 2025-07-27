import { Resolver as GqlResolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { PerfilService } from "./perfil.service";

@GqlResolver()
export class PerfilResolver {
  constructor(private perfilService: PerfilService) {}

  async vinculoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("VinculoFindAll") dto: IAppRequest<"VinculoFindAll">) {
    return this.perfilService.perfilFindAll(accessContext, dto);
  }

  async vinculoSetVinculos(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("VinculoSetVinculos") dto: IAppRequest<"VinculoSetVinculos">) {
    return this.perfilService.perfilSetVinculos(accessContext, dto);
  }
}
