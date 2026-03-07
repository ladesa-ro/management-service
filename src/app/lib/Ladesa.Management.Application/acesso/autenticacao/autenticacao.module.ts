import { Module } from "@nestjs/common";
import {
  KeycloakModule,
  OpenidConnectModule,
} from "@/Ladesa.Management.Application/@seguranca/provedor-identidade";
import { AutenticacaoService } from "@/Ladesa.Management.Application/acesso/autenticacao";
import { PerfilModule } from "@/Ladesa.Management.Application/acesso/perfil/perfil.module";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { AutenticacaoRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/AutenticacaoRestController";

/**
 * Módulo NestJS para Autenticacao
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller e service
 */
@Module({
  imports: [UsuarioModule, PerfilModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoRestController],
  providers: [AutenticacaoService],
  exports: [],
})
export class AutenticacaoModule {}
