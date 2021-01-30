import { Module } from '@nestjs/common';
import { BooksModule } from 'src/modules/books/books.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [BooksModule, CategoriesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
