// const formulario = document.getElementById('form-cargar-video');
// const fileInputVideo = document.getElementById('input-file-video');
// const submitCargarVideo = document.getElementById('submit-cargar-video');

// const h3CargarEstado = document.getElementById('form-cargar-estado');
// const h4CargarPorcentaje = document.getElementById('form-cargar-pocentaje');

// const progressBar = document.getElementById('progress-bar');

// formulario.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const formData = new FormData(formulario);
//     formData.append('placa', document.getElementById('input-cargar-placa').value);

//     fileInputVideo.disabled = true;
//     submitCargarVideo.disabled = true;

//     h3CargarEstado.innerHTML = 'Cargando, espere...';
//     h4CargarPorcentaje.innerHTML = '0';
//     progressBar.style.display = 'block';
//     axios.post('/app/axios/agregarVideo.php', formData, {
//         onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

//             h4CargarPorcentaje.innerHTML= `${percentCompleted}%`;
//             progressBar.style.width = `${percentCompleted}%`;
//             //progressBar.style.ariaValuenow = percentCompleted;
//         }
//     }).then((response) => {
//         console.log(response.data);
//     }).catch((error) => {
//         console.error('Error al enviar el formulario', error);
//     }).finally(() => {
//         // Volver a habilitar todo el formulario, ya sea que la carga sea exitosa o haya un error
//         fileInputVideo.disabled = false;
//         submitCargarVideo.disabled = false;

//         h3CargarEstado.innerHTML = 'Cargar video';        
//         h4CargarPorcentaje.innerHTML= '';
//         progressBar.style.display = 'none';

//         formulario.reset();

//         evidenciaFiltrar(inputCargaPlaca.value);
//     });
// });


