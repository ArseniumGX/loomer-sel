import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Imoveis1622949507981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "imoveis",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "cep",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "numero",
                    type: "integer",
                    isNullable: true
                },
                {
                    name: "complemento",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "valor_aluguel",
                    type: "real",
                    isNullable: false
                },
                {
                    name: "qtd_quartos",
                    type: "integer",
                    isNullable: false
                },
                {
                    name: "disponivel",
                    type: "boolean",
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("imoveis")
    }

}


/* 
 Implementação pendente, easy
*/