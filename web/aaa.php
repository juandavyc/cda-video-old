<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/css/helix/helix.min.css">
</head>

<body class="bg-body-secondary">

    <?php require $_SERVER['DOCUMENT_ROOT'] . '/app/navbar.php'; ?>
    <div class="jumbotron my-5">
        <div class="container text-center">
            <span class="fa fa-house fa-2xl text-warning mb-2"></span>
            <h1>Online Store</h1>
            <p>Mission, Vission & Values</p>
        </div>
    </div>
    <?php require $_SERVER['DOCUMENT_ROOT'] . '/app/breadcrumb.php'; ?>
    <div class="container-fluid p-sm-2 p-lg-5 mb-5 bg-body-tertiary">
        Content
    </div>

    <?php require $_SERVER['DOCUMENT_ROOT'] . '/app/footer.php'; ?>
    <?php require $_SERVER['DOCUMENT_ROOT'] . '/app/script.php'; ?>

    <script>
        DOMPageLoaded().then(() => {

        });
    </script>
</body>

</html>