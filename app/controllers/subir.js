const videoRTC = document.getElementById('video-rtc');
const videoHistorial = document.getElementById('video-historial');

const btnStartRecording = document.getElementById('btn-start-recording');
const btnPauseRecording = document.getElementById('btn-pause-recording');
const btnStopRecording = document.getElementById('btn-stop-recording');
const btnCloseRecording = document.getElementById('btn-close-recording');


const btnRecargarVideos = document.getElementById('btn-recargar-videos');

// seleccionar
const inputPlaca = document.getElementById('input-placa');
const btnSiguientePlaca = document.getElementById('btn-siguiente-placa');

const selectDevicesList = document.getElementById('select-devices-list');

const containerPlaca = document.getElementById('container-placa');
const containerCargarVideo = document.getElementById('container-cargar-video');
const containerResultado = document.getElementById('container-resultado');

// cargar

const h3CargaPlaca = document.getElementById('cargar-h3-placa');
const inputCargaPlaca = document.getElementById('input-cargar-placa');


// carga normal

const formulario = document.getElementById('form-cargar-video');
const fileInputVideo = document.getElementById('input-file-video');
const submitCargarVideo = document.getElementById('submit-cargar-video');
const resetCargarVideo = document.getElementById('reset-cargar-video');

const h3CargarEstado = document.getElementById('form-cargar-estado');
const h4CargarPorcentaje = document.getElementById('form-cargar-pocentaje');

const progressBar = document.getElementById('progress-bar');



let videoDevices = [];
let recorder;

const videoConfiguracion = {
    video: {

        width: { ideal: 1280 },
        height: { ideal: 720 },
        deviceId: { exact: 'your_device_id_here' },
    },
    audio: true
};

navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach((device, index) => {
        if (device.kind === "videoinput") {
            videoDevices[index] = device.deviceId;
            const option = document.createElement('option');
            option.value = index;
            option.innerHTML = device.label;
            selectDevicesList.appendChild(option);
        }
    });
});




resetCargarVideo.addEventListener('click', (e) => {
    e.preventDefault();
    closeRecordingHandler();
});
btnSiguientePlaca.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputPlaca.value.length >= 5) {
        h3CargaPlaca.textContent = (inputPlaca.value).toUpperCase();
        inputCargaPlaca.value = (inputPlaca.value).toUpperCase();


        // limpiar
        inputPlaca.value = '';
        // mostrar
        containerPlaca.style.display = 'none';
        containerCargarVideo.style.display = 'block';
        //
        h3CargarEstado.innerHTML = 'Cargar video';
        h4CargarPorcentaje.innerHTML = '';
        progressBar.style.display = 'none';

        resetCargarVideo.disabled = false;

        fileInputVideo.disabled = false;
        formulario.reset();

        evidenciaFiltrar(inputCargaPlaca.value);


    }
    else {
        hxConfirm({
            title: 'Error',
            icon: 'fa-house',
            content: 'La placa no es valida',
            size: 'sm',
            buttons: {
                btnAccept: {
                    title: 'Aceptar',
                    class: 'primary'
                },
            }
        });
    }
});


btnStartRecording.addEventListener('click', (e) => {
    e.preventDefault();

    btnStartRecording.disabled = true;

    // const selectedIndex = parseInt(selectDevicesList.value);
    // const selectedDevice = (videoDevices[selectedIndex] !== undefined) ? videoDevices[selectedIndex] : null;

    const selectedDevice = videoDevices[videoDevices.length - 1];

    videoConfiguracion.video.deviceId.exact = selectedDevice;

    navigator.mediaDevices.getUserMedia(videoConfiguracion)
        .then(stream => {
            videoRTC.muted = true;
            videoRTC.volume = 0;
            videoRTC.srcObject = stream;
            recorder = RecordRTC(stream, {
                recorderType: MediaStreamRecorder,
                type: 'video',
                bitsPerSecond: 5800000000,
                audioBitsPerSecond: 5800000000,
                numberOfAudioChannels: 2,
            });
            recorder.startRecording();
            recorder.camera = stream;

            btnStopRecording.disabled = false;
            btnPauseRecording.disabled = false;
            btnCloseRecording.disabled = true;
        })
        .catch(error => {
            console.error('Error al intentar acceder a la camara:', error);
            alert('No se pudo acceder a la camara. Verifica el ID.');
        });
});

btnPauseRecording.addEventListener('click', (e) => {
    e.preventDefault();
    // disabled
    btnPauseRecording.disabled = true;
    if (btnPauseRecording.innerHTML === 'Pause') {
        videoRTC.pause();
        recorder.pauseRecording();
        btnPauseRecording.innerHTML = 'Continue';
    } else {
        recorder.resumeRecording();
        videoRTC.play();
        btnPauseRecording.innerHTML = 'Pause';
    }

    setTimeout(() => {
        btnPauseRecording.disabled = false;
        btnStopRecording.disabled = false;
    }, 1000);
});

btnStopRecording.addEventListener('click', (e) => {
    e.preventDefault();
    btnStopRecording.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});

btnCloseRecording.addEventListener('click', (e) => {
    e.preventDefault();
    closeRecordingHandler();
});

btnRecargarVideos.addEventListener('click', (e) => {
    e.preventDefault();
    evidenciaFiltrar(inputCargaPlaca.value);
});


const closeRecordingHandler = () => {
    hxConfirm({
        title: 'Alerta',
        content: '¿Desea salir?',
        size: 'sm',
        buttons: {
            btnAceptar: {
                title: 'Aceptar',
                class: 'primary',
                action: function () {
                    // recorder.stopRecording()
                    videoHistorial.pause();
                    
                    h3CargaPlaca.textContent = '';
                    inputCargaPlaca.value = '';
                    // limpiar
                    inputPlaca.value = '';
                    // mostrar
                    containerPlaca.style.display = 'block';
                    containerCargarVideo.style.display = 'none';


                    h3CargarEstado.innerHTML = 'Cargar video';
                    h4CargarPorcentaje.innerHTML = '';
                    progressBar.style.display = 'none';

                    formulario.reset();
                }
            },
            btnCancelar: {
                title: 'Cancelar',
                class: 'danger',
            }
        }
    });
}

const evidenciaFiltrar = (_placa) => {

    let self = hxConfirm({
        title: '...',
        icon: 'fa-house',
        content: () => {
            return axiosGetData(
                `/app/axios/buscarVideoPlaca.php?placa=${_placa}`,
                (response) => {

                    if (response.statusText === 'ok') {

                        self.setTitle('Exito!');
                        self.setContent(response.message);

                        while (containerResultado.firstChild) {
                            containerResultado.removeChild(containerResultado.firstChild);
                        }
                        videoHistorial.pause();
                        videoHistorial.src = "";
                        videoHistorial.poster = '/src/images/video-1.jpg';

                        createDetails(response.data);
                        self.close();
                    }
                    else if (response.statusText === 'sin_resultados') {
                        while (containerResultado.firstChild) {
                            containerResultado.removeChild(containerResultado.firstChild);
                        }
                        videoHistorial.pause();
                        videoHistorial.src = "";
                        videoHistorial.poster = '/src/images/video-1.jpg';
                        self.close();
                    }
                    else if (response.statusText === 'again') {
                        self.close();
                        axiosTryAgain(response.message,
                            () => {
                                evidenciaFiltrar(_placa)
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
        let fecha = video.fecha.split(' ')[0];

        result[fecha] = result[fecha] || [];
        result[fecha].push(video);

        return result;
    }, {});

    Object.keys(tempObject).forEach(fecha => {
        let videosDeFecha = tempObject[fecha];

        let h4 = document.createElement('h4');
        let listGroup = document.createElement('div');

        listGroup.className = "list-group";

        h4.textContent = fecha;
        videosDeFecha.forEach(video => {
            let listItem = document.createElement('a');
            listItem.className = "list-group-item list-group-item-action";
            listItem.textContent = `${video.titulo} - ${video.hora}`;
            listItem.href = "#";


            listItem.addEventListener('click', (e) => {
                e.preventDefault();


                videoHistorial.src = '/src/' + video.src;
                videoHistorial.load();
            });
            listGroup.appendChild(listItem);
        });

        containerResultado.appendChild(h4);
        containerResultado.appendChild(listGroup);
    });
}

const stopRecordingCallback = () => {

    videoRTC.src = videoRTC.srcObject = null;
    videoRTC.muted = false;
    videoRTC.volume = 1;

    videoRTC.src = URL.createObjectURL(recorder.getBlob());
    videoRTC.pause();

    const formData = new FormData();

    formData.append('video', new File([recorder.getBlob()], 'video_temp', {
        type: 'video/webm'
    }));
    formData.append('placa', inputCargaPlaca.value);


    hxConfirm({
        title: 'Guardar ',
        content: '¿Desea guardar este video?',
        buttons: {
            btnAceptar: {
                title: 'Si',
                class: 'primary',
                action: function () {
                    subirEvidencia(formData)
                }
            },
            btnCancelar: {
                title: 'No',
                class: 'danger',
                action: function () {
                    videoRTC.src = "";
                    btnStartRecording.disabled = false;
                    btnPauseRecording.disabled = true;
                    btnStopRecording.disabled = true;
                    btnCloseRecording.disabled = false;
                }
            }
        }
    });

    // destroy
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

const subirEvidencia = (formulario) => {
    let statusEvidencia = false;
    let self = hxConfirm({
        title: '..',
        icon: 'fa-house',
        content: () => {
            return axiosPostData(formulario,
                '/app/axios/agregarVideo.php',
                (response) => {
                    console.log('response ', response);
                    if (response.statusText === 'ok') {
                        self.setTitle('Exito!');
                        self.setContent(response.message);
                        statusEvidencia = true;
                    }
                    else if (response.statusText === 'again') {
                        self.close();
                        axiosTryAgain(response.message,
                            () => {
                                subirEvidencia(formulario)
                            }
                        );
                    }
                    else {
                        self.setTitle(response.statusText);
                        self.setContent(response.message);
                    }
                },
                (response) => {
                    console.log('fail ', response);
                    self.setTitle("fail:" + response.statusText);
                    self.setContent(response.message);
                }
            );
        },
        buttons: {
            btnAceptar: {
                title: 'Aceptar',
                class: 'primary',
                action: function () {
                    if (statusEvidencia) {
                        evidenciaFiltrar(inputCargaPlaca.value);
                        videoRTC.src = "";
                        btnStartRecording.disabled = false;
                        btnPauseRecording.disabled = true;
                        btnStopRecording.disabled = true;
                        btnCloseRecording.disabled = false;
                    }
                },
            }
        },
    });
}



const axiosTryAgain = (message, callback) => {
    let self = hxConfirm({
        title: 'Fallo al enviar',
        content: '¿Desea enviar nuevamente?',
        icon: 'fa-rotate-right',
        size: 'md',
        buttons: {
            btnAceptar: {
                title: 'Si',
                class: 'primary',
                action: function () {
                    callback()
                }
            },
            btnCancelar: {
                title: 'No',
                class: 'danger',
                action: function () {
                    videoRTC.src = "";
                    btnStartRecording.disabled = false;
                    btnPauseRecording.disabled = true;
                    btnStopRecording.disabled = true;
                    btnCloseRecording.disabled = false;
                }
            }
        },
    });
}

const cargaVideoFormulario = () => {
    fileInputVideo.disabled = false;
    const formData = new FormData(formulario);
    let formStatus = false;
    formData.append('placa', document.getElementById('input-cargar-placa').value);
    fileInputVideo.disabled = true;

    h3CargarEstado.innerHTML = 'Cargando, espere...';
    h4CargarPorcentaje.innerHTML = '0';
    progressBar.style.display = 'block';

    resetCargarVideo.disabled = true;

    axios.post('/app/axios/agregarVideo.php', formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            h4CargarPorcentaje.innerHTML = `${percentCompleted}%`;
            progressBar.style.width = `${percentCompleted}%`;
        }
    }).then((response) => {
        if (response.data.statusText === 'ok') {
            fileInputVideo.disabled = false;
            h3CargarEstado.innerHTML = 'Cargar video';
            h4CargarPorcentaje.innerHTML = '';
            progressBar.style.display = 'none';
            resetCargarVideo.disabled = false;
            formStatus = true;
        }
        else {
            formStatus = false;
            hxConfirm({
                title: response.data.statusText,
                content: response.data.message,
                buttons: {
                    btnAceptar: {
                        title: 'Reintentar',
                        class: 'primary',
                        action: () => {
                            cargaVideoFormulario();
                        }
                    },
                    btnCancelar: {
                        title: 'No',
                        class: 'danger',
                        action: () => {
                            h3CargaPlaca.textContent = '';
                            inputCargaPlaca.value = '';
                            // limpiar
                            inputPlaca.value = '';
                            // mostrar
                            containerPlaca.style.display = 'block';
                            containerCargarVideo.style.display = 'none';

                            h3CargarEstado.innerHTML = 'Cargar video';
                            h4CargarPorcentaje.innerHTML = '';
                            progressBar.style.display = 'none';
                            formulario.reset();
                        }
                    }
                }
            });
        }
    }).catch((error) => {
        console.error('Error al enviar el formulario', error);
    }).finally(() => {
        if (formStatus == true) {
            formulario.reset();
            evidenciaFiltrar(inputCargaPlaca.value);
        }
    });
}


fileInputVideo.addEventListener('change', (e) => {
    e.preventDefault();
    const files = fileInputVideo.files;
    if (files.length === 1) {
        if (esTipoVideo(files[0])) {
            cargaVideoFormulario();
        }
        else {
            hxConfirm({
                title: 'Error',
                icon: 'fa-timex',
                content: 'Formato incorrecto',
                size: 'sm',
                buttons: {
                    btnAccept: {
                        title: 'Aceptar',
                        class: 'primary',
                        action: () => {
                            fileInputVideo.value = '';
                        }
                    },
                }
            });
        }
    } else {
        hxConfirm({
            title: 'Error',
            icon: 'fa-timex',
            content: 'Por favor, carga un solo archivo de video',
            size: 'sm',
            buttons: {
                btnAccept: {
                    title: 'Aceptar',
                    class: 'primary',
                    action: () => {
                        fileInputVideo.value = '';
                    }
                },
            }
        });
    }

});

const tiposDeVideoPermitidos = ['video/mp4', 'video/webm', 'video/ogg'];
const esTipoVideo = (file) => tiposDeVideoPermitidos.includes(file.type);


