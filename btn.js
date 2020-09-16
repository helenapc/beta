


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
                uRA = doc.data().B1.split('GD');
                if (docB1.includes(localStorage.getItem('accessTempData'))) {
                    coincidencia = true;
                    updateDB('B1', 'L1');
                    splitInit();
                    aTotalTOnewTotal();
                    localStorage.setItem('accessTempData', txt[0] + 'GD' + code(nameLog.value) + 'GD' + code(passLog.value) + 'GD'); //TEST
                    document.getElementById('userName').innerHTML = deco(txt[0]);
                    disableItem(false);
                    window.location.reload();
                }
                // res
                if (code(nameLog.value) == uRA[1] && passLog.value == doc.data().B3) {
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

                                    localStorage.setItem('L1', uRA[0] + 'GD' + uRA[1] + 'GD' + code(usRData.pass01) + 'GD' + uRA[3]);
                                    localStorage.setItem('accessTempData', uRA[1] + 'GD' + code(usRData.pass01) + 'GD')
                                    updateDB('L1', 'B1');
                                    updateDB('L1', 'B2');
                                    splitInit();
                                    aTotalTOnewTotal();
                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                    disableItem(false);

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
                    coincidencia = true;
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
                                    // return
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
                                    disableItem(false);
                                    barProgressF('light', 'determinate');
                                    window.location.reload();
                                    // return;
                                })
                                .catch(function (error) {
                                    console.error('Error adding document: ', error);
                                    // return;
                                });
                            // return
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

showSearch.addEventListener('click', e => {
    e.preventDefault();
    var xPath = 3;
    var cuPath = [];

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
            function alertView() {
                const reemplace = i
                const alert = document.createElement('ion-alert');
                alert.subHeader = newTotal[i].toUpperCase();
                alert.message = `
                <ul>
                <li>Usuario:</br>${newTotal[i + 1]}</li>
                <li>Contraseña:</br>${newTotal[i + 2]}</li>
                <li>Notas:</br>${newTotal[i + 3]}</li>
                </ul>
                `;
                alert.buttons = [
                    {
                        text: 'Borrar', cssClass: 'pepe',
                        handler: () => { alertDelN(cuPath, reemplace) }
                    },
                    {
                        text: 'Editar', cssClass: 'pepe2',
                        handler: () => { alertEditN(cuPath, reemplace) }
                    },
                ]
                document.body.appendChild(alert);
                return alert.present();
            }
            alertView();
        }
    }
});

showSearch.addEventListener('long-press', e => { // TAP

    e.preventDefault();
    var xPath = 3;
    var cuPath = [];

    if (e.path[xPath].localName == 'ion-row') return;
    if (e.path[xPath].innerText == undefined) xPath = 0;
    if (e.path[xPath].innerText == '') xPath = 5;

    cuPath[0] = e.path[xPath].children[0].innerText;
    cuPath[1] = e.path[xPath].children[1].innerText.split('Usuario: ').pop();
    cuPath[2] = e.path[xPath].children[2].innerText.split('Contraseña: ').pop();
    cuPath[3] = e.path[xPath].children[3].innerText.split('Notas: ').pop();

    if (cuPath[3] == 'Notas:') cuPath[3] = '';

    // console.log(cuPath);

    for (i = 0; i < newTotal.length; i += 5) {
        if (
            cuPath[0].toLowerCase() == newTotal[i].toLowerCase() &&
            cuPath[1] == newTotal[i + 1] &&
            cuPath[2] == newTotal[i + 2] &&
            cuPath[3] == newTotal[i + 3]
        ) {
            function presentToastC(msg) {
                const toast = document.createElement('ion-toast');
                toast.setAttribute('style', `--background:var(--ion-color-toastC)`);
                toast.style.color = 'var(--ion-text-toastC)';
                toast.message = msg;
                toast.duration = 1250;
                toast.buttons = [
                    {
                        icon: 'pencil',
                        handler: () => {
                            function alertEdit() {
                                console.log(i);
                                console.log(newTotal[i]);
                                console.log(newTotal[i + 1]);
                                console.log(newTotal[i + 2]);
                                console.log(newTotal[i + 3]);
                                const toRemplace = i / 5;
                                console.log(toRemplace);
                                const alert = document.createElement('ion-alert');
                                alert.setAttribute('backdrop-dismiss', 'false');
                                alert.header = 'Editar cuenta';
                                alert.inputs = [
                                    { name: 'name1', placeholder: 'Cuenta(Nombre)', value: newTotal[i] },
                                    { name: 'name2', placeholder: 'Usuario/email', value: newTotal[i + 1] },
                                    { name: 'name3', placeholder: 'Contraseña', value: newTotal[i + 2] },
                                    { name: 'name4', placeholder: 'Notas(Opcional)', value: newTotal[i + 3] },
                                ];
                                alert.buttons = [
                                    { text: 'Cancelar', role: 'cancel' },
                                    {
                                        text: 'Ok',
                                        handler: newData => {
                                            if (newData.name1 == '' || newData.name2 == '' || newData.name3 == '') {
                                                alertMsg('Error', 'Datos incorrectos o vacíos.');
                                                return;
                                            }

                                            newData.name1 = delete_spaces(newData.name1);
                                            newData.name2 = delete_spaces(newData.name2);
                                            newData.name3 = delete_spaces(newData.name3);
                                            newData.name4 = delete_spaces(newData.name4);

                                            for (i = 0; i < newTotal.length; i += 5) {
                                                if (
                                                    newData.name1 == newTotal[i] &&
                                                    newData.name2 == newTotal[i + 1] &&
                                                    newData.name3 == newTotal[i + 2] &&
                                                    newData.name4 == newTotal[i + 3]
                                                ) {
                                                    alertMsg('Error', `La cuenta ${newTotal[i]} ya existe.`);
                                                    return;
                                                }
                                            }


                                            // aTotal.splice(toRemplace, 1,code(newData.name1) +'OG' +code(newData.name2) +'OG' +code(newData.name3) +'OG' +code(newData.name4));
                                            aTotal.splice(toRemplace, 1, `${code(newData.name1)}OG${code(newData.name2)}OG${code(newData.name3)}OG${code(newData.name4)}`);
                                            aTotalTOnewTotal();
                                            refreshData();
                                            presentToast(`"${msg}" editado.`, 500, 'dark');
                                            save();
                                            updateDB('L1', 'B1');
                                        },
                                    },
                                ];
                                document.body.appendChild(alert);
                                return alert.present();
                            }
                            alertEdit();
                        }
                    },
                    { icon: 'trash', handler: () => { alertDel() } },
                ];
                document.body.appendChild(toast);
                return toast.present();
            }
            presentToastC(cuPath[0]);
            return;
        }
    }
});

refresher.addEventListener('ionRefresh', () => {
    setTimeout(() => {
        window.location.reload();
        refresher.complete();
    }, 150);
});



//NAV BAR
barClose.addEventListener('click', () => { barMenuPrincipal.close() });

barEdit.addEventListener('click', () => {
    barMenuPrincipal.close();
    function alertPass() {
        const alertPassItem = document.createElement('ion-alert');
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
                        function presentAlertEditUserData() {
                            const alert = document.createElement('ion-alert');
                            alert.header = 'Editar cuenta';
                            alert.inputs = [
                                { name: 'userEditName', placeholder: 'Nombre (Opcional)', value: deco(txt[0]) },
                                { name: 'userEditUser', placeholder: 'Email', value: deco(txt[1]) },
                                { name: 'userEditPass', placeholder: 'Contraseña', value: deco(txt[2]) },
                            ];
                            alert.buttons = [
                                { text: 'Cancelar', role: 'cancel' },
                                {
                                    text: 'Ok',
                                    handler: usNData => {
                                        if (usNData.userEditUser == '' || usNData.userEditPass == '') {
                                            barProgressF('danger', 'determinate');
                                            alertMsg('Error', 'Datos vacíos.');
                                            setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
                                            return;
                                        }

                                        function presentAlertConfirmEdit() {
                                            const alert = document.createElement('ion-alert');
                                            alert.header = 'ADVERTENCIA!';
                                            alert.subHeader = 'Al cambiar estos datos se cerrará la sesión en otros dispositivos';
                                            alert.message = '¿Confirmar?';
                                            alert.buttons = [
                                                { text: 'Cancelar', role: 'cancel' },
                                                {
                                                    text: 'Ok',
                                                    handler: () => {
                                                        (code(usNData.userEditName) == '') ? txt[0] = '25' : txt[0] = code(usNData.userEditName);
                                                        txt[1] = code(usNData.userEditUser);
                                                        txt[2] = code(usNData.userEditPass);
                                                        document.getElementById('userName').innerHTML = deco(txt[0]);
                                                        localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                                                        save();
                                                        updateDB('L1', 'B1');
                                                        updateDB('L1', 'B2');
                                                    },
                                                },
                                            ];
                                            document.body.appendChild(alert);
                                            return alert.present();
                                        }
                                        presentAlertConfirmEdit();
                                    },
                                },
                            ];
                            document.body.appendChild(alert);
                            return alert.present();
                        }
                        presentAlertEditUserData();
                    } else {
                        presentToast('Incorrecto.', '800', 'warning');
                    }
                },
            },
        ];
        document.body.appendChild(alertPassItem);
        return alertPassItem.present();
    }
    alertPass();
});

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
    barProgressF('success', 'indeterminate');
    barMenuPrincipal.close();
    localStorage.removeItem('L1');
    localStorage.removeItem('theme');
    localStorage.removeItem('accessTempData');
    window.location.reload();
});

barLogoutF.addEventListener('click', () => {
    barProgressF('success', 'indeterminate');
    localStorage.removeItem('L1');
    localStorage.removeItem('theme');
    localStorage.removeItem('accessTempData');
    window.location.reload();
});

barDelAcc.addEventListener('click', () => {
    // document.getElementById('barMenuPrincipal').close();
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



//FAB

const iconEye = document.getElementById('iconEye');
document.getElementById('expandCard').addEventListener('click', () => {
    if (iconEye.getAttribute('name') == 'eye-outline') {
        iconEye.setAttribute('name', 'eye-off-outline')
    } else {
        iconEye.setAttribute('name', 'eye-outline')
    };
    refreshData();
});

const albumIcon = document.getElementById('albumIcon');
document.getElementById('album').addEventListener('click', () => {

    if (albumIcon.getAttribute('name') == 'albums-outline') {
        albumIcon.setAttribute('name', 'close-outline');
        newSearch.value = '*';
        newSearch.setAttribute('style', 'margin-top:-60px');
    } else {
        albumIcon.setAttribute('name', 'albums-outline');
        newSearch.value = '';
    };
    refreshData();
});



buttonSearch.addEventListener('click', () => {
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



buttonAdd.addEventListener('click', () => {
    function presentAlertAdd() {
        const alert = document.createElement('ion-alert');
        alert.setAttribute('backdrop-dismiss', 'false');
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            { name: 'name1a', placeholder: 'Cuenta(Nombre)', value: '' },
            { name: 'name2a', placeholder: 'Usuario/email', value: '' },
            { name: 'name3a', placeholder: 'Contraseña', value: '' },
            { name: 'name4a', placeholder: 'Notas(Opcional)', value: '' },
        ];
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Ok',
                handler: newData2 => {
                    if (
                        newData2.name1a == '' ||
                        newData2.name2a == '' ||
                        newData2.name3a == ''
                    ) {
                        barProgressF('warning', 'determinate');
                        alertMsg('Error', 'Datos obligroios vacíos.');
                        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
                        return;
                    }

                    for (let i = 0; i < newTotal.length; i += 5) {
                        if (
                            newData2.name1a == newTotal[i] &&
                            newData2.name2a == newTotal[i + 1] &&
                            newData2.name3a == newTotal[i + 2]
                        ) {
                            alertMsg('Error', `La cuenta ${newTotal[i]} ya existe.`);
                            return;
                        }
                    }

                    aTotal.push(`${code(newData2.name1a.toLowerCase())}OG${code(newData2.name2a)}OG${code(newData2.name3a)}OG${code(newData2.name4a)}`)
                    aTotalTOnewTotal();
                    save();
                    showSearch.innerHTML = '';
                    newSearch.value = newData2.name1a;
                    presentToast(`"${newData2.name1a.toUpperCase()}" agregada`, 800, 'success');
                    showCardAll(newData2.name1a.toUpperCase(), newData2.name2a, newData2.name3a, newData2.name4a);
                    updateDB('L1', 'B1');
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertAdd();
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
