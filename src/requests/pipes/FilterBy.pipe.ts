import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { FilterBy } from '../models/FilterBy';

@Injectable()
export class FilterByPipe implements PipeTransform {
  private readonly logger = new Logger(FilterByPipe.name);

  transform(value: any) {
    if (!value) return undefined;

    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid filterBy');
    }

    return value
      .split(',')
      .map((v) => v.split(':'))
      .map((v) => {
        const [field, value] = v;

        if (!field || !value) {
          this.logger.warn(
            `User provided an invalid filterBy field, ignoring it (${JSON.stringify(v)})`,
          );
        }

        return new FilterBy(field, value);
      });
  }
}
