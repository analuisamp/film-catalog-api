import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/movies/genres.entity';
import { Movie } from 'src/entities/movies/movies.entity';
import { User } from 'src/entities/users/user.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgres://postgres:mks@localhost:5432/movie',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mks',
  database: 'movie',
  entities: [Movie, Genre, User],
  synchronize: false,
}

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => {
      return {
        ...dataSourceOptions,
      }
    },
  }),
],
})
export class DatabaseModule {}
