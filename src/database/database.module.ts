import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/movies/genres.entity';
import { Movie } from 'src/entities/movies/movies.entity';
import { User } from 'src/entities/users/user.entity';
import { DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mks',
  database: 'movie',
  entities: [Movie, Genre, User],
  synchronize: false,
}

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

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

