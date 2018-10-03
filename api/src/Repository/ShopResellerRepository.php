<?php

namespace App\Repository;

use App\Entity\ShopReseller;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ShopReseller|null find($id, $lockMode = null, $lockVersion = null)
 * @method ShopReseller|null findOneBy(array $criteria, array $orderBy = null)
 * @method ShopReseller[]    findAll()
 * @method ShopReseller[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShopResellerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ShopReseller::class);
    }

//    /**
//     * @return ShopReseller[] Returns an array of ShopReseller objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ShopReseller
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
