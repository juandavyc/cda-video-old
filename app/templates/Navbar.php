<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg fixed-top" id="stickyNavbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">CDA AUTOMOTOS S.A.S</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Principal</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/subir.php">
                        <i class="fa-solid fa-cloud-arrow-up"></i> Subir video
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/videos.php">
                        <i class="fa-solid fa-video"></i>
                        Ver Videos
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item dropdown py-1">
                    <button class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static">
                        <i class="fa-solid fa-circle-half-stroke" id="theme-icon-active"></i>
                        <span class="d-lg-none ms-2">Seleccionar tema</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end px-1 dropdown-menu-dark">
                        <li>
                            <button type="button" class="dropdown-item" data-bs-theme-value="light">
                                <span class="bi me-2 opacity-50">
                                    <i class="fa-solid fa-sun"></i>
                                </span>
                                Claro
                            </button>
                        </li>
                        <li>
                            <button type="button" class="dropdown-item" data-bs-theme-value="dark">
                                <span class="bi me-2 opacity-50">
                                    <i class="fa-solid fa-moon" style="width: 16px;"></i>
                                </span>
                                Oscuro
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div id="spinner-div">
    <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>