

// NEW MODAL

document.getElementById('bkmodal').addEventListener('click', () => {
    // console.log('hola');
    document.getElementById('bkmodal').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:0; pointer-events: none');

    document.getElementById('buttonEdit').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('buttonDelete').setAttribute('style', 'opacity:0; pointer-events: none');

    document.querySelectorAll('.ccse')[0].setAttribute('style', 'user-select:none;');
    document.querySelectorAll('.ccse')[1].setAttribute('style', 'user-select:none;');
    document.querySelectorAll('.ccse')[2].setAttribute('style', 'user-select:none;');

})



//home
buttonLogin.addEventListener('click', () => {
    barProgressF('success', 'indeterminate');

    localStorage.setItem('accessTempData', code(nameLog.value) + 'GD' + code(passLog.value) + 'GD');

    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (!coincidencia) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                userID = doc.id;
                userRestoreAccount = doc.data().B1.split('GD');
                if (docB1.includes(localStorage.getItem('accessTempData'))) {
                    // 
                    localStorage.setItem('tPin', Date.now());
                    // 
                    coincidencia = true;
                    updateDB('B1', 'L1');
                    splitInit();
                    aTotalTOnewTotal();
                    localStorage.setItem('accessTempData', txt[0] + 'GD' + code(nameLog.value) + 'GD' + code(passLog.value) + 'GD'); //TEST

                    localStorage.setItem('bp', txt[4]); //FIX?

                    document.getElementById('userName').innerHTML = deco(txt[0]);
                    // disableItem(false);
                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch', '#refresher'], 'style', 'pointer-events: auto; opacity: 1');
                    document.getElementById('content').setAttribute('style', '--background: #ffffff00');
                    // document.getElementById('content').setAttribute('style', '--background: #ffffff00');
                    window.location.reload();
                }

                // res
                if (code(nameLog.value) == userRestoreAccount[1] && passLog.value == doc.data().B3) {
                    console.log(doc.data().B3);
                    function presentRestorePass() {
                        const alert = document.createElement('ion-alert');
                        alert.subHeader = 'Restablecer contraseña';
                        alert.inputs = [
                            { name: 'pass01', placeholder: 'Nueva contraseña...', value: '' },
                            { name: 'pass02', placeholder: 'Confirmar contraseña...', value: '' }
                        ];
                        alert.buttons = [
                            { text: 'Cancelar', role: 'cancel' },
                            {
                                text: 'Ok',
                                handler: usRData => {
                                    if (usRData.pass01 == '' || usRData.pass02 == '' || usRData.pass01 != usRData.pass02) {
                                        alertMsg('Error', 'Datos incorrectos o vacíos.');
                                        return;
                                    }

                                    localStorage.setItem('L1', userRestoreAccount[0] + 'GD' + userRestoreAccount[1] + 'GD' + code(usRData.pass01) + 'GD' + userRestoreAccount[3]);
                                    // localStorage.setItem('accessTempData', userRestoreAccount[1] + 'GD' + code(usRData.pass01) + 'GD');
                                    localStorage.setItem('accessTempData', userRestoreAccount[1] + 'GD' + code(usRData.pass01) + 'GD');

                                    coincidencia = true;
                                    updateDB('L1', 'B1');
                                    updateDB('L1', 'B2');
                                    splitInit();
                                    aTotalTOnewTotal();
                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                    // disableItem(false);
                                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch', '#refresher'], 'style', 'pointer-events: auto; opacity: 1');
                                    document.getElementById('content').setAttribute('style', '--background: #ffffff00');

                                    db.collection(coll).doc(userID).update({
                                        B3: firebase.firestore.FieldValue.delete()
                                    }).then(function () { window.location.reload() });

                                },
                            },
                        ];
                        document.body.appendChild(alert);
                        return alert.present();
                    }
                    presentRestorePass();
                    // coincidencia = true;
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
    // helpFunction('0', false);

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
            <p id="op1" class="cct">${cuPath[0]}</p>
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


            document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
            document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: auto');
            document.getElementById('buttonEdit').setAttribute('style', 'opacity:1; pointer-events: auto');
            document.getElementById('buttonDelete').setAttribute('style', 'opacity:1; pointer-events: auto');


            // var matches = document.querySelectorAll('.ccse');
            // console.log(matches);
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
                    // alertcompare = false;
                    // setTimeout(() => { alertcompare = true; }, 1500);
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
                    console.log(userID);
                    Email.send({
                        Host: "smtp.gmail.com",
                        Username: "restore.pass.helena@gmail.com",
                        Password: "restaurar1234",
                        To: deco(txt[1]),
                        From: "restore.pass.helena@gmail.com",
                        Subject: "Eliminar cuenta.",
                        Body:
                            `
                            <h2>Clave para confirmar la eliminación de la cuenta:</h2>
                            <h1>${userID}</h1>
                        `,
                    }).then(function () {
                        console.log("correo enviado");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });

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
    // alertEdit(cuPath, reemplace); 

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
    document.getElementById('buttonEdit').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('buttonDelete').setAttribute('style', 'opacity:0; pointer-events: none');
    // alertcompare = false;
});

document.getElementById('buttonDelete').addEventListener('click', () => {
    alertDel(cuPath, reemplace);
});

document.getElementById('nameSetting').addEventListener('click', () => {
    // alertPass();
    // function alertPass() {
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
                    // presentAlertEditUserData();
                    // presentAlertEditUserData2(txt);
                    document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: auto');
                    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');


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

                        <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok_user')">
                        <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">
                    `;

                } else {
                    bar
                    presentToast('Contraseña incorrecta.', '800', 'warning');
                }
            },
        },
    ];
    document.body.appendChild(alertPassItem);
    return alertPassItem.present();
    // }
});

document.getElementById('expandCard').addEventListener('click', () => {
    // helpFunction('0', false);
    // if (document.getElementById('expandIcon').getAttribute('name') == icoExp) {
    //     document.getElementById('expandIcon').setAttribute('name', icoCom);
    // } else {
    //     document.getElementById('expandIcon').setAttribute('name', icoExp);
    // };

    let icon = document.getElementById('expandIcon');
    icon.setAttribute('name', (icon.getAttribute('name') == icoExp) ? icoCom : icoExp);
    refreshData(false);
});

document.getElementById('showCard').addEventListener('click', () => {
    // helpFunction('0', false);
    if (document.getElementById('showIcon').getAttribute('name') == icoShow) {
        document.getElementById('showIcon').setAttribute('name', icoHide);
        newSearch.value = '*';
        newSearch.setAttribute('style', 'margin-top:-60px');
    } else {
        document.getElementById('showIcon').setAttribute('name', icoShow);
        newSearch.value = '';
    };
    refreshData();
});

document.getElementById('buttonSearch').addEventListener('click', () => {
    if (!statSearchBar) {
        newSearch.value = '';
        newSearch.setAttribute('style', 'margin-top:0px');
        newSearch.setFocus();
        statSearchBar = true;
    } else {
        newSearch.setAttribute('style', 'margin-top:-60px');
        statSearchBar = false;
    }

})

document.getElementById('buttonAdd').addEventListener('click', () => {

    document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Agregar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 0px 0px 15px 0px;">

        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
        <label class="cce" > Cuenta:</label>
        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
        <label class="cce" > Usuario:</label>
        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
        <label class="cce" > Contraseña:</label>
        <input type="text" placeholder="Opcional" class="ccse modal_input" value="">
        <label class="cce" > Notas:</label>
        </p>

    <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok')">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">

    `;


    document.getElementById('buttonEdit').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('buttonDelete').setAttribute('style', 'opacity:0; pointer-events: none');
    // alertcompare = false;
});




//CHECK/TOGGLE
checkbox.addEventListener('click', () => {
    // helpFunction('0', false);
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


