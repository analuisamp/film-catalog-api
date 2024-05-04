import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddMoviesIdToGenresTable1714780057974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('movies_genres_genres', new TableColumn({
        name: 'moviesId',
        type: 'uuid',
        isNullable: true,
      }),
    )

      await queryRunner.createForeignKey('movies_genres_genres', new TableForeignKey({
        name: 'movies_genres_movies',
        columnNames: ['moviesId'],
        referencedTableName: 'movies',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('movies_genres_genres', 'movies_genres_movies')

      await queryRunner.dropColumn('movies_genres_genres', 'moviesId')
    }

}
