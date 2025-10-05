import type { Container } from "inversify";
import { APP_DATA_SOURCE_TOKEN, makeDataSource } from "@/shared/infrastructure/typeorm/data-source.ts";

export const registerDataSource = async (container: Container) => {
  const ds = await makeDataSource();
  container.bind(APP_DATA_SOURCE_TOKEN).toConstantValue(ds);
};
