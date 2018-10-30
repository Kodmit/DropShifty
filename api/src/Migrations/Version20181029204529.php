<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181029204529 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE shop CHANGE wc_api_url wc_api_url LONGTEXT DEFAULT NULL, CHANGE wc_api_key wc_api_key LONGTEXT DEFAULT NULL, CHANGE wc_user wc_user LONGTEXT DEFAULT NULL, CHANGE wc_password wc_password LONGTEXT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE shop CHANGE wc_api_url wc_api_url LONGTEXT NOT NULL COLLATE utf8_unicode_ci, CHANGE wc_api_key wc_api_key LONGTEXT NOT NULL COLLATE utf8_unicode_ci, CHANGE wc_user wc_user LONGTEXT NOT NULL COLLATE utf8_unicode_ci, CHANGE wc_password wc_password LONGTEXT NOT NULL COLLATE utf8_unicode_ci');
    }
}
