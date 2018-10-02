<?php

namespace App\Mutation;

use App\Entity\Offer;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;


final class UserMutation implements MutationInterface, AliasedInterface
{
    private $em;
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function newUser($username, $password, $email)
    {
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);

        $passwordEncoded = $this->passwordEncoder->encodePassword($user, $password);
        $user->setPassword($passwordEncoded);
        $user->setApiKey(bin2hex(random_bytes(255)));

        $this->em->persist($user);

        try {
            $this->em->flush();
        } catch (\Exception $e) {
            return ['content' => 0];
        }


        return ['content' => "ok"];
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases(): array
    {
        return [
            'newUser' => 'NewUser',
        ];
    }
}