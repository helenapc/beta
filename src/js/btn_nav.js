
//NAV BAR

// document.getElementById('barOpen').addEventListener('click', () => { helpFunction('0', false) });

document.getElementById('barClose').addEventListener('click', () => { barMenuPrincipal.close() });

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
    // localStorage.removeItem('accesssTemData');
    // localStorage.removeItem('theme');
    // localStorage.removeItem('tPin');
    // localStorage.removeItem('bp');
    localStorage.setItem('data', JSON.stringify({autoExpand: true, fondo01: '', fondo02 : ''}));
    // localStorage.setItem('L1', 'GDGDGDGD');
    window.location.reload();
});

config.addEventListener('click', () => {
    barMenuPrincipal.close();
    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');

    // const modal = document.getElementById('modal');
    // modal.style.width = '80vw';
    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Configuración</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">

    <label class="cce_st" style="font-size:0.9rem">Tarjetas</label>
    <p style="margin: 15px 0px;"><label style="color: var(--ion-text-color)">
    <input type="checkbox" class="ccse modal_input configData" style="margin-right: 10px"> Auto-expandir tarjetas
    </label></p>
     

    <label class="cce_st" style="font-size:0.9rem">Fondos (internet)</label>
    <p style="margin: 15px 0px; color: var(--ion-text-color)"> Tema claro:
    <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configData.fondo01}"style="width: 100%"> 
    </p>
    <p style="margin: 15px 0px; color: var(--ion-text-color)"> Tema oscuro:
    <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configData.fondo02}" style="width: 100%"> 
    </p>

    
    <input type="button" class="modal_btns" value="ok" onClick="buttons_modal('cancel')">
    `;

    // <input type="button" class="modal_btns" value="OK" onClick="buttons_modal_config('ok_config')">

    // console.log(document.getElementsByClassName('modal_input'));


    let configValues = document.getElementsByClassName('configData');
    // console.log(configValues);
    configValues[0].checked = configData.autoExpand;

    // let cargarTema1 = document.getElementsByClassName('light');
    // let cargarTema2 = document.getElementsByClassName('dark');
    // console.log(cargarTema1.body);
    // console.log(cargarTema2.body);


    // auto expandir
    configValues[0].addEventListener('click', () => {
        configData.autoExpand = configValues[0].checked;
        localStorage.setItem('data', JSON.stringify(configData));
        let cards = document.getElementsByTagName('ion-card-header');
        let vuelta = cards.length;
        for (let i = 0; i < vuelta; i++) { cards[i].classList.toggle('cardExpand'); }
    });

    // fondo claro
    // console.log(document.body.classList);
    // var bgl = document.body.querySelector('.light');
    // console.log(bgl);

    configValues[1].addEventListener('keyup', () => {

        configData.fondo01 = configValues[1].value;
        localStorage.setItem('data', JSON.stringify(configData));
        // if (configData.fondo01 == '') {
        //     if (cargarTema1) cargarTema1[0].setAttribute('style', `background: url('src/img/bg1.jpg') no-repeat 52% center/cover;`);
        // } else {
        //     if (cargarTema1) cargarTema1[0].setAttribute('style', `background: url('${configValues[1].value}') no-repeat 52% center/cover;`);
        // }

        // document.body.classList.toggle('dark');
        // document.body.classList.toggle(activeTheme[0]);
        // activeTheme[1] = '';

        if (cargarTema1[0]) {
            if (cargarTema1[0].classList[0] == 'light') {
                // backgroundBody.setAttribute()
                console.log('adentro');
                if (configData.fondo01 == '') {
                    if (cargarTema1[0]) cargarTema1[0].setAttribute('style', `background: url('src/img/bg1.jpg') no-repeat 52% center/cover;`);
                } else {
                    if (cargarTema1[0]) cargarTema1[0].setAttribute('style', `background: url('${configValues[1].value}') no-repeat 52% center/cover;`);
                }
            }
        }
    });

    configValues[2].addEventListener('keyup', () => {

        // checkbox.checked = true;
        configData.fondo02 = configValues[2].value;
        localStorage.setItem('data', JSON.stringify(configData));
        // if (configData.fondo01 == '') {
        //     if (cargarTema1) cargarTema1[0].setAttribute('style', `background: url('src/img/bg2.jpg') no-repeat 52% center/cover;`);
        // } else {
        //     if (cargarTema1) cargarTema1[0].setAttribute('style', `background: url('${configValues[2].value}') no-repeat 52% center/cover;`);
        // }

        // document.body.classList.toggle(activeTheme[0]);
        // document.body.classList.toggle('dark');
        // activeTheme[1] = 'dark';
        if (cargarTema2[0]) {
            if (cargarTema2[0].classList[0] == 'dark') {
                // backgroundBody.setAttribute()
                console.log('adentro');
                if (configData.fondo02 == '') {
                    if (cargarTema2[0]) cargarTema2[0].setAttribute('style', `background: url('src/img/bg2.jpg') no-repeat 52% center/cover;`);
                } else {
                    if (cargarTema2[0]) cargarTema2[0].setAttribute('style', `background: url('${configValues[2].value}') no-repeat 52% center/cover;`);
                }
            }
        }


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



// CONFIG
// const configAutoExpand = document.getElementsByClassName('modal_input');
// console.log(configAutoExpand);
// configAutoExpand.addEventListener('click', ()=>{
//     console.log('hola');
// });