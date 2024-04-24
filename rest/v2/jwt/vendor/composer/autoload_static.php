<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitca857bf5b38a089a7939c18955d0f3da
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitca857bf5b38a089a7939c18955d0f3da::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitca857bf5b38a089a7939c18955d0f3da::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}