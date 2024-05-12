import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { SortBy, SortDirection } from '../models/SortBy';

@Injectable()
export class SortingFieldOrderPipe implements PipeTransform {
  private readonly logger = new Logger(SortingFieldOrderPipe.name);

  transform(value: any) {
    if (!value) return undefined;

    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid sortBy');
    }

    return value
      .split(',')
      .map((v) => v.split(':'))
      .map((v) => {
        const [field, direction] = v;
        const sanitizedDirection = direction.toLowerCase();

        if (
          !field ||
          !sanitizedDirection ||
          !['asc', 'desc'].includes(sanitizedDirection)
        ) {
          this.logger.warn(
            `User provided an invalid sortBy field, ignoring it (${JSON.stringify(v)})`,
          );
        }

        return new SortBy(field, sanitizedDirection as SortDirection);
      });
  }
}
