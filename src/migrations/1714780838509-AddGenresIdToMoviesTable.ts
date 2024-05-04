import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddGenresIdToMoviesTable1714780838509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('movies_genres_genres', new TableColumn({
        name: 'genresId',
        type: 'uuid',
        isNullable: true,
      }),
    )

    await queryRunner.createForeignKey('movies_genres_genres', new TableForeignKey({
      name: 'movies_genres_genres',
      columnNames: ['genresId'],
      referencedTableName: 'genres',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }),
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('movies_genres_genres', 'movies_genres_genres')

      await queryRunner.dropColumn('movies_genres_genres', 'genresId')
    }

}
