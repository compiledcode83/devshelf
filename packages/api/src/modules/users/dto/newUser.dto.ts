import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}
