<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181001131203 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, offer_id INT NOT NULL, username VARCHAR(150) NOT NULL, firstname VARCHAR(150) DEFAULT NULL, lastname VARCHAR(150) DEFAULT NULL, email VARCHAR(150) NOT NULL, birthday DATETIME DEFAULT NULL, enabled TINYINT(1) NOT NULL, picture_path LONGTEXT DEFAULT NULL, password LONGTEXT NOT NULL, salt LONGTEXT NOT NULL, created_at DATETIME NOT NULL, last_login DATETIME DEFAULT NULL, city VARCHAR(150) DEFAULT NULL, postal_code INT DEFAULT NULL, address_line_1 VARCHAR(255) DEFAULT NULL, address_line_2 VARCHAR(255) DEFAULT NULL, INDEX IDX_8D93D64953C674EE (offer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, image LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, wc_api_limit INT DEFAULT NULL, wc_orders_limit INT DEFAULT NULL, enabled TINYINT(1) DEFAULT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64953C674EE FOREIGN KEY (offer_id) REFERENCES offer (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64953C674EE');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE offer');
    }
}
