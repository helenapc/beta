
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
    // const ionIco = document.createElement('ion-icon');
    // ionIco.setAttribute('name', ico);
    // ionIco.setAttribute('slot', 'start');
    // ionItem.appendChild(ionIco);
    if (show) {
        barContent.appendChild(ionItem);
    } else {
        if (localStorage.getItem('accessTempData') == '596A787925466868747A7379GD7DGD7DGD') {
            barContent.appendChild(ionItem);
        };
    };
    id = document.getElementById(id);
}

//######################## FUNCIONES ########################

function setAttributes(elem, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) elem[prop] = obj[prop];
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
    if (newSearch.value != '') presentToast(`${contador} resultado${s} encontrado${s}`, '500', 'dark');
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


// ALERTS

function presentAlertCheckboxAdd(metaObjAdd, metaObjDel) {
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
