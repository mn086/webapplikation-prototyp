<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Setze UTF-8 Kodierung für PHP
mb_internal_encoding('UTF-8');

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing measurement ID']);
    exit;
}

$measurementsDir = dirname(__DIR__);
$filePath = $measurementsDir . '/' . $id . '.json';

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Measurement not found']);
    exit;
}

$content = file_get_contents($filePath);
if ($content === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error reading measurement file']);
    exit;
}

echo json_encode(json_decode($content), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
