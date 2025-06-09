import { SetMetadata, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

export const NEEDS_AUTH_KEY = "needs_auth";

export const NeedsAuth = () => {
  return applyDecorators(SetMetadata(NEEDS_AUTH_KEY, true), ApiBearerAuth());
};

export const Public = () => {
  return applyDecorators(SetMetadata(NEEDS_AUTH_KEY, false));
};
