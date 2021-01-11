function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                const src = reader.result;
                configData.fondo01 = src;
                localStorage.setItem('data', JSON.stringify(configData));
                configValues[0].value = '*Imagen Local*';
                cargarTema1[0].setAttribute('style', `background: url('${configData.fondo01}') no-repeat 50% center/cover`);
            },
            false
        );
        reader.readAsDataURL(input.files[0]);
    };
};
function readURL2(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                const src = reader.result;
                configData.fondo02 = src;
                localStorage.setItem('data', JSON.stringify(configData));
                configValues[1].value = '*Imagen Local*';
                cargarTema2[0].setAttribute('style', `background: url('${configData.fondo02}') no-repeat 50% center/cover`);
            },
            false
        );
        reader.readAsDataURL(input.files[0]);
    };
};
