<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8075250c91ef9e2bbd903c749ce07777
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'Dotenv\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Dotenv\\' => 
        array (
            0 => __DIR__ . '/..' . '/vlucas/phpdotenv/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'S' => 
        array (
            'Slim' => 
            array (
                0 => __DIR__ . '/..' . '/slim/slim',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8075250c91ef9e2bbd903c749ce07777::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8075250c91ef9e2bbd903c749ce07777::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit8075250c91ef9e2bbd903c749ce07777::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}