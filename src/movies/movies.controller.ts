import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDTO: CreateMovieDTO) {
    return this.moviesService.create(createMovieDTO);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDTO: UpdateMovieDTO) {
    return this.moviesService.update(id, updateMovieDTO);
  }

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
