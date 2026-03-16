import { Controller, Get, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.public.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

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
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserById(id);
  }
}
