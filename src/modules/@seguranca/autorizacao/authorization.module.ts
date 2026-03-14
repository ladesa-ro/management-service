import { Global, Module } from "@nestjs/common";
import { AccessContextCoreModule } from "@/modules/@seguranca/contexto-acesso";

/**
 * Módulo global de autorização.
 *
 * Importa o módulo de contexto de acesso para a aplicação.
 */
@Global()
@Module({
  imports: [AccessContextCoreModule],
})
export class AuthorizationCoreModule {}
