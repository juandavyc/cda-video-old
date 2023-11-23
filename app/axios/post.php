<?php 

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

echo json_encode(array(
    'statusText' => 'ok', // ok, session, token, error
    'message' => 'POST SUCCESS',
    'post' => json_encode(array($_POST))
), JSON_FORCE_OBJECT);

}

else{
    echo json_encode(array(
        'statusText' => 'error', // ok, session, token, error
        'message' => 'POST WRONG',
    ), JSON_FORCE_OBJECT);
}
