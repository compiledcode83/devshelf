import { Module } from '@nestjs/common';
import { CookiesService } from './cookies.service';

@Module({
  controllers: [],
  providers: [CookiesService],
})
export class CookiesModule {}
