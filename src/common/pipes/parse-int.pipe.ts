import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
/**
 * Convert string to number
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        console.log("Value-Pipe: ", value)
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed');
        }

        return val
    }

}