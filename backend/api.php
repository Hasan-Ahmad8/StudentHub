<?php
    // Enable CORS
    header("Access-Control-Allow-Origin: http://localhost:3000");       //change localhost to real domain when we have one
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    // Connect to DB
    require_once 'config.php';

    try{
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);

        // Example: fetch all classes
        $stmt = $pdo->query("SELECT * FROM classes");
        $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($classes);
    }catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
?>
