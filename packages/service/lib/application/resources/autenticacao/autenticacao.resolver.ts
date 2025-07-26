import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class AutenticacaoResolver {
  // constructor(
  //   //
  //   private autenticacaoService: AutenticacaoService,
  // ) {}
  // //
  // @Operacao(Spec.AutenticacaoQuemSouEuOperator())
  // async authQuemSouEu(@AccessContextGraphQl() accessContext: IAccessContext) {
  //   return this.autenticacaoService.quemSouEu(accessContext);
  // }
  // //
  // @Operacao(Spec.AutenticacaoLoginOperator())
  // async autenticacaoLogin(
  //   @AccessContextGraphQl() accessContext: IAccessContext,
  //   @DadosEntradaGql(Spec.AutenticacaoLoginOperator())
  //   dto: Spec.IAutenticacaoLoginInputDto,
  // ) {
  //   return this.autenticacaoService.login(accessContext, dto);
  // }
  // //
  // @Operacao(Spec.AutenticacaoRefreshOperator())
  // async autenticacaoRefresh(
  //   @AccessContextGraphQl() accessContext: IAccessContext,
  //   @DadosEntradaGql(Spec.AutenticacaoRefreshOperator())
  //   dto: Spec.IAutenticacaoRefreshInputDto,
  // ) {
  //   return this.autenticacaoService.refresh(accessContext, dto);
  // }
  // //
  // @Operacao(Spec.AutenticacaoDefinirSenhaOperator())
  // async autenticacaoDefinirSenha(
  //   @AccessContextGraphQl() accessContext: IAccessContext,
  //   @DadosEntradaGql(Spec.AutenticacaoDefinirSenhaOperator())
  //   dto: Spec.IAutenticacaoDefinirSenhaInputDto,
  // ) {
  //   return this.autenticacaoService.definirSenha(accessContext, dto);
  // }
  //
}
