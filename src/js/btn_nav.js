
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
    window.location.reload();
});


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
        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    
        <div style="width: 100%; height: 250px; overflow-y:scroll; overflow-x: hidden; margin: 1px; paddgin: 1px">
            
        <label class="cce_st" style="font-size:0.9rem">Fondos (internet)</label>
        <p style="margin: 15px 0px; ; color: var(--ion-text-color)"> Tema Claro:
        <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configData.fondo01}"style="width: 100%"> 
        </p>
        <p style="margin: 15px 0px; ; color: var(--ion-text-color)"> Tema Oscuro:
        <input type="text" class="ccse modal_input configData" placeholder ="Pegar link aquí.." value="${configData.fondo02}" style="width: 100%"> 
        </p>

        <br>

        <label class="cce_st" style="font-size:0.9rem">Tarjetas</label>
        <p style="padding: 15px 0px; margin: 0; "><label style="color: var(--ion-text-color);">
        <input type="checkbox" class="ccse modal_input configData">&nbsp;&nbsp;Auto-expandir
        </label></p>

        <hr style=" margin: 0; height:1px; border-width:3;background-color:#eeeeee">
        
        <p style="padding: 15px 0px; margin: 0;"><label style="color: var(--ion-text-color);">
        <input type="checkbox" class="ccse modal_input configData">&nbsp;&nbsp;Animación<br>
        </p>
        
        <hr style=" margin: 0; height:1px; border-width:3;background-color:#eeeeee">

        <br>
        </div>
        <input type="button" class="modal_btns" value="OK" style="margin: 10px 0px" onClick="buttons_modal('cancel')">
    `;


    // PROP
    // console.log(configValues);
    let configValues = document.getElementsByClassName('configData');

    configValues[2].checked = configData.autoExpand;
    configValues[3].checked = configData.animacion;

    // fondo claro 
    configValues[0].addEventListener('keyup', () => {
        configData.fondo01 = configValues[0].value;
        localStorage.setItem('data', JSON.stringify(configData));
        if (cargarTema1[0] && cargarTema1[0].classList[0] == 'light') {
            cargarTema1[0].setAttribute('style', `background: url('${(configData.fondo01 == '') ? 'src/img/bg1.jpg' : configData.fondo01} ') no-repeat 50% center/cover`);
        }

    });

    // fondo oscuro
    configValues[1].addEventListener('keyup', () => {
        configData.fondo02 = configValues[1].value;
        localStorage.setItem('data', JSON.stringify(configData));
        if (cargarTema2[0] && cargarTema2[0].classList[0] == 'dark') {
            cargarTema2[0].setAttribute('style', `background: url('${(configData.fondo02 == '') ? 'src/img/bg2.jpg' : configData.fondo02} ') no-repeat 50% center/cover`);
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




    // CONFIG
    // const configAutoExpand = document.getElementsByClassName('modal_input');
    // console.log(configAutoExpand);
    // configAutoExpand.addEventListener('click', ()=>{
    //     console.log('hola');
// });