
var coincidencia = false;
var txt = [];
var aTotal = [];
var newTotal = [];
var compare = false;
var newCompareData = '';
// var acept_changes = '';
// const arrCompareAdd = ['Nuevas'];
// const arrCompareDel = ['Borradas'];
// const arrCompareEdit = ['Editadas'];
// var docB1 = '';
// var docB2 = '';
var uCA = [];
var userID = '';
const coll = 'users2';
var alertcompare = true;
var resetLogin = false;
var offline = true;
var closeAlert = false;
var helpActivate = false;
var cuPath = [];
var reemplace;
const timePin = 300000;

const icoShow = 'eye-outline';
const icoHide = 'eye-off-outline';
const icoExp = 'expand-outline';
const icoCom = 'contract-outline';




// const icoShow = 'albums-outline';
// const icoHide = 'close-outline';
// const icoExp = 'eye-outline';
// const icoCom = 'eye-off-outline';

// // Init components
const nameLog = document.getElementById('nameLog');
const passLog = document.getElementById('passLog');
const eyePass = document.getElementById('eyePass');


const showLogin = document.getElementById('showLogin');
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreate = document.getElementById('buttonCreate');

const showSearch = document.getElementById('show-accounts1');
const newSearch = document.getElementById('new-s');

const buttonFocus = document.getElementById('buttonFocus');
const content = document.getElementById('content');
//******************************************* */


document.getElementById('title').setAttribute('style', 'margin-left:38px');
// document.getElementById('buttonAdd').setAttribute('style', 'opacity:0; margin-bottom:-200px');

document.getElementById('nameSetting').setAttribute('style', 'pointer-events: none; opacity: 0');

document.getElementById('buttonEdit').setAttribute('style', 'opacity:0; pointer-events: none');
document.getElementById('buttonDelete').setAttribute('style', 'opacity:0; pointer-events: none');
document.getElementById('expandCard').setAttribute('style', 'pointer-events: none; opacity: 0');
document.getElementById('showCard').setAttribute('style', 'pointer-events: none; opacity: 0');
document.getElementById('buttonSearch').setAttribute('style', 'pointer-events: none; opacity: 0');

// document.getElementById('buttonHelp').setAttribute('style', 'pointer-events: none; opacity: 0');
document.getElementById('buttonAdd').setAttribute('style', 'pointer-events: none; opacity: 0');

setAttributes(document.getElementById('refresher'), { style: 'opacity:0', disabled: true });




var statSearchBar = false;
newSearch.setAttribute('style', 'opacity:1; margin-top:-60px;');

// PROGRESS BAR
const barProgress = document.getElementById('barProgress');
const barProgress01 = document.createElement('ion-progress-bar');
setAttributes(barProgress01, { color: 'light', style: 'height:8px' });
barProgress.setAttribute('style', 'opacity:0');
barProgress.appendChild(barProgress01);



// NAV BAR
const barMenuPrincipal = document.getElementById('barMenuPrincipal');
const barHeader = document.createElement('ion-header');
const barToolbar = document.createElement('ion-toolbar');
const barTitle = document.createElement('ion-item');
const barLabel = document.createElement('ion-title');


const barContent = document.createElement('ion-content');
barMenuPrincipal.appendChild(barContent);
barMenuPrincipal.setAttribute('disabled', true);
barLabel.setAttribute('id', 'userName');
barTitle.setAttribute('lines', 'none');

const barIcon00 = document.createElement('ion-icon'); // ICON
const barIcon01 = document.createElement('ion-icon'); // ICON
setAttributes(barIcon00, { button: 'click-btn', name: 'arrow-back-outline', slot: 'start', id: 'barClose' })

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
const ver = document.createElement('ion-item-divider');
ver.innerHTML = 'Versión 2.7.2-beta-list_Fn.pt2(Data)';
barContent.appendChild(ver);
item('barDelAcc', 'close-outline', 'Eliminar Cuenta', 'danger');

//DARK THEME
const lTheme = localStorage.getItem('theme');
const checkbox = document.getElementById('checkbox');
if (lTheme == null || lTheme == 'dark' || lTheme == 'light' || lTheme == '') localStorage.setItem('theme', ['light', '']);
var activeTheme = localStorage.getItem('theme').split(',');
if (activeTheme[1] == 'dark') {
    document.body.classList.toggle(activeTheme[1]);
    checkbox.checked = true;
} else {
    document.body.classList.toggle(activeTheme[0]);
};


//LOGIN (eye)
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



document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');



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

// ------------------ START ------------------ //
localStorage.removeItem('alrt');

if (localStorage.getItem('L1') && localStorage.getItem('L1') != 'GDGDGDGD') {
    showLogin.innerHTML = '';
    disableItem(false);
    splitInit();
    aTotalTOnewTotal();
    localStorage.setItem('bp', txt[4]);
    // localStorage.setItem('tPin', Date.now());
    document.getElementById('userName').innerHTML = deco(txt[0]);
    document.getElementById('nameSettingText').innerHTML = deco(txt[0]).slice(0, 1).toUpperCase();
    compare = false;


    // PIN;
    document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');
    if (txt[4] != '') {
        if (localStorage.getItem('tPin')) {
            if (Date.now() - localStorage.getItem('tPin') > timePin) {
                document.getElementById('cardPin').setAttribute('style', 'opacity: 1');
                disableItem(true);
                document.getElementById('title').setAttribute('style', 'margin-left:38px');
                document.getElementById('buttonAdd').setAttribute('style', 'pointer-events: none; opacity: 0');
                //document.getElementById('buttonHelp').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.getElementById('nameSetting').setAttribute('style', 'pointer-events: none; opacity: 1');
                document.getElementById('expandCard').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.getElementById('showCard').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.getElementById('buttonSearch').setAttribute('style', 'pointer-events: none; opacity: 0');

            }
        }

        document.getElementById('pin').addEventListener('ionInput', () => {
            if (pin.value == deco(txt[4])) {
                localStorage.setItem('tPin', Date.now());
                document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');
                disableItem(false);
            }
        });
    }


    // DB
    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            offline = false;
            if (!compare && doc.data().B1.includes(localStorage.getItem('accessTempData'))) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                docBpin = doc.data().Bpin;
                userID = doc.id;
                compare = true;
                return;
            }
        });


        // var newCompareData = localStorage.getItem('L1');
        newCompareData = localStorage.getItem('L1');
        updateDB('B1', 'L1');
        splitInit();

        // if (!compare && !offline || localStorage.getItem('bp') != txt[4]) {
        if (!compare && !offline && localStorage.getItem('bp') != txt[4]) {
            localStorage.removeItem('bp');
            localStorage.removeItem('accessTempData')
            localStorage.setItem('L1', 'GDGDGDGD');
            window.location.reload();
        }

        // var msgRechazar = '';
        // document.getElementById('offline').setAttribute('style', 'opacity:1');
        // document.getElementById('offline').setAttribute('style', 'opacity:0');
        // if (offline) localStorage.setItem('offline', 'offlineee');
        // document.getElementById('offline').setAttribute('style', 'opacity:1');
        // msgRechazar = localStorage.getItem('offline');
        // } else {
        // document.getElementById('offline').setAttribute('style', 'opacity:0'); //0
        // msgRechazar = 'Rechazarr';
        // };


        // 
        if (offline) localStorage.setItem('offline', 'offlineee');
        // 


        compare = false;
        // console.log(localStorage.getItem('offline'));
        // if (docB1 != localStorage.getItem('L1') && alertcompare && !offline) {
        if (docB1 != newCompareData && alertcompare && !offline) {
            showSearch.innerHTML = '';

            // 
            localStorage.removeItem('offline');
            // 

            function alertCompareData() {
                alertcompare = false
                const alert = document.createElement('ion-alert');
                alert.setAttribute('backdrop-dismiss', 'false');
                alert.header = 'Se detectaron cambios';
                alert.message = '¿Aceptar y sincorinizar con la base de datos?';
                alert.buttons = [
                    { text: 'Aceptar', handler: () => { updateData('Aceptar', newCompareData) } },
                    { text: 'Rechazar', handler: () => { updateData('Rechazar', newCompareData) } },
                    {
                        text: 'Ver cambios',
                        handler: () => {

                            let txtTemp = [];
                            let aTotalTemp = [];
                            let newa = [];
                            const arrCompareAdd = ['Nuevas'];
                            const arrCompareDel = ['Borradas'];
                            const arrCompareEdit = ['Editadas'];

                            //copia y union 2 arrays
                            txtTemp = newCompareData.split('GD');
                            aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
                            aTotalTemp.splice(-1, 1);
                            aTotalTemp = aTotalTemp.concat(aTotal);
                            aTotalTemp.sort();
                            aTotalTemp.push('');

                            for (i = 0; i < aTotalTemp.length; i++) {
                                (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
                            };


                            for (i = 0; i < newa.length - 1; i++) { //
                                let newaName = newa[i].split('OG');
                                let newaName2 = newa[i + 1].split('OG');

                                if (newaName[0] == newaName2[0]) {
                                    arrCompareEdit.push(deco(newaName[0]).toUpperCase())
                                    i++
                                } else {

                                    if (txtTemp[3].includes(newa[i])) {
                                        arrCompareDel.push(deco(newaName[0]).toUpperCase())

                                    } else {
                                        arrCompareAdd.push(deco(newaName[0]).toUpperCase())
                                    };
                                }
                            }

                            // funNewCompareData(newCompareData);

                            // MODAL //
                            let openAdd = 0; openDel = 0; openEdit = 0;

                            document.getElementById('modal').innerHTML = `
                            <p id="op1" class="cct">Cambios</p>
                            <hr style="height:1px; border-width:0; color:gray;background-color:gray">
                            <p style="margin: 0px 0px 0px 0px;">
                            
                            ${listDetail(arrCompareAdd, 'Nuevas', 'dropAddButton')}
                            ${listDetail(arrCompareDel, 'Borradas', 'dropDelButton')}
                            ${listDetail(arrCompareEdit, 'Editadas', 'dropEditButton')}
                            
                            <input type="button" class="modal_btns" value="ACEPTAR" onClick="buttons_modal('aceptar')">
                            <input type="button" class="modal_btns" value="RECHAZAR" onClick="buttons_modal('rechazar')">
                            </p>
                            `;


                            document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: none');
                            document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
                            document.querySelector('.dropdown-content').setAttribute('style', 'display: none');

                            const dropAddButton = document.querySelector('#dropAddButton');
                            const dropDelButton = document.querySelector('#dropDelButton');
                            const dropEditButton = document.querySelector('#dropEditButton');


                            if (arrCompareAdd.length != 1) {
                                dropAddButton.addEventListener('click', () => {
                                    openDel = 0, openEdit = 0, openAdd++

                                    if (openAdd < 2) {
                                        listDrop(arrCompareAdd);
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                                        if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-border-color)');
                                        if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                        if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                    }
                                    else {
                                        openAdd = 0;
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                                        dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                    }
                                });
                            }

                            if (arrCompareDel.length != 1) {
                                dropDelButton.addEventListener('click', () => {
                                    openDel++, openEdit = 0, openAdd = 0;

                                    if (openDel < 2) {
                                        listDrop(arrCompareDel);
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                                        if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                        if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-border-color)');
                                        if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                    }
                                    else {
                                        openDel = 0;
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                                        dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                    }
                                });
                            }

                            if (arrCompareEdit.length != 1) {
                                dropEditButton.addEventListener('click', () => {
                                    openDel = 0, openEdit++, openAdd = 0;

                                    if (openEdit < 2) {
                                        listDrop(arrCompareEdit);
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                                        if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                        if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                        if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-border-color)');

                                    }
                                    else {
                                        openEdit = 0;
                                        document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                                        dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                                    }
                                });
                            }

                            // console.log(acept_changes);

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
    expandIcon.setAttribute('name', icoCom);
    showSearch.innerHTML = `
    <div style="text-align:center"><br>No hay datos guardados. </div>
    <div style="text-align:center"><br> Aquí hay unos ejemplos de lo que se puede hacer. </div>
    <div style="text-align:center">⬇</div>
    `;
    showCardAll('facebook', 'prueba@hotmail.com', '1234abcd', 'Las notas son opcionales 😎');
    showCardAll('google 👍', 'tucuenta@gmail.com', 'prueba1234', '');
    expandIcon.setAttribute('name', icoExp);
};
