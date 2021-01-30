import { Controller, Get, Body, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoryDto] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single category' })
  @ApiOkResponse({ type: CategoryDto })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.findOne({ id });
  }
}
