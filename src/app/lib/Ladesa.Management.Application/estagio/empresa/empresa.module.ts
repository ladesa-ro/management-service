import { Module } from "@nestjs/common";
import { EMPRESA_REPOSITORY_PORT } from "@/Ladesa.Management.Application/estagio/empresa/application/ports";
import { EmpresaService } from "@/Ladesa.Management.Application/estagio/empresa/application/use-cases/empresa.service";
import { EmpresaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/estagio/empresa/infrastructure";
import { EmpresaRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/EmpresaRestController";

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
