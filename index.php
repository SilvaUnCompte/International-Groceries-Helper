<?php

define('ROOT_DIR', __DIR__);
$request = strtok($_SERVER['REQUEST_URI'], '?');

// Allow direct access to static files (CSS, JS, images, etc.)
$file_path = __DIR__ . $request;
if (file_exists($file_path) && !is_dir($file_path)) {
    // Get the file extension
    $extension = pathinfo($file_path, PATHINFO_EXTENSION);
    
    // Set appropriate content type
    switch ($extension) {
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'js':
            header('Content-Type: application/javascript');
            break;
        case 'json':
            header('Content-Type: application/json');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'gif':
            header('Content-Type: image/gif');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
    }
    
    readfile($file_path);
    exit;
}

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
