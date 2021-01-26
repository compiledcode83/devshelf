import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AnySchema, ValidationError } from 'yup';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: AnySchema) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
    } catch (err) {
      throw new ValidationError(err);
    }
    return value;
  }
}
