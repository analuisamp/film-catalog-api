import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/genres.entity';
import { Movie } from 'src/entities/movies.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mks',
  database: 'movie',
  entities: [Movie, Genre],
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
