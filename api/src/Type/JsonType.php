<?php

namespace App\Type;

use GraphQL\Language\AST\Node;

class JsonType
{
    /**
     * @param $value
     *
     * @return string
     */
    public static function serialize($value)
    {
        return $value;
    }

    /**
     * @param mixed $value
     *
     * @return mixed
     */
    public static function parseValue($value)
    {
        return $value;
    }

    /**
     * @param Node $valueNode
     *
     * @return string
     */
    public static function parseLiteral($valueNode)
    {
        return $valueNode->value;
    }
}