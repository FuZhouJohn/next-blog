import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatPost1621490028521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'title', type: 'varchar'},
                {name: 'content', type: 'text'}
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
