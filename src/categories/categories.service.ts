import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private prismaService: PrismaService) { }

    async create(categoryData: CategoryDto): Promise<Category> {
        const category = await this.prismaService.category.findUnique({
            where: {
                name: categoryData.name
            }
        })
        if(category) {
            throw new HttpException(
                {
                    message: 'This category has been categories.'
                },
                HttpStatus.BAD_REQUEST
            );
        }
        const res = await this.prismaService.category.create({
            data: categoryData
        });
        return res;
    }
}
