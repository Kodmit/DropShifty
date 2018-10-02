<?php

namespace App\Resolver;

use App\Repository\CountryRepository;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;


/**
 * Class CountryResolver
 * @package App\Resolver
 */
final class CountryResolver implements ResolverInterface, AliasedInterface
{
    /**
     * @var CountryRepository
     */
    private $countryRepository;

    /**
     *
     * @param CountryRepository $countryRepository
     */
    public function __construct(CountryRepository $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }

    /**
     * @return \App\Entity\Country
     */
    public function country(int $id)
    {
        return $this->countryRepository->find($id);
    }

    /**
     * @return \App\Entity\Country[]
     */
    public function countries()
    {
        return $this->countryRepository->findAll();
    }

    /**
     * {@inheritdoc}
     * Key : Name of the function inside this file
     * Value : Name of the key called by GraphQL
     */
    public static function getAliases(): array
    {
        return [
            'country' => 'Country',
            'countries' => 'Countries',
        ];
    }
}