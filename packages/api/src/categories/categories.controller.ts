import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @ApiOkResponse({ type: [CategoryDto] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: CategoryDto })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id: +id });
  }
}
