import { Module } from '@nestjs/common';
import { BooksModule } from 'src/modules/books/books.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SessionModule } from 'src/modules/session/session.module';

@Module({
  imports: [BooksModule, CategoriesModule, AuthModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
