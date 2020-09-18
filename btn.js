


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

showSearch.addEventListener('click', e => {  //editCard
    helpFunction('0', false);
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
            const reemplace = i

            if (document.getElementById('expandIcon').getAttribute('name') == 'expand-outline') {
                alertView(cuPath);
            }
            function presentToastC(msg) {
                const toast = document.createElement('ion-toast');
                toast.setAttribute('style', `--background:var(--ion-color-toastC)`);
                toast.style.color = 'var(--ion-text-toastC)';
                toast.translucent = true;
                toast.message = msg;
                toast.duration = 1000;
                toast.buttons = [
                    {
                        icon: 'pencil',
                        handler: () => {
                            closeAlert = true;
                            // return alert.dismiss();
                            alertEdit(cuPath, reemplace);
                        }
                    },
                    {
                        icon: 'trash',
                        handler: () => {
                            closeAlert = true;
                            alertDel(cuPath, reemplace)
                        }
                    },
                ];
                document.body.appendChild(toast);
                return toast.present();

            }
            presentToastC(cuPath[0]);
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

document.getElementById('barOpen').addEventListener('click', ()=>{ helpFunction('0', false) });
document.getElementById('barClose').addEventListener('click', () => { barMenuPrincipal.close() });

barEdit.addEventListener('click', () => {
    barMenuPrincipal.close();
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
    barMenuPrincipal.close();
    // localStorage.removeItem('L1');
    // localStorage.removeItem('theme');
    // localStorage.removeItem('accessTempData');
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



//FAB

document.getElementById('buttonHelp').addEventListener('click', () => {
    (!helpActivate) ? helpFunction('1', true) : helpFunction('0', false);
})

document.getElementById('nameSetting').addEventListener('click', () => {
    helpFunction('0', false);
    alertPass()
});

document.getElementById('barLogoutF').addEventListener('click', () => {
    // localStorage.removeItem('L1');
    // localStorage.removeItem('theme');
    // localStorage.removeItem('accessTempData');
    localStorage.clear();
    window.location.reload();
});

document.getElementById('expandCard').addEventListener('click', () => {
    helpFunction('0', false);
    if (document.getElementById('expandIcon').getAttribute('name') == 'expand-outline') {
        document.getElementById('expandIcon').setAttribute('name', 'contract-outline')
    } else {
        document.getElementById('expandIcon').setAttribute('name', 'expand-outline')
    };
    refreshData(false);
});

document.getElementById('showCard').addEventListener('click', () => {
    helpFunction('0', false);
    if (document.getElementById('showIcon').getAttribute('name') == 'eye-outline') {
        document.getElementById('showIcon').setAttribute('name', 'eye-off-outline');
        newSearch.value = '*';
        newSearch.setAttribute('style', 'margin-top:-60px');
    } else {
        document.getElementById('showIcon').setAttribute('name', 'eye-outline');
        newSearch.value = '';
    };
    refreshData();
});

document.getElementById('buttonSearch').addEventListener('click', () => {
    helpFunction('0', false);
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
    helpFunction('0', false);
    function presentAlertAdd() {
        const alert = document.createElement('ion-alert');
        alert.setAttribute('backdrop-dismiss', 'false');
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            { name: 'name1a', placeholder: 'Cuenta(Nombre):', value: '' },
            { name: 'name2a', placeholder: 'Usuario/email:', value: '' },
            { name: 'name3a', placeholder: 'Contraseña:', value: '' },
            { name: 'name4a', placeholder: 'Notas(Opcional):', value: '' },
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
                    document.getElementById('expandIcon').setAttribute('name', 'contract-outline');
                    refreshData();
                    presentToast(`"${newData2.name1a.toUpperCase()}" agregada`, 800, 'success');
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
    helpFunction('0', false);
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


// TEST POPOVER

// document.getElementById('showCard').addEventListener('long-press', e => {
//     e.preventDefault();
//     presentPopover(e);
//     contentPopover("saludar()", 'Mostrar todo / Ocultar todo.');

// })


// let currentPopover = null;
// function presentPopover(e) {
//     const popover = Object.assign(document.createElement('ion-popover'), {
//         mode: 'ios',
//         component: 'popover-example-page',
//         cssClass: 'my-custom-class',
//         event: e,
//         translucent: true,
//     });
//     currentPopover = popover;
//     document.body.appendChild(popover);
//     return popover.present();
// }

// function contentPopover(func, content) {
//     customElements.define('popover-example-page', class ModalContent extends HTMLElement {
//         connectedCallback() {
//             this.innerHTML = `
//             <ion-list>
//             <ion-item button onClick="${func}">${content}</ion-item>
//             </ion-list>
//             `;

//         }
//     });
// }


// function saludar() {
//     console.log('hola');
//     if (currentPopover) {
//         currentPopover.dismiss().then(() => { currentPopover = null; });
//     }
// }