import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [BooksModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
