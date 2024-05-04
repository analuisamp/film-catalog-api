import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from 'src/entities/movies/movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/movies/genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers : [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}


