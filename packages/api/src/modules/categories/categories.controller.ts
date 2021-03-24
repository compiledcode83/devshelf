import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
import { Prisma } from '@prisma/client';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoryDto] })
  findAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: keyof Prisma.CategoryOrderByInput,
    @Query('orderBy') orderBy?: Prisma.SortOrder,
    @Query('page') page?: string,
    @Query('isRecommended') isRecommended?: string,
  ) {
    const PER_PAGE = 1;
    const PAGE_QUERY = page ? parseInt(page) : undefined;
    return this.categoriesService.findAll({
      skip: PAGE_QUERY && PAGE_QUERY * PER_PAGE - PER_PAGE,
      take: PAGE_QUERY && PER_PAGE,
      where: {
        name: { contains: search },
        isRecommended: isRecommended && isRecommended === 'true' ? true : false,
      },
      orderBy: sortBy ? { [sortBy]: orderBy || 'asc' } : undefined,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single category' })
  @ApiOkResponse({ type: CategoryDto })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.findOne({ id });
  }
}
