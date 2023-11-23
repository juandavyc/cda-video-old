const inputFecha = document.getElementById('input-fecha');
const btnBuscarFecha = document.getElementById('btn-buscar-fecha');

const inputPlaca = document.getElementById('input-placa');
const btnBuscarPlaca = document.getElementById('btn-buscar-placa');

const containerResultado = document.getElementById('accordion-resultado');
// historial
const cardEvidencia = document.getElementById('card-evidencia');

const videoHistorial = document.getElementById('video-historial');
const spanPlaca = document.getElementById('span-placa');
const h5TituloHora = document.getElementById('h5-titulo-hora');
const videoLink = document.getElementById('id-video-link');
const videoDownload = document.getElementById('id-video-download');


btnBuscarFecha.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputFecha.value !== "") {
        evidenciaFiltrar('fecha', inputFecha.value);

    }
    else {
        alert("No sea imbecil CHINOOO");
    }
});

btnBuscarPlaca.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputPlaca.value.length > 0) {
        evidenciaFiltrar('placa', inputPlaca.value);
    }
    else {
        alert("No sea imbecil CHINOOO");
    }
});


const urlAxios = {
    'fecha': '/app/axios/buscarVideoFecha.php?fecha',
    'placa': '/app/axios/buscarVideoPlaca.php?placa'
};

const evidenciaFiltrar = (_type, _data) => {

    cardEvidencia.style.display = 'none';
    videoHistorial.style.display = 'none';
    spanPlaca.textContent = '';
    h5TituloHora.textContent = '';
    videoLink.href = '';
    videoDownload.href = '';


    let self = hxConfirm({
        title: '...',
        icon: 'fa-house',
        content: () => {
            return axiosGetData(
                `${urlAxios[_type]}=${_data}`,
                (response) => {
                    console.log(response);
                    if (response.statusText === 'ok') {

                        self.setTitle('Exito!');
                        self.setContent(response.message);

                        while (containerResultado.firstChild) {
                            containerResultado.removeChild(containerResultado.firstChild);
                        }
                        if (Object.keys(response.data).length > 0) {
                            videoHistorial.style.display = 'block';
                            videoHistorial.pause();
                            videoHistorial.src = '';
                            createDetails(response.data);
                        }


                        self.close();
                    }
                    else if (response.statusText === 'again') {
                        self.close();
                        axiosTryAgain(response.message,
                            () => {
                                evidenciaFiltrar(_type, _data)
                            }
                        );
                    }
                    else {
                        self.setTitle(response.statusText);
                        self.setContent(response.message);
                    }
                },
                (response) => {
                    console.log('fail', response);
                    self.setTitle("fail:" + response.statusText);
                    self.setContent(response.message);
                }

            );
        },
        buttons: {
            btnAccept: {
                title: 'Aceptar',
                class: 'primary'
            },
        },
    });
}

const createDetails = (videos) => {

    const tempObject = Object.keys(videos).reduce((result, key) => {
        let video = videos[key];
        let placa = video.placa.split(' ')[0];

        result[placa] = result[placa] || [];
        result[placa].push(video);

        return result;
    }, {});


    Object.keys(tempObject).forEach(placa => {
        let videosDePlaca = tempObject[placa];

        let accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        let accordionHeader = document.createElement('h2');
        accordionHeader.className = 'accordion-header';

        let accordionButton = document.createElement('button');
        accordionButton.className = 'accordion-button collapsed';
        accordionButton.type = 'button';
        accordionButton.setAttribute('data-bs-toggle', 'collapse');
        accordionButton.setAttribute('data-bs-target', '#collapse' + placa);
        accordionButton.setAttribute('aria-expanded', 'false');
        accordionButton.setAttribute('aria-controls', 'collapseOne');
        accordionButton.textContent = placa;

        let accordionCollapse = document.createElement('div');
        accordionCollapse.id = 'collapse' + placa;
        accordionCollapse.className = 'accordion-collapse collapse';
        accordionCollapse.setAttribute('data-bs-parent', '#accordion-resultado');

        let accordionBody = document.createElement('div');
        accordionBody.className = 'accordion-body';

        // Agregar el botón al encabezado y el encabezado al elemento del acordeón
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        // Agregar el contenido colapsable al elemento del acordeón
        accordionItem.appendChild(accordionCollapse);

        accordionCollapse.appendChild(accordionBody);
        // Agregar el elemento del acordeón al contenedor (por ejemplo, un div con id "accordionExample")


        let listGroup = document.createElement('div');
        listGroup.className = "list-group";

        videosDePlaca.forEach(video => {
            let listItem = document.createElement('a');
            listItem.className = "list-group-item list-group-item-action";
            listItem.textContent = `${video.titulo} - ${video.hora}`;
            listItem.href = "#"
            listItem.addEventListener('click', (e) => {
                e.preventDefault();
                cardEvidencia.style.display = 'block';
                spanPlaca.textContent = placa;
                h5TituloHora.textContent = `${video.titulo} - ${video.hora}`;
                videoLink.href = '/src/' + video.src;
                videoDownload.href = '/src/' + video.src;

                videoHistorial.src = '/src/' + video.src;
                videoHistorial.load();
            });
            listGroup.appendChild(listItem);
        });
        accordionBody.appendChild(listGroup);
        containerResultado.appendChild(accordionItem);


    });
}