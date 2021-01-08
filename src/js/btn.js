// Version 2.7.3 => 2.7.4

// NEW MODAL

document.getElementById('bkmodal').addEventListener('click', () => {
    multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
    // AUTOEXPAND
    // if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');
    document.querySelectorAll('.ccse')[0].setAttribute('style', 'user-select:none;');
    document.querySelectorAll('.ccse')[1].setAttribute('style', 'user-select:none;');
    document.querySelectorAll('.ccse')[2].setAttribute('style', 'user-select:none;');

})



//home
buttonLogin.addEventListener('click', () => {
    barProgressF('success', 'indeterminate');

    localStorage.setItem('accessTempData', code(nameLog.value) + 'GD' + code(passLog.value) + 'GD');
    // console.log(localStorage.getItem('accessTempData'));

    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (!coincidencia) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                docB3 = doc.data().B3;

                userID = doc.id;

                userRestoreAccount = doc.data().B1.split('GD');

                if (docB1.includes(localStorage.getItem('accessTempData'))) {
                    coincidencia = true;
                    localStorage.setItem('tPin', Date.now());
                    updateDB('B1', 'L1');
                    splitInit();
                    aTotalTOnewTotal();
                    localStorage.setItem('accessTempData', txt[0] + 'GD' + code(nameLog.value) + 'GD' + code(passLog.value) + 'GD'); //TEST
                    // console.log(localStorage.getItem('accessTempData'));
                    localStorage.setItem('bp', txt[4]); //FIX?
                    document.getElementById('userName').innerHTML = deco(txt[0]);
                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch'], 'style', 'pointer-events: auto; opacity: 1');
                    window.location.reload();
                }

                // restore pass

                // console.log(docB1);
                // console.log(docB2);



                if (code(nameLog.value) == userRestoreAccount[1] && passLog.value == docB3) {
                    coincidencia = true;

                    // console.log(docB1);
                    // console.log(userID);

                    const alert = document.createElement('ion-alert');
                    alert.subHeader = 'Restablecer contraseña';
                    alert.inputs = [
                        { name: 'pass01', placeholder: 'Nueva contraseña...', value: '' },
                        { name: 'pass02', placeholder: 'Confirmar contraseña...', value: '' }
                    ];
                    alert.buttons = [
                        { text: 'Cancelar', handler: () => { window.location.reload(); } },
                        {
                            text: 'Ok',
                            handler: usRData => {


                                if (usRData.pass01 == '' || usRData.pass02 == '' || usRData.pass01 != usRData.pass02) {
                                    alertMsg('Error', 'Datos incorrectos o vacíos.');
                                    window.location.reload();
                                    return;
                                }

                                // localStorage.setItem('L1', userRestoreAccount[0] + 'GD' + userRestoreAccount[1] + 'GD' + code(usRData.pass01) + 'GD' + userRestoreAccount[3]);
                                // localStorage.setItem('accessTempData', txt[0] + 'GD' + userRestoreAccount[1] + 'GD' + code(passLog.value) + 'GD'); //TEST

                                // coincidencia = true;

                                
                                //b9002
                                localStorage.setItem('tPin', Date.now());
                                txt[0] = (userRestoreAccount[0] == '') ? '25' : userRestoreAccount[0]
                                txt[1] = userRestoreAccount[1];
                                txt[2] = code(usRData.pass01);
                                txt[3] = userRestoreAccount[3];
                                txt[4] = userRestoreAccount[4];

                                document.getElementById('userName').innerHTML = deco(txt[0]);
                                document.getElementById('nameSettingText').innerHTML = deco(txt[0]).slice(0, 1).toUpperCase();
                                localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                                localStorage.setItem('bp', txt[4]);
                                localStorage.setItem('tPin', Date.now());
    
                                // save();
                                localStorage.setItem('L1', `${txt[0]}GD${txt[1]}GD${txt[2]}GD${txt[3]}GD${txt[4]}`);
                                updateDB('L1', 'B1');
                                updateDB('L1', 'B2');
                                comparePersonalData = false;
                                // /b9002
                                
                                // alertcompare = false;
                                // PROBAR
                                // splitInit();
                                // aTotalTOnewTotal();


                                db.collection(coll).doc(userID).update({
                                    B3: firebase.firestore.FieldValue.delete()
                                }).then(function () {
                                    presentToast('Contraseña restablecida', '800', 'success')
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                });
                            },
                        },
                    ];
                    document.body.appendChild(alert);
                    return alert.present();

                }
            };

        });
        barProgressF('light', 'determinate');
        if (coincidencia) {
            showLogin.innerHTML = '';
        } else {
            barProgressF('warning', 'determinate');
            alertMsg('Error', 'Datos incorrectos o vacíos.');
            setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
        }

    });


});

buttonCreate.addEventListener('click', () => {
    function presentAlertCreate() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Registrarse';
        alert.inputs = [
            { name: 'userEditName', placeholder: 'Nombre (Opcional)' },
            { name: 'userEditUser', placeholder: 'Email' },
            { name: 'userEditPass', placeholder: 'Contraseña', type: 'password' },
        ];
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Ok',
                handler: usCData => {
                    if (usCData.userEditUser == '' || usCData.userEditPass == '') {
                        barProgressF('warning', 'determinate');
                        alertMsg('Error', 'Datos obligatorios vacíos.');
                        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
                        return;
                    };

                    barProgressF('success', 'indeterminate');
                    (code(usCData.userEditName) == '') ? txt[0] = '25' : txt[0] = code(usCData.userEditName);

                    localStorage.setItem('accessTempData', code(usCData.userEditName) + 'GD' + code(usCData.userEditUser) + 'GD' + code(usCData.userEditPass) + 'GD');

                    db.collection(coll).onSnapshot(querySnapshot => {
                        if (!coincidencia) {
                            querySnapshot.forEach(doc => {
                                uCA = doc.data().B1.split('GD');
                                if (!coincidencia && uCA[1] == code(usCData.userEditUser)) {
                                    coincidencia = true;
                                    docB1 = doc.data().B1;
                                    docB2 = doc.data().B2;
                                    userID = doc.id;
                                };
                            });
                        };

                        if (coincidencia) {
                            if (localStorage.getItem('alrt')) {
                                localStorage.removeItem('alrt');
                            } else {
                                barProgressF('light', 'determinate');
                                alertMsgReset('Error', 'Ya hay una cuenta registrada con este email.');
                            }
                            return

                        } else {
                            localStorage.setItem('alrt', code(usCData.userEditUser))
                            db.collection(coll).add({
                                B1: localStorage.getItem('accessTempData'),
                                B2: '',
                            })
                                .then(function () {
                                    updateDB('B1', 'L1');
                                    showLogin.innerHTML = '';
                                    splitInit();
                                    aTotalTOnewTotal();
                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                    // disableItem(false);
                                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch', '#refresher'], 'style', 'pointer-events: auto; opacity: 1');
                                    // document.getElementById('content').setAttribute('style', '--background: #ffffff00');
                                    barProgressF('light', 'determinate');
                                    window.location.reload();
                                })
                                .catch(function (error) {
                                    console.error('Error adding document: ', error);
                                });
                        };
                    });
                }
            },
        ];

        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertCreate();
    return;
});


//CONTENT
newSearch.addEventListener('ionInput', () => { refreshData() });




showSearch.addEventListener('click', e => {  //editCard

    e.preventDefault();
    var xPath = 3;
    // var cuPath = [];

    if (e.path[xPath].localName == 'ion-row') return;
    if (e.path[xPath].innerText == undefined) xPath = 0;
    if (e.path[xPath].innerText == '') xPath = 5;

    cuPath[0] = e.path[xPath].children[0].innerText;
    cuPath[1] = e.path[xPath].children[1].innerText.split('Usuario: ').pop();
    cuPath[2] = e.path[xPath].children[2].innerText.split('Contraseña: ').pop();
    cuPath[3] = e.path[xPath].children[3].innerText.split('Notas: ').pop();

    if (cuPath[3] == 'Notas:') cuPath[3] = '';

    for (i = 0; i < newTotal.length; i += 5) {
        if (
            cuPath[0].toLowerCase() == newTotal[i].toLowerCase() &&
            cuPath[1] == newTotal[i + 1] &&
            cuPath[2] == newTotal[i + 2] &&
            cuPath[3] == newTotal[i + 3]
        ) {
            // const reemplace = i
            reemplace = i

            document.getElementById('modal').innerHTML =
                `
            <p id="op1" class="cct" style="text-align: center">${cuPath[0]}</p>
            <hr style="height:1px; border-width:0; color:gray;background-color:gray">
            <p style="margin: 0px 0px 0px 0px;">
            <label class="cce_st" > Usuario: </label>
            <p class="ccse" > ${cuPath[1]} </p>
            <label class="cce_st" > Contraseña: </label>
            <p class="ccse" > ${cuPath[2]} </p>
            <label class="cce_st" > Notas: </label>
            <p class="ccse" > ${cuPath[3]} </p>
            </p>
            `;



            // document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: auto');
            multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:1; pointer-events: auto');
            // AUTOEXPAND
            // multipleAttribute(['#nameSetting', '#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:0.3; pointer-events: none');
            multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch'], 'style', 'opacity:0.3; pointer-events: none');


            document.querySelectorAll('.ccse')[0].setAttribute('style', 'user-select:all;');
            document.querySelectorAll('.ccse')[1].setAttribute('style', 'user-select:all;');
            document.querySelectorAll('.ccse')[2].setAttribute('style', 'user-select:all;');

        }
    }

});

document.getElementById('refresher').addEventListener('ionRefresh', () => {
    setTimeout(() => {
        window.location.reload();
        document.getElementById('refresher').complete();
    }, 150);
});



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


//FAB TEST
// document.getElementById('buttonTest').addEventListener('click', () => {
// });


//FAB

document.getElementById('buttonEdit').addEventListener('click', () => {

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
    
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    // if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Editar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 0px 0px 15px 0px;">
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[0].toLowerCase()}">
    <label class="cce" > Cuenta: </label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[1]}">
    <label class="cce" > Usuario: </label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[2]}">
    <label class="cce" > Contraseña: </label>
    <input type="text" placeholder="Opcional" class="ccse modal_input" value="${cuPath[3]}">
    <label class="cce" > Notas: </label>
    </p>
    
    <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok')">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">

`;
});

document.getElementById('buttonDelete').addEventListener('click', () => {

    multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

    const alert = document.createElement('ion-alert');
    alert.message = `¿Eliminar "${cuPath[0]}"?`;
    alert.buttons = [
        {
            text: 'cancelar',
            handler: () => {
                // AUTOEXPAND
                // multipleAttribute(['#nameSetting', '#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');
                multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');
            }
        },
        {
            text: 'ok',
            handler: () => {
                aTotal.splice(reemplace / 5, 1);
                aTotalTOnewTotal();

                multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
                // AUTOEXPAND
                // if (showSearch.innerHTML != '') expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

                if (newSearch.value == '') {

                    // refreshData();
                    showSearch.innerHTML = '';
                    showIcon.setAttribute('name', icoHide);
                    // AUTOEXPAND
                    // expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
                    for (i = 0; i < newTotal.length; i += 5) {
                        showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
                    }
                    newTotal.length / 5 == 1 ? (s = '') : (s = 's');
                    presentToast(`${newTotal.length / 5} Cuenta${s} guardad${s}.`, '800', 'dark');

                } else {
                    refreshData();
                }
                save();
                presentToast(`"${cuPath[0]}" eliminado.`, '800', 'danger');
                updateDB('L1', 'B1');
                // multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
                // if (showSearch.innerHTML != '') expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
                closeAlert = false;

                // multipleAttribute(['#nameSetting','#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');

            },
        },
    ];

    // multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
    // if (showSearch.innerHTML != '') {
    //     // multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');


    // } else {
    //     document.getElementById('showIcon').setAttribute('name', icoShow);
    //     newSearch.setAttribute('style', 'margin-top:0px');
    //     // multipleAttribute(['#new-s'], 'style', 'opacity:1; margin-top:0px');
    //     newSearch.setFocus();
    //     statSearchBar = true;
    //     testExpand = true;
    //     newSearch.value = '';
    // }

    document.body.appendChild(alert);
    return alert.present();
});

document.getElementById('nameSetting').addEventListener('click', () => {
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
                    // document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: auto');
                    // document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
                    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');


                    document.getElementById('modal').innerHTML =
                        `
                        <p id="op1" class="cct">Datos de usuario</p>
                        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
                        <p style="margin: 0px 0px 15px 0px;">
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
    // }
});


// document.getElementById('expandCard').addEventListener('click', () => {


// expandIcon.setAttribute('name', (expandIcon.getAttribute('name') == icoExp) ? icoCom : icoExp);
    
//     if (newSearch.value == '') {
//         const newTotalLength = newTotal.length;
//         showSearch.innerHTML = '';
//         for (i = 0; i < newTotalLength; i += 5) {
//             showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
//         }
//     } else {
//         refreshData(false);
//     }
//     console.log( document.querySelector('#card'));
//     newSub1.classList.toggle('.nowrap');

// });

document.getElementById('showCard').addEventListener('click', () => {

    newSearch.value = '';
    // var testExpand = false;

    if (showIcon.getAttribute('name') == icoShow) {
        showIcon.setAttribute('name', icoHide);
        // AUTOEXPAND
        // expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

        const newTotalLength = newTotal.length;
        for (i = 0; i < newTotalLength; i += 5) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
        }
        let s = (newTotalLength / 5 == 1) ? '' : 's';
        presentToast(`${newTotalLength / 5} Cuenta${s} guardada${s}.`, '800', 'dark');
    } else {
        showIcon.setAttribute('name', icoShow);
        showSearch.innerHTML = '';
        // AUTOEXPAND
        // expandCard.setAttribute('style', 'opacity:0; pointer-events: none');
        // expandIcon.setAttribute('name', icoExp);
    };
    // refreshData();
});

document.getElementById('buttonSearch').addEventListener('click', () => {
    if (statSearchBar) {
        newSearch.setAttribute('style', 'margin-top:-60px');
        statSearchBar = false;
    } else {
        newSearch.value = '';
        newSearch.setAttribute('style', 'margin-top:0px');
        newSearch.setFocus();
        statSearchBar = true;
    }
})

document.getElementById('buttonAdd').addEventListener('click', () => {


    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    // if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Agregar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 0px 0px 15px 0px;">

    <input type="text" placeholder="cuenta" class="ccse modal_input" value="">
    <label class="cce" > Cuenta:</label>
    <input type="text" placeholder="usuario" class="ccse modal_input" value="">
    <label class="cce" > Usuario:</label>
    <input type="text" placeholder="contraseña" class="ccse modal_input" value="">
    <label class="cce" > Contraseña:</label>
    <input type="text" placeholder="notas" class="ccse modal_input" value="">
    <label class="cce" > Notas:</label>
    </p>

    <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok')">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">

    `;

    // <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    // <label class="cce" > Cuenta:</label>
    // <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    // <label class="cce" > Usuario:</label>
    // <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    // <label class="cce" > Contraseña:</label>
    // <input type="text" placeholder="Opcional" class="ccse modal_input" value="">
    // <label class="cce" > Notas:</label>

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
    // alertcompare = false;
});




//CHECK/TOGGLE
checkbox.addEventListener('click', () => {
    if (activeTheme[1] == 'dark') {
        document.body.classList.toggle('dark');
        document.body.classList.toggle(activeTheme[0]);
        activeTheme[1] = '';
    } else {
        document.body.classList.toggle(activeTheme[0]);
        document.body.classList.toggle('dark');
        activeTheme[1] = 'dark';
    }
    localStorage.setItem('theme', activeTheme);
});


