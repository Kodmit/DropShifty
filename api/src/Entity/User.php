<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", unique=true)
     */
    private $apiKey;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=150, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $birthday;

    /**
     * @ORM\Column(type="boolean")
     */
    private $enabled;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $picture_path;

    /**
     * @ORM\Column(type="text")
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $last_login;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $postal_code;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address_line_1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address_line_2;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Offer", inversedBy="user")
     * @ORM\JoinColumn(nullable=true)
     */
    private $offer;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        $this->enabled = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * @param mixed $apiKey
     */
    public function setApiKey($apiKey): void
    {
        $this->apiKey = $apiKey;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(?\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getPicturePath(): ?string
    {
        return $this->picture_path;
    }

    public function setPicturePath(?string $picture_path): self
    {
        $this->picture_path = $picture_path;

        return $this;
    }

    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getLastLogin(): ?\DateTimeInterface
    {
        return $this->last_login;
    }

    public function setLastLogin(?\DateTimeInterface $last_login): self
    {
        $this->last_login = $last_login;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?int
    {
        return $this->postal_code;
    }

    public function setPostalCode(?int $postal_code): self
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    public function getAddressLine1(): ?string
    {
        return $this->address_line_1;
    }

    public function setAddressLine1(?string $address_line_1): self
    {
        $this->address_line_1 = $address_line_1;

        return $this;
    }

    public function getAddressLine2(): ?string
    {
        return $this->address_line_2;
    }

    public function setAddressLine2(?string $address_line_2): self
    {
        $this->address_line_2 = $address_line_2;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(?Offer $offer): self
    {
        $this->offer = $offer;

        return $this;
    }

    public function getRoles()
    {
        return array('ROLE_USER');
    }



    public function eraseCredentials()
    {
    }

    /** @see \Serializable::serialize() */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt,
        ));
    }

    /** @see \Serializable::unserialize() */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt
            ) = unserialize($serialized, array('allowed_classes' => false));
    }

}
