<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/App.php';
$app = new App();
$database = $app->requireApp($app::DATABASE);

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (
        isset($_GET["fecha"]) &&
        count($_GET) == 1
    ) {

        $arrayResponse = array(
            'statusText' => 'error',
            'message' => 'Sin iniciar',
            'data' => array()
        );
        try {

            $placa = htmlspecialchars($_GET["fecha"]);

            // Prepara la consulta SQL y vincula el parámetro por referencia
            $sqlQuery = "CALL buscarVideoFecha(:fecha);";
            $sqlStmt = $database->getPDO()->prepare($sqlQuery);
            $sqlStmt->bindParam(':fecha', $placa, PDO::PARAM_STR);

            if ($sqlStmt->execute()) {
                while ($row = $sqlStmt->fetch(PDO::FETCH_BOTH)) {
                    array_push(
                        $arrayResponse['data'],
                        array(
                            'id' => $row['id'],
                            'titulo' => htmlspecialchars($row['titulo']),
                            'placa' => htmlspecialchars($row['placa']),
                            'src' => htmlspecialchars($row['src']),
                            'fecha' => htmlspecialchars($row['fecha']),
                            'hora' => htmlspecialchars($row['hora'])
                        )
                    );
                }
                $arrayResponse['statusText'] = 'ok';
                $arrayResponse['message'] = 'Resultados encontrados';
                $sqlStmt->closeCursor();
            } else {
                $arrayResponse['statusText'] = 'again';
                $arrayResponse['message'] = 'Error SQL';
            }
        } catch (Throwable $th) {
            $arrayResponse['statusText'] = 'again';
            $arrayResponse['message'] = 'Error en la comunicación: ' . $th->getMessage();
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
