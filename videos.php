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
    <title>Videos :: CDA AUTOMOTOS SAS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/helix.min.css">
    <link rel="icon" href="/src/favicon.png" type="image/x-icon">
    <style>
        video {
            width: 100%;
            height: auto;
            max-width: 600px;
            max-height: 300px;
            border: 2px solid var(--bs-border-color);
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.2);
        }

        .tab-content>.active {
            background: var(--bs-body-bg);
            padding: 5px;
            border: 1px solid var(--bs-border-color);
            border-top: none;
        }
    </style>
</head>

<body class="bg-body-secondary">
    <?php $templates->get($templates::NAVBAR) ?>
    <div class="my-5 pt-5" id="main">
        <?php $components->get(
            $components::JUMBOTRON,
            array(
                'icon' => 'fa-solid fa-video',
                'title' => 'Videos',
                'description' => 'Videos CDA V3'
            )
        ) ?>

        <?php $templates->get($templates::BREADCRUMB) ?>
        <div class="container-fluid p-2 p-lg-5 mb-5 bg-body-tertiary">
            <div class="my-5">

                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#bf" aria-current="page" data-bs-toggle="pill">
                            <i class="fa-solid fa-calendar"></i>
                            Fecha
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#bp" aria-current="page" data-bs-toggle="pill">
                            <i class="fa-solid fa-car-side"></i>
                            Placa
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="bf">
                        <div class="row g-2 p-3">
                            <div class="col-8 col-lg-4">
                                <div class="input-group input-group-lg">
                                    <label class="input-group-text" for="input-fecha">Fecha</label>
                                    <input type="date" id="input-fecha" class="form-control" placeholder="10/10/2023">
                                </div>
                            </div>
                            <div class="col-4 col-lg-3">
                                <button class="btn btn-primary btn-lg" id="btn-buscar-fecha">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="bp">
                        <div class="row g-2 p-3">
                            <div class="col-8 col-lg-4">
                                <div class="input-group input-group-lg">
                                    <label class="input-group-text" for="input-placa">Placa</label>
                                    <input type="text" id="input-placa" placeholder="AAA000" class="form-control" maxlength="6" required>
                                </div>
                            </div>
                            <div class="col-4 col-lg-3">
                                <button class="btn btn-primary btn-lg" id="btn-buscar-placa">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-5">
                <div class="row g-2">
                    <div class="col-12 col-md-4">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#1" aria-current="page" data-bs-toggle="pill">
                                    <i class="fa-solid fa-list-ol"></i>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="1">
                                <div class="accordion" id="accordion-resultado">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#1" aria-current="page" data-bs-toggle="pill">
                                    <i class="fa-solid fa-video"></i> Video
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="1">
                                <div class="card text-center mt-3" id="card-evidencia" style="display:none">
                                    <div class="card-header">
                                        <span id="span-placa"></span>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title" id="h5-titulo-hora"></h5>
                                        <div class="d-flex justify-content-center">
                                            <video id="video-historial" controls="" style="display:none;">
                                                <source src="" type="video/mp4">
                                            </video>
                                        </div>
                                    </div>
                                    <div class="card-footer text-body-secondary">
                                        <a href="#" id="id-video-link" class="card-link" target="_blank">
                                            Externo
                                        </a>
                                        <a href="#" id="id-video-download" class="card-link" download>
                                            Descargar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php $templates->get($templates::FOOTER) ?>
    <?php $templates->get($templates::SCRIPTS) ?>
    <script src="/app/controllers/videos.js"></script>
</body>

</html>