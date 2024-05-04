import { Module, forwardRef } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from 'src/entities/movies/movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/movies/genres.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers : [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}


