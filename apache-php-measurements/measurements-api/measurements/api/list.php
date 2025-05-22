<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Setze UTF-8 Kodierung für PHP
mb_internal_encoding('UTF-8');

$measurementsDir = dirname(__DIR__);
$files = glob($measurementsDir . '/*.json');
$measurements = [];

foreach ($files as $file) {
    $filename = basename($file);
    if ($filename !== 'blog.json') {  // Exclude the template file
        $measurements[] = [
            'id' => pathinfo($filename, PATHINFO_FILENAME),
            'filename' => $filename,
            'path' => '/measurements/' . $filename
        ];
    }
}

echo json_encode([
    'measurements' => $measurements
]);
