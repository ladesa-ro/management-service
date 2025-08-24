import { Provider } from "@nestjs/common";
import { ESTADO_REPOSITORY } from "@/features/estado/application/ports";

export const EstadoRepositoryProvider: Provider = {
  provide: ESTADO_REPOSITORY,
  useFactory: () => {
    // TODO
    return {};
  },
};
