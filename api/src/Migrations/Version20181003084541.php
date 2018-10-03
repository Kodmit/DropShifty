<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181003084541 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_reseller (id INT AUTO_INCREMENT NOT NULL, shop_reseller_id INT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, api_key VARCHAR(255) DEFAULT NULL, api_secret VARCHAR(255) DEFAULT NULL, username VARCHAR(255) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, INDEX IDX_F88CBC994391578D (shop_reseller_id), INDEX IDX_F88CBC99A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL, title VARCHAR(60) NOT NULL, content VARCHAR(255) DEFAULT NULL, target LONGTEXT DEFAULT NULL, status VARCHAR(10) NOT NULL, INDEX IDX_BF5476CAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, shop_reseller_id INT NOT NULL, shop_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, price DOUBLE PRECISION NOT NULL, url LONGTEXT NOT NULL, sku VARCHAR(150) DEFAULT NULL, last_sync DATETIME DEFAULT NULL, INDEX IDX_D34A04AD4391578D (shop_reseller_id), INDEX IDX_D34A04AD4D16C4DD (shop_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, shop_reseller_id INT NOT NULL, product_id INT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL, status VARCHAR(255) NOT NULL, order_number INT NOT NULL, price DOUBLE PRECISION NOT NULL, paiement_method VARCHAR(50) NOT NULL, INDEX IDX_F52993984391578D (shop_reseller_id), INDEX IDX_F52993984584665A (product_id), INDEX IDX_F5299398A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE shop_reseller (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, website VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, enabled TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_reseller ADD CONSTRAINT FK_F88CBC994391578D FOREIGN KEY (shop_reseller_id) REFERENCES shop_reseller (id)');
        $this->addSql('ALTER TABLE user_reseller ADD CONSTRAINT FK_F88CBC99A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD4391578D FOREIGN KEY (shop_reseller_id) REFERENCES shop_reseller (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD4D16C4DD FOREIGN KEY (shop_id) REFERENCES shop (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993984391578D FOREIGN KEY (shop_reseller_id) REFERENCES shop_reseller (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993984584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F5299398A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993984584665A');
        $this->addSql('ALTER TABLE user_reseller DROP FOREIGN KEY FK_F88CBC994391578D');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD4391578D');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993984391578D');
        $this->addSql('DROP TABLE user_reseller');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE `order`');
        $this->addSql('DROP TABLE shop_reseller');
    }
}
