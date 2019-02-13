<?php

namespace App\Controller;

use App\Entity\Shop;
use App\Entity\User;
use App\Service\CoreService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Security\TokenAuthenticator;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CoreController extends Controller
{

    private $auth;
    private $passwordEncoder;
    private $checker;
    private $eventDispatcher;
    private $coreService;

    public function __construct(TokenAuthenticator $auth, UserPasswordEncoderInterface $passwordEncoder, AuthorizationCheckerInterface $checker, EventDispatcherInterface $eventDispatcher, CoreService $coreService)
    {
        $this->auth = $auth;
        $this->passwordEncoder = $passwordEncoder;
        $this->checker = $checker;
        $this->eventDispatcher = $eventDispatcher;
        $this->coreService = $coreService;
    }

    /**
     * @Route("/", name="home", methods={"GET"})
     */
    public function home(){

        return new Response("<body>ok</body>");
    }


    /**
     * @Route("/login", name="login", methods={"POST"})
     * @param Request $request
     * @param CoreService $coreService
     * @return JsonResponse
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


    /**
     * @Route("/save_wc", name="save_wc", methods={"POST"})
     */
    public function saveWcApi(){
        $data = file_get_contents('php://input');
        $arr = json_decode($data, true);

        var_dump("loaded");

        // For debug
        file_put_contents("../dump.html", "penis");
        var_dump(__DIR__);
        var_dump(touch(__DIR__ . "/fuck.html"));
        dump(__DIR__);
        var_dump($data);

        if($user = $this->coreService->findUserByKey($arr['user_id'])){
            $shop = $this->getDoctrine()->getRepository(Shop::class)->findOneBy(["owner" => $user]);
            $shop->setWcUser($arr['user_id']);
            $shop->setWcApiKey($arr["consumer_key"]);
            $shop->setWcPassword($arr["consumer_secret"]);
            $this->getDoctrine()->getManager()->flush();
            return true;
        }
        throw new AccessDeniedException("Invalid key");
    }

    /**
     * @Route("/check_wc", name="check_wc", methods={"GET"})
     */
    public function checkWcApi(){
        $shop = $this->getDoctrine()->getRepository(Shop::class)->findOneBy(["owner" => $this->getUser()]);

        if(!$shop->getWcApiKey())
            return $this->redirect(""); // todo : Redirection url if fail
        return $this->redirect(""); // todo : Redirection url if success

    }

}
