firebase.initializeApp({
    apyKey: deco("464E7F66587E465F5C3A6B7A4B4B3D5D387F745A5C69696E466C374E554A74697953585D383868"),
    authDomain: deco("6D6A716A7366326967323A683A3738336B6E776A6766786A66757533687472"),
    databaseURL: deco("6D797975783F34346D6A716A7366326967323A683A3738336B6E776A6766786A6E7433687472"),
    projectId: deco("6D6A716A7366326967323A683A3738"),
    storageBucket: deco("6D6A716A7366326967323A683A3738336675757875747933687472"),
    messagingSenderId: deco("39373E3B3A383538393A3635"),
    appId: deco("363F39373E3B3A383538393A36353F7C6A673F68366968363A66676A3E393D373D3C6B3766366A3A6B"),
    measurementId: deco("4C32473736353D575B55563D")
});


var db = firebase.firestore();
var coincidencia = false;
var txt = [];
var aTotal = [];
var newTotal = [];
var compare = false;
var docB1 = '';
var docB2 = '';
var uCA = [];
var userID = '';
const coll = 'users2';
var alertcompare = true;
var resetLogin = false;
var offline = true;


// Init components
const title = document.getElementById('title');

const refresher = document.getElementById('refresher');
const showSearch = document.getElementById('show-accounts1');
const newSearch = document.getElementById('new-s');

const buttonAdd = document.getElementById('buttonAdd');
const buttonEye = document.getElementById('buttonEye');
const iconEye = document.getElementById('iconEye');
const buttonSearch = document.getElementById('buttonSearch');
const content = document.getElementById('content');
const verB = document.getElementById('verB');



setAttributes(newSearch, { style: 'opacity:0', disabled: true });
setAttributes(buttonAdd, { style: 'opacity:1', style: 'margin-bottom:-200px' });
setAttributes(buttonEye, { style: 'opacity:0', disabled: true });
setAttributes(buttonSearch, { style: 'opacity:0', disabled: true });
setAttributes(refresher, { style: 'opacity:0', disabled: true });
title.setAttribute('style', 'margin-left:38px');

const showLogin = document.getElementById('showLogin');
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreate = document.getElementById('buttonCreate');

// PROGRESS BAR
const barProgress = document.getElementById('barProgress');
const barProgress01 = document.createElement('ion-progress-bar');
setAttributes(barProgress01, {color: 'light', style: 'height:8px'});
barProgress.setAttribute('style', 'opacity:0');
barProgress.appendChild(barProgress01);


// NAV BAR
const barMenuPrincipal = document.getElementById('barMenuPrincipal');
barMenuPrincipal.setAttribute('disabled', true);
const barHeader = document.createElement('ion-header');
const barToolbar = document.createElement('ion-toolbar');
const barTitle = document.createElement('ion-item');
const barLabel = document.createElement('ion-title');
barLabel.setAttribute('id', 'userName');

const barContent = document.createElement('ion-content');
barMenuPrincipal.appendChild(barContent);

const barIcon00 = document.createElement('ion-icon'); // ICON
barIcon00.setAttribute('button', 'click-btn');
barIcon00.setAttribute('name', 'build-outline');
barIcon00.setAttribute('slot', 'end');
barIcon00.setAttribute('id', 'barEdit');

//BLOCK 01
barTitle.appendChild(barLabel);
barTitle.appendChild(barIcon00);
barToolbar.appendChild(barTitle);
barHeader.appendChild(barToolbar);
barMenuPrincipal.appendChild(barHeader);


const showCardAll = (account, user, pass, notes) => {
    const ionCard = document.createElement('ion-card');
    ionCard.setAttribute('button', 'click-btn');
    const newHeader = document.createElement('ion-card-header');
    const newSub1 = document.createElement('ion-card-subtitle');
    const newSub2 = document.createElement('ion-card-subtitle');
    const newSub3 = document.createElement('ion-card-subtitle');
    const newSub4 = document.createElement('ion-card-subtitle');

    newSub1.textContent = account.toUpperCase();
    newSub2.textContent = 'Usuario: ' + user;
    newSub3.textContent = 'Contraseña: ' + pass;
    newSub4.textContent = 'Notas: ' + notes;

    newHeader.appendChild(newSub1);
    newHeader.appendChild(newSub2);
    newHeader.appendChild(newSub3);
    newHeader.appendChild(newSub4);
    ionCard.appendChild(newHeader);
    showSearch.appendChild(ionCard);
};
const item = (id, ico, text, color = '', show = true) => {
    const ionItem = document.createElement('ion-item');
    ionItem.textContent = text;
    ionItem.setAttribute('color', color);
    ionItem.setAttribute('button', 'click-btn');
    ionItem.setAttribute('id', id);
    const ionIco = document.createElement('ion-icon');
    ionIco.setAttribute('name', ico);
    ionIco.setAttribute('slot', 'start');
    ionItem.appendChild(ionIco);
    if (show) {
        barContent.appendChild(ionItem);
    } else {
        if (localStorage.getItem('accessTempData') == '596A787925466868747A7379GD7DGD7DGD') {
            barContent.appendChild(ionItem);
        };
    };
    id = document.getElementById(id);
}

item('barExport', 'arrow-up-circle-outline', 'Crear copia de Seguridad')
item('barImport', 'arrow-down-circle-outline', 'Cargar copia de Seguridad');
item('barLogout', 'log-out-outline', 'Cerrar Sesión');
/////////////////////////////////////////////////////////
const veri = document.createElement('ion-item-divider');
const ver = document.createElement('ion-label');
ver.setAttribute('slot', 'end');
ver.setAttribute('style', 'margin-right:10px');
ver.innerHTML = 'Versión 2.72-beta';
veri.appendChild(ver);
barContent.appendChild(veri);
/////////////////////////////////////////////////////////
item('barDelAcc', 'close-outline', 'Eliminar Cuenta', 'danger');





//DARK THEME
const checkbox = document.getElementById('checkbox');
if (localStorage.getItem('theme') == null ||
    localStorage.getItem('theme') == 'dark' ||
    localStorage.getItem('theme') == 'light' ||
    localStorage.getItem('theme') == ''
) localStorage.setItem('theme', ['light', '']);
var activeTheme = localStorage.getItem('theme').split(',');
if (activeTheme[1] == 'dark') {
    document.body.classList.toggle(activeTheme[1]);
    checkbox.checked = true;
} else {
    document.body.classList.toggle(activeTheme[0]);
};

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




// ------------------ START ------------------ //


localStorage.removeItem('alrt');

if (localStorage.getItem('L1') && localStorage.getItem('L1') != 'GDGDGDGD') {
    showLogin.innerHTML = '';
    disableItem(false);
    splitInit();
    aTotalTOnewTotal();
    document.getElementById('userName').innerHTML = deco(txt[0]);
    compare = false;


    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (!compare && doc.data().B1.includes(localStorage.getItem('accessTempData'))) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                userID = doc.id;
                compare = true;
                offline = false;
                return;
            }
        });

        if (!compare && !offline) {
            localStorage.removeItem('accessTempData')
            localStorage.setItem('L1', 'GDGDGDGD');
            window.location.reload();
        }

        if (offline) {
            localStorage.setItem('offline', '(Sin conexión)');
            document.getElementById('offline').setAttribute('style', 'opacity:1');
        } else {
            document.getElementById('offline').setAttribute('style', 'opacity:0'); //0
        };

        compare = false;

        if (docB1 != localStorage.getItem('L1') && alertcompare && !offline) {
            showSearch.innerHTML = '';
            function alertCompareData() {
                alertcompare = false
                const alert = document.createElement('ion-alert');
                // alert.setAttribute('backdrop-dismiss', 'false');
                alert.header = 'Se detectaron cambios';
                alert.message = '¿Aceptar y sincorinizar con la base de datos?';
                alert.buttons = [
                    {
                        text: 'Aceptar',
                        handler: () => {
                            updateDB('B1', 'L1');
                            splitInit();
                            aTotalTOnewTotal();
                            localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                            document.getElementById('userName').innerHTML = deco(txt[0]);
                            showLogin.innerHTML = '';
                            disableItem(false);
                            newSearch.value = '';
                            refreshData();
                            presentToast('Base de datos sincronizada.', '1000', 'dark');
                            setTimeout(() => { window.location.reload() }, 1000);
                        },
                    },
                    {
                        text: 'Rechazar',
                        handler: () => {
                            splitInit();
                            aTotalTOnewTotal();
                            localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                            document.getElementById('userName').innerHTML = deco(txt[0]);
                            showLogin.innerHTML = '';
                            disableItem(false);
                            updateDB('L1', 'B1')
                            newSearch.value = '';
                            refreshData();
                            presentToast('Cancelando cambios.', '1000', 'dark');
                            setTimeout(() => { window.location.reload() }, 1000);
                        },
                    },
                    {
                        text: 'Mas..',
                        handler: () => {
                            var txtTemp = [];
                            var aTotalTemp = [];
                            var newa = [];
                            var metaObjAdd = [];
                            var metaObjDel = [];

                            txtTemp = docB1.split('GD');
                            aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
                            aTotalTemp.splice(-1, 1);
                            aTotalTemp = aTotalTemp.concat(aTotal);
                            aTotalTemp.sort();

                            for (i = 0; i < aTotalTemp.length; i++) {
                                (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
                            };

                            for (i = 0; i < newa.length; i++) {
                                const newaName = newa[i].split('OG');
                                var myObj = { type: 'checkbox', label: deco(newaName[0]).toUpperCase(), value: newa[i], checked: true };
                                // console.log(newa[i]);
                                (txtTemp[3].includes(newa[i])) ? metaObjAdd.push(myObj) : metaObjDel.push(myObj);
                            }

                            console.log(metaObjAdd);
                            console.log(metaObjDel);

                            if (metaObjAdd.length != '') {
                                presentAlertCheckboxAdd(metaObjAdd, metaObjDel);
                            } else {
                                presentAlertCheckboxDel(metaObjDel);
                            };
                        },
                    },
                    {
                        text: localStorage.getItem('offline'),
                        handler: () => {
                            if (localStorage.getItem('offline') != '') {
                                localStorage.setItem('offline', '');
                                splitInit();
                                aTotalTOnewTotal();
                                localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                                document.getElementById('userName').innerHTML = deco(txt[0]);
                                showLogin.innerHTML = '';
                                disableItem(false);
                                updateDB('L1', 'B1')
                                newSearch.value = '';
                                refreshData();
                                presentToast('Sincronizando datos.', '1000', 'dark');
                                setTimeout(() => { window.location.reload() }, 1000);
                            };
                        },
                    },
                ];
                document.body.appendChild(alert);
                return alert.present();
            }
            alertCompareData();
        }
    })


} else {
    localStorage.setItem('L1', 'GDGDGDGD');
};

function presentAlertCheckboxAdd(metaObjAdd, metaObjDel) {
    // console.log(metaObjAdd);
    // console.log(metaObjDel);

    const alert = document.createElement('ion-alert');
    alert.subHeader = 'Cuentas agregadas';
    alert.message = 'Seleccione para confirmar';
    alert.inputs = metaObjAdd;
    alert.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        {
            text: 'Terminar',
            handler: (data) => {
                aTotal = aTotal.concat(data);
                alertcompare = true;
                if (metaObjDel.length != '') {
                    presentAlertCheckboxDel(metaObjDel);
                    metaObjDel = [];
                } else {
                    console.log('No hay datos borrados');
                    aTotalTOnewTotal();
                    save();
                    updateDB('L1', 'B1');
                    alertcompare = false;
                    window.location.reload();
                };
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}

function presentAlertCheckboxDel(metaObjDel) {
    // console.log(metaObjDel);
    if (metaObjDel.length != '') {
        const alert = document.createElement('ion-alert');
        alert.header = 'Cuentas eliminadas';
        alert.message = 'Seleccionar para confirmar';
        alert.inputs = metaObjDel;
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Terminar',
                handler: (data2) => {
                    aTotal = aTotal.concat(data2);
                    aTotal.sort();
                    newa = [];
                    for (i = 0; i < aTotal.length; i++) {
                        (aTotal[i] == aTotal[i + 1]) ? i++ : newa.push(aTotal[i]);
                    };
                    aTotal = newa;
                    aTotalTOnewTotal();
                    save();
                    updateDB('L1', 'B1');
                    alertcompare = false;

                    window.location.reload();
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
};

// welcome();
if (!txt[3] && showLogin.innerHTML == '') {
    showSearch.innerHTML = `
    <div style="text-align:center"><br>Hola! No hay datos guardados. </div>
    <div style="text-align:center"><br> Aquí hay unos ejemplos de lo que se puede hacer. </div>
    <div style="text-align:center">⬇</div>
    `;
    showCardAll('facebook', 'prueba@hotmail.com', '1234abcd', 'Las notas son opcionales 😎');
    showCardAll('google 👍', 'tucuenta@gmail.com', 'prueba1234', '');
};



// ********************************* BUTTONS *********************************

var statSearchBar = false;
setAttributes(newSearch, { style: 'opacity:1', style: 'margin-top:-60px', disabled: false });
buttonSearch.addEventListener('click', () => {
    if (!statSearchBar) {
        newSearch.value = '';
        newSearch.setAttribute('style', 'margin-top:0px');
        statSearchBar = true;
    } else {
        newSearch.setAttribute('style', 'margin-top:-60px');
        statSearchBar = false;
    }

})


barDelAcc.addEventListener('click', () => {
    document.getElementById('barMenuPrincipal').close();

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

newSearch.addEventListener('ionInput', () => { refreshData() });


refresher.addEventListener('ionRefresh', () => {
    setTimeout(() => {
        window.location.reload();
        refresher.complete();
    }, 150);
});



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
const nameLog = document.getElementById('nameLog');
const passLog = document.getElementById('passLog');
const eyePass = document.getElementById('eyePass');
if (eyePass) {
    eyePass.addEventListener('click', () => {
        if (eyePass.name == 'eye-off') {
            eyePass.name = 'eye';
            passLog.setAttribute('type', 'text');
        } else {
            eyePass.name = 'eye-off';
            passLog.setAttribute('type', 'password');
        }
    })
}

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

            // async function presentToastC(msg) {
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
                                const toRemplace = i / 5;
                                const alert = document.createElement('ion-alert');
                                alert.setAttribute('backdrop-dismiss', 'false');
                                alert.header = 'Editar cuenta';
                                alert.inputs = [
                                    { name: 'name1', placeholder: 'Cuenta', value: newTotal[i] },
                                    { name: 'name2', placeholder: 'Usuario', value: newTotal[i + 1] },
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
                        },
                    },
                    {
                        icon: 'trash',
                        handler: () => {
                            function alertDel() {
                                const alert = document.createElement('ion-alert');
                                alert.message = `¿Eliminar ${msg}?`;
                                alert.buttons = [
                                    { text: 'cancelar', role: 'cancel' },
                                    {
                                        text: 'ok',
                                        handler: () => {
                                            aTotal.splice(i / 5, 1);
                                            aTotalTOnewTotal();
                                            save();
                                            refreshData();
                                            presentToast(`"${msg}" eliminado.`, 500, 'danger');
                                            updateDB('L1', 'B1');
                                            if (showSearch.value == '') newSearch.value = '';
                                        },
                                    },
                                ];
                                document.body.appendChild(alert);
                                return alert.present();
                            }
                            alertDel();
                        },
                    },
                ];
                document.body.appendChild(toast);
                return toast.present();
            }
            presentToastC(cuPath[0]);
            return;
        }
    }
});

buttonAdd.addEventListener('click', () => {
    function presentAlertAdd() {
        const alert = document.createElement('ion-alert');
        alert.setAttribute('backdrop-dismiss', 'false');
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            { name: 'name1a', placeholder: 'Cuenta(Nombre)', value: '' },
            { name: 'name2a', placeholder: 'Usuario', value: '' },
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

barEdit.addEventListener('click', () => {
    document.getElementById('barMenuPrincipal').close();
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
    document.getElementById('barMenuPrincipal').close();
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
                    // presentToast('Copia de seguridad cargada.', 800, 'success');
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
    document.getElementById('barMenuPrincipal').close();
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
    document.getElementById('barMenuPrincipal').close();
    localStorage.removeItem('L1');
    localStorage.removeItem('theme');
    localStorage.removeItem('accessTempData');
    window.location.reload();
});

buttonEye.addEventListener('click', () => {
    if (iconEye.getAttribute('name') == 'eye-outline') { 
        newSearch.value = '*';
        newSearch.setAttribute('style', 'margin-top:-60px');
    } else { 
        newSearch.value = '';
    };
    refreshData();
    // newSearch.value = '';
});

//######################## FUNCIONES ########################

function setAttributes(elem, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            elem[prop] = obj[prop];
        }
    }
}

function delete_spaces(v1) {
    v1 = v1.split("");
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] == " ") {
            v1.shift();
            i--;
        } else {
            while (true) {
                if (v1[v1.length - 1] == " ") {
                    v1.pop();
                } else { break; }
            }
            v1 = v1.join("");
            while (v1.includes("  ")) {
                v1 = v1.split("  ");
                v1 = v1.join(" ");
            }
            break;
        }
    }
    return v1;
};

function disableItem(boolean) {
    verB.setAttribute('style', 'margin-top: 100vh;')
    barMenuPrincipal.setAttribute('disabled', boolean);
    title.setAttribute('style', 'margin-left:0px');
    setAttributes(buttonAdd, { style: 'opacity:1', style: 'margin-bottom:0px' });
    setAttributes(buttonEye, { style: 'opacity:1', disabled: boolean });
    setAttributes(buttonSearch, { style: 'opacity:1', disabled: boolean });
    setAttributes(refresher, { style: 'opacity:1', disabled: boolean });
    content.setAttribute('style', '--background: #ffffff00');
    if (!boolean) document.body.style.backgroundColor = "var(--ion-background-color)";
}

function barProgressF(color, state) {
    setAttributes(barProgress01, { color: color, type: state, value: '100' });
    if (color == 'light' && state == 'determinate') {
        barProgress.setAttribute('style', 'opacity:0');
    } else {
        barProgress.setAttribute('style', 'opacity:1');
    }
};

function refreshData() {
    if (newSearch.value) {
        iconEye.setAttribute('name', 'eye-off-outline')
        setAttributes(buttonAdd, { horizontal: 'end', style: 'margin-right:-3px' })
    } else {
        iconEye.setAttribute('name', 'eye-outline')
        setAttributes(buttonAdd, { horizontal: 'center', style: 'margin-right:0px' })
    }

    aTotal.sort();
    showSearch.innerHTML = '';
    var contador = 0;
    for (i = 0; i < newTotal.length; i += 5) {
        if (newSearch.value === '*') {
            showCardAll(
                newTotal[i].toUpperCase(),
                newTotal[i + 1],
                newTotal[i + 2],
                newTotal[i + 3]
            );
            contador++;
        } else if (newTotal[i].includes(newSearch.value.toLowerCase())) {
            showCardAll(
                newTotal[i].toUpperCase(),
                newTotal[i + 1],
                newTotal[i + 2],
                newTotal[i + 3]
            );
            contador++;
        }
    }
    newSearch.value === '' ? (showSearch.innerHTML = '') : contador == 1 ? (s = '') : (s = 's');
    if (newSearch.value != '')
        presentToast(`${contador} resultado${s} encontrado${s}`, '500', 'dark');
}

function alertMsg(msg1, msg2) {
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    document.body.appendChild(alert);
    return alert.present();
}

function alertMsgReset(msg1, msg2) {
    alerta = false
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    alert.buttons = [{ role: 'cancel', handler: () => { window.location.reload() } }];
    document.body.appendChild(alert);
    return alert.present();
}

function presentToast(msg, time, color) {
    const toast = document.createElement('ion-toast');
    toast.setAttribute('color', color);
    toast.message = msg;
    toast.duration = time;
    document.body.appendChild(toast);
    return toast.present();
}

function downloadFile(data, fileName, type = 'text/plain') {
    var data2 = new Blob([data], { type: 'text/plain' });
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([data2], { type }));
    a.setAttribute('download', fileName);
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

function code(cod) {
    let hexCod = '';
    let hexF = '';
    for (let i = 0; i < cod.length; i++) {
        hexCod = '' + cod.codePointAt(i).toString(16); //codifica
        if (hexCod.length == 2) {
            hexCod = (parseInt(hexCod, 16) + parseInt('05', 16)).toString(16).toUpperCase();
            hexF += '' + hexCod;
        } else {
            if (hexCod.length == 5) {
                hexF += '' + ("0x" + hexCod);
                i++
            }
            if (hexCod.length == 4) {
                hexF += '' + ("0x" + hexCod + 'Z');
            }
        }
    }
    return hexF;
}

function deco(dec) {
    let hexDec = dec;
    let str = '';
    for (let n = 0; n < hexDec.length; n += 2) {
        let tt = hexDec.substr(n, 2)
        if (tt == '0x') {
            n += 2
            let strCut = hexDec.substr(n, 5).split('');
            if (strCut[strCut.length - 1] == 'Z') {
                str += String.fromCodePoint(parseInt(hexDec.substr(n, 4), 16));
            } else {
                str += String.fromCodePoint(parseInt(hexDec.substr(n, 5), 16));
            }
            n += 3
        } else {
            str += String.fromCharCode(parseInt(hexDec.substr(n, 2), 16) - 5);
        };
    }
    return str;
}

function fecha() { //var/let
    let today = new Date();
    let DD = String(today.getDate()).padStart(2, '0');
    let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let YYYY = today.getFullYear();
    let hh = today.getHours();
    if (hh < 10) hh = '0' + hh;
    let mm = today.getMinutes();
    if (mm < 10) mm = '0' + mm;
    today = DD + '-' + MM + '-' + (YYYY - 2000) + '-' + hh + mm;
    return today;
}

function splitInit() {
    txt = localStorage.getItem('L1').split('GD');
    txt[3] == undefined ? (txt2 = txt.unshift('')) : null;
    aTotal = txt[3].split(txt[3].includes('Q0') ? 'Q0' : 'BO');
    aTotal.splice(-1, 1);
}

function aTotalTOnewTotal() {
    aTotal.sort();
    newTotal = [];
    for (b = 0; b < aTotal.length; b++) {
        const final = aTotal[b].split('OG');
        for (n = 0; n < final.length; n++) {
            (n % 4 == 0) ? newTotal.push(deco(final[n]).toLowerCase()) : newTotal.push(deco(final[n]));
            if (n == 3) newTotal.push('oo');
        }
    }
}

function updateDB(send, receive) {
    if (send == 'B1') localStorage.setItem(receive, docB1);
    if (send == 'B2') localStorage.setItem(receive, docB2);
    if (receive == 'B1') {
        return db.collection(coll).doc(userID).update({
            B1: localStorage.getItem(send),
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000, 'danger');
                console.error('Error updating document: ', error);
                return;
            });
    }

    if (receive == 'B2') {
        return db.collection(coll).doc(userID).update({
            B2: localStorage.getItem(send),
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000, 'danger');
                console.error('Error updating document: ', error);
                return;
            });
    }
}

function save() {
    if (aTotal.length > 0) {
        localStorage.setItem('L1', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD' + aTotal.join('Q0') + 'Q0');
    } else {
        localStorage.setItem('L1', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
    }
}

function sendEmail() {
    coincidencia = false
    restoreKey = Math.floor(Math.random() * 999999) + 10000;

    const alert = document.createElement('ion-alert');
    alert.header = 'Recuperar contraseña';
    alert.inputs = [
        { type: 'email', name: 'restorePass', placeholder: 'Email' },
    ];
    alert.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        {
            text: 'Ok',
            handler: usData => {
                if (usData.restorePass == '') {
                    alertMsg('Error', 'Debe insertar datos.');
                    return;
                }

                barProgressF('success', 'indeterminate');

                db.collection(coll).onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!coincidencia) {
                            userID = doc.id;
                            userEmail = doc.data().B1.split('GD');
                            if (userEmail[1] == code(usData.restorePass)) {
                                coincidencia = true;
                                db.collection(coll).doc(userID).update({
                                    B3: restoreKey,
                                })
                                    .then(function () {
                                        presentToast('Mail enviado', 1000, 'success');
                                        barProgressF('light', 'determinate');
                                        setTimeout(() => { window.location.reload(); }, 1000);
                                    });


                                Email.send({
                                    Host: "smtp.gmail.com",
                                    Username: "restore.pass.helena@gmail.com",
                                    Password: "restaurar1234",
                                    To: usData.restorePass,
                                    From: "restore.pass.helena@gmail.com",
                                    Subject: "Restaurar contraseña",
                                    Body:
                                        `
                                        <h2>Nueva contraseña temporal:</h2>
                                        <h1>${restoreKey}</h1><h4>(Válida por única vez)</h1>
                                    `,
                                })

                            };
                        };
                    });
                    if (!coincidencia) {
                        barProgressF('light', 'determinated');
                        alertMsg('Error', 'Esta cuenta no está registrada');
                    };
                });
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}



//************************ END ************************
// EXTRA (long tap)

!(function (e, t) {
    'use strict';
    var n = null,
        a =
            'ontouchstart' in e ||
            navigator.MaxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0,
        i = a ? 'touchstart' : 'mousedown',
        o = a ? 'touchend' : 'mouseup',
        m = a ? 'touchmove' : 'mousemove',
        u = 0,
        r = 0,
        s = 10,
        c = 10;
    function l(i) {
        v(i);
        var m = i.target,
            u = parseInt(m.getAttribute('data-long-press-delay') || '1000', 10);
        n = (function (t, n) {
            if (
                !(
                    e.requestAnimationFrame ||
                    e.webkitRequestAnimationFrame ||
                    (e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame) ||
                    e.oRequestAnimationFrame ||
                    e.msRequestAnimationFrame
                )
            )
                return e.setTimeout(t, n);
            var a = new Date().getTime(),
                i = {},
                o = function () {
                    new Date().getTime() - a >= n
                        ? t.call()
                        : (i.value = requestAnimFrame(o));
                };
            return (i.value = requestAnimFrame(o)), i;
        })(
            function (e) {
                v();
                var n = a ? e.touches[0].clientX : e.clientX,
                    i = a ? e.touches[0].clientY : e.clientY;
                this.dispatchEvent(
                    new CustomEvent('long-press', {
                        bubbles: !0,
                        cancelable: !0,
                        detail: { clientX: n, clientY: i },
                    })
                ) &&
                    t.addEventListener(
                        o,
                        function e(n) {
                            t.removeEventListener(o, e, !0),
                                (function (e) {
                                    e.stopImmediatePropagation(),
                                        e.preventDefault(),
                                        e.stopPropagation();
                                })(n);
                        },
                        !0
                    );
            }.bind(m, i),
            u
        );
    }
    function v(t) {
        var a;
        (a = n) &&
            (e.cancelAnimationFrame
                ? e.cancelAnimationFrame(a.value)
                : e.webkitCancelAnimationFrame
                    ? e.webkitCancelAnimationFrame(a.value)
                    : e.webkitCancelRequestAnimationFrame
                        ? e.webkitCancelRequestAnimationFrame(a.value)
                        : e.mozCancelRequestAnimationFrame
                            ? e.mozCancelRequestAnimationFrame(a.value)
                            : e.oCancelRequestAnimationFrame
                                ? e.oCancelRequestAnimationFrame(a.value)
                                : e.msCancelRequestAnimationFrame
                                    ? e.msCancelRequestAnimationFrame(a.value)
                                    : clearTimeout(a)),
            (n = null);
    }
    'function' != typeof e.CustomEvent &&
        ((e.CustomEvent = function (e, n) {
            n = n || { bubbles: !1, cancelable: !1, detail: void 0 };
            var a = t.createEvent('CustomEvent');
            return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a;
        }),
            (e.CustomEvent.prototype = e.Event.prototype)),
        (e.requestAnimFrame =
            e.requestAnimationFrame ||
            e.webkitRequestAnimationFrame ||
            e.mozRequestAnimationFrame ||
            e.oRequestAnimationFrame ||
            e.msRequestAnimationFrame ||
            function (t) {
                e.setTimeout(t, 1e3 / 60);
            }),
        t.addEventListener(o, v, !0),
        t.addEventListener(
            m,
            function (e) {
                var t = Math.abs(u - e.clientX),
                    n = Math.abs(r - e.clientY);
                (t >= s || n >= c) && v();
            },
            !0
        ),
        t.addEventListener('wheel', v, !0),
        t.addEventListener('scroll', v, !0),
        t.addEventListener(
            i,
            function (e) {
                (u = e.clientX), (r = e.clientY), l(e);
            },
            !0
        );
})(window, document);
