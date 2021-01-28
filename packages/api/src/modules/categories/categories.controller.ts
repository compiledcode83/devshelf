import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';

@ApiTags('categories')
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
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.findOne({ id });
  }
}
