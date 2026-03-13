import { Module } from "@nestjs/common";
import { EmpresaService } from "@/modules/estagio/empresa/application/use-cases/empresa.service";
import {
  EmpresaTypeOrmRepositoryAdapter,
} from "@/modules/estagio/empresa/infrastructure";
import { EmpresaRestController } from "@/modules/estagio/empresa/presentation/rest/empresa.rest.controller";
import { EMPRESA_REPOSITORY_PORT } from "@/modules/estagio/empresa/application/ports";

@Module({
  imports: [],
  controllers: [EmpresaRestController],
  providers: [
    EmpresaService,
    {
      provide: EMPRESA_REPOSITORY_PORT,
      useClass: EmpresaTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EmpresaService],
})
export class EmpresaModule {}
