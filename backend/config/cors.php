<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    | This enables frontend cookie support for Sanctum stateful SPA auth.
    | The browser can request /sanctum/csrf-cookie and then send protected POST/PUT/DELETE calls.
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // true = allow cookies to be sent from the frontend for Sanctum (needed for CSRF)
    'supports_credentials' => true,

];
