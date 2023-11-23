<?php 
require_once $_SERVER['DOCUMENT_ROOT'] . '/App.php';
$app = new App();
$database = $app->requireApp($app::DATABASE);





// header('Content-Type: application/json');

// if ($_SERVER["REQUEST_METHOD"] == "GET") {

echo json_encode(array(
    'statusText' => 'ok', // ok, session, token, error
    'message' => 'GET SUCCESS',
    'data' => json_encode($database->getEstado())
), JSON_FORCE_OBJECT);

// }

// else{
//     echo json_encode(array(
//         'statusText' => 'error', // ok, session, token, error
//         'message' => 'POST WRONG',
//     ), JSON_FORCE_OBJECT);
// }
