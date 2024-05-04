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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all movies' })
  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get movie by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create a new movie' })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDTO: CreateMovieDTO) {
    return this.moviesService.create(createMovieDTO);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update movie by ID' })
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDTO: UpdateMovieDTO) {
    return this.moviesService.update(id, updateMovieDTO);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Remove movie by ID' })
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
