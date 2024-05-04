import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Post,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all users' })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get user by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create a new user' })
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update user by ID' })
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDTO);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Remove user by ID' })
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
