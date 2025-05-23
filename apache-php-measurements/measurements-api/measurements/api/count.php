<?php
// Setze HTTP-Header für die JSON-Antwort
header('Content-Type: application/json; charset=utf-8');
// Erlaube Cross-Origin Requests (CORS)
header('Access-Control-Allow-Origin: *');
// Erlaube nur GET-Anfragen
header('Access-Control-Allow-Methods: GET');

// Fehlerberichterstattung aktivieren
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Setze UTF-8 Kodierung für korrekte Zeichendarstellung
mb_internal_encoding('UTF-8');

try {
    // Ermittle das Verzeichnis mit den Messdaten (ein Verzeichnis höher als die API)
    $measurementsDir = dirname(__DIR__);
    
    // Prüfe ob das Verzeichnis existiert
    if (!is_dir($measurementsDir)) {
        throw new Exception("Messungen-Verzeichnis nicht gefunden");
    }
    
    // Hole alle JSON-Dateien aus dem Messungen-Verzeichnis
    $files = glob($measurementsDir . '/*.json');
    
    if ($files === false) {
        throw new Exception("Fehler beim Lesen der Dateien");
    }
    
    // Zähle die Anzahl der JSON-Dateien
    $count = count($files);
    
    // Gib die Anzahl der Messungen als JSON zurück
    echo json_encode([
        'count' => $count
    ]);
} catch (Exception $e) {
    // Im Fehlerfall gib eine Fehlermeldung zurück
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}