<?php
require_once __DIR__ . '/App.php';
if ($_SERVER["HTTPS"] != "on") {
    // Redireccionar a la misma URL pero con HTTPS
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
$app = new App();
$templates = $app->requireApp($app::TEMPLATES);
$components = $app->requireApp($app::COMPONENTS);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Principal :: CDA AUTOMOTOS SAS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/helix.min.css">
    <link rel="icon" href="/src/favicon.png" type="image/x-icon">
    <style>

    </style>
</head>

<body class="bg-body-secondary">
    <?php $templates->get($templates::NAVBAR) ?>
    <div class="my-5 pt-5" id="main">
        <?php $components->get(
            $components::JUMBOTRON,
            array(
                'icon' => 'fa-solid fa-house',
                'title' => 'Principal',
                'description' => 'Videos CDA V3'
            )
        ) ?>
        <?php $templates->get($templates::BREADCRUMB) ?>
        <div class="container-fluid p-sm-2 p-lg-5 mb-5 bg-body-tertiary">
            <div class="row g-2">
                <div class="col-12">
                    <div class="text-center">
                        <h1>¿Que desea hacer?</h1>
                        <p>Seleccione una tarea por favor</p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="d-flex justify-content-center">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header">
                                #1 Subir Video
                            </div>
                            <div class="card-body">
                                <div class="text-center m-2">
                                    <i class="fa-solid fa-cloud-arrow-up fa-bounce fa-2xl"></i>
                                </div>
                                <p class="card-text">
                                    Los videos que grabe, serán mostrados como <b>evidencia</b> al cliente.
                                </p>
                                <div class="text-center">
                                    <a href="/subir.php" class="btn btn-primary btn-lg">
                                        <i class="fa-solid fa-arrow-right"></i> Subir video
                                    </a>
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                Defectos, recomendaciones, etc..
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="d-flex justify-content-center">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header">
                                #2 Videos
                            </div>
                            <div class="card-body">
                                <div class="text-center m-2">
                                    <i class="fa-solid fa-video fa-flip fa-2xl"></i>
                                </div>
                                <p class="card-text">
                                    Visualizar todos los videos <b>(Evidencias)</b> subidos por los inspectores
                                </p>
                                <div class="text-center">
                                    <a href="/videos.php" class="btn btn-success btn-lg">
                                        <i class="fa-solid fa-arrow-right"></i> Ver videos
                                    </a>
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                Placa, fecha, historial...
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <?php $templates->get($templates::FOOTER) ?>
    <?php $templates->get($templates::SCRIPTS) ?>
</body>

</html>