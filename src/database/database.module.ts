import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities/movies/genres.entity';
import { Movie } from 'src/entities/movies/movies.entity';
import { User } from 'src/entities/users/user.entity';
import { DataSourceOptions } from 'typeorm';
import { Pool } from 'pg';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mks',
  database: 'movie',
  entities: [Movie, Genre, User],
  synchronize: false,
};

const connectionString = 'postgres://u725bl64f3n7rg:pde9b1181969b3e7f0f80bf469c9cc19e925ad609513db4735fc1b5387e9bd285@cf9gid2f6uallg.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dfa7jii79857pm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {
  constructor() {
    // Aqui você pode realizar as operações de inicialização do pool, se necessário.
    const pool = new Pool({
      connectionString: connectionString,
    });
  }
}
