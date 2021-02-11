import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ParseIntPipe } from 'src/common/pipes/parseInt.pipe';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }
}
