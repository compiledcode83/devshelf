import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('returns all categories', async () => {
    const categories = [{ id: 1, name: 'test' }];

    jest.spyOn(categoriesService, 'findAll').mockImplementation(() => Promise.resolve(categories));
    expect(await categoriesService.findAll()).toEqual(categories);
  });

  it('returns a category with given id', async () => {
    const categoryId = 1;
    const category = { id: categoryId, name: 'test' };

    jest.spyOn(categoriesService, 'findOne').mockImplementation(() => Promise.resolve(category));
    expect(await categoriesService.findOne({ id: categoryId })).toEqual(category);
  });
});
