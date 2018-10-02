<?php

namespace App\Mutation;

use App\Entity\Offer;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


final class UserMutation implements MutationInterface, AliasedInterface
{
    private $em;
    private $passwordEncoder;
    private $validator;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
        $this->validator = $validator;
    }

    public function newUser($username, $password, $email)
    {
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPlainPassword($password);

        $errors = $this->validator->validate($user);

        if (count($errors) > 0)
            return ['content' => $errors];

        $check = $this->em->getRepository(User::class);

        if($check->findOneBy(['username' => $username]))
            return ['content' => "username already exist"];

        if($check->findOneBy(['email' => $email]))
            return ['content' => "email already exist"];

        $passwordEncoded = $this->passwordEncoder->encodePassword($user, $password);
        $user->setPassword($passwordEncoded);
        $user->setApiKey(bin2hex(random_bytes(255)));

        $this->em->persist($user);
        $this->em->flush();

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