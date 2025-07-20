<?php

define('ROOT_DIR', __DIR__);
$request = strtok($_SERVER['REQUEST_URI'], '?');

switch ($request) {
    case '':
    case '/':
    case '/accueil':
        require __DIR__ . '/main.php';
        break;
    
    default:
        http_response_code(404);
        // require __DIR__ . '/controler/404.php';
        echo "404 - Page not found";
}
