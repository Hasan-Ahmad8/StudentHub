<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect to DB
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Read raw input as JSON
    $input = json_decode(file_get_contents("php://input"), true);

    //Signup post request
   if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['action']) && $input['action'] === 'signup') {
        $email = $input['email'] ?? null;
        $name = $input['studentName'] ?? null;
        $password = $input['password'] ?? null;
        $userType = $input['user_type'] ?? 'student'; 

        if (!$email || !$password || !$name) {
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
            exit;
        }

        try {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare("INSERT INTO auth (email, hashed_password, user_type) VALUES (?, ?, ?)");
            $stmt->execute([$email, $hashedPassword, $userType]);

            $authId = $pdo->lastInsertId();

            if ($userType === 'student') {
                $studentId = "S" . str_pad($authId, 5, "0", STR_PAD_LEFT);

                $semesterEnd = "2026-01-15"; 

                $stmt = $pdo->prepare("INSERT INTO students (student_id, student_name, email, semester_end_date) VALUES (?, ?, ?, ?)");
                $stmt->execute([$studentId, $name, $email, $semesterEnd]);

                $stmt = $pdo->prepare("UPDATE auth SET linked_id = ? WHERE auth_id = ?");
                $stmt->execute([$studentId, $authId]);
            }

                echo json_encode(['success' => true]);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }

            exit;
    }


    //Login post request
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input['action']) && $input['action'] === 'login') {
        $email = $input['email'] ?? null;
        $password = $input['password'] ?? null;

        if (!$email || !$password) {
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
            exit;
        }

        // Look up user
        $stmt = $pdo->prepare("SELECT * FROM auth WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['hashed_password'])) {
            echo json_encode([
                'success' => true,
                'auth_id' => $user['auth_id'],
                'user_type' => $user['user_type'],
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect email or password']);
        }
        exit;
    }


    // Get studentID request
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'getStudentId') {
        $auth_id = $_GET['auth_id'] ?? null;

        if (!$auth_id) {
            echo json_encode(['error' => 'Missing auth_id']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT linked_id FROM auth WHERE auth_id = ?");
        $stmt->execute([$auth_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($row);
        exit;
    }

    // Get schedule for a student
    if ($_GET['action'] === 'schedule') {
        $student_id = $_GET['student_id'];

        if (!$student_id) {
            echo json_encode(['success' => false, 'message' => 'Missing student_id']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM student_schedule WHERE student_id = ?");
        $stmt->execute([$student_id]);
        $schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($schedule); 
        exit;
    }

    // Get semester information 
    if($_GET['action'] === 'semester'){
        $student_id = $_GET['student_id'];

        if (!student_id){
            echo json_encode(['success' => false, 'message' => 'Missing student_id']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT semester_end_date FROM students WHERE student_id = ?");
        $stmt->execute([$student_id]);
        $schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($schedule); 
        exit;
    }

    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        // 23000 = Integrity constraint violation (e.g. duplicate email)
        echo json_encode(['success' => false, 'message' => 'Email already exists.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

