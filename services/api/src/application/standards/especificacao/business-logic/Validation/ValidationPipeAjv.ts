import { IValidator, ensureValidResult, makeValidator } from "@/application/standards/especificacao/business-logic/Validation/ajv-validate";
import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationPipeAjv implements PipeTransform {
  private validatorPromise: Promise<IValidator> | null = null;

  constructor(private readonly jsonSchema: any) {
    this.getValidator();
  }

  async getValidator() {
    if (!this.validatorPromise) {
      this.validatorPromise = makeValidator(this.jsonSchema);
    }

    const validator = await this.validatorPromise;

    return validator;
  }

  async transform(value: any /*, metadata: ArgumentMetadata */) {
    const validator = await this.getValidator();
    const result = await validator(value);
    return ensureValidResult(result);
  }
}
