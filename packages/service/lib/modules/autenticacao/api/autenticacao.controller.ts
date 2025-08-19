import { BadRequestException, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { UsuarioService } from "@/modules/usuario/usuario.service";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { Public } from "@/shared/infrastructure/authentication";
import { AutenticacaoService } from "./domain/autenticacao.service";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
  ) {
  }

  @Get("/quem-sou-eu/ensino")
  whoAmIEnsino(@AccessContextHttp() accessContext: AccessContext) {
    const idUsuario = accessContext.requestActor?.id;
    if (!idUsuario) {
      throw new BadRequestException();
    }
    return this.usuarioService.usuarioEnsinoById(accessContext, {id: idUsuario});
  }

  @Get("/quem-sou-eu")
  whoAmI(@AccessContextHttp() accessContext: AccessContext) {
    return this.autenticacaoService.whoAmI(accessContext);
  }

  @Post("/login")
  @Public()
  login(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthLogin") dto: IAppRequest<"AuthLogin">) {
    const domain = requestRepresentationMergeToDomain(dto);
    return this.autenticacaoService.login(accessContext, domain);
  }

  @Post("/login/refresh")
  @Public()
  refresh(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthRefresh") dto: IAppRequest<"AuthRefreshInput">) {
    const domain = requestRepresentationMergeToDomain(dto);
    return this.autenticacaoService.refresh(accessContext, domain);
  }

  @Post("/definir-senha")
  definirSenha(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthSetInitialPassword") dto: IAppRequest<"AuthSetInitialPassword">) {
    const domain = requestRepresentationMergeToDomain(dto);
    return this.autenticacaoService.definirSenha(accessContext, domain);
  }

  @Post("/redefinir-senha")
  redefinirSenha(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthRecoverPassword") dto: IAppRequest<"AuthRecoverPassword">) {
    const domain = requestRepresentationMergeToDomain(dto);
    return this.autenticacaoService.recoverPassword(accessContext, domain);
  }
}
