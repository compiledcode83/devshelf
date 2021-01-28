import { Module } from '@nestjs/common';
import { BooksModule } from 'src/modules/books/books.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  imports: [BooksModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
