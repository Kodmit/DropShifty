<?php

namespace App\Resolver;

use App\Repository\OfferRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class OfferResolver
 * @package App\Resolver
 */
final class OfferResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var OfferRepository
     */
    private $offerRepository;

    /**
     *
     * @param OfferRepository $offerRepository
     */
    public function __construct(OfferRepository $offerRepository)
    {
        $this->offerRepository = $offerRepository;
    }

    /**
     * @return \App\Entity\Offer
     */
    public function offer(int $id)
    {
        return $this->offerRepository->find($id);
    }

    /**
     * @return \App\Entity\Offer[]
     */
    public function offers()
    {
        return $this->offerRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'offer' => 'Offer',
            'offers' => 'Offers',
        ];
    }
}