
//FAB TEST
// document.getElementById('buttonTest').addEventListener('click', () => {
// });


//FAB

document.getElementById('buttonEdit').addEventListener('click', () => {

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Editar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 25px 0px 15px 0px;">
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[0].toLowerCase()}">
    <label class="cce" > Cuenta: </label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[1]}">
    <label class="cce" > Usuario: </label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${cuPath[2]}">
    <label class="cce" > Contraseña: </label>
    <textarea placeholder="Opcional" cols='25' class="ccse modal_input">${cuPath[3]}</textarea>
    <label class="cce noteTextArea"> Notas: </label>
    </p>
    
    <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok')">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">
    
    `;
    // <input type="text" placeholder="Opcional" class="ccse modal_input" value="${cuPath[3]}">
    // <label class="cce" > Notas: </label>
});

document.getElementById('buttonDelete').addEventListener('click', () => {

    multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

    const alert = document.createElement('ion-alert');
    alert.message = `¿Eliminar "${cuPath[0]}"?`;
    alert.buttons = [
        {
            text: 'cancelar',
            handler: () => {
                // AUTOEXPAND
                multipleAttribute(['#nameSetting', '#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');
                // multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');
            }
        },
        {
            text: 'ok',
            handler: () => {
                aTotal.splice(reemplace / 5, 1);
                aTotalTOnewTotal();

                multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
                // AUTOEXPAND
                if (showSearch.innerHTML != '') expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

                if (newSearch.value == '') {

                    // refreshData();
                    showSearch.innerHTML = '';
                    showIcon.setAttribute('name', icoHide);
                    // AUTOEXPAND
                    expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
                    for (i = 0; i < newTotal.length; i += 5) {
                        showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
                    }
                    newTotal.length / 5 == 1 ? (s = '') : (s = 's');
                    presentToast(`${newTotal.length / 5} Cuenta${s} guardad${s}.`, '800', 'dark');

                } else {
                    refreshData();
                }
                save();
                presentToast(`"${cuPath[0]}" eliminado.`, '800', 'danger');
                updateDB('L1', 'B1');
                // multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
                // if (showSearch.innerHTML != '') expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
                closeAlert = false;

                // multipleAttribute(['#nameSetting','#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:1; pointer-events: auto');

            },
        },
    ];

    // multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
    // if (showSearch.innerHTML != '') {
    //     // multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');


    // } else {
    //     document.getElementById('showIcon').setAttribute('name', icoShow);
    //     newSearch.setAttribute('style', 'margin-top:0px');
    //     // multipleAttribute(['#new-s'], 'style', 'opacity:1; margin-top:0px');
    //     newSearch.setFocus();
    //     statSearchBar = true;
    //     testExpand = true;
    //     newSearch.value = '';
    // }

    document.body.appendChild(alert);
    return alert.present();
});

document.getElementById('nameSetting').addEventListener('click', () => {
    const alertPassItem = document.createElement('ion-alert');
    alertPassItem.header = 'Datos de usuario';
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
                    // document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: auto');
                    // document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
                    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');


                    document.getElementById('modal').innerHTML =
                        `
                        <p id="op1" class="cct">Datos de usuario</p>
                        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
                        <p style="margin: 0px 0px 15px 0px;">
                        <input type="text" placeholder="Opcional" class="ccse modal_input" value="${deco(txt[0])}">
                        <label class="cce" > Nombre: </label>
                        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${deco(txt[1])}">
                        <label class="cce" > Email: </label>
                        <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="${deco(txt[2])}">
                        <label class="cce" > Contraseña: </label>
                        <input type="text" placeholder="Opcional" class="ccse modal_input" value="${deco(txt[4])}">
                        <label class="cce" > PIN: </label>
                        </p>

                        <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok_datosDeUsuario')">
                        <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel_datosDeUsuario')">
                    `;

                } else {
                    // barProgressF('warning', )
                    presentToast('Contraseña incorrecta.', '800', 'warning');
                }
            },
        },
    ];
    document.body.appendChild(alertPassItem);
    return alertPassItem.present();
    // }
});


document.getElementById('expandCard').addEventListener('click', () => {


    expandIcon.setAttribute('name', (expandIcon.getAttribute('name') == icoExp) ? icoCom : icoExp);
    // if (newSearch.value == '') {
    //     const newTotalLength = newTotal.length;
    //     showSearch.innerHTML = '';
    //     for (i = 0; i < newTotalLength; i += 5) {
    //         showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
    //     }
    // } else {
    //     refreshData(false);
    // }

    let cards = document.getElementsByTagName('ion-card-header');
    // let cards = document.getElementsByClassName('ionCardHeader');
    let vuelta = cards.length;
    for (let i = 0; i < vuelta; i++) {
        cards[i].classList.toggle('btnExpandCard');
    }
    // for (let i in cards){
    //     cards[i].classList.toggle('btnExpandCard');
    // } 

    // newSub1.classList.toggle('.nowrap');

});

document.getElementById('showCard').addEventListener('click', () => {

    newSearch.value = '';
    if (showIcon.getAttribute('name') == icoShow) {
        showIcon.setAttribute('name', icoHide);
        // AUTOEXPAND
        expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

        const newTotalLength = newTotal.length;
        for (i = 0; i < newTotalLength; i += 5) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
        }
        let s = (newTotalLength / 5 == 1) ? '' : 's';
        presentToast(`${newTotalLength / 5} Cuenta${s} guardada${s}.`, '800', 'dark');
    } else {
        showIcon.setAttribute('name', icoShow);
        showSearch.innerHTML = '';
        // AUTOEXPAND
        expandCard.setAttribute('style', 'opacity:0; pointer-events: none');
        expandIcon.setAttribute('name', icoExp);
    };
});

document.getElementById('buttonSearch').addEventListener('click', () => {
    if (statSearchBar) {
        newSearch.setAttribute('style', 'margin-top:-60px');
        statSearchBar = false;
    } else {
        newSearch.value = '';
        newSearch.setAttribute('style', 'margin-top:0px');
        newSearch.setFocus();
        statSearchBar = true;
    }
})

document.getElementById('buttonAdd').addEventListener('click', () => {


    multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');
    multipleAttribute(['#nameSetting', '#showCard', '#buttonSearch', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    // AUTOEXPAND
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Agregar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 25px 0px 0px 0px;">

    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    <label class="cce" > Cuenta:</label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    <label class="cce" > Usuario:</label>
    <input type="text" placeholder="Obligatorio" class="ccse modal_input" value="">
    <label class="cce" > Contraseña:</label>
    <textarea placeholder="Opcional" cols='25' class="ccse modal_input"></textarea>
    <label class="cce noteTextArea" > Notas:</label>
    </p>

    <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok')">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">

    `;

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');
    // alertcompare = false;
});


