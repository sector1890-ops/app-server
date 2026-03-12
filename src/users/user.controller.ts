import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }
}
