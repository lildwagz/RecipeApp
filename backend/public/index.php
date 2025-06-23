<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Middleware untuk parsing body JSON, form, dll.
$app->addBodyParsingMiddleware();

$app->get('/api/proxy/{endpoint:.+}', function (Request $request, Response $response, array $args) {
    $endpoint = $args['endpoint'];
    $queryParams = $request->getQueryParams();

    // Daftar putih endpoint yang diizinkan dari TheMealDB
    $allowedEndpoints = ['search.php', 'lookup.php', 'random.php', 'categories.php', 'filter.php', 'list.php'];

    // Cek apakah endpoint yang diminta ada di dalam daftar putih
    if (!in_array($endpoint, $allowedEndpoints)) {
        $response->getBody()->write(json_encode(['error' => 'Endpoint tidak diizinkan']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
    }

    // Membangun URL lengkap ke TheMealDB API
    $apiBaseUrl = "https://www.themealdb.com/api/json/v1/1/";
    $url = $apiBaseUrl . $endpoint;
    if (!empty($queryParams)) {
        $url .= '?' . http_build_query($queryParams);
    }

    // Menggunakan cURL untuk mengambil data
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    // Untuk pengembangan lokal, nonaktifkan verifikasi SSL
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $apiResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $response->getBody()->write($apiResponse);
    return $response->withHeader('Content-Type', 'application/json')->withStatus($httpCode);
});

$app->addErrorMiddleware(true, true, true);

$app->run();