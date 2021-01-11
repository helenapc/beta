
//NAV BAR

// document.getElementById('barOpen').addEventListener('click', () => { helpFunction('0', false) });

document.getElementById('barClose').addEventListener('click', () => { barMenuPrincipal.close() });

account.addEventListener('click', () => {
    barMenuPrincipal.close();
    const alertPassItem = document.createElement('ion-alert');
    alertPassItem.header = 'Datos de usuario';
    alertPassItem.message = 'Inserte contraseña para continuar..';
    alertPassItem.inputs = [
        { name: 'uEPass', placeholder: 'Contraseña', type: 'password' },
    ];
    alertPassItem.buttons = [
        {
            text: 'Ok',
            handler: u => {
                if (u.uEPass == deco(txt[2])) {
                    if (txt[0] == '25') txt[0] = '';
                    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');

                    document.getElementById('modal').innerHTML =
                        `
                        <p id="op1" class="cct">Datos de usuario</p>
                        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
                        <p style="margin: 25px 0px 0px 0px;">
                        <input type="text" placeholder="Opcional" class="ccse modal_input" value="${deco(txt[0])}">
                        <label class="cce" > Nombre: </label>
                        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${deco(txt[1])}">
                        <label class="cce" > Email: </label>
                        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${deco(txt[2])}">
                        <label class="cce" > Contraseña: </label>
                        <input type="text" placeholder="Opcional" class="ccse modal_input" value="${deco(txt[4])}">
                        <label class="cce" > PIN: </label>
                        </p>

                        <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok_datosDeUsuario')">
                        <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel_datosDeUsuario')">
                    `;

                } else {
                    // barProgressF('warning', )
                    presentToast('Contraseña incorrecta.', '800', 'warning');
                }
            },
        },
    ];
    document.body.appendChild(alertPassItem);
    return alertPassItem.present();
})


barImport.addEventListener('click', () => {
    barMenuPrincipal.close();
    function alertImp() {
        const alert = document.createElement('ion-alert');
        alert.setAttribute('backdrop-dismiss', 'false');
        alert.subHeader = '¿Cargar copia de seguridad?';
        alert.buttons = [
            { text: 'cancelar', role: 'cancel' },
            {
                text: 'Confirmar',
                handler: () => {
                    barProgressF('success', 'indeterminate');
                    showSearch.innerHTML = '';
                    newSearch.value = '';
                    updateDB('B2', 'L1');
                    splitInit();
                    aTotalTOnewTotal();
                    document.getElementById('userName').innerHTML = deco(txt[0]);
                    updateDB('L1', 'B1');
                    refreshData();
                    setTimeout(() => {
                        presentToast('Copia de seguridad cargada.', 800, 'success');
                        barProgressF('light', 'determinate');
                    }, 800);
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    alertImp();
});

barExport.addEventListener('click', () => {
    barMenuPrincipal.close();
    function alertExp() {
        const alert = document.createElement('ion-alert');
        alert.setAttribute('backdrop-dismiss', 'false');
        alert.subHeader = '¿Crear copia de seguridad?';
        alert.buttons = [
            { text: 'cancelar', role: 'cancel' },
            {
                text: 'Confirmar',
                handler: () => {
                    barProgressF('success', 'indeterminate');
                    updateDB('L1', 'B2')
                    setTimeout(() => {
                        presentToast('Copia de seguridad cargada.', 800, 'success');
                        barProgressF('light', 'determinate');
                    }, 800);
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    alertExp();
});

barLogout.addEventListener('click', () => {
    barMenuPrincipal.close();
    localStorage.clear();
    window.location.reload();
});


// var configDataFondo01;
// var configDataFondo02;

// // console.log(configData.fondo02);

// if (configData.fondo01.includes('data:image')) {
//     configDataFondo01 = '*Imagen Local*';
// } else {
//     configDataFondo01 = configData.fondo01;
// }

// if (configData.fondo02.includes('data:image')) {
//     configDataFondo02 = '*Imagen Local*';
// } else {
//     configDataFondo02 = configData.fondo02;
// }

var configDataFondo01 = (configData.fondo01.includes('data:image')) ? '*Imagen Local*' : configData.fondo01;
var configDataFondo02 = (configData.fondo02.includes('data:image')) ? '*Imagen Local*' : configData.fondo02;


config.addEventListener('click', () => {


    barMenuPrincipal.close();
    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');
    const modal = document.getElementById('modal');
    document.getElementById('modal').innerHTML =
        // width: 210px
        `
        <p id="op1" class="cct">Configuración</p>
        <hr style="height:1px; background-color:gray">
    
        <div style="width: 100%; height: 220px; overflow-y:scroll; overflow-x: hidden; margin: 1px; paddgin: 1px">
                
            <label class="cce_st" style="font-size:0.9rem">Fondos (internet)</label>

            <p style="margin: 15px 0px; ; color: var(--ion-text-color)"> Tema Claro:
                <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configDataFondo01}"style="width: 78%"> 
                <label for="fondo1">
                    <i class="fas fa-camera" style=" margin-top:-15px; padding: 10px; background: var(--ion-color-light)"></i>
                </label>
                
            </p>

            <p style="margin: 15px 0px; ; color: var(--ion-text-color)"> Tema Oscuro:
                <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configDataFondo02}" style="width: 78%"> 
                <label for="fondo2">
                    <i class="fas fa-camera" style="  pointer-events: auto; padding: 10px; background: var(--ion-color-light);"></i>
                </label>
            </p>

            <br>

            <label class="cce_st" style="font-size:0.9rem">Tarjetas</label>

            <p style="padding: 15px 0px; margin: 0; ">
                <label style="color: var(--ion-text-color);">
                    <input type="checkbox" class="ccse modal_input configData">&nbsp;&nbsp;Auto-expandir
                </label>
            </p>

            <hr style=" margin: 0; height:1px; background-color:var(--ion-color-light)">
            
            <p style="padding: 15px 0px; margin: 0;">
                <label style="color: var(--ion-text-color);">
                    <input type="checkbox" class="ccse modal_input configData">&nbsp;&nbsp;Animación
                </label>
            </p>
            
            <hr style=" margin: 0; height:1px; background-color:var(--ion-color-light)">

            <br>
        </div>
        <input type="button" class="modal_btns" value="OK" style="margin: 15px 0px" onClick="buttons_modal('cancel')">
    `;


    // PROP

    configValues[2].checked = configData.autoExpand;
    configValues[3].checked = configData.animacion;

    // fondo claro 
    configValues[0].addEventListener('click', () => { configValues[0].setSelectionRange(0, configValues[0].value.length)});
    configValues[0].addEventListener('input', () => {
        if (configValues[0].value === '*Imagen Local*') {
            cargarTema1[0].setAttribute('style', `background: url('${configData.fondo01}`);
        } else {
            configData.fondo01 = configValues[0].value;
            localStorage.setItem('data', JSON.stringify(configData));
            if (cargarTema1[0] && cargarTema1[0].classList[0] == 'light') {
                cargarTema1[0].setAttribute('style', `background: url('${(configData.fondo01 == '') ? 'src/img/bg1.jpg' : configData.fondo01} ') no-repeat 50% center/cover`);
            }
        }
    });

    // configValues[1].setSelectionRange(0, configValues[1].value.length)
    // fondo oscuro
    configValues[1].addEventListener('click', () => { configValues[1].setSelectionRange(0, configValues[1].value.length)});
    configValues[1].addEventListener('input', () => {
        // configValues[1].select();
        if (configValues[1].value === '*Imagen Local*') {
            cargarTema2[0].setAttribute('style', `background: url('${configData.fondo02}`);
        } else {
        configData.fondo02 = configValues[1].value;
        localStorage.setItem('data', JSON.stringify(configData));
        if (cargarTema2[0] && cargarTema2[0].classList[0] == 'dark') {
            cargarTema2[0].setAttribute('style', `background: url('${(configData.fondo02 == '') ? 'src/img/bg2.jpg' : configData.fondo02} ') no-repeat 50% center/cover;`);
        }
    }
    });

    // auto expandir
    configValues[2].addEventListener('click', () => {
        configData.autoExpand = configValues[2].checked;
        localStorage.setItem('data', JSON.stringify(configData));
        let cards = document.getElementsByTagName('ion-card-header');
        // let cards = document.getElementsByClassName('ionCardHeader');
        let vuelta = cards.length;
        for (let i = 0; i < vuelta; i++) { cards[i].classList.toggle('cardExpand'); }
    });


    // animación
    configValues[3].addEventListener('click', () => {
        configData.animacion = configValues[3].checked;
        localStorage.setItem('data', JSON.stringify(configData));
        // let cards = document.getElementsByClassName('ionCardHeader');
        let cards = document.getElementsByTagName('ion-card-header');
        let vuelta = cards.length;
        for (let i = 0; i < vuelta; i++) { cards[i].classList.toggle('animCardCero'); }

    });



    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
})



barDelAcc.addEventListener('click', () => {
    barMenuPrincipal.close();
    function deleteData() {
        barProgressF('danger', 'determinate');
        const alert = document.createElement('ion-alert');
        alert.header = '¡Advertencia!';
        alert.subHeader = '¿Desea eliminar la cuenta y todos sus datos permanentemente?';
        alert.buttons = [
            { text: 'cancelar', role: 'cancel', handler: () => { barProgressF('light', 'determinate') } },
            {
                text: 'confirmar',
                handler: () => {

                    // b5001a
                    emailjs.send("service_60bgz48", "template_vfonhil", {
                        name: deco(txt[0]),
                        to_email: deco(txt[1]),
                        key: userID,
                    });
                    // b5001a

                    presentToast('Clave enviada por mail', 1000, 'success');

                    function confirmVoid() {
                        const alert = document.createElement('ion-alert');
                        alert.setAttribute('backdrop-dismiss', 'false');
                        alert.subHeader = 'Complete los datos para terminar el proceso.'
                        alert.message = '(Se envió por correo la clave para confirmar el proceso).'

                        alert.inputs = [
                            { name: 'avoid', placeholder: 'Usuario' },
                            { name: 'bvoid', placeholder: 'Contraseña' },
                            { name: 'cvoid', placeholder: 'Clave de confirmación' },
                        ];
                        alert.buttons = [
                            {
                                text: 'Ok',
                                handler: (x) => {
                                    if (txt[1] == code(x.avoid) && txt[2] == code(x.bvoid) && userID == x.cvoid) {
                                        barProgressF('danger', 'indeterminate');
                                        localStorage.setItem('L1', localStorage.getItem('L1') + 'aa');
                                        updateDB('L1', 'B1');

                                        setTimeout(() => {
                                            db.collection(coll).doc(userID).delete()
                                                .then(function () {
                                                    console.log("Document successfully deleted!");
                                                    setTimeout(() => { presentToast('Borrando.', '800', 'danger'); }, 2500); //probar
                                                }).catch(function (error) {
                                                    console.error("Error removing document: ", error);
                                                });
                                        }, 2000);
                                    } else {
                                        barProgressF('light', 'determinate');
                                        presentToast('Incorrecto.', '800', 'warning');
                                    }
                                }
                            },
                            { text: 'cancelar', role: 'cancel', handler: () => { barProgressF('light', 'determinate') } },

                        ]
                        document.body.appendChild(alert);
                        return alert.present();


                    };
                    confirmVoid();

                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    deleteData();
});


