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
    <title>Subir video :: CDA AUTOMOTOS SAS</title>
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

        #container-resultado {
            max-height: 300px;
            padding: 5px;
            border-radius: 5px;
            background: var(--bs-body-bg);
            border: 1px solid var(--bs-border-color);
        }
    </style>
</head>

<body class="bg-body-secondary">
    <?php $templates->get($templates::NAVBAR) ?>
    <div class="my-5 pt-5" id="main">
        <?php $components->get(
            $components::JUMBOTRON,
            array(
                'icon' => 'fa-solid fa-cloud-arrow-up',
                'title' => 'Subir video',
                'description' => 'Videos CDA V3'
            )
        ) ?>

        <?php $templates->get($templates::BREADCRUMB) ?>
        <div class="container-fluid p-3 mb-5 bg-body-tertiary">
            <div class="my-5" id="container-placa">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#nav-placa" data-bs-toggle="pill">
                            <i class="fa-solid fa-car-side"></i>
                            Placa
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" data-bs-toggle="pill" aria-disabled="true">Ayuda</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="#nav-placa">
                        <div class="row g-2 p-3">
                            <div class="col-12">
                                    <label>Ingrese la Placa</label>
                            </div>
                            <div class="col-8 col-lg-5">
                                <div class="input-group input-group-lg">
                                    <label class="input-group-text" for="input-placa">Placa</label>
                                    <input type="text" id="input-placa" class="form-control" maxlength="6" placeholder="Placa" style="text-transform: uppercase;">
                                </div>
                            </div>
                            <div class="col-4 col-lg-3">
                                <button class="btn btn-primary btn-lg" id="btn-siguiente-placa">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="container-cargar-video" style="display:none">
                <div class="row g-2">
                    <div class="col-12">
                        <div class="text-start">
                            <h5>2. Video gestión</h5>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="text-center">
                            <h2 id="cargar-h3-placa">ABC123</h2>
                            <input type="hidden" name="placa" id="input-cargar-placa" value="abc123" required="">
                        </div>
                    </div>
                    <div class="col-12">
                        <ul class="nav nav-tabs justify-content-center">
                            <li class="nav-item">
                                <a class="nav-link active" href="#1" aria-current="page" data-bs-toggle="pill">
                                    <i class="fa-solid fa-upload"></i> Cargar
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#2" data-bs-toggle="pill">
                                    <i class="fa-solid fa-video"></i>
                                    Grabar
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" data-bs-toggle="pill" aria-disabled="true">Ayuda</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="1">
                                <form id="form-cargar-video">
                                    <div class="row g-2">
                                        <div class="col-12">
                                            <div class="text-center">
                                                <h3 id="form-cargar-estado">Cargar video</h3>
                                                <h4 id="form-cargar-pocentaje"></h4>
                                                <div class="progress mx-auto" style="width:200px;" role="progressbar" aria-label="Animated striped example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="display:none; width:75%" id="progress-bar"></div>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                        <div class="col-12">
                                            <div class="input-group input-group-lg">
                                                <input type="file" name="video" accept="video/mp4,video/webm,video/ogg" class="form-control form-control-lg" id="input-file-video" required>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-flex justify-content-center">
                                                <div class="btn-group d-flex justify-content-center" role="group">
                                                    <button type="submit" class="btn btn-primary btn-lg" id="submit-cargar-video" disabled>
                                                        <i class="fa-solid fa-upload"></i> Cargar video
                                                    </button>
                                                    <button type="reset" class="btn btn-danger btn-lg" id="reset-cargar-video">
                                                        <i class="fa-solid fa-times"></i> Salir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="tab-pane" id="2">
                                <div class="col-12">
                                    <select id="select-devices-list" style="display:none;"></select>
                                </div>
                                <div class="col-12">
                                    <div class="d-flex justify-content-center">
                                        <video id="video-rtc" controls="" autoplay="" poster="/src/images/video-1.jpg"></video>
                                    </div>
                                    <hr>
                                    <div class="d-flex justify-content-center mt-2">
                                        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-primary" id="btn-start-recording">Start</button>
                                            <button type="button" class="btn btn-success" id="btn-pause-recording">Pause</button>
                                            <button type="button" class="btn btn-warning" id="btn-stop-recording">Stop</button>
                                            <button type="button" class="btn btn-danger" id="btn-close-recording">Exit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="3">
                                <h3>Ayuda disabled</h3>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <h5>3. Historial</h5>
                    </div>
                    <div class="col-12">
                        <div class="text-end">
                            <button class="btn btn-primary" id="btn-recargar-videos">
                                <i class="fa-solid fa-rotate"></i> Recargar
                            </button>
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="d-flex justify-content-center">
                            <video id="video-historial" controls="" poster="/src/images/video-1.jpg">
                                <source src="" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div id="container-resultado" class="scrollable-div overflow-auto" style="max-height:300px">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php $templates->get($templates::FOOTER) ?>
    <?php $templates->get($templates::SCRIPTS) ?>
    <script src="/app/controllers/subir.js?v=<?= time(); ?>"></script>
    <script src="/app/controllers/cargar.js?v=<?= time(); ?>"></script>
</body>

</html>