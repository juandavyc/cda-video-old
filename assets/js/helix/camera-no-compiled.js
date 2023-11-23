/* hxCamera.js v4 | @juandavyc | MIT licensed */

class hxCamera {

    constructor({ folder, rotate }) {

        this.mainContainer = document.getElementById('filechooser-camera-container');
        this.fileChooser = document.getElementById('filechooser-file');

        this.videoContainer = this.mainContainer.querySelector('.camera-video-container');
        this.canvasContainer = this.mainContainer.querySelector('.canvas-camera-container');

        this.inputControlValue = null;
        this.h4FolderDate = this.mainContainer.querySelector('#filechooser-camera-h4-folder-date');
        // video embed
        this.cameraVideo = this.videoContainer.querySelector('#filechooser-camera-video');
        // canvas
        this.cameraCanvas = this.canvasContainer.querySelector('#filechooser-camera-canvas');

        this.canvasContext = this.cameraCanvas.getContext('2d');

        this.videoOptions = {
            width: 0,
            height: 0,
        };

        this.cameraOptions = {
            inputId: '',
            dataFolder: '',
            isStreaming: false
        };

        // abrir
        this.btnCameraOpenElements = document.querySelectorAll('.btn-camera-open');
        this.btnFileOpenElements = document.querySelectorAll('.btn-file-open');
        this.btnCameraShowElements = document.querySelectorAll('.btn-camera-show');
        // flash
        this.checkboxCameraFlash = this.mainContainer.querySelector('#checkbox-camera-flash');

        this.btnTakePhoto = this.mainContainer.querySelector('#btn-camera-take');
        this.btnSavePhoto = this.mainContainer.querySelector('#btn-camera-upload');
        this.btnReloadPhoto = this.mainContainer.querySelector('#btn-camera-reload');

        this.modal = null;

        if (window.location.protocol === 'http:') {
            window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
        }
        else {
            this.modal = new MyModal({
                container: 'modal-filechooser-camera',
                title: 'FileChooser Camera v4',
                icon: 'fa fa-warning',
                columnClass: 'lg',
                event: {
                    onOpen: () => { },
                    onClose: () => {
                        this.turnOffCamera();
                    },
                },
            });
        }
        this.actionEvent();
    }

    actionEvent() {
        this.btnCameraOpenElements.forEach((btnCameraOpen) => {
            btnCameraOpen.addEventListener('click', (e) => {
                e.preventDefault();
                this.cameraOptions.inputId = e.target.getAttribute('input-id');
                this.cameraOptions.dataFolder = e.target.getAttribute('data-folder');
                this.cameraOptions.isStreaming = false;
                this.h4FolderDate.innerHTML = `${e.target.getAttribute('data-folder').toUpperCase()} - <b>${this.getDateNow()}</b>`;
                this.inputControlValue = document.getElementById(e.target.getAttribute('input-id'));                
                
                this.turnOnCamera();
            });
        });
        this.btnFileOpenElements.forEach((btnFileOpen) => {
            btnFileOpen.addEventListener('click', (e) => {
                e.preventDefault();
                this.cameraOptions.inputId = e.target.getAttribute('input-id');
                this.cameraOptions.dataFolder = e.target.getAttribute('data-folder');
                this.inputControlValue = document.getElementById(e.target.getAttribute('input-id'));  
                this.fileChooser.click();
            });
        });

        this.btnCameraShowElements.forEach((btnCameraShow) => {
            btnCameraShow.addEventListener('click', (e) => {
                // foto-usuario-agregar e.target.getAttribute('data-id'); 
                this.inputControlValue = document.getElementById(e.target.getAttribute('data-id'));  

                window.open(this.inputControlValue.value);

                e.preventDefault();         
            });
        });

      
        this.fileChooser.addEventListener('change', () => {
            const file = this.fileChooser.files[0];
            if (file.type.startsWith('image/') || file.type.startsWith('image/')) {
                this.uploadFile(file);
            }
            else {
                alert("Archivo no valido");
            }
        });

        this.btnTakePhoto.addEventListener('click', (e) => {
            e.preventDefault();
            this.takePhoto();
        });

        this.btnSavePhoto.addEventListener('click', (e) => {
            e.preventDefault();
            this.uploadPhoto();
        });

        this.btnReloadPhoto.addEventListener('click', (e) => {
            e.preventDefault();
            this.turnOnCamera();
        });


      
        this.checkboxCameraFlash.addEventListener('change', () => {
            alert('Camera no compatible con flash');
            this.checkboxCameraFlash.checked = false;
        });
        this.cameraVideo.addEventListener('loadedmetadata', () => {
            this.videoOptions.width = this.cameraVideo.videoWidth;
            this.videoOptions.height = this.cameraVideo.videoHeight;

            const containerWidth = this.videoContainer.offsetWidth;
            const containerHeight = containerWidth * (this.videoHeight / this.videoWidth);

            this.videoContainer.style.height = containerHeight + 'px';
            this.cameraVideo.style.height = '100%';
        });

        window.addEventListener('resize', () => {
            if (this.cameraOptions.isStreaming == true) {
                this.adjustCanvasSize();
            }
        });
    }

    turnOffCamera() {
        if (this.cameraOptions.isStreaming == true) {
            this.cameraVideo.srcObject.getTracks().forEach((track) => {
                track.stop();
                this.cameraOptions.isStreaming = false;
                this.cameraStatusElements('OFF');
            });
        } else {
            this.cameraOptions.isStreaming = false;
        }
    }

    turnOnCamera() {

        if (this.cameraOptions.isStreaming == false) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: 'environment',
                    },
                    width: { ideal: 4096 }, height: { ideal: 2160 },
                    audio: false,
                })
                .then((stream) => {
                    this.cameraVideo.srcObject = stream;
                    const videoTrack = stream.getVideoTracks()[0];
                    this.resetCanvasContext();
                    this.cameraStatusElements('ON');
                    this.cameraOptions.isStreaming = true;
                    this.cameraVideo.play();
                    this.modal.open();
                })
                .catch(function (err) {
                    alert('An error occurred: ' + err);
                    this.cameraOptions.isStreaming = false;
                });
        } else {
            alert('La camara ya esta encendida');
        }
    }


    uploadFile(file) {
        let formData = new FormData();
        formData.append('folder', this.cameraOptions.dataFolder);
        formData.append('file', file);
        let self = $.confirm({
            title: 'Espere... ',
            content: 'Cargando, espere...',
            typeAnimated: true,
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: () => {
                return $.ajax({
                    url: PROTOCOL_HOST + '/app/models/filechooser-camera/UploadFile.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: {
                        'csrf-token': $('meta[name="csrf-token"]').attr('content'),
                    },
                    dataType: 'json',
                    timeout: 30000,
                }).done((response) => {
                    if (response.statusText === 'bien') {
                        self.setTitle(response.statusText);
                        self.setContentAppend(response.message);
                        this.inputControlValue.value = response.src;
                        const element = document.getElementById(this.cameraOptions.inputId + '-src');
                        if (element !== null) {
                            element.src = response.src;
                        }
                        this.modal.close();
                    } else if (response.statusText === 'no_session'
                        || response.statusText === 'no_token') {
                        self.close();
                        call_recuperar_session(() => {
                            this.uploadFile(file);
                        });
                    } else {
                        self.setTitle(response.status);
                        self.setContentAppend(response.message);
                    }
                }).fail(function (response) {
                    self.setTitle('Error fatal');
                    self.setContent(response);
                });
            },
            buttons: {
                aceptar: function () { },
            },
            onClose: function () {
            },
        });
    }

    uploadPhoto() {
        let self = $.confirm({
            title: 'Espere... ',
            content: 'Cargando, espere...',
            typeAnimated: true,
            scrollToPreviousElement: false,
            scrollToPreviousElementAnimate: false,
            content: () => {
                return $.ajax({
                    url: PROTOCOL_HOST + '/app/models/filechooser-camera/UploadCamera.php',
                    type: 'POST',
                    data: {
                        image_base64: this.cameraCanvas.toDataURL(),
                        image_folder: this.cameraOptions.dataFolder,
                        image_rotate: 0,
                    },
                    headers: {
                        'csrf-token': $('meta[name="csrf-token"]').attr('content'),
                    },
                    dataType: 'json',
                    timeout: 30000,
                }).done((response) => {
                    if (response.statusText === 'bien') {
                        self.setTitle(response.statusText);
                        self.setContentAppend(response.message);
                        this.inputControlValue.value = response.src;
                        const element = document.getElementById(this.cameraOptions.inputId + '-src');
                        if (element !== null) {
                            element.src = response.src;
                        }
                        this.modal.close();
                    } else if (response.statusText === 'no_session'
                        || response.statusText === 'no_token') {
                        self.close();
                        call_recuperar_session(() => {
                            this.uploadPhoto();
                        });
                    } else {
                        self.setTitle(response.status);
                        self.setContentAppend(response.message);
                    }
                }).fail(function (response) {
                    self.setTitle('Error fatal');
                    self.setContent(response);
                });
            },
            buttons: {
                aceptar: function () { },
            },
            onClose: function () {
            },
        });
    }

    takePhoto() {
        if (this.cameraOptions.isStreaming == true) {
            // clear canvas
            this.resetCanvasContext();

            this.cameraCanvas.width = this.videoOptions.width;
            this.cameraCanvas.height = this.videoOptions.height;

            this.canvasContext.drawImage(
                this.cameraVideo,
                0,
                0,
                this.videoOptions.width,
                this.videoOptions.height
            );

            this.cameraVideo.srcObject.getTracks().forEach(function (track) {
                track.stop();
            });
            this.turnOffCamera();
            this.cameraStatusElements('PHOTO');
            this.adjustCanvasSize();
        }
        else {
            alert('La camara no esta encendida.');
        }
    }

    resetCanvasContext() {
        this.canvasContext.clearRect(
            0,
            0,
            this.videoOptions.width,
            this.videoOptions.height
        );
        this.canvasContext.beginPath();
    }

    adjustCanvasSize() {
        const containerWidth = this.canvasContainer.offsetWidth;
        const containerHeight = containerWidth * (this.cameraCanvas.height / this.cameraCanvas.width);
        this.canvasContainer.style.height = containerHeight + 'px';
        this.cameraCanvas.style.height = '100%';
    }

    cameraStatusElements(status) {

        switch (status) {
            case 'ON':

                this.btnTakePhoto.disabled = false;
                this.btnSavePhoto.disabled = true;
                this.btnReloadPhoto.disabled = true;

                this.videoContainer.style.display = 'block';
                this.canvasContainer.style.display = 'none';

                this.cameraVideo.classList.remove('camera-video-off');
                this.cameraVideo.classList.add('camera-video-on');

                this.cameraVideo.style.display = 'block';
                this.cameraCanvas.style.display = 'none';
                break;
            case 'OFF':

                this.btnTakePhoto.disabled = true;
                this.btnSavePhoto.disabled = true;
                this.btnReloadPhoto.disabled = true;

                this.videoContainer.style.display = 'none';
                this.canvasContainer.style.display = 'none';

                this.cameraVideo.classList.remove('camera-video-on');
                this.cameraVideo.classList.add('camera-video-off');

                this.cameraVideo.style.display = 'none';
                this.cameraCanvas.style.display = 'none';
                break;
            case 'PHOTO':

                this.btnTakePhoto.disabled = true;
                this.btnSavePhoto.disabled = false;
                this.btnReloadPhoto.disabled = false;

                this.videoContainer.style.display = 'none';
                this.canvasContainer.style.display = 'block';

                this.cameraVideo.classList.remove('camera-video-on');
                this.cameraVideo.classList.add('camera-video-off');

                this.cameraVideo.style.display = 'none';
                this.cameraCanvas.style.display = 'block';
                break;
        };

    }

    getDateNow() {
        return new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })
    }

}
