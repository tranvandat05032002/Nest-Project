import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {}
    @Post('add')
    createPost(@Body() body): Promise<Category> {
        return this.categoryService.create(body)
    } 
}
