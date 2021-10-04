import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionOfShopItemEntity1633374644910 implements MigrationInterface {
    name = 'NewVersionOfShopItemEntity1633374644910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` ADD \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` CHANGE \`description\` \`description\` text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` CHANGE \`description\` \`description\` text NOT NULL DEFAULT ''brak''`);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`baza\`.\`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }

}
