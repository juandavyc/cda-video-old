<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Belissa Print Service</title>
    <style>
    body {
        background: #1C1B22;
        color: #FBFBFE;
        text-align: center;
        font-family: 'verdana';
    }

    h2 {
        color: #71b6ff;
    }

    .outer {
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .middle {
        display: table-cell;
        vertical-align: middle;
    }

    .inner {
        margin-left: auto;
        margin-right: auto;
        width: 400px;
    }

    .server {
        color: #c0ff12;
    }
    </style>
</head>

<body>
    <div class="outer">
        <div class="middle">
            <div class="inner">
                <h2>Belissa Print Service v1.0</h2>
                <h4>WebSocket</h4>
                <div class="state">
                    <span class="users">( 0 ) En Cola</span>
                    <br><br>
                    <span class="server"> </span>
                </div>
            </div>
        </div>
    </div>
</body>

<script>
const json_rtm = (<?php echo ($_GET['json']) ?>);
const json_config = (<?php echo ($_GET['config']) ?>);
const ws_url = "ws://" + json_config.ip + ":" + json_config.puerto + "/";


if (json_rtm.tipo == '4X4' || json_rtm.tipo == 'TAXI') {
    json_rtm.tipo = 'LIVIANO';
} else if (json_rtm.tipo == 'REMOLQUE' || json_rtm.tipo == 'BUS') {
    json_rtm.tipo = 'PESADO';
}



window.addEventListener("DOMContentLoaded", () => {
    const websocket = new WebSocket(ws_url);
    websocket.onopen = () => {
        console.log("send");
        websocket.send(JSON.stringify({
            action: "print",
            rtm: json_rtm
        }));

        websocket.onmessage = ({
            data
        }) => {
            const event = JSON.parse(data);
            switch (event.type) {
                case "value":
                    document.querySelector(".server").textContent = event.value;
                    setTimeout(() => {
                         window.close();
                    }, 2000);
                    break;
                case "users":
                    const users = `( ${event.count} ) En Cola`;
                    document.querySelector(".users").textContent = users;
                    break;
                case "print":
                    console.log('print', event);
                    break;
                default:
                    console.error("unsupported event", event);
            }

        };
    }
});
</script>

</html>