
const timeUndo = 2500;

function buttonModalCancel() {
    // multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:0; pointer-events: none');
    multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');
    let ccse = document.querySelectorAll('.ccse');
    for (let i = 0; i < ccse.length; i++) { ccse[i].setAttribute('style', 'user-select:none;'); }
}

function buttonModalAdd() {
    buttonModalCancel();
    let aTotalTemp = localStorage.getItem('L1').split('GD')[3].split('Q0');
    aTotalTemp.pop();
    let modalVal = [
        document.querySelectorAll('.modal_input')[0].value,
        document.querySelectorAll('.modal_input')[1].value,
        document.querySelectorAll('.modal_input')[2].value,
        document.querySelectorAll('.modal_input')[3].value,
    ];
    // alertAdd2(modalVal);
    if (modalVal[0] == '' || modalVal[1] == '' || modalVal[2] == '') {
        barProgressF('warning', 'determinate');
        alertMsg('Error', 'Campos obligatorios vacíos.');
        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
        return;
    }

    modalVal[0] = delete_spaces(modalVal[0].toLowerCase());
    modalVal[1] = delete_spaces(modalVal[1]);
    modalVal[2] = delete_spaces(modalVal[2]);
    modalVal[3] = delete_spaces(modalVal[3]);
    const newTotalLength = newTotal.length;
    for (let i = 0; i < newTotalLength; i += 5) {
        if (
            modalVal[0] == newTotal[i] &&
            modalVal[1] == newTotal[i + 1] &&
            modalVal[2] == newTotal[i + 2]
        ) {
            alertMsg('Error', `La cuenta "${modalVal[0].toUpperCase()}" ya existe.`);
            return;
        }
    }

    presentToast(`"${modalVal[0].toUpperCase()}" agregada`, (timeUndo-500), 'success', true);

    aTotal.push(`${code(modalVal[0].toLowerCase())}OG${code(modalVal[1])}OG${code(modalVal[2])}OG${code(modalVal[3])}`)
    aTotalTOnewTotal();
    save();
    showSearch.innerHTML = '';
    newSearch.value = modalVal[0];
    document.getElementById('expandIcon').setAttribute('name', icoExp);
    refreshData(false, false);
    updateDB('L1', 'B1');
    
    setTimeout(() => {
        if (!btnToast) {
            btnToast = true;
            aTotal = aTotalTemp;
            aTotalTOnewTotal();
            save();
            showSearch.innerHTML = '';
            newSearch.value = modalVal[0];
            refreshData(false);
            if (showSearch.innerHTML == '') newSearch.value = '';
            updateDB('L1', 'B1');
        }
    }, timeUndo);
    return;
}


function buttonModalEdit() {
    buttonModalCancel();
    let aTotalTemp = localStorage.getItem('L1').split('GD')[3].split('Q0');
    aTotalTemp.pop();

    let modalVal = [
        document.querySelectorAll('.modal_input')[0].value,
        document.querySelectorAll('.modal_input')[1].value,
        document.querySelectorAll('.modal_input')[2].value,
        document.querySelectorAll('.modal_input')[3].value,
    ];
    // alertEdit2(modalVal, reemplace);
    const toRemplace = reemplace / 5;
    if (modalVal[0] == '' || modalVal[1] == '' || modalVal[2] == '') {
        alertMsg('Error', 'Campos obligatorios vacíos.');
        return;
    }

    modalVal[0] = delete_spaces(modalVal[0].toLowerCase());
    modalVal[1] = delete_spaces(modalVal[1]);
    modalVal[2] = delete_spaces(modalVal[2]);
    modalVal[3] = delete_spaces(modalVal[3]);

    if (
        modalVal[0] == cuPath[0].toLowerCase() &&
        modalVal[1] == cuPath[1] &&
        modalVal[2] == cuPath[2] &&
        modalVal[3] == cuPath[3]
    ) {
        return;
    }

    for (i = 0; i < newTotal.length; i += 5) {
        if (
            modalVal[0] == newTotal[i] &&
            modalVal[1] == newTotal[i + 1] &&
            modalVal[2] == newTotal[i + 2] &&
            modalVal[3] == newTotal[i + 3]
        ) {
            alertMsg('Error', `La cuenta "${modalVal[0].toUpperCase()}" ya existe.`);
            return;
        }
    }

    presentToast(`"${modalVal[0].toUpperCase()}" editado.`,(timeUndo-500), 'success', true);

    aTotal.splice(toRemplace, 1, code(modalVal[0]) + 'OG' + code(modalVal[1]) + 'OG' + code(modalVal[2]) + 'OG' + code(modalVal[3]));
    aTotalTOnewTotal();
    showSearch.innerHTML = '';
    newSearch.value = modalVal[0];
    document.getElementById('expandIcon').setAttribute('name', icoExp);
    refreshData(false);
    save();
    updateDB('L1', 'B1');
    
    setTimeout(() => {
        if (!btnToast) {
            btnToast = true;
            aTotal = aTotalTemp;
            aTotalTOnewTotal();
            save();
            showSearch.innerHTML = '';
            newSearch.value = modalVal[0];
            refreshData(false);
            if (showSearch.innerHTML == '') newSearch.value = '';
            updateDB('L1', 'B1');
        }
    }, timeUndo);
    return;
    // closeAlert = false;

}


function buttonModalDelete() {
    buttonModalCancel();
    let aTotalTemp = localStorage.getItem('L1').split('GD')[3].split('Q0');
    aTotalTemp.pop();

    presentToast(`"${cuPath[0]}" eliminado.`, (timeUndo-500), 'danger', true);

    aTotal.splice(reemplace / 5, 1);
    aTotalTOnewTotal();
    save();
    updateDB('L1', 'B1');
    document.getElementById('expandIcon').setAttribute('name', icoExp);


    if (newSearch.value == '') {
        showSearch.innerHTML = '';
        showIcon.setAttribute('name', icoHide);
        expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
        for (i = 0; i < newTotal.length; i += 5) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
        }
    } else {
        refreshData(false);
    }


    setTimeout(() => {
        if (!btnToast) {
            btnToast = true;
            aTotal = aTotalTemp;
            aTotalTOnewTotal();
            save();
            showSearch.innerHTML = '';
            newSearch.value = cuPath[0];
            refreshData(false);
            if (showSearch.innerHTML == '') newSearch.value = '';
            updateDB('L1', 'B1');
        }
    }, timeUndo);
    return;
}

function buttonModalChanges(text, toast = true) {
    buttonModalCancel();
    splitInit();
    aTotalTOnewTotal();

    localStorage.setItem('accessTempData', `${txt[0]}GD${txt[1]}GD${txt[2]}GD`);

    document.getElementById('userName').innerHTML = deco(txt[0]);
    showLogin.innerHTML = '';

    if (text == 'rechazar') {
        if (localStorage.getItem('offline')) {
            localStorage.removeItem('offline');
            compareChanges = localStorage.getItem('L1');
        }
        localStorage.setItem('L1', (docB1 == newCompareData2) ? compareChanges : newCompareData2);
        updateDB('L1', 'B1');
    } else {
        updateDB('B1', 'L1');
    }

    newSearch.value = '';
    refreshData();
    if (toast) { presentToast((text == 'rechazar') ? 'Cancelando cambios.' : 'Datos actualizados.', '1000', 'black') }
    else { presentToast('Datos offline actualizados', '1000', 'success') };
    setTimeout(() => { window.location.reload() }, 1000);
}


// prox buttonModalSetChanges() ver y escoger cambios;
function buttonModalSetChanges() {

    let txtTemp = (docB1 == newCompareData2) ? compareChanges.split('GD') : newCompareData2.split('GD');;
    aTotalTemp = []; newa = [];

    aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
    aTotalTemp.splice(-1, 1);
    aTotalTemp = aTotalTemp.concat(aTotal);
    aTotalTemp.sort();
    aTotalTemp.push('');

    let aTotalTempLength = aTotalTemp.length;
    for (i = 0; i < aTotalTempLength; i++) {
        (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
    };

    let newaLength = newa.length;
    for (i = 0; i < newaLength - 1; i++) {
        const newaName = newa[i].split('OG');
        const newaName2 = newa[i + 1].split('OG');

        if (newaName[0] == newaName2[0]) {
            arrCompareEdit.push(deco(newaName[0]).toUpperCase());
            i++
        } else {
            (txtTemp[3].includes(newa[i])) ?
                arrCompareDel.push(deco(newaName[0]).toUpperCase()) :
                arrCompareAdd.push(deco(newaName[0]).toUpperCase());
        };
    };

    //parche b5002
    if (arrCompareAdd == '' && arrCompareEdit == '' && arrCompareDel == '') {
        return
    } else {
        document.getElementById('modal').innerHTML = `
        <p id="op1" class="cct">Cambios</p>
        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
        <div class="div_list">
        
        ${listDrop(arrCompareAdd, 'Nuevas')}
        ${listDrop(arrCompareDel, 'Borradas')}
        ${listDrop(arrCompareEdit, 'Editadas')}
        
        </div>
        <input type="button" class="modal_btns" value="CONFIRMAR" onClick="buttonModalChanges('aceptar')">
        <input type="button" class="modal_btns" value="RECHAZAR" onClick="buttonModalChanges('rechazar')">
        `;

        document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');
        document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
    }

}

function buttonModalAccount() {
    buttonModalCancel();
    let modalVal = [
        document.querySelectorAll('.modal_input')[0].value,
        document.querySelectorAll('.modal_input')[1].value,
        document.querySelectorAll('.modal_input')[2].value,
        document.querySelectorAll('.modal_input')[3].value,
    ];

    if (modalVal[1] == '' || modalVal[2] == '') {
        barProgressF('danger', 'determinate');
        alertMsg('Error', 'Datos vacíos.');
        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
        return;
    }

    if (modalVal[0] == deco(txt[0]) && modalVal[1] == deco(txt[1]) && modalVal[2] == deco(txt[2]) && modalVal[3] == deco(txt[4])) {
        return;
    } else {
        presentAlertConfirmEdit(modalVal);
    }
}

// function buttons_modal(func) {

    // if (func == 'ok') {
    //     let modalVal = [
    //         document.querySelectorAll('.modal_input')[0].value,
    //         document.querySelectorAll('.modal_input')[1].value,
    //         document.querySelectorAll('.modal_input')[2].value,
    //         document.querySelectorAll('.modal_input')[3].value,
    //     ];
    //     if (document.getElementById('op1').innerHTML == 'Editar cuenta') { alertEdit2(modalVal, reemplace); }
    //     else if (document.getElementById('op1').innerHTML == 'Agregar cuenta') { alertAdd2(modalVal); }

    // }



    // else if (func === 'aceptar') { updateData('Aceptar', compareChanges); }

    // else if (func === 'rechazar') { updateData('Rechazar', compareChanges); }

    // if (func == 'aceptar_offline') {
    // updateData('Aceptar', compareChanges);
    // localStorage.removeItem('offline');
    // };

    // if (func == 'rechazar_offline') {
    // updateData('Rechazar', compareChanges);
    // localStorage.removeItem('offline');
    // };
    // 
    // if (func === 'verCambios') {}


    // if (func != 'verCambios') { //CANCELAR
    //     multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:0; pointer-events: none');
    //     multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
    //     if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');
    // }



    // if (func == 'ok_datosDeUsuario') {
    //     let modalVal = [
    //         document.querySelectorAll('.modal_input')[0].value,
    //         document.querySelectorAll('.modal_input')[1].value,
    //         document.querySelectorAll('.modal_input')[2].value,
    //         document.querySelectorAll('.modal_input')[3].value,
    //     ];

    //     if (modalVal[1] == '' || modalVal[2] == '') {
    //         barProgressF('danger', 'determinate');
    //         alertMsg('Error', 'Datos vacíos.');
    //         setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
    //         return;
    //     }

    //     if (modalVal[0] == deco(txt[0]) && modalVal[1] == deco(txt[1]) && modalVal[2] == deco(txt[2]) && modalVal[3] == deco(txt[4])) {
    //         //return;
    //     } else {
    //         presentAlertConfirmEdit(modalVal);
    //     }
    // }

    // if (func == 'cancel_datosDeUsuario') {

    //     multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0; pointer-events: auto');
    // }



// }