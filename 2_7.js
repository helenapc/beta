


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
document.getElementById('buttonAdd').setAttribute('style', 'opacity:0; margin-bottom:-200px');
setAttributes(document.getElementById('buttonHelp'), { style: 'opacity:0', disabled: true });
setAttributes(document.getElementById('nameSetting'), { style: 'opacity:0', disabled: true });
setAttributes(document.getElementById('expandCard'), { style: 'opacity:0', disabled: true });
setAttributes(document.getElementById('showCard'), { style: 'opacity:0', disabled: true });
setAttributes(document.getElementById('buttonSearch'), { style: 'opacity:0', disabled: true });
// space
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
setAttributes(ver, { innerHTML: 'Versión 2.7.09 -beta' });
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


    // console.log(txt[4]);
    document.getElementById('cardPin').setAttribute('style', 'pointer-events: none; opacity: 0');

    if (txt[4] != '') {
        if (localStorage.getItem('tPin')) {
            if (Date.now() - localStorage.getItem('tPin') > 60000) {
                document.getElementById('cardPin').setAttribute('style', 'opacity: 1');
                disableItem(true);
                document.getElementById('title').setAttribute('style', 'margin-left:38px');
                document.getElementById('buttonAdd').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.getElementById('buttonHelp').setAttribute('style', 'pointer-events: none; opacity: 0');
                document.getElementById('nameSetting').setAttribute('style', 'pointer-events: none; opacity: 0');
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


    // console.log('PIN');
    // var tPin = Date.now();
    // console.log(Date.now());
    // localStorage.setItem('tPin', true)
    // disableItem(true);

    // setTimeout(() => {
    // console.log('AFTER');
    // localStorage.removeItem('tPin');
    // disableItem(false);
    // console.log(Date.now());
    // }, 5000);


    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            offline = false;
            if (!compare && doc.data().B1.includes(localStorage.getItem('accessTempData'))) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                docBpin = doc.data().Bpin;
                userID = doc.id;
                // console.log(userID);
                compare = true;
                return;
            }
        });


        // PIN
        // console.log(Tpin);
        // localStorage.setItem('Bpin', docBpin);
        // localStorage.setItem('Tpin', (Tpin + 60000));
        // console.log(localStorage.getItem('Tpin'));
        // console.log(localStorage.getItem('Bpin'));
        // console.log(`Resta= ${(localStorage.getItem('Tpin') - Tpin)}` );


        // console.log(docB1);

        // console.log('Pre:');
        // console.log(txt);
        // console.log(docB1);
        const newCompareData = localStorage.getItem('L1');
        // console.log(localStorage.getItem('L1'));


        updateDB('B1', 'L1');
        splitInit();
        // aTotalTOnewTotal();

        // console.log('Post:');
        // console.log(docB1);
        // console.log(txt);
        // console.log(localStorage.getItem('L1'));

        // if (localStorage.getItem('bp') != txt[4]) {
        //     localStorage.removeItem('bp');
        //     localStorage.removeItem('accessTempData')
        //     localStorage.setItem('L1', 'GDGDGDGD');
        //     window.location.reload();
        // }

        if (!compare && !offline || localStorage.getItem('bp') != txt[4]) {
            localStorage.removeItem('bp');
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

        // if (docB1 != localStorage.getItem('L1') && alertcompare && !offline) {
        if (docB1 != newCompareData && alertcompare && !offline) {
            showSearch.innerHTML = '';

            // 
            // 
            // 
            // var txtTemp = [];
            // var aTotalTemp = [];
            // var newa = [];
            // var metaObjAdd = [];
            // var metaObjDel = [];

            // txtTemp = newCompareData.split('GD');
            // aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
            // aTotalTemp.splice(-1, 1);
            // aTotalTemp = aTotalTemp.concat(aTotal);
            // aTotalTemp.sort();

            // for (i = 0; i < aTotalTemp.length; i++) {
            //     (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
            // };

            // for (i = 0; i < newa.length; i++) {
            //     const newaName = newa[i].split('OG');
            //     var myObj = {value: deco(newaName[0]).toUpperCase(), disabled: true};
            //     (txtTemp[3].includes(newa[i])) ? metaObjDel.push(myObj) : metaObjAdd.push(myObj);
            // }

            // 
            // 
            // 

            function alertCompareData() {
                alertcompare = false
                const alert = document.createElement('ion-alert');
                alert.setAttribute('backdrop-dismiss', 'false');
                alert.header = 'Se detectaron cambios';
                alert.message = '¿Aceptar y sincorinizar con la base de datos?';
                // alert.message = pepe;
                // alert.inputs = metaObjAdd;
                alert.buttons = [
                    { text: 'Aceptar', handler: () => { updateData('Aceptar', newCompareData) } },
                    { text: 'Rechazar', handler: () => { updateData('Rechazar', newCompareData) } },
                    {
                        text: 'Detalles..',
                        handler: () => {

                            var txtTemp = [];
                            var aTotalTemp = [];
                            var newa = [];
                            var metaObjAdd = [];
                            var metaObjDel = [];
                            var myObj = '';
                            var metaObj = '';
                            // var metaObj = [{ value: 'DETALLES', disabled: true }],
                            // var metaObjAdd = [{ value: 'Agregadas', disabled: true }];
                            // var metaObjDel = [{ value: 'Borradas', disabled: true }];

                            txtTemp = newCompareData.split('GD');
                            aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
                            aTotalTemp.splice(-1, 1);
                            aTotalTemp = aTotalTemp.concat(aTotal);
                            aTotalTemp.sort();

                            for (i = 0; i < aTotalTemp.length; i++) {
                                (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
                            };

                            for (i = 0; i < newa.length; i++) {
                                
                                const newaName = newa[i].split('OG');
                                if (txtTemp[3].includes(newa[i])) {
                                    myObj = { value: '(–) '+deco(newaName[0]).toUpperCase(), disabled: true };
                                    metaObjDel.push(myObj)
                                }else{
                                    myObj = { value: '(+) '+deco(newaName[0]).toUpperCase(), disabled: true };
                                    metaObjAdd.push(myObj)
                                };
                            }
                            metaObj = metaObjAdd.concat(metaObjDel);
                            // metaObj = metaObj.concat(metaObjAdd.concat(metaObjDel));
                            // console.log(metaObj);
                            // metaObj = metaObj.splice( 0, 0, { value: 'Cambios', disabled: true });
                            // console.log(metaObj);
                            // metaObj = metaObjAdd.concat(metaObjDel);
                            presentCompareData(metaObj, newCompareData);

                            // if (metaObjAdd.length != '') {
                            //     presentAlertCheckboxAdd(metaObjAdd, metaObjDel, newCompareData);
                            // } else {
                            //     presentAlertCheckboxDel(metaObjDel);
                            // };
                        },
                    },

                    //         var txtTemp = [];
                    //         var aTotalTemp = [];
                    //         var newa = [];
                    //         var metaObjAdd = [];
                    //         var metaObjDel = [];

                    //         txtTemp = newCompareData.split('GD');
                    //         aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
                    //         aTotalTemp.splice(-1, 1);
                    //         aTotalTemp = aTotalTemp.concat(aTotal);
                    //         aTotalTemp.sort();

                    //         for (i = 0; i < aTotalTemp.length; i++) {
                    //             (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
                    //         };

                    //         for (i = 0; i < newa.length; i++) {
                    //             const newaName = newa[i].split('OG');
                    //             var myObj = { type: 'checkbox', label: deco(newaName[0]).toUpperCase(), value: newa[i], checked: true };
                    //             (txtTemp[3].includes(newa[i])) ? metaObjDel.push(myObj) : metaObjAdd.push(myObj);
                    //         }


                    //         if (metaObjAdd.length != '') {
                    //             presentAlertCheckboxAdd(metaObjAdd, metaObjDel, newCompareData);
                    //         } else {
                    //             presentAlertCheckboxDel(metaObjDel);
                    //         };
                    //     },
                    // },
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
    // if (!txt[4] && showLogin.innerHTML == '') {
    expandIcon.setAttribute('name', 'contract-outline')
    showSearch.innerHTML = `
    <div style="text-align:center"><br>No hay datos guardados. </div>
    <div style="text-align:center"><br> Aquí hay unos ejemplos de lo que se puede hacer. </div>
    <div style="text-align:center">⬇</div>
    `;
    showCardAll('facebook', 'prueba@hotmail.com', '1234abcd', 'Las notas son opcionales 😎');
    showCardAll('google 👍', 'tucuenta@gmail.com', 'prueba1234', '');
    expandIcon.setAttribute('name', 'expand-outline')
};
