<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/App.php';
$app = new App();
$database = $app->requireApp($app::DATABASE);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (
        isset($_FILES["video"]) &&
        isset($_POST["placa"]) &&
        count($_FILES) == 1 &&
        count($_POST) == 1
    ) {

        $arrayResponse = array(
            'statusText' => 'error',
            'message' => 'Sin iniciar',
            'data' => array()
        );


        $srcFolder = "video";
        $srcFolderDate = date("d-m-Y");
        $srcPlaca = htmlspecialchars(strtoupper($_POST["placa"]));
        // src final
        $srcFolderComplete = "{$srcFolder}/$srcPlaca/{$srcFolderDate}";

        $srcFileName = time();
        $tempFile = $_FILES['video']['tmp_name'];
        $fileExtension = pathinfo($_FILES['video']['name'])['extension'];

        if (!file_exists($app->data['src'] . $srcFolderComplete)) {
            mkdir($app->data['src'] . $srcFolderComplete, 0777, true);
        }
        try {
            if (move_uploaded_file($tempFile, $app->data['src'] . $srcFolderComplete . '/' . $srcFileName . "." . $fileExtension)) {
                $arrayResponse['data'] = "{$srcFolderComplete}/{$srcFileName}.{$fileExtension}";
                try {
                    $sqlQuery = "SELECT agregarVideo(:placa, :titulo, :video) AS resultado";
                    $sqlStmt = $database->getPDO()->prepare($sqlQuery);


                    $sqlStmt->bindParam(':placa',  $srcPlaca, PDO::PARAM_STR);
                    $sqlStmt->bindParam(':titulo',  $srcFileName, PDO::PARAM_STR);
                    $sqlStmt->bindParam(':video', $arrayResponse['data'], PDO::PARAM_STR);

                    if ($sqlStmt->execute()) {
                        $tempResponse = json_decode($sqlStmt->fetchColumn(), true);

                        $arrayResponse['statusText'] = $tempResponse['statusText'];
                        $arrayResponse['message'] = $tempResponse['message'];

                        $sqlStmt->closeCursor();
                    } else {
                        $arrayResponse['statusText'] = 'again';
                        $arrayResponse['message'] = 'Error SQL';
                    }
                } catch (Throwable $th) {
                    $arrayResponse['statusText'] = 'again';
                    $arrayResponse['message'] = 'Error en la comunicación: ' . $th->getMessage();
                }
            } else {
                $arrayResponse['statusText'] = 'again';
                $arrayResponse['message'] = 'arhivo no fue subido';
            }
        } catch (Exception $e) {
            $arrayResponse['statusText'] = 'again';
            $arrayResponse['message'] = 'Imposible subir: ' . $e->getMessage();
        }       

        echo json_encode($arrayResponse, JSON_FORCE_OBJECT);
    } else {
        echo json_encode(array(
            'statusText' => 'error',
            'message' => 'Formulario icompleto',
        ), JSON_FORCE_OBJECT);
    }
} else {
    echo json_encode(array(
        'statusText' => 'error',
        'message' => 'POST WRONG',
    ), JSON_FORCE_OBJECT);
}
