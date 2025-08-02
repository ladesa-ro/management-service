import { BadRequestException, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Public } from "@/infrastructure/authentication";
import { AutenticacaoService } from "./autenticacao.service";
import { UsuarioService } from "./usuario/usuario.service";
import { throwError } from "rxjs";


@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService, private usuarioService:UsuarioService) {}

  @Get("/quem-sou-eu/ensino")
  whoAmIEnsino(@AccessContextHttp() accessContext:AccessContext){
    const idUsuario = accessContext.requestActor?.id;
    if(!idUsuario){
      throw new BadRequestException();
    }
    return this.usuarioService.usuarioEnsinoById(accessContext, {id: idUsuario} )
  }

  @Get("/quem-sou-eu")
  whoAmI(@AccessContextHttp() accessContext: AccessContext) {
    return this.autenticacaoService.whoAmI(accessContext);
  }

  @Post("/login")
  @Public()
  login(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthLoginInput") dto: IAppRequest<"AuthLoginInput">) {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  refresh(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthRefreshInput") dto: IAppRequest<"AuthRefreshInput">) {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  definirSenha(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthCredentialsSetInitialPasswordInput") dto: IAppRequest<"AuthCredentialsSetInitialPasswordInput">) {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  redefinirSenha(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AuthRecoverPasswordInput") dto: IAppRequest<"AuthRecoverPasswordInput">) {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
