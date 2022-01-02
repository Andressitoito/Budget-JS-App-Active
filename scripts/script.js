$(document).ready(function () {
    /* /////////////////////////////// */
    /* SELECTORS */
    /* SELECTORS PANTALLA PRINCIPAL*/
    const presupuesto_titulo = document.querySelector('.presupuesto-titulo')
    const ingreso_name = document.querySelector('#ingreso-name')
    const main_presupuesto_resto = document.querySelector('#main-presupuesto-resto')
    const main_presupuesto_base = document.querySelector('#main-presupuesto-base')
    const ingreso_compras = document.querySelector('#ingreso-compras')
    /* SELECTORS MODAL INGRESO NOMBRE */
    const input_title = document.querySelector('#input-title')
    const title_btn_ok = document.querySelector('#title-btn-ok')
    const title_btn_close = document.querySelector('#title-btn-close')
    /* SELECTORS MODAL INGRESO MAIN PRESUPUESTO BASE */
    const input_monto_base = document.querySelector('#input-monto-base')
    const base_btn_ok = document.querySelector('#base-btn-ok')
    const base_btn_close = document.querySelector('#base-btn-close')
    /* SELECTORS MODAL INGRESO NUEVA COMPRA */
    const input_compra_name = document.querySelector('#input-compra-name')
    const input_compra_monto = document.querySelector('#input-compra-monto')
    const compra_btn_ok = document.querySelector('#compra-btn-ok')
    const compra_btn_close = document.querySelector('#compra-btn-close')
    /* COMPRAS-LIST */
    const compras_list = document.querySelector('.compras-list')
    /* VARIABLES DE CALCULOS */
    let monto_base = 0
    let resto = 0
    let gastado = 0

    /* /////////////////////////////// */
    /* MODALS */
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.querySelector('#overlay')

    // $('[data-modal-target]').forEach(button => {
    //     button.on('click', () =>{
    //         const modal = document.querySelector(button.dataset.modalTarget)
    //         openModal(modal)
    //     })
    // })

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal(modal) {
        event.preventDefault()
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        event.preventDefault()
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    /* /////////////////////////////// */
    /* CHECKEAR QUE TODA LA PAGINA HAYA CARGADO PRIMERO */
    document.addEventListener('DOMContentLoaded', getCompras(), updateTitle(), updateMonto())

    /* /////////////////////////////// */
    /* FUNCION TOMAR TITULO DEL LOCAL STORAGE */
    function updateTitle() {
        let mainTitle;
        if (localStorage.getItem('mainTitle') === null) {
            mainTitle = []
        } else {
            mainTitle = JSON.parse(localStorage.getItem('mainTitle'))
        }
        $('.presupuesto-titulo')[0].innerHTML = mainTitle
    }
    /* /////////////////////////////// */
    /* FUNCION TOMAR MONTO BASE DEL LOCAL STORAGE */
    function updateMonto() {
        let montoBase;
        if (localStorage.getItem('montoBase') === null) {
            montoBase = []
        } else {
            montoBase = JSON.parse(localStorage.getItem('montoBase'))
        }
        $('.presupuesto-base')[0].innerHTML = montoBase
        monto_base = montoBase
        resto = parseInt($('#main-presupuesto-resto')[0].innerText)

        if (parseInt(resto) < 0) {
            $('#main-presupuesto-resto').addClass('numero-negativo')
            $('#main-presupuesto-resto').removeClass('numero-positivo')
        } else {
            $('#main-presupuesto-resto').addClass('numero-positivo')
            $('#main-presupuesto-resto').removeClass('numero-negativo')
        }
        if (parseInt($('#main-gastado')[0].innerText) > 0) {
            $('#main-gastado').addClass('numero-negativo')
            $('#main-gastado').removeClass('numero-positivo')
        } else {
            $('#main-gastado').addClass('numero-positivo')
            $('#main-gastado').removeClass('numero-negativo')
        }
    }

    console.log($('#main-presupuesto-resto')[0])
    console.log(resto)

    /* /////////////////////////////// */
    /* EVENTS LISTENERS Y FUNCIONES*/
    /* MODAL TITULO */
    title_btn_ok.addEventListener('click', () => {
        event.preventDefault()
        presupuesto_titulo.innerHTML = input_title.value
    }
    )

    /* delete new branch */


    /* MODAL MONTO BASE */
    base_btn_ok.addEventListener('click', () => {
        event.preventDefault()
        // if (input_monto_base.value == '' || isNaN(input_monto_base.value)) {
        //     alert('ingrese un numero valido')
        //     monto_base = 0
        // } else {}
            updateMonto()
            monto_base = parseInt(input_monto_base.value)
            let resto_actualizado
            let monto_actualizado = 0
            let compras
            if (localStorage.getItem('compras') === null) {
                compras = []
            } else {
                compras = JSON.parse(localStorage.getItem('compras'))
            }
            compras.forEach(function (compra) {
                parseInt(compra[1])
                monto_actualizado += parseInt(compra[1])
            })
            $('#main-presupuesto-base')[0].innerText = $('#input-monto-base')[0].value
            $('#main-gastado')[0].innerText = monto_actualizado
            resto_actualizado = monto_base - monto_actualizado
            $('#main-presupuesto-resto')[0].innerText = resto_actualizado

            updateMonto()


            if (parseInt(resto) < 0) {
                $('#main-presupuesto-resto').addClass('numero-negativo')
                $('#main-presupuesto-resto').removeClass('numero-positivo')
            } else {
                $('#main-presupuesto-resto').addClass('numero-positivo')
                $('#main-presupuesto-resto').removeClass('numero-negativo')
            }
            if (parseInt($('#main-gastado')[0].innerText) > 0) {
                $('#main-gastado').addClass('numero-negativo')
                $('#main-gastado').removeClass('numero-positivo')
            } else {
                $('#main-gastado').addClass('numero-positivo')
                $('#main-gastado').removeClass('numero-negativo')
            }


       

    }
    )

    /* MODAL NUEVA COMPRA */
    compra_btn_ok.onclick = () => {
        event.preventDefault()
        // CORROBORAR QUE NO HAYA CAMPOS VACIOS
        if (input_compra_name.value == '' || input_compra_monto.value == '') {
            alert('No deje campos vacios')
        } else if (isNaN(input_compra_monto.value)) {
            alert('Valor incorrecto')
        } else {
            // CREAR NUEVA COMPRA
            const compraNueva = document.createElement('div')
            compraNueva.classList.add('compra-nueva')
            // CREAR NUEVO LI MONTO
            const compraMonto = document.createElement('li')
            compraMonto.innerText = input_compra_monto.value
            if (input_compra_monto.value < 0) {
                compraMonto.classList.add('numero-positivo')
            } else {
                compraMonto.classList.add('numero-negativo')
            }
            compraMonto.classList.add('compra-monto')
            compraNueva.appendChild(compraMonto)
            // CREAR NUEVO LI ITEM
            const compraItem = document.createElement('li')
            compraItem.innerText = input_compra_name.value
            compraItem.classList.add('compra-item')
            compraNueva.appendChild(compraItem)
            /* ///////////////////////// */
            /* LOCAL STORAGE SAVE */
            saveCompraLocal(input_compra_name.value, input_compra_monto.value)
            // CREAR NUEVO TRASH BUTTON
            const trashButton = document.createElement('button')
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add('trash-btn')
            compraNueva.appendChild(trashButton)
            // COMPRA NUEVA COMO NUEVO ITEM EN LA LISTA
            compras_list.appendChild(compraNueva)
            // BORRAR DATOS DE LOS VALUES
            input_compra_monto.value = ''
            input_compra_name.value = ''
            // ACTUALIZAR VISUALMENTE LA COMPRA
            updateMonto()

            let resto_actualizado
            let monto_actualizado = 0
            let compras
            if (localStorage.getItem('compras') === null) {
                compras = []
            } else {
                compras = JSON.parse(localStorage.getItem('compras'))
            }
            compras.forEach(function (compra) {
                parseInt(compra[1])
                monto_actualizado += parseInt(compra[1])
            })
            $('#main-gastado')[0].innerText = monto_actualizado
            resto_actualizado = monto_base - monto_actualizado
            $('#main-presupuesto-resto')[0].innerText = resto_actualizado

            updateMonto()

            if (parseInt(resto) < 0) {
                $('#main-presupuesto-resto').addClass('numero-negativo')
                $('#main-presupuesto-resto').removeClass('numero-positivo')
            } else {
                $('#main-presupuesto-resto').addClass('numero-positivo')
                $('#main-presupuesto-resto').removeClass('numero-negativo')
            }
            if (parseInt($('#main-gastado')[0].innerText) > 0) {
                $('#main-gastado').addClass('numero-negativo')
                $('#main-gastado').removeClass('numero-positivo')
            } else {
                $('#main-gastado').addClass('numero-positivo')
                $('#main-gastado').removeClass('numero-negativo')
            }


        }
    }

    /* ///////////////////////// */
    /* BORRAR COMPRAS */
    /* BORRAR COSAS DEL CSS VISUALMENTE */
    compras_list.addEventListener('click', deleteCompra)
    function deleteCompra(event) {
        const item = event.target
        if (item.classList[0] === 'trash-btn') {
            const compra = item.parentElement
            // console.log(item.parentElement)
            /* ADD ANIMATION */
            compra.classList.add('fall')
            removeCompraLocal(compra)
            /* REMOVE ITEM */
            compra.addEventListener('transitionend', function () {
                compra.remove()
            })
        }
    }
    /* BORRAR COSAS DE LA MEMORIA LOCAL */
    function removeCompraLocal(compra) {
        let compras

        if (localStorage.getItem('compras') === null) {
            compras = []
        } else {
            compras = JSON.parse(localStorage.getItem('compras'))
        }

        console.log(compra.children[1].innerHTML)
        let monto_compra_borrar = compra.children[0].innerHTML
        let nombre_compra_borrar = compra.children[1].innerHTML
        console.log(compras)
        let i = 0

        for (let j = 0; j < compras.length; ++j) {
            // console.log('++++++++++++ ' + compras[j][0])
            // console.log('++++++++++++ ' + compras[j][1])

            if (compras[j][1] == monto_compra_borrar && compras[j][0] == nombre_compra_borrar) {
                break
            }
            i++
        }
        // compras.for(c => {
        //     console.log(c[1])
        //     if (c[1] == monto_compra_borrar) {
        //         i++
        //         console.log('hola')
        //     }
        // })
        compras.splice(i, 1)
        localStorage.setItem('compras', JSON.stringify(compras))

        updateMonto()
        let resto_actualizado
        let monto_actualizado = 0
        if (localStorage.getItem('compras') === null) {
            compras = []
        } else {
            compras = JSON.parse(localStorage.getItem('compras'))
        }
        compras.forEach(function (compra) {
            parseInt(compra[1])
            monto_actualizado += parseInt(compra[1])
        })
        $('#main-gastado')[0].innerText = monto_actualizado
        resto_actualizado = monto_base - monto_actualizado
        $('#main-presupuesto-resto')[0].innerText = resto_actualizado

        updateMonto()

        if (parseInt(resto) < 0) {
            $('#main-presupuesto-resto').addClass('numero-negativo')
            $('#main-presupuesto-resto').removeClass('numero-positivo')
        } else {
            $('#main-presupuesto-resto').addClass('numero-positivo')
            $('#main-presupuesto-resto').removeClass('numero-negativo')
        }
        if (parseInt($('#main-gastado')[0].innerText) > 0) {
            $('#main-gastado').addClass('numero-negativo')
            $('#main-gastado').removeClass('numero-positivo')
        } else {
            $('#main-gastado').addClass('numero-positivo')
            $('#main-gastado').removeClass('numero-negativo')
        }



    }
    // console.log(parseInt($('#main-presupuesto-resto')[0].innerText))



    /* ///////////////////////// */
    /* LOCAL STORAGE SAVE COMPRAS*/
    function saveCompraLocal(compra, monto) {
        let compras

        if (localStorage.getItem('compras') === null) {
            compras = []
        } else {
            compras = JSON.parse(localStorage.getItem('compras'))
        }
        compras.push([compra, monto])
        localStorage.setItem('compras', JSON.stringify(compras))
    }

    /* ///////////////////////// */
    /* LOCAL STORAGE GET COMPRAS */
    function getCompras() {
        let compras
        let montoTotal = 0
        if (localStorage.getItem('compras') === null) {
            compras = []
        } else {
            compras = JSON.parse(localStorage.getItem('compras'))
        }
        compras.forEach(function (compra, monto) {
            // CREAR NUEVA COMPRA
            const compraNueva = document.createElement('div')
            compraNueva.classList.add('compra-nueva')
            // CREAR NUEVO LI MONTO
            const compraMonto = document.createElement('li')
            compraMonto.innerText = compra[1]
            if (compraMonto.innerText < 0) {
                compraMonto.classList.add('numero-positivo')
            } else {
                compraMonto.classList.add('numero-negativo')
            }
            compraMonto.classList.add('compra-monto')
            compraNueva.appendChild(compraMonto)
            // CREAR NUEVO LI ITEM
            const compraItem = document.createElement('li')
            compraItem.innerText = compra[0]
            compraItem.classList.add('compra-item')
            compraNueva.appendChild(compraItem)
            // CREAR NUEVO TRASH BUTTON
            const trashButton = document.createElement('button')
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add('trash-btn')
            compraNueva.appendChild(trashButton)
            // COMPRA NUEVA COMO NUEVO ITEM EN LA LISTA
            compras_list.appendChild(compraNueva)
            updateMonto()



            if (parseInt(resto) < 0) {
                $('#main-presupuesto-resto').addClass('numero-negativo')
                $('#main-presupuesto-resto').removeClass('numero-positivo')
            } else {
                $('#main-presupuesto-resto').addClass('numero-positivo')
                $('#main-presupuesto-resto').removeClass('numero-negativo')
            }
            if (parseInt($('#main-gastado')[0].innerText) > 0) {
                $('#main-gastado').addClass('numero-negativo')
                $('#main-gastado').removeClass('numero-positivo')
            } else {
                $('#main-gastado').addClass('numero-positivo')
                $('#main-gastado').removeClass('numero-negativo')
            }



        })

        /* ///////////////////////// */
        /* LOCAL STORAGE REFRESH SUMA TOTAL Y RESTO  */
        compras.forEach(function (compra) {
            montoTotal += parseInt(compra[1])
        })
        $('#main-gastado')[0].innerText = montoTotal
        let montoBase
        if (localStorage.getItem('montoBase') === null) {
            montoBase = []
        } else {
            montoBase = JSON.parse(localStorage.getItem('montoBase'))
        }
        $('#main-presupuesto-resto')[0].innerText = parseInt(montoBase - $('#main-gastado')[0].innerText)

        updateMonto()

        if (parseInt(resto) < 0) {
            $('#main-presupuesto-resto').addClass('numero-negativo')
            $('#main-presupuesto-resto').removeClass('numero-positivo')
        } else {
            $('#main-presupuesto-resto').addClass('numero-positivo')
            $('#main-presupuesto-resto').removeClass('numero-negativo')
        }
        if (parseInt($('#main-gastado')[0].innerText) > 0) {
            $('#main-gastado').addClass('numero-negativo')
            $('#main-gastado').removeClass('numero-positivo')
        } else {
            $('#main-gastado').addClass('numero-positivo')
            $('#main-gastado').removeClass('numero-negativo')
        }



    }


    /* ///////////////////////// */
    /* LOCAL STORAGE SAVE TITULO */
    function saveMainTitle(title) {
        let mainTitle;
        if (localStorage.getItem('mainTitle') === null) {
            mainTitle = []
        } else {
            mainTitle = JSON.parse(localStorage.getItem('mainTitle'))
        }
        localStorage.removeItem('mainTitle')
        if (localStorage.getItem('mainTitle') === null) {
            mainTitle = []
        } else {
            mainTitle = JSON.parse(localStorage.getItem('mainTitle'))
        }
        mainTitle.push([title])
        localStorage.setItem('mainTitle', JSON.stringify(title))
    }

    $('#title-btn-ok').click(function () {
        saveMainTitle($('#input-title')[0].value)
    })

    /* ///////////////////////// */
    /* LOCAL STORAGE SAVE MONTO BASE */
    function saveMontoBase(monto) {
        let montoBase;
        if (localStorage.getItem('montoBase') === null) {
            montoBase = []
        } else {
            montoBase = JSON.parse(localStorage.getItem('montoBase'))
        }
        localStorage.removeItem('montoBase')
        if (localStorage.getItem('montoBase') === null) {
            montoBase = []
        } else {
            montoBase = JSON.parse(localStorage.getItem('montoBase'))
        }
        montoBase.push([monto])
        localStorage.setItem('montoBase', JSON.stringify(monto))


        updateMonto()

        if (parseInt(resto) < 0) {
            $('#main-presupuesto-resto').addClass('numero-negativo')
            $('#main-presupuesto-resto').removeClass('numero-positivo')
        } else {
            $('#main-presupuesto-resto').addClass('numero-positivo')
            $('#main-presupuesto-resto').removeClass('numero-negativo')
        }
        if (parseInt($('#main-gastado')[0].innerText) > 0) {
            $('#main-gastado').addClass('numero-negativo')
            $('#main-gastado').removeClass('numero-positivo')
        } else {
            $('#main-gastado').addClass('numero-positivo')
            $('#main-gastado').removeClass('numero-negativo')
        }



    }

    $('#base-btn-ok').click(function () {
        if (input_monto_base.value == '' || isNaN(input_monto_base.value)) {
            alert('ingrese un numero valido')
        } else {
            saveMontoBase($('#input-monto-base')[0].value)
        }
    })

})
