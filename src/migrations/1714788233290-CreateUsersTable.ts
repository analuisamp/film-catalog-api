import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1714788233290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'username',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              isNullable: false
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
