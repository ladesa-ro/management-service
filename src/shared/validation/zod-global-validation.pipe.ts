import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from "@nestjs/common";
import type { z } from "zod";

interface WithSchema {
  schema: z.ZodType;
}

function hasSchema(metatype: unknown): metatype is WithSchema {
  return typeof metatype === "function" && "schema" in metatype && metatype.schema !== undefined;
}

@Injectable()
export class ZodGlobalValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;

    if (!hasSchema(metatype)) return value;

    const result = metatype.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          rule: issue.code,
        })),
      );
    }

    return result.data;
  }
}
