<?php

namespace App\Repository;

use App\Entity\UserReseller;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method UserReseller|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserReseller|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserReseller[]    findAll()
 * @method UserReseller[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserResellerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UserReseller::class);
    }

//    /**
//     * @return UserReseller[] Returns an array of UserReseller objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserReseller
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
