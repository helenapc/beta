
var coincidencia = false;
var txt = [];
var aTotal = [];
var newTotal = [];
var comparePersonalData = false;
// var reload = true; 
var compareChanges = '';

var newCompareData2 = localStorage.getItem('L1');
const arrCompareAdd = ['Nuevas'];
const arrCompareDel = ['Borradas'];
const arrCompareEdit = ['Editadas'];

var uCA = [];
var userRestoreAccount = [];
var userID = '';
const coll = '273';
var alertcompare = true;
var resetLogin = false;
var offline = true;
// var acceptOffline = true;
var closeAlert = false;
var helpActivate = false;
var cuPath = [];
var reemplace;
const timePin = 300000;

const icoShow = 'eye-outline';
const icoHide = 'eye-off-outline';
const icoExp = 'expand-outline';
const icoCom = 'contract-outline';


// // Init components
const nameLog = document.getElementById('nameLog');
const passLog = document.getElementById('passLog');
const eyePass = document.getElementById('eyePass');


const showLogin = document.getElementById('showLogin');
const buttonLogin = document.getElementById('buttonLogin');
const buttonCreate = document.getElementById('buttonCreate');

const showSearch = document.getElementById('show-accounts1');
const newSearch = document.getElementById('new-s');


//******************************************* */

// localStorage.setItem('offline', true);
document.getElementById('content').setAttribute('style', ' --background:var(--val)');
document.querySelector('#refresher').setAttribute('disabled', 'true');
multipleAttribute(['#cardPin', '#nameSetting', '#buttonEdit', '#buttonDelete', '#expandCard', '#showCard', '#buttonSearch', '#buttonAdd', '.button_nav'], 'style', 'pointer-events: none; opacity: 0');




var statSearchBar = false;
newSearch.setAttribute('style', 'opacity:1; margin-top:-60px;');



// PROGRESS BAR
const barProgress = document.getElementById('barProgress');
const barProgress01 = document.createElement('ion-progress-bar');
setAttributes(barProgress01, { color: 'light', style: 'height:8px' });
barProgress.style.opacity = "0";
barProgress.appendChild(barProgress01);



// NAV BAR
const barMenuPrincipal = document.getElementById('barMenuPrincipal');
const barHeader = document.createElement('ion-header');
const barToolbar = document.createElement('ion-toolbar');
const barTitle = document.createElement('ion-item');
const barLabel = document.createElement('ion-title');


const barContent = document.createElement('ion-content');
barMenuPrincipal.appendChild(barContent);
barLabel.setAttribute('id', 'userName');
barTitle.setAttribute('lines', 'none');

const barIcon00 = document.createElement('ion-icon');
const barIcon01 = document.createElement('ion-icon'); // ICONO VACÍO (borrar)
setAttributes(barIcon00, { button: 'click-btn', name: 'arrow-back-outline', slot: 'start', id: 'barClose' })


//BLOCK 01
barTitle.appendChild(barIcon00);
barTitle.appendChild(barLabel);
barTitle.appendChild(barIcon01); // ICONO VACÍO (borrar)
barToolbar.appendChild(barTitle);
barHeader.appendChild(barToolbar);
barMenuPrincipal.appendChild(barHeader);



item('barExport', 'arrow-up-circle-outline', 'Crear copia de Seguridad')
item('barImport', 'arrow-down-circle-outline', 'Cargar copia de Seguridad');
item('barLogout', 'log-out-outline', 'Cerrar Sesión');
item('barLOG', 'document-text-outline', 'Novedades');
const ver = document.createElement('ion-item-divider');
barContent.appendChild(ver);
item('barDelAcc', 'close-outline', 'Eliminar Cuenta', 'danger');
ver.innerHTML = 'Versión 2.7.3-beta_r10';
document.querySelector('#versionLogin').innerHTML = ver.innerHTML;

//DARK THEME
const lTheme = localStorage.getItem('theme');
const checkbox = document.getElementById('checkbox');
if (lTheme == null || lTheme == 'dark' || lTheme == 'light' || lTheme == '') localStorage.setItem('theme', ['light', '']);
var activeTheme = localStorage.getItem('theme').split(',');
if (activeTheme[1] == 'dark') { checkbox.checked = true; };
document.body.classList.toggle(activeTheme[(activeTheme[1] == 'dark') ? 1 : 0]);

//LOGIN (eye)
if (eyePass) {
    eyePass.addEventListener('click', () => {
        passLog.setAttribute('type', (eyePass.name == 'eye-off-outline') ? 'password' : 'text');
        eyePass.name = (eyePass.name == 'eye-off-outline') ? 'eye-outline' : 'eye-off-outline';
    })
}


// document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');

emailjs.init('user_EbX2uqx7kGIlimJTNppDy');

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


// var initStateL1 = '';
// var initStateL1 = true;
// var hideCompare = false;

// ------------------ START ------------------ //
// localStorage.removeItem('alrt');

if (localStorage.getItem('L1') && localStorage.getItem('L1') != 'GDGDGDGD') {
    showLogin.innerHTML = '';

    // INIT SET   
    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch'], 'style', 'pointer-events: auto; opacity: 1');
    document.querySelector('#refresher').setAttribute('disabled', 'false');
    document.querySelector('#content').setAttribute('style', '--background: #ffffff00');
    statSearchBar = true;
    newSearch.setAttribute('style', 'opacity:1; margin-top:0px;');

    splitInit();
    aTotalTOnewTotal();

    document.querySelector('#userName').innerHTML = deco(txt[0]);
    document.querySelector('#nameSettingText').innerHTML = deco(txt[0]).slice(0, 1).toUpperCase();

    comparePersonalData = false;

    // alertcompare = true;


    // PIN;
    if (txt[4] != '' && localStorage.getItem('tPin')) {
        if (Date.now() - localStorage.getItem('tPin') > timePin) {
            var hideCompare = true;
            document.querySelector('#cardPin').setAttribute('style', 'opacity: 1');
            document.querySelector('#refresher').setAttribute('disabled', 'true');
            document.getElementById('content').setAttribute('style', ' --background:#00000055');
            multipleAttribute(['#buttonAdd', '#showCard', '#buttonSearch', '.button_nav', '#modal'], 'style', 'pointer-events: none; opacity: 0');
            document.querySelectorAll('.point_backup')[0].setAttribute('style', 'z-index: 0');
            newSearch.setAttribute('style', 'margin-top:-60px');
        }
        // }

        document.getElementById('pin').addEventListener('ionInput', () => {
            hideCompare = false;
            if (pin.value == deco(txt[4])) {
                localStorage.setItem('tPin', Date.now());
                document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.querySelector('#refresher').setAttribute('disabled', 'false');
                document.getElementById('content').setAttribute('style', ' --background:#00000000');
                multipleAttribute(['#buttonAdd', '#showCard', '#buttonSearch', '.button_nav'], 'style', 'pointer-events: auto; opacity: 1');
                if (document.getElementById('modal').innerHTML != '') document.getElementById('modal').setAttribute('style', 'pointer-events: auto; opacity: 1');
                newSearch.setAttribute('style', 'margin-top:0px');
            }
        });
    }




    // DB
    db.collection(coll).onSnapshot(querySnapshot => {

        querySnapshot.forEach(doc => {
            offline = false;
            if (!comparePersonalData && doc.data().B1.includes(localStorage.getItem('accessTempData'))) {
                // if (doc.data().B1.includes(localStorage.getItem('accessTempData'))) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                docBpin = doc.data().Bpin;
                userID = doc.id;
                comparePersonalData = true;
                // reload = false;
                return;
            }
        });

        if (offline) localStorage.setItem('offline', true);

        // reinicio cambio de datos personales
        if (!comparePersonalData && !offline || localStorage.getItem('bp') != txt[4]) {
            localStorage.removeItem('bp');
            localStorage.removeItem('accessTempData')
            localStorage.setItem('L1', 'GDGDGDGD');
            window.location.reload();
        }

        comparePersonalData = false;

        // 
        // if (offline) localStorage.setItem('offline', 'offline'); // PROBAR
        // 

        // hideCompare = false;


        if (docB1 == localStorage.getItem('L1')) {
            compareChanges = localStorage.getItem('L1');
        }
    
        if (!localStorage.getItem('offline')){
            updateDB('B1', 'L1');
            // compareChanges = localStorage.getItem('L1');
        }

        splitInit();

        // reinicio cambio de datos personales

        //POINT BACKUP
        // document.querySelectorAll('.point_backup')[0].setAttribute('style', `z-index: ${(docB1 != docB2) ? '2' : '0'}`);
        document.querySelectorAll('.point_backup')[1].setAttribute('style', `z-index: ${(docB1 != docB2) ? '2' : '0'}`);
        ;

        // if (docB1 != compareChanges && alertcompare && !offline && localStorage.getItem('bp') != txt[4]) {
        // if (docB1 != compareChanges && alertcompare && !offline) {
 
        if (docB1 != compareChanges && !offline) {

            // 
            // localStorage.removeItem('offline'); // PROBAR
            // 
            showSearch.innerHTML = '';

            // MODAL-CHANGES
            if (!hideCompare) {
                document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');
                document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
            }
            // b6003
            if (localStorage.getItem('offline')) {
                // b1002
                localStorage.removeItem('offline');
                // /b1002
                document.getElementById('modal').innerHTML =
                    `
                <p class="cct" ;">Se detectaron cambios</p>
                <p class="ccse" style="margin: 10px 0px 20px 0px;">¿Aplicar cambios hechos sin internet?</p>
    
                <input type="button" class="modal_btns" style="margin-left:100%" value="Usar datos de celular (Sin internet)" onClick="buttons_modal('rechazar')">   
                <input type="button" class="modal_btns" style="margin-left:100%" value="Usar base de datos (internet)" onClick="buttons_modal('aceptar')" >
                `;
                // /b6003

            } else {

                document.getElementById('modal').innerHTML =
                    `
                <p class="cct" ;">Se detectaron cambios</p>
                <p class="ccse" style="margin: 10px 0px 20px 0px;">¿Aceptar y sincronizar datos?</p>
    
                <input type="button" class="modal_btns" style="margin-left:100%" value="ACEPTAR" onClick="buttons_modal('aceptar')" >
                <input type="button" class="modal_btns" style="margin-left:100%" value="RECHAZAR" onClick="buttons_modal('rechazar')">
                <input type="button" class="modal_btns" style="margin-left:100%" value="VER CAMBIOS" onClick="buttons_modal('verCambios')">
    
                `;
            }

        }



        else {
            // initStateL1 = true;
            // document.getElementById('modal').innerHTML = '';
            // console.log('No comparación');
            // if (offline) acceptOffline = false;

            document.getElementById('bkmodal').setAttribute('style', 'opacity:0; pointer-events: none');
            document.getElementById('modal').setAttribute('style', 'opacity:0; pointer-events: none');
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
