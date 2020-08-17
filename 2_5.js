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
var docB1 = '';
var docB2 = '';
var alerta = false;
var uCA = [];
var userID = '';
const coll = 'users2';


// Init components
const refresher = document.getElementById('refresher');
const titleName = document.getElementById('titleName');
const showSearch = document.getElementById('show-accounts1');
const newSearch = document.getElementById('new-s');
const sizeSearch = document.getElementById('sizeSearch'); // NUEVO
const buttonAdd = document.getElementById('buttonAdd');
const buttonAdd2 = document.getElementById('buttonAdd2');
const buttonEye = document.getElementById('buttonEye');
const iconEye = document.getElementById('iconEye');

// buttonAdd2.setAttribute('disabled', true);

titleName.setAttribute('disabled', true);
newSearch.setAttribute('disabled', true);
buttonAdd.setAttribute('disabled', true);
buttonEye.setAttribute('disabled', true);
refresher.setAttribute('disabled', true);

const showLogin = document.getElementById('showLogin');
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreate = document.getElementById('buttonCreate');

// NAV BAR
const barMenuPrincipal = document.getElementById('barMenuPrincipal');
barMenuPrincipal.setAttribute('disabled', true);
const barHeader = document.createElement('ion-header');
const barToolbar = document.createElement('ion-toolbar');
const barTitle = document.createElement('ion-item');
const barLabel = document.createElement('ion-title');
barLabel.textContent = 'Configuración';

const barContent = document.createElement('ion-content');

/*
const aa = document.createElement('ion-label');
aa.textContent = 'test'
barMenuPrincipal.appendChild(aa);
*/

barMenuPrincipal.appendChild(barContent);

const barIcon00 = document.createElement('ion-icon'); // ICON
barIcon00.setAttribute('button', 'click-btn');
barIcon00.setAttribute('name', 'person-circle');
barIcon00.setAttribute('slot', 'end');
barIcon00.setAttribute('id', 'barEdit');
barIcon00.setAttribute('size', 'large');

//BLOCK 01
barTitle.appendChild(barLabel);
barTitle.appendChild(barIcon00);
barToolbar.appendChild(barTitle);
barHeader.appendChild(barToolbar);
barMenuPrincipal.appendChild(barHeader);

// ITEM
const barItem01 = document.createElement('ion-item');
barItem01.textContent = 'Cargar copia de seguridad'; //IMPORTAR
barItem01.setAttribute('button', 'click-btn');
barItem01.setAttribute('id', 'barImport');
const barIcon01 = document.createElement('ion-icon');
barIcon01.setAttribute('name', 'arrow-down-circle-outline');
barIcon01.setAttribute('slot', 'start');
barItem01.appendChild(barIcon01);

// ITEM
const barItem02 = document.createElement('ion-item');
barItem02.textContent = 'Crear copia de seguridad'; //EXPORTAR
barItem02.setAttribute('button', 'click-btn');
barItem02.setAttribute('id', 'barExport');
const barIcon02 = document.createElement('ion-icon');
barIcon02.setAttribute('name', 'arrow-up-circle-outline');
barIcon02.setAttribute('slot', 'start');
barItem02.appendChild(barIcon02);

// ITEM
const barItem03 = document.createElement('ion-item');
barItem03.textContent = 'Cerrar Sesión';
barItem03.setAttribute('button', 'click-btn');
barItem03.setAttribute('id', 'barLogout');
const barIcon03 = document.createElement('ion-icon');
barIcon03.setAttribute('name', 'log-out-outline');
barIcon03.setAttribute('slot', 'start');
barItem03.appendChild(barIcon03);


const veri = document.createElement('ion-item-divider');
veri.setAttribute('lines', 'none');
veri.setAttribute('style', 'padding-bottom:1000px');
const ver = document.createElement('ion-label');
ver.setAttribute('slot', 'end');
ver.innerHTML = 'Versión: 2.5.20816.beta';
veri.appendChild(ver);


//BLOCK02
//barContent.appendChild(ver);
barContent.appendChild(barItem01);
barContent.appendChild(barItem02);
barContent.appendChild(barItem03);
barContent.appendChild(veri);

//BUTTONS NAV BAR
const barEdit = document.getElementById('barEdit');
const barImport = document.getElementById('barImport');
const barExport = document.getElementById('barExport');
const barLogout = document.getElementById('barLogout');

const showCardAll = (account, user, pass, notes) => {
    // OK
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

// ------------------ START ------------------ //

//db.collection(coll).onSnapshot(querySnapshot => {querySnapshot.forEach(() => {})});

localStorage.setItem('L1', 'GDGDGDGD');

localStorage.getItem('L2') ? localStorage.setItem('L1', localStorage.getItem('L2')) : localStorage.setItem('L2', '');


//existen datos locales
if (localStorage.getItem('L2')) {
    showLogin.innerHTML = '';
    disableItem(false);
    splitInit();
    aTotalTOnewTotal();
    document.getElementById('userName').innerHTML = deco(txt[0]);


    // OP2 comprobación de local con base de datos
    var compare = false;
    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (!compare) {

                if (doc.data().B1.includes(localStorage.getItem('accessTempData'))) {

                    docB1 = doc.data().B1;
                    docB2 = doc.data().B2;
                    userID = doc.id;
                    compare = true;
                    return;
                }
            };
        });

        if (!compare) {
            localStorage.clear();
            window.location.reload();
        }
        compare = false;

        if (docB1 != localStorage.getItem('L2')) {
            function alertCompareData() {
                const alert = document.createElement('ion-alert');
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
                            updateDB('L1', 'L2');
                            newSearch.value = '';
                            refreshData();
                            presentToast('Base de datos sincronizada', '1000');
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
                            updateDB('L2', 'B1');
                            newSearch.value = '';
                            refreshData();
                            presentToast('Usando memoria local', '1000');
                        },
                    },
                    {
                        text: 'Mas..',
                        handler: () => {
                            console.log('aTotal:' + aTotal);

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
                                (txtTemp[3].includes(newa[i])) ? metaObjAdd.push(myObj) : metaObjDel.push(myObj);
                            }

                            if (metaObjAdd.length != '') {
                                function presentAlertCheckboxAdd() {
                                    const alert = document.createElement('ion-alert');
                                    alert.subHeader = 'Nuevas cuentas';
                                    alert.message = 'Seleccionar para agregar';
                                    alert.inputs = metaObjAdd;
                                    alert.buttons = [
                                        { text: 'Cancel', role: 'cancel' },
                                        {
                                            text: 'Terminar',
                                            handler: (data) => {
                                                aTotal = aTotal.concat(data);

                                                if (metaObjDel.length != '') {
                                                    function presentAlertCheckboxDel() {
                                                        const alert = document.createElement('ion-alert');
                                                        alert.header = 'Cuentas eliminadas';
                                                        alert.message = 'Seleccionar para eliminar';
                                                        alert.inputs = metaObjDel;
                                                        alert.buttons = [
                                                            { text: 'Cancel', role: 'cancel' },
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
                                                                    updateDB('L1', 'L2');
                                                                },
                                                            },
                                                        ];
                                                        document.body.appendChild(alert);
                                                        return alert.present();
                                                    }
                                                    presentAlertCheckboxDel();
                                                } else {
                                                    console.log('No hay datos borrados');
                                                    aTotalTOnewTotal();
                                                    save();
                                                    updateDB('L1', 'B1');
                                                    updateDB('L1', 'L2');
                                                };

                                            },
                                        },
                                    ];

                                    document.body.appendChild(alert);
                                    return alert.present();
                                }
                                presentAlertCheckboxAdd();
                            } else {
                                function presentAlertCheckboxDel() {
                                    const alert = document.createElement('ion-alert');
                                    alert.header = 'Cuentas eliminadas';
                                    alert.message = 'Seleccionar para eliminar';
                                    alert.inputs = metaObjDel;
                                    alert.buttons = [
                                        { text: 'Cancel', role: 'cancel' },
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
                                                updateDB('L1', 'L2');
                                            },
                                        },
                                    ];
                                    document.body.appendChild(alert);
                                    return alert.present();
                                }
                                presentAlertCheckboxDel();
                            };
                        },
                    },
                ];
                document.body.appendChild(alert);
                return alert.present();
            }
            alertCompareData();
        } else {
            // console.log('Son iguales');
        }
    });
}
// ------------------ START ------------------ //

//######################## BOTONES ########################

newSearch.addEventListener('ionInput', () => { refreshData() });

refresher.addEventListener('ionRefresh', () => {
    setTimeout(() => {
        window.location.reload();
        refresher.complete();
    }, 150);
});

buttonLogin.addEventListener('click', () => {
    function presentAlertLogin() {
        //var accessTempData = [];
        const alert = document.createElement('ion-alert');
        alert.header = 'Iniciar sesión';
        alert.inputs = [
            { name: 'userEditUser', placeholder: 'Email' },
            { name: 'userEditPass', placeholder: 'Contraseña', type: 'password' },
        ];
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Ok',
                handler: usData => {
                    if (usData.userEditUser == '' || usData.userEditPass == '') {
                        alertMsg('Error', 'Datos incorrectos o vacíos.');
                        return;
                    }


                    enableItem = true;
                    localStorage.setItem('accessTempData', code(usData.userEditUser) + 'GD' + code(usData.userEditPass) + 'GD');

                    db.collection(coll).onSnapshot(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            if (!coincidencia) {
                                docB1 = doc.data().B1;
                                docB2 = doc.data().B2;

                                userID = doc.id;
                                uRA = doc.data().B1.split('GD'); //userRestoreAccess

                                if (docB1.includes(localStorage.getItem('accessTempData'))) {

                                    coincidencia = true;
                                    updateDB('B1', 'L1');
                                    updateDB('L1', 'L2');
                                    splitInit();
                                    aTotalTOnewTotal();

                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                    disableItem(false);
                                    return;
                                };

                                // restablecer contraseña
                                if (code(usData.userEditUser) == uRA[1] && usData.userEditPass == doc.data().B3) {
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
                                                    // save();
                                                    updateDB('L1', 'B1');
                                                    updateDB('L1', 'L2');
                                                    // updateDB('L1', 'B2');

                                                    splitInit();
                                                    aTotalTOnewTotal();
                                                    console.log('txt: ' + txt);
                                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                                    disableItem(false);

                                                    // Remove the field from the document
                                                    return db.collection(coll).doc(userID).update({
                                                        B3: firebase.firestore.FieldValue.delete()
                                                    });

                                                    // return;
                                                },
                                            },
                                        ];
                                        document.body.appendChild(alert);
                                        return alert.present();
                                    }
                                    presentRestorePass();

                                    // LOGIN RESTORE
                                    coincidencia = true;
                                }

                            };
                        });
                        if (coincidencia) {
                            showLogin.innerHTML = ''
                        } else {
                            alertMsg('Error', 'Datos incorrectos o vacíos.');
                        };
                    });
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertLogin();
});

buttonCreate.addEventListener('click', () => {

    function presentAlertCreate() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Registrarse';
        alert.inputs = [
            { name: 'userEditName', placeholder: 'Nombre' },
            { name: 'userEditUser', placeholder: 'Email' },
            { name: 'userEditPass', placeholder: 'Contraseña', type: 'password' },
        ];
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Ok',
                handler: usCData => {
                    if (usCData.userEditName == '' || usCData.userEditUser == '' || usCData.userEditPass == '') {
                        alertMsg('Error', 'Datos incorrectos o vacíos.');
                        return;
                    }

                    localStorage.setItem('accessTempData', code(usCData.userEditName) + 'GD' + code(usCData.userEditUser) + 'GD' + code(usCData.userEditPass) + 'GD');
                    console.log('Datos ingresados: ' + localStorage.getItem('accessTempData'));


                    db.collection(coll).onSnapshot(querySnapshot => {
                        
                        // querySnapshot.forEach(doc => {
                        //     console.log('check #3');
                        //     console.log('coincidencia: '+coincidencia);
                        //     if (!coincidencia) {
                        //         console.log('check #4');
                        //         uCA = doc.data().B1.split('GD');
                        //         if (doc.data().B1.includes(localStorage.getItem('accessTempData')) || uCA[1] == code(usCData.userEditUser)) {
                        //             console.log('check #5');
                        //             docB1 = doc.data().B1;
                        //             docB2 = doc.data().B2;
                        //             userID = doc.id;
                        //             console.log('Una coincidencia en: ' + userID);
                        //             coincidencia = true;
                        //             // window.location.reload();
                        //             // localStorage.removeItem('accessTempData');
                        //             alertMsgReset('Error', 'Ya hay una cuenta registrada con este email. (error.' + userID + ')');
                        //             return;
                        //         };

                        //     };
                        // });
                        // db.collection(coll).onSnapshot(querySnapshot.forEach(doc => {
                        console.log('INICINDO');


                        // });
                        if (!coincidencia) {
                            querySnapshot.forEach(doc => {
                                // console.log('check #1');

                                uCA = doc.data().B1.split('GD');

                                if (!coincidencia && uCA[1] == code(usCData.userEditUser)) {
                                    coincidencia = true;
                                    alerta = true

                                    docB1 = doc.data().B1;
                                    docB2 = doc.data().B2;
                                    userID = doc.id;
                                    console.log('Una coincidencia en: ' + userID);
                                    console.log('coincidencia: ' + coincidencia);
                                    return
                                };
                                if (!coincidencia) {
                                    console.log('Check #1 : NO');
                                    // break;
                                }
                            });
                        };

                        console.log('check END');
                        console.log('coincidencia: ' + coincidencia);

                        if (coincidencia == true && alerta == true) {
                            // alerta = false
                            console.log('alerta');
                            // console.log('Una coincidencia en: ' + userID);
                            // alertMsgReset('Error', 'Ya hay una cuenta registrada con este email. (error.' + userID + ')');
                            return

                        } else {
                            // alerta = false
                            console.log('crear');
                            // db.collection(coll).add({
                            //     B1: localStorage.getItem('accessTempData'),
                            //     B2: '',
                            // })
                            //     .then(function () {

                            //         console.log('check #8');
                            //         // .then(function(docRef){
                            //         console.log('Datos Agregados: ' + localStorage.getItem('accessTempData'));
                            //         updateDB('B1', 'L1');
                            //         showLogin.innerHTML = '';
                            //         splitInit();
                            //         aTotalTOnewTotal();
                            //         document.getElementById('userName').innerHTML = deco(txt[0]);
                            //         updateDB('L1', 'L2');
                            //         disableItem(false);
                                    
                            //         //window.location.reload();
                            //         return;
                            //     })
                            //     .catch(function (error) {
                            //         console.log('check #6');
                            //         console.error('Error adding document: ', error);
                            //         return;
                            //     });

                            return
                        };

                        // if (!coincidencia) {
                        //     console.log('check #5');
                        //     console.log('coincidencia: ' + coincidencia);
                        //     db.collection(coll).add({
                        //         B1: localStorage.getItem('accessTempData'),
                        //         B2: '',
                        //     })
                        //         .then(function () {

                        //             console.log('check #8');
                        //             // .then(function(docRef){
                        //             console.log('Datos Agregados: ' + localStorage.getItem('accessTempData'));
                        //             updateDB('B1', 'L1');
                        //             showLogin.innerHTML = '';
                        //             splitInit();
                        //             aTotalTOnewTotal();
                        //             document.getElementById('userName').innerHTML = deco(txt[0]);
                        //             updateDB('L1', 'L2');
                        //             disableItem(false);
                        //             //window.location.reload();
                        //             return;
                        //         })
                        //         .catch(function (error) {
                        //             console.log('check #6');
                        //             console.error('Error adding document: ', error);
                        //             return;
                        //         });
                        // } else {
                        //     console.log('Una coincidencia en: ' + userID);
                        //     console.log(size1);
                        //     alertMsgReset('Error', 'Ya hay una cuenta registrada con este email. (error.' + userID + ')');
                        // };

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


showSearch.addEventListener('long-press', e => { // MANIPULATE CARDS (EDIT - DELETE) // OK OK

    e.preventDefault();

    // console.log(e.path);

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
            async function presentToastC(msg) {
                const toast = document.createElement('ion-toast');
                toast.message = msg;
                //toast.animated = true;
                toast.duration = 1250;
                toast.buttons = [
                    {
                        icon: 'pencil',
                        handler: () => {
                            function alertEdit() {
                                const toRemplace = i / 5;
                                const alert = document.createElement('ion-alert');
                                alert.header = 'Editar cuenta';
                                alert.inputs = [
                                    //id: 'name1-id'
                                    { name: 'name1', placeholder: 'Cuenta', value: newTotal[i] },
                                    { name: 'name2', placeholder: 'Usuario', value: newTotal[i + 1] },
                                    { name: 'name3', placeholder: 'Contraseña', value: newTotal[i + 2] },
                                    { name: 'name4', placeholder: 'Notas(Opcional)', value: newTotal[i + 3] },
                                ];
                                alert.buttons = [
                                    { text: 'Cancel', role: 'cancel' },
                                    {
                                        text: 'Ok',
                                        handler: newData => {
                                            if (newData.name1 == '' || newData.name2 == '' || newData.name3 == '') {
                                                alertMsg('Error', 'Datos incorrectos o vacíos.');
                                                return;
                                            }

                                            for (i = 0; i < newTotal.length; i += 5) {
                                                // console.log(newTotal);
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

                                            aTotal.splice(toRemplace, 1,
                                                code(newData.name1) +
                                                'OG' +
                                                code(newData.name2) +
                                                'OG' +
                                                code(newData.name3) +
                                                'OG' +
                                                code(newData.name4)
                                            );
                                            aTotalTOnewTotal();
                                            refreshData();
                                            presentToast(`Editado ${msg}`, 500);
                                            save();
                                            updateDB('L1', 'B1');
                                            updateDB('L1', 'L2');
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
                                            refreshData();
                                            presentToast(`Borrando ${msg}`, 500);
                                            save();
                                            updateDB('L1', 'B1');
                                            updateDB('L1', 'L2');
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
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            // id: 'name1a-id'
            { name: 'name1a', placeholder: 'Cuenta(Nombre)', value: '', type: 'email' },
            { name: 'name2a', placeholder: 'Usuario', value: '' },
            { name: 'name3a', placeholder: 'Contraseña', value: '' },
            { name: 'name4a', placeholder: 'Notas(Opcional)', value: '', type: 'url' },
        ];
        alert.buttons = [
            { text: 'Cancel', role: 'cancel' },
            {
                text: 'Ok',
                handler: newData2 => {
                    if (newData2.name1a == '' || newData2.name2a == '' || newData2.name3a == '') {
                        refreshData();
                        alertMsg('Error', 'Datos incorrectos o vacíos.');
                        return;
                    }
                    for (i = 0; i < newTotal.length; i += 5) {
                        if (
                            newData2.name1a == newTotal[i] &&
                            newData2.name2a == newTotal[i + 1] &&
                            newData2.name3a == newTotal[i + 2]
                        ) {
                            refreshData();
                            alertMsg('Error', `La cuenta ${newTotal[i]} ya existe.`);
                            return;
                        }
                    }
                    aTotal.push(
                        code(newData2.name1a.toLowerCase()) +
                        'OG' +
                        code(newData2.name2a) +
                        'OG' +
                        code(newData2.name3a) +
                        'OG' +
                        code(newData2.name4a)
                    );

                    aTotalTOnewTotal();
                    save();
                    updateDB('L1', 'B1');
                    updateDB('L1', 'L2');
                    showSearch.innerHTML = '';
                    newSearch.value = newData2.name1a;
                    showCardAll(newData2.name1a.toUpperCase(), newData2.name2a, newData2.name3a, newData2.name4a);
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertAdd();
});

buttonAdd2.addEventListener('click', () => {
    function presentAlertAdd() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            // id: 'name1a-id'
            { name: 'name1a', placeholder: 'Cuenta(Nombre)', value: '' },
            { name: 'name2a', placeholder: 'Usuario', value: '' },
            { name: 'name3a', placeholder: 'Contraseña', value: '' },
            { name: 'name4a', placeholder: 'Notas(Opcional)', value: '' },
        ];
        alert.buttons = [
            { text: 'Cancel', role: 'cancel' },
            {
                text: 'Ok',
                handler: newData2 => {
                    if (
                        newData2.name1a == '' ||
                        newData2.name2a == '' ||
                        newData2.name3a == ''
                    ) {
                        refreshData();
                        alertMsg('Error', 'Datos incorrectos o vacíos.');
                        return;
                    }
                    for (let i = 0; i < newTotal.length; i += 5) {
                        if (
                            newData2.name1a == newTotal[i] &&
                            newData2.name2a == newTotal[i + 1] &&
                            newData2.name3a == newTotal[i + 2]
                        ) {
                            refreshData();
                            alertMsg('Error', `La cuenta ${newTotal[i]} ya existe.`);
                            return;
                        }
                    }
                    aTotal.push(
                        code(newData2.name1a.toLowerCase()) +
                        'OG' +
                        code(newData2.name2a) +
                        'OG' +
                        code(newData2.name3a) +
                        'OG' +
                        code(newData2.name4a)
                    );

                    aTotalTOnewTotal();
                    save();
                    updateDB('L1', 'B1');
                    updateDB('L1', 'L2');
                    showSearch.innerHTML = '';
                    newSearch.value = newData2.name1a;
                    showCardAll(newData2.name1a.toUpperCase(), newData2.name2a, newData2.name3a, newData2.name4a);
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
                        function presentAlertEditUserData() {
                            const alert = document.createElement('ion-alert');
                            alert.header = 'Editar cuenta';
                            alert.inputs = [
                                { name: 'userEditName', placeholder: 'Nombre', value: deco(txt[0]) },
                                { name: 'userEditUser', placeholder: 'Usuario', value: deco(txt[1]) },
                                { name: 'userEditPass', placeholder: 'Contraseña', value: deco(txt[2]) },
                            ];
                            alert.buttons = [
                                { text: 'Cancelar', role: 'cancel' },
                                {
                                    text: 'Ok',
                                    handler: usNData => {
                                        if (
                                            usNData.userEditName == '' ||
                                            usNData.userEditUser == '' ||
                                            usNData.userEditPass == ''
                                        ) {
                                            alertMsg('Error', 'Datos incorrectos o vacíos.');
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
                                                        txt[0] = code(usNData.userEditName);
                                                        txt[1] = code(usNData.userEditUser);
                                                        txt[2] = code(usNData.userEditPass);
                                                        document.getElementById(
                                                            'userName'
                                                        ).innerHTML = deco(txt[0]);
                                                        localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                                                        save();
                                                        updateDB('L1', 'B1');
                                                        updateDB('L1', 'L2');
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
                        presentToast('Incorrecto', '500');
                    }
                    // localStorage.setItem('accessTempData', '');
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
        alert.subHeader = '¿Cargar copia de seguridad?';
        alert.buttons = [
            { text: 'cancelar', role: 'cancel' },
            {
                text: 'Confirmar', // Base de datos
                handler: () => {
                    showSearch.innerHTML = '';
                    newSearch.value = '';
                    updateDB('B2', 'L1');
                    presentToast('Copia de seguridad cargada.', 800);
                    updateDB('L1', 'L2');
                    splitInit();
                    aTotalTOnewTotal();
                    document.getElementById('userName').innerHTML = deco(txt[0]);
                },
            },
            /*{
              text: 'Manual',
              handler: () => {
                function alertImpManual() {
                  const alert = document.createElement('ion-alert');
                  alert.subHeader = 'Importación manual';
                  alert.inputs = [{ name: 'input1', placeholder: 'Inserte datos' }];
                  alert.buttons = [
                    { text: 'cancelar', role: 'cancel' },
                    {
                      text: 'ok',
                      handler: dataImp => {
                        if (dataImp.input1 == '' || dataImp.input1.length < 16) {
                          alertMsg('Error', 'Datos incorrectos o vacíos.');
                          return;
                        }
                        showSearch.innerHTML = '';
                        newSearch.value = '';
                        presentToast('Datos importados.', 500);
                        localStorage.setItem('L1', dataImp.input1);
                        updateDB('L1', 'L2');
                        splitInit();
                        aTotalTOnewTotal();
                        document.getElementById('userName').innerHTML = deco(txt[0]);
                      },
                    },
                  ];
                  document.body.appendChild(alert);
                  return alert.present();
                }
                alertImpManual();
              },
            },*/

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
        alert.subHeader = '¿Crear copia de seguridad?';
        alert.buttons = [
            { text: 'cancelar', role: 'cancel' },
            {
                text: 'Confirmar',
                handler: () => {
                    updateDB('L2', 'B2');
                    presentToast('Copia creada.', 500);
                },
            },
            /*{
              text: 'Descargar',
              handler: () => {
                downloadFile(localStorage.getItem('L2'), 'bk-' + fecha());
              },
            },*/
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    alertExp();
});

barLogout.addEventListener('click', () => {
    document.getElementById('barMenuPrincipal').close();
    localStorage.clear();
    window.location.reload();
});

buttonEye.addEventListener('click', () => {
    if (iconEye.getAttribute('name') == 'eye-outline') {
        newSearch.value = '*'
    } else {
        newSearch.value = ''
    }
    refreshData();
    newSearch.value = ''
});
//######################## FUNCIONES ########################

function disableItem(boolean) {
    buttonAdd.setAttribute('disabled', boolean);
    buttonEye.setAttribute('disabled', boolean);
    newSearch.setAttribute('disabled', boolean);
    barMenuPrincipal.setAttribute('disabled', boolean);
    titleName.setAttribute('disabled', boolean);
    refresher.setAttribute('disabled', boolean);
}

function refreshData() {
    // OK
    if (newSearch.value) {
        iconEye.setAttribute('name', 'eye-off-outline')
        buttonAdd2.setAttribute('style', 'margin-right: 0px');
        buttonAdd.setAttribute('style', 'margin-bottom: -1000px');
    } else {
        iconEye.setAttribute('name', 'eye-outline')
        buttonAdd2.setAttribute('style', 'margin-right: -80px');
        buttonAdd.setAttribute('style', 'margin-bottom:0px');
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
        presentToast(`${contador} resultado${s} encontrado${s}`, '500');
}

function alertMsg(msg1, msg2) {
    // OK
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    document.body.appendChild(alert);
    return alert.present();
}

function alertMsgReset(msg1, msg2) {
    // OK
    alerta = false
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    alert.buttons = [
        {// text: 'cancel',
            role: 'cancel', handler: () => { window.location.reload() }
        }
    ]
    document.body.appendChild(alert);
    return alert.present();
}

async function presentToast(msg, time) {
    // OK
    const toast = document.createElement('ion-toast');
    toast.message = msg;
    toast.duration = time;
    document.body.appendChild(toast);
    return toast.present();
}

function downloadFile(data, fileName, type = 'text/plain') {
    // OK
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

function deco(dec) {
    var dec2 = dec + '';
    var hexDec = dec2.toString();
    var str = '';
    for (var n = 0; n < hexDec.length; n += 2) {
        str += String.fromCharCode(parseInt(hexDec.substr(n, 2), 16) - 5);
    }
    return str;
}

function code(cod) {
    var hexCod = '';
    var hexF = '';
    for (var i = 0; i < cod.length; i++) {
        hexCod = '' + cod.charCodeAt(i).toString(16);
        var hexCod = (parseInt(hexCod, 16) + parseInt('05', 16)).toString(16).toUpperCase();
        hexF += '' + hexCod;
    }
    return hexF;
}

function fecha() {
    // OK
    var today = new Date();
    var DD = String(today.getDate()).padStart(2, '0');
    var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = today.getFullYear();
    var hh = today.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = today.getMinutes();
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
    // Separa txt[3] y decodifica individual
    aTotal.sort();
    newTotal = [];
    for (b = 0; b < aTotal.length; b++) {
        const final = aTotal[b].split('OG');
        for (n = 0; n < final.length; n++) {
            if (n % 4 == 0) {
                newTotal.push(deco(final[n]).toLowerCase());
            } else {
                newTotal.push(deco(final[n]));
            }
            if (n == 3) newTotal.push('oo');
        }
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function updateDB(send, receive) { //REVISAR B3
    // ('B -> L');
    if (send == 'B1') localStorage.setItem(receive, docB1);
    if (send == 'B2') localStorage.setItem(receive, docB2);

    //('L -> L')
    if (send.includes('L') && receive.includes('L')) {
        localStorage.setItem(receive, localStorage.getItem(send));
    }

    // ('L -> B1');
    if (receive == 'B1') {
        return db.collection(coll).doc(userID).update({
            B1: localStorage.getItem(send),
            //si se agrega nueva source se agrega nueva en firebase
            // }).then(function () {
            // console.log("Document B2 successfully updated!");
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000);
                console.error('Error updating document: ', error);
                return;
            });
    }

    // ('L -> B2');
    if (receive == 'B2') {
        return db.collection(coll).doc(userID).update({
            B2: localStorage.getItem(send),
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000);
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

function sendEmail() { //helenapc2018@gmail.com
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

                db.collection(coll).onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!coincidencia) {
                            userID = doc.id;
                            userEmail = doc.data().B1.split('GD');
                            if (userEmail[1] == code(usData.restorePass)) {
                                coincidencia = true;

                                // console.log('ID: ' + userID);
                                // console.log(restoreKey);
                                db.collection(coll).doc(userID).update({
                                    B3: restoreKey,
                                })
                                    .then(function () {
                                        presentToast('Mail enviado', 1000);
                                        // console.log('present toast');
                                        window.location.reload();
                                        return;
                                    });


                                // console.log('ENVIAR MAIL');
                                // console.log('recién');
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
                                <h1>${restoreKey}</h1>
                                <a href="https://helenapc.github.io/"><h3>Click para volver a la aplicación.</h3></a>
                                `,
                                })

                            };
                        };
                    });
                    // (coincidencia) ? showLogin.innerHTML = '' : alertMsg('Error', 'Datos incorrectos o vacíos.');
                    if (!coincidencia) alertMsg('Error', 'Esta cuenta no existe o no está registrada');
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
