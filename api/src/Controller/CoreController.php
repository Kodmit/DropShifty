<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CoreService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Security\TokenAuthenticator;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CoreController extends AbstractController
{

    private $auth;
    private $passwordEncoder;
    private $checker;
    private $eventDispatcher;

    public function __construct(TokenAuthenticator $auth, UserPasswordEncoderInterface $passwordEncoder, AuthorizationCheckerInterface $checker, EventDispatcherInterface $eventDispatcher)
    {
        $this->auth = $auth;
        $this->passwordEncoder = $passwordEncoder;
        $this->checker = $checker;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request, CoreService $coreService)
    {
        if(!$coreService->coolDown(5))
            return new JsonResponse(["response" => "wait 5 seconds"]);

        if(!$this->checker->isGranted("IS_AUTHENTICATED_REMEMBERED")){

            $username = $request->get("username");
            $password = $request->get("password");

            if($username && $password){
                $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(["username" => $username]);
                if($user){
                    if($this->passwordEncoder->isPasswordValid($user, $password)){

                        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
                        $this->get('security.token_storage')->setToken($token);
                        $this->get('session')->set('_security_main', serialize($token));
                        $event = new InteractiveLoginEvent($request, $token);
                        $this->eventDispatcher->dispatch("security.interactive_login", $event);

                        return new JsonResponse(["response" => "ok"]);
                    }
                    return new JsonResponse(["response" => "password incorrect"]);
                }
                return new JsonResponse(["response" => "invalid user"]);
            }
            return new JsonResponse(["response" => "invalid parameters"]);
        }
        return new JsonResponse(["response" => "already logged in"]);
    }
}
