// import '/fun.js';



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


// // Init components
const title = document.getElementById('title');

const showLogin = document.getElementById('showLogin');
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreate = document.getElementById('buttonCreate');

const refresher = document.getElementById('refresher');
const showSearch = document.getElementById('show-accounts1');
const newSearch = document.getElementById('new-s');

const buttonAdd = document.getElementById('buttonAdd');
const buttonEye = document.getElementById('buttonEye');
const buttonSearch = document.getElementById('buttonSearch');
const iconEye = document.getElementById('iconEye');

const buttonFocus = document.getElementById('buttonFocus');
const content = document.getElementById('content');
//******************************************* */


setAttributes(newSearch, { style: 'opacity:0', disabled: true });
setAttributes(buttonAdd, { style: 'opacity:1', style: 'margin-bottom:-200px' });
setAttributes(buttonEye, { style: 'opacity:0', disabled: true });
setAttributes(buttonSearch, { style: 'opacity:0', disabled: true });
setAttributes(refresher, { style: 'opacity:0', disabled: true });
title.setAttribute('style', 'margin-left:38px');


var statSearchBar = false;
setAttributes(newSearch, { style: 'opacity:1', style: 'margin-top:-60px', disabled: false });


// PROGRESS BAR
const barProgress = document.getElementById('barProgress');
const barProgress01 = document.createElement('ion-progress-bar');
setAttributes(barProgress01, { color: 'light', style: 'height:8px' });
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
setAttributes(barIcon00, {button: 'click-btn', name: 'arrow-back-outline', slot: 'start', id: 'barClose'})

const barIcon01 = document.createElement('ion-icon'); // ICON
setAttributes(barIcon01, {button: 'click-btn', name: 'build-outline', slot: 'end', id: 'barEdit'})

{/* <ion-icon name="arrow-back-outline"></ion-icon> */}

//BLOCK 01
barTitle.appendChild(barIcon00);
barTitle.appendChild(barLabel);
barTitle.appendChild(barIcon01);
barToolbar.appendChild(barTitle);
barHeader.appendChild(barToolbar);
barMenuPrincipal.appendChild(barHeader);


item('barExport', 'arrow-up-circle-outline', 'Crear copia de Seguridad')
item('barImport', 'arrow-down-circle-outline', 'Cargar copia de Seguridad');
item('barLogout', 'log-out-outline', 'Cerrar Sesión');
/////////////////////////////////////////////////////////
const ver = document.createElement('ion-item-divider');
setAttributes(ver, {innerHTML: 'Versión 2.74'});
barContent.appendChild(ver);
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


//LOGIN (eye)
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
                                (txtTemp[3].includes(newa[i])) ? metaObjAdd.push(myObj) : metaObjDel.push(myObj);
                            }

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
