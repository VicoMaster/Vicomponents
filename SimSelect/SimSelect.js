/**
 * Autor: Andres Rivera (github.com/VicoMaster)
 * Description:
 */
class SimSelect extends HTMLElement {
    constructor() {
        super();
        this._loading = true;  // True para modo loading
        this._mode = 'loading';  // primera carga:'preview' - carga de data: 'data' - loading Skeleton: 'loading'
        this._options = [];  // Contiene las opciones marcadas. Primera carga:['preview']*3, carga de data: [this._maxSelectedOptions]
        this._data = undefined;  // Data del componente por defecto en blanco para evitar errores
        this._userMessage = 'Cargando...';
        this._idSimSelect = '';  // ID unico para cada simSelect
        this._toggleDropDown = undefined  // Instancia del component para el evento #_toggleDropDown en shadowroot
        this._hideDropDown = undefined  // Instancia del component para el evento #_hideDropDown en document
        this._hideDropDownKey = undefined // Instancia del component para el evento #_hideDropDownKey en document
        this._deleOptionKey = undefined // Instancia del component para el evento #_deleOptionKey en input
        this._maxSelectedOptions = 4;  // # máximo de options selected para pintar en Head
        this._focusInput = undefined; // Instancia del component para el evento #_hideDropDownKey en SIMSELECT
        this._findTextInput = undefined; // Instancia del component para el evento #_findTextInput en INPUT
        this._zIndex = undefined;  // Guardamos el z-index establecido al componente para el nuevo render()
        this._placeHolder = 'Escriba una opción | Enter an option';
        // Colores
        this._colors = {
            primary: "rgba(11,162,112,1)",
            secundary: "#0ba270",
            disable: "#CCCCCC",
            textprimary: "#1C1C1C",
            textSecundary: "#0ba270",
            shadowColor: "rgba(204,204,204,.7)",
            optionBg: "rgba(199,206,215,1)",
            optionGroupBg: "rgba(11,162,112,1)",
            white: "#ffffff",
        };
        // Tamannos
        this._size = {
            title: "1.4em",
            icons: "20px",
            normal: "1.6em",
            mini: "1.2em",
            'padding-left-right': "1.5em",
        }
        // Iconos
        this._icons = {
            svgCollapseDown: `<svg class="simselect-collapse cpointer" width="20" height="20" viewBox="0 0 24 24" fill="none"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="${this._colors.primary}"> </path> </g> </svg>`,
            svgCleanOption: `<svg class='simselect-buttomclean' width="20" height="20" viewBox="0 0 24 24" fill="none"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <g> <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="${this._colors.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`,
            svgEmpty: `<svg class="cpointer svgEmpty" fill="${this._colors.primary}" height="20" width="20" viewBox="0 0 32 32" stroke="${this._colors.primary}" stroke-width="0.096" transform="matrix(1, 0, 0, 1, 0, 0)"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M16,32A16,16,0,1,0,0,16,16,16,0,0,0,16,32ZM16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2Z"></path> </g></svg>`,
            svgFullCircle: `<svg class="cpointer svgFullCircle" fill="${this._colors.primary}" height="20" width="20" viewBox="0 0 512 512" stroke="${this._colors.primary}"stroke-width="6"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.072"></g><g> <g> <path d="M474.045,173.813c-4.201,1.371-6.494,5.888-5.123,10.088c7.571,23.199,11.411,47.457,11.411,72.1 c0,62.014-24.149,120.315-68,164.166s-102.153,68-164.167,68s-120.316-24.149-164.167-68S16,318.014,16,256 S40.149,135.684,84,91.833s102.153-68,164.167-68c32.889,0,64.668,6.734,94.455,20.017c28.781,12.834,54.287,31.108,75.81,54.315 c3.004,3.239,8.066,3.431,11.306,0.425c3.24-3.004,3.43-8.065,0.426-11.306c-23-24.799-50.26-44.328-81.024-58.047 C317.287,15.035,283.316,7.833,248.167,7.833c-66.288,0-128.608,25.813-175.48,72.687C25.814,127.392,0,189.712,0,256 c0,66.287,25.814,128.607,72.687,175.479c46.872,46.873,109.192,72.687,175.48,72.687s128.608-25.813,175.48-72.687 c46.873-46.872,72.687-109.192,72.687-175.479c0-26.332-4.105-52.26-12.201-77.064 C482.762,174.736,478.245,172.445,474.045,173.813z"> </path> <path d="M504.969,83.262c-4.532-4.538-10.563-7.037-16.98-7.037s-12.448,2.499-16.978,7.034l-7.161,7.161 c-3.124,3.124-3.124,8.189,0,11.313c3.124,3.123,8.19,3.124,11.314-0.001l7.164-7.164c1.51-1.512,3.52-2.344,5.66-2.344 s4.15,0.832,5.664,2.348c1.514,1.514,2.348,3.524,2.348,5.663s-0.834,4.149-2.348,5.663L217.802,381.75 c-1.51,1.512-3.52,2.344-5.66,2.344s-4.15-0.832-5.664-2.348L98.747,274.015c-1.514-1.514-2.348-3.524-2.348-5.663 c0-2.138,0.834-4.149,2.351-5.667c1.51-1.512,3.52-2.344,5.66-2.344s4.15,0.832,5.664,2.348l96.411,96.411 c1.5,1.5,3.535,2.343,5.657,2.343s4.157-0.843,5.657-2.343l234.849-234.849c3.125-3.125,3.125-8.189,0-11.314 c-3.124-3.123-8.189-3.123-11.313,0L212.142,342.129l-90.75-90.751c-4.533-4.538-10.563-7.037-16.98-7.037 s-12.448,2.499-16.978,7.034c-4.536,4.536-7.034,10.565-7.034,16.977c0,6.412,2.498,12.441,7.034,16.978l107.728,107.728 c4.532,4.538,10.563,7.037,16.98,7.037c6.417,0,12.448-2.499,16.977-7.033l275.847-275.848c4.536-4.536,7.034-10.565,7.034-16.978 S509.502,87.794,504.969,83.262z"> </path> </g></g></svg>`,
        }
        // DATA EXAMPLE
        this._dataExample = [
            { "group": "Legumbres-Legumes", "option": "Lentejas-Lentils", "value": "Lentejas-Lentils" },
            { "group": "Legumbres-Legumes", "option": "Frijoles negros-Black beans", "value": "Frijoles negros-Black beans" },
            { "group": "Legumbres-Legumes", "option": "Garbanzos-Chickpeas", "value": "Garbanzos-Chickpeas" },
            { "group": "Legumbres-Legumes", "option": "Arvejas-Peas", "value": "Arvejas-Peas" },
            { "group": "Legumbres-Legumes", "option": "Habas-Fava beans", "value": "Habas-Fava beans" },
            { "group": "Tubérculos-Tubers", "option": "Papa-Potato", "value": "Papa-Potato" },
            { "group": "Tubérculos-Tubers", "option": "Batata-Sweet potato", "value": "Batata-Sweet potato" },
            { "group": "Tubérculos-Tubers", "option": "Yuca-Cassava", "value": "Yuca-Cassava" },
            { "group": "Tubérculos-Tubers", "option": "Ñame-Yam", "value": "Ñame-Yam" },
            { "group": "Tubérculos-Tubers", "option": "Jícama-Jicama", "value": "Jícama-Jicama" },
            { "group": "Frutas-Fruits", "option": "Manzana-Apple", "value": "Manzana-Apple" },
            { "group": "Frutas-Fruits", "option": "Banano-Banana", "value": "Banano-Banana" },
            { "group": "Frutas-Fruits", "option": "Naranja-Orange", "value": "Naranja-Orange" },
            { "group": "Frutas-Fruits", "option": "Pera-Pear", "value": "Pera-Pear" },
            { "group": "Frutas-Fruits", "option": "Mango-Mango", "value": "Mango-Mango" },
            { "group": "Vegetales-Vegetables", "option": "Lechuga-Lettuce", "value": "Lechuga-Lettuce" },
            { "group": "Vegetales-Vegetables", "option": "Espinaca-Spinach", "value": "Espinaca-Spinach" },
            { "group": "Vegetales-Vegetables", "option": "Zanahoria-Carrot", "value": "Zanahoria-Carrot" },
            { "group": "Vegetales-Vegetables", "option": "Brocoli-Broccoli", "value": "Brocoli-Broccoli" },
            { "group": "Vegetales-Vegetables", "option": "Coliflor-Cauliflower", "value": "Coliflor-Cauliflower" },
            { "group": "Cereales-Cereals", "option": "Arroz-Rice", "value": "Arroz-Rice" },
            { "group": "Cereales-Cereals", "option": "Avena-Oats", "value": "Avena-Oats" },
            { "group": "Cereales-Cereals", "option": "Maíz-Corn", "value": "Maíz-Corn" },
            { "group": "Cereales-Cereals", "option": "Trigo-Wheat", "value": "Trigo-Wheat" },
            { "group": "Cereales-Cereals", "option": "Cebada-Barley", "value": "Cebada-Barley" }
        ];
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        return ["data", "primarycolor", "sizeicons", "sizetextnormal", "age", "mode", "colors", "placeholder"];
    }
    // [FUNCTIONS]
    get dataExample() {
        return this._dataExample;
    }
    get dataExampleOptions() {
        // [Retornamos (this._dataExample) sin clave (group)]
        return this._dataExample.map(obj => {
            const { group, ...rest } = obj;
            return rest;
        });
    }
    get data() {
        return this._data;
    }
    get mode() {
        return this._mode;
    }
    get selectedOptions() {
        return this._options;
    }
    get userMessage() {
        return this._userMessage;
    }
    get id() {
        return this._idSimSelect;
    }
    get maxSelectedOptions() {
        return this._maxSelectedOptions;
    }
    get colors() {
        return this._colors;
    }
    get placeHolder() {
        return this._placeHolder;
    }
    set data(newData) {
        this.setAttribute('data', JSON.stringify(newData));
    }
    set mode(newMode) {
        this.setAttribute('mode', newMode);
    }
    set userMessage(message) {
        this._userMessage = message;
        this.shadowRoot.querySelector('.simselect-usermessage').textContent = this._userMessage;
    }
    set maxSelectedOptions(newMaxSelectedOptions) {
        this._maxSelectedOptions = newMaxSelectedOptions;
    }
    set colors(params) {
        this.setAttribute('colors', JSON.stringify(params));
    }
    set placeHolder(placeHolder) {
        this.setAttribute('placeholder', placeHolder);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            let atributeCallback = attrName;
            let reRender = true;
            if (attrName === 'data') {
                if (JSON.parse(newVal) !== '') {
                    if (typeof (JSON.parse(newVal)) === 'object') {
                        if ((JSON.parse(newVal)[0].group || JSON.parse(newVal)[0].option) && JSON.parse(newVal)[0].value) {
                            // Falta validar cuando se ingresa una data para grupos pero no tiene options.
                            // No se hace esta validación por ser muy [Obvio]
                            this._data = JSON.parse(newVal);
                            this._loading = false;
                            this._mode = 'data';
                            this._options = [];  // Vaciamos las options selected
                            this._userMessage = 'Seleccione una opción | Select an option';
                            atributeCallback = 'data';
                        } else {
                            reRender = false;
                            console.error('INVALID FORMAT KEY DATA');
                        }
                    } else {
                        reRender = false;
                        console.error('INVALID TYPE DATA');
                    }
                } else {
                    reRender = false;
                    console.error('INVALID NULL DATA');
                }
            }
            if (attrName === "primarycolor") {
                this._colors.primary = newVal;
            }
            if (attrName === "sizeicons") {
                this._size.icons = newVal;
            }
            if (attrName === "sizetextnormal") {
                this._size.normal = newVal;
            }
            if (attrName === "mode") {
                if (newVal === "preview" ||  newVal === "loading") {
                    this._mode = newVal;
                    this._userMessage = 'Modo Preview | Preview Mode';
                    if (newVal === "loading") {
                        this._loading = true;
                        this._data = null;
                        this._options = [];  // Vaciamos las options selected
                        this._userMessage = 'Cargando...';
                    }
                } else {
                    reRender = false;
                    console.error('The value is not valid');
                }
            }
            if (attrName === "colors") {
                const { color = '', value = '' } = JSON.parse(newVal);
                if (color in this._colors) {
                    if (value.includes("#") || value.includes("rgba")) {
                        this._colors[color] = value;
                        this._icons = {
                            svgCollapseDown: `<svg class="simselect-collapse cpointer" width="20" height="20" viewBox="0 0 24 24" fill="none"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="${this._colors.primary}"> </path> </g> </svg>`,
                            svgCleanOption: `<svg class='simselect-buttomclean' width="20" height="20" viewBox="0 0 24 24" fill="none"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <g> <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="${this._colors.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`,
                            svgEmpty: `<svg class="cpointer svgEmpty" fill="${this._colors.primary}" height="20" width="20" viewBox="0 0 32 32" stroke="${this._colors.primary}" stroke-width="0.096" transform="matrix(1, 0, 0, 1, 0, 0)"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M16,32A16,16,0,1,0,0,16,16,16,0,0,0,16,32ZM16,2A14,14,0,1,1,2,16,14,14,0,0,1,16,2Z"></path> </g></svg>`,
                            svgFullCircle: `<svg class="cpointer svgFullCircle" fill="${this._colors.primary}" height="20" width="20" viewBox="0 0 512 512" stroke="${this._colors.primary}"stroke-width="6"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.072"></g><g> <g> <path d="M474.045,173.813c-4.201,1.371-6.494,5.888-5.123,10.088c7.571,23.199,11.411,47.457,11.411,72.1 c0,62.014-24.149,120.315-68,164.166s-102.153,68-164.167,68s-120.316-24.149-164.167-68S16,318.014,16,256 S40.149,135.684,84,91.833s102.153-68,164.167-68c32.889,0,64.668,6.734,94.455,20.017c28.781,12.834,54.287,31.108,75.81,54.315 c3.004,3.239,8.066,3.431,11.306,0.425c3.24-3.004,3.43-8.065,0.426-11.306c-23-24.799-50.26-44.328-81.024-58.047 C317.287,15.035,283.316,7.833,248.167,7.833c-66.288,0-128.608,25.813-175.48,72.687C25.814,127.392,0,189.712,0,256 c0,66.287,25.814,128.607,72.687,175.479c46.872,46.873,109.192,72.687,175.48,72.687s128.608-25.813,175.48-72.687 c46.873-46.872,72.687-109.192,72.687-175.479c0-26.332-4.105-52.26-12.201-77.064 C482.762,174.736,478.245,172.445,474.045,173.813z"> </path> <path d="M504.969,83.262c-4.532-4.538-10.563-7.037-16.98-7.037s-12.448,2.499-16.978,7.034l-7.161,7.161 c-3.124,3.124-3.124,8.189,0,11.313c3.124,3.123,8.19,3.124,11.314-0.001l7.164-7.164c1.51-1.512,3.52-2.344,5.66-2.344 s4.15,0.832,5.664,2.348c1.514,1.514,2.348,3.524,2.348,5.663s-0.834,4.149-2.348,5.663L217.802,381.75 c-1.51,1.512-3.52,2.344-5.66,2.344s-4.15-0.832-5.664-2.348L98.747,274.015c-1.514-1.514-2.348-3.524-2.348-5.663 c0-2.138,0.834-4.149,2.351-5.667c1.51-1.512,3.52-2.344,5.66-2.344s4.15,0.832,5.664,2.348l96.411,96.411 c1.5,1.5,3.535,2.343,5.657,2.343s4.157-0.843,5.657-2.343l234.849-234.849c3.125-3.125,3.125-8.189,0-11.314 c-3.124-3.123-8.189-3.123-11.313,0L212.142,342.129l-90.75-90.751c-4.533-4.538-10.563-7.037-16.98-7.037 s-12.448,2.499-16.978,7.034c-4.536,4.536-7.034,10.565-7.034,16.977c0,6.412,2.498,12.441,7.034,16.978l107.728,107.728 c4.532,4.538,10.563,7.037,16.98,7.037c6.417,0,12.448-2.499,16.977-7.033l275.847-275.848c4.536-4.536,7.034-10.565,7.034-16.978 S509.502,87.794,504.969,83.262z"> </path> </g></g></svg>`,
                        }
                    } else {
                        reRender = false;
                        console.error('The value is not valid');
                    }
                } else {
                    reRender = false;
                    console.error('The Attribute is not valid');
                }
            }
            if (attrName === "placeholder") {
                if (newVal !== '') {
                    this._placeHolder = newVal;
                } else {
                    reRender = false;
                    console.error('The value is not valid');
                }
            }
            if (reRender) {
                console.log(`New Render on Simselect:${this._idSimSelect} - Attribute Changed: ${atributeCallback}`);
                this.#_render();
            }
        }
    }
    #_focusInput() {
        this.shadowRoot.querySelector('.simselect-input').focus();
    }
    #_idGenerator() {
        // [crea un id aleatorio y lo retorna (usado para cada SimSelect y cada option)]
        const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        let newId = '';
        for (let i = 0; i < 5; i++) {
            newId += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
            newId += Math.floor(Math.random() * 10);
        }
        return newId;
    }
    #_removeChildsParent($ELEMENT) {
        // [Elimina todos los hijos y el contenedor recibidos]
        $ELEMENT.classList.add('bye');
        setTimeout(() => {
            while ($ELEMENT.firstChild) {
                $ELEMENT.removeChild($ELEMENT.firstChild);
            }
            $ELEMENT.parentNode.removeChild($ELEMENT);
        }, 200)
    }
    #_markUnmarkOptions(dataId) {
        // [Marca o desmarca la option. Si es marcada crea el article:optionSelected, si es desmarcada elimina el article]
        const OPTION_MARK = this.shadowRoot.querySelector(`[data-id="${dataId}"].simselect-option`);
        // ICONO FULL o EMPTY
        const SVG_ICON = OPTION_MARK.parentNode.querySelector('svg');
        const TEMPORAL_DIV = document.createElement('div');
        TEMPORAL_DIV.innerHTML = this._icons.svgEmpty;
        SVG_ICON.parentNode.replaceChild(TEMPORAL_DIV.firstChild.cloneNode(true), SVG_ICON);
    }
    #_deleteLastOptionSelected(event) {
        // [Elimina la ultima optionSelected dentro del Head, accionada con tecla RETROCESO]
        const INPUT = this.shadowRoot.querySelector('.simselect-input');
        if (event.key === 'Backspace' && INPUT.value === '') {
            const OPTIONS_SELECTED_LIST = [];
            this.shadowRoot.querySelector('.simselect-selectedOptions').childNodes.forEach(element => {
                if (element.nodeName === 'ARTICLE') {
                    OPTIONS_SELECTED_LIST.push(element);
                }
            });
            if (OPTIONS_SELECTED_LIST.length > 0) {
                const OPTION_CLEAN = OPTIONS_SELECTED_LIST.pop();
                OPTION_CLEAN.classList.add('bye');
                const OPTION_ID = OPTION_CLEAN.getAttribute('data-id');
                // Retornamos index del optionSelected dentro de [this._options]
                const getIndexOption = (options, idOption) => {
                    for (let i = 0; i < options.length; i++) {
                        if (options[i]['data-id'] === idOption) {
                            return i;
                        }
                    }
                    return -1; // Si no se encuentra el objeto, devolvemos -1
                }
                // Eliminamos la optionSelected de [this._options]
                this._options.splice(getIndexOption(this._options, OPTION_ID), 1);
                // Eliminamos optionSelected
                this.#_removeChildsParent(OPTION_CLEAN);
                // Desmarcamos la option dentro del Dropdown
                this.#_markUnmarkOptions(OPTION_CLEAN.getAttribute('data-id'));
            }
        }
    }
    #_cleanSelectedOption(event) {
        // [Elimina la optionSelected accionada]
        let countLoop = 0;
        let nodeName = event.target.parentElement.nodeName;
        let $actualNode = event.target.parentElement;
        while (nodeName !== 'ARTICLE' && countLoop < 99) {
            $actualNode = $actualNode.parentElement;
            nodeName = $actualNode.nodeName;
            countLoop += 1;
        }
        if (countLoop >= 99) {
            console.error('MAX LOOP');
        }
        const OPTION_ID = $actualNode.getAttribute('data-id');
        // Retornamos index del optionSelected dentro de [this._options]
        const getIndexOption = (options, idOption) => {
            for (let i = 0; i < options.length; i++) {
                if (options[i]['data-id'] === idOption) {
                    return i;
                }
            }
            return -1; // Si no se encuentra el objeto, devolvemos -1
        }
        // Eliminamos la optionSelected de [this._options]
        this._options.splice(getIndexOption(this._options, OPTION_ID), 1);
        // Eliminamos optionSelected
        this.#_removeChildsParent($actualNode);
        // Desmarcamos la option dentro del Dropdown
        this.#_markUnmarkOptions($actualNode.getAttribute('data-id'));
    }
    #_createSelectedOption(event) {
        // [Crea un elemento article con la option seleccionada y lo inserta dentro de simselect-selectedOptions]
        // Si es vista 'preview' crea un article vacio de preview y lo inserta en simselect-selectedOption
        // Si no es vista 'preview' y this._loading es true, no crea nada.
        if (this._loading && this._mode !== 'preview') {
            console.warn('DATA LOADING...');
        } else {
            let loading = 'loading';
            if (!this._loading) {
                loading = '';
            }
            const PARENT_CONTAINER = event.target.closest('.simselect-option-container');
            // Detectamos si se debe eliminar la optionSelected o crear por medio del ICONO FULL o EMPTY 
            const SVG_ICON = PARENT_CONTAINER.querySelector('svg');
            const TEMPORAL_DIV = document.createElement('div');
            if (SVG_ICON.classList.contains('svgEmpty')) {
                // Si es icono Empty deberá crearse una optionSelected
                TEMPORAL_DIV.innerHTML = this._icons.svgFullCircle;
                SVG_ICON.parentNode.replaceChild(TEMPORAL_DIV.firstChild.cloneNode(true), SVG_ICON);
                // AÑADIMOS LA OPTION AL HEAD
                const $CONTAINER_SELECTED_OPTIONS = this.shadowRoot.querySelector('.simselect-selectedOptions');
                const $INPUT = $CONTAINER_SELECTED_OPTIONS.querySelector(".simselect-input");
                if (this._mode === 'preview') {
                    const OPTION = PARENT_CONTAINER.querySelector('.simselect-option');
                    const OPTION_ID = OPTION.getAttribute('data-id');
                    let option = `<article class="selectedOption cpointer ${loading}" data-group="preview" data-value="preview" data-id="${OPTION_ID}">${'&nbsp;'.repeat(10)} ${this._icons.svgCleanOption}</article>`;
                    let tempRange = document.createRange();
                    let articleNode = tempRange.createContextualFragment(option).firstChild;
                    // Añadimos evento click a la nueva optionSelected
                    articleNode.querySelector('.simselect-buttomclean').addEventListener('click', this.#_cleanSelectedOption.bind(this));
                    // Añadimos la data a la instancia
                    const NEW_REGISTRY = { 'group': 'preview', 'option': `Preview`, 'value': 'preview', 'data-id': OPTION_ID };
                    this._options.push(NEW_REGISTRY)
                    // Insertamos en DOM 
                    $CONTAINER_SELECTED_OPTIONS.insertBefore(articleNode, $INPUT);
                }
                if (this._mode === 'data') {
                    const OPTION = PARENT_CONTAINER.querySelector('.simselect-option');
                    // INSERTAMOS LOS DATOS SELECCIONADOS
                    const TEXT_OPTION = OPTION.textContent;
                    const GROUP_OPTION = OPTION.getAttribute('data-group');
                    const VALUE_OPTION = OPTION.getAttribute('data-value');
                    const OPTION_ID = OPTION.getAttribute('data-id');
                    let option = `<article class="selectedOption cpointer ${loading}" data-group="${GROUP_OPTION}" data-value="${VALUE_OPTION}" data-id="${OPTION_ID}">${TEXT_OPTION} ${this._icons.svgCleanOption}</article>`;
                    let tempRange = document.createRange();
                    let articleNode = tempRange.createContextualFragment(option).firstChild;
                    // Añadimos evento click a la nueva optionSelected
                    articleNode.querySelector('.simselect-buttomclean').addEventListener('click', this.#_cleanSelectedOption.bind(this));
                    // Añadimos la data a la instancia
                    const NEW_REGISTRY = { 'group': GROUP_OPTION, 'option': TEXT_OPTION, 'value': VALUE_OPTION, 'data-id': OPTION_ID };
                    this._options.push(NEW_REGISTRY)
                    // Insertamos en DOM 
                    $CONTAINER_SELECTED_OPTIONS.insertBefore(articleNode, $INPUT);
                }
            } else if (SVG_ICON.classList.contains('svgFullCircle')) {
                TEMPORAL_DIV.innerHTML = this._icons.svgEmpty;
                SVG_ICON.parentNode.replaceChild(TEMPORAL_DIV.firstChild.cloneNode(true), SVG_ICON);
                // Si es icono FULL deberá eliminarse la option del HEAD
                //Identificamos la optionSelected por medio del data-id del target
                const OPTION_DROPDOWN = PARENT_CONTAINER.querySelector('.simselect-option');
                const OPTION_ID = OPTION_DROPDOWN.getAttribute('data-id');
                const OPTION_SELECTED = this.shadowRoot.querySelector(`article.selectedOption[data-id="${OPTION_ID}"]`);
                // Retornamos index del optionSelected dentro de [this._options]
                const getIndexOption = (options, idOption) => {
                    for (let i = 0; i < options.length; i++) {
                        if (options[i]['data-id'] === idOption) {
                            return i;
                        }
                    }
                    return -1; // Si no se encuentra el objeto, devolvemos -1
                }
                // Eliminamos la optionSelected de [this._options]
                this._options.splice(getIndexOption(this._options, OPTION_ID), 1);
                // Eliminamos optionSelected
                this.#_removeChildsParent(OPTION_SELECTED);
            }
        }
    }
    #_createFirstSelectedOptions() {
        // [Acciona evento click [this._maxSelectedOptions] en options del primer grupo para pintar como seleccionadas] => ARRAY['<article>','<article>']
        // Las siguientes validaciones evitan que se creen selectedOptions en modo LOADING SKELETON
        if (this._mode !== 'preview' && this._mode !== 'loading' && !this._loading) {
            // Se ejecuta luego de primera carga [Modo Preview]
            this.shadowRoot.querySelectorAll('.simselect-option-container').forEach((option, index) => {
                if (index < this._maxSelectedOptions) {
                    option.click();
                }
            });
        }
        // Primera carga [Modo Preview] - evita que se ejecuten clicks en modo=loading
        if (this._mode == 'preview' && this._loading) {
            this.shadowRoot.querySelectorAll('.simselect-option-container').forEach((option, index) => {
                if (index < this._maxSelectedOptions) {
                    option.click();
                }
            });
        }
        return ['ok']
    }
    #_createGroupContainer() {
        // Creado con [chatGPT-gpt4] & Modificado a criterio
        // Genera el contenido del Dropdown donde se genera un article por cada grupo que contiene un div por cada option del grupo.
        const uniqueGroups = [...new Set(this._data.map(item => item.group))];
        const simselectContainers = [];
        // Crea un contenedor para cada grupo y sus opciones
        uniqueGroups.forEach(group => {
            const groupContainer = document.createElement("article");
            groupContainer.classList.add("simselect-group-container");
            // Crea el elemento de texto para el grupo
            const groupSpan = document.createElement("span");
            groupSpan.classList.add("simselect-group");
            groupSpan.textContent = group;
            groupContainer.appendChild(groupSpan);
            // Obtiene las opciones del grupo
            const groupOptions = this._data.filter(item => item.group === group);
            // Crea un contenedor para cada opción del grupo
            groupOptions.forEach(option => {
                const optionDiv = document.createElement("div");
                optionDiv.classList.add("simselect-option-container");
                // Crea el icono de la opción
                const iconSvg = document.createElement("div");
                iconSvg.innerHTML = this._icons.svgEmpty;
                optionDiv.appendChild(iconSvg);
                // Crea el elemento de texto para la opción
                const optionSpan = document.createElement("span");
                optionSpan.classList.add("simselect-option", "cpointer");
                optionSpan.textContent = option.option;
                optionSpan.setAttribute("data-value", option.value);
                optionSpan.setAttribute("data-group", group);
                let idOption = this.#_idGenerator();
                optionSpan.setAttribute("data-id", idOption);
                optionDiv.appendChild(optionSpan);
                // Agrega el contenedor de la opción al contenedor del grupo
                groupContainer.appendChild(optionDiv);
            });
            // Agrega el contenedor del grupo al array de contenedores
            simselectContainers.push(groupContainer);
        });
        // Crea una cadena que contiene todo el contenido de los contenedores <article> de los grupos
        let simselectString = "";
        for (let i = 0; i < simselectContainers.length; i++) {
            simselectString += simselectContainers[i].outerHTML;
        }
        return simselectString;
    }
    #_getContainDropdown(params) {
        // [Lee la data para generar grupos(&|or)options. Retorna todo el contenido del Dropdown]
        // Si la vista es preview o loading genera la vista loading skeleton, si contiene datos devuelve todo el contenido separado por grupos y options
        const { loading = '', } = params;
        let containDropDown = '';
        if (this._mode === 'preview' || this._mode === 'loading') {
            // Modo preview - primera carga
            for (let index = 0; index < 3; index++) {
                containDropDown += `
                    <article class="simselect-group-container">
                        <span class="simselect-group ${loading}">${'&nbsp;'}</span>
                        <!-- Cada <div> es una option compuesta por un icono <svg> de check/uncheck y un span para texto-->
                        <div class="simselect-option-container">
                            ${this._icons.svgEmpty}
                            <span class="simselect-option cpointer ${loading}" data-id="${this.#_idGenerator()}">&nbsp;</span>
                        </div>
                        <div class="simselect-option-container">
                            ${this._icons.svgEmpty}
                            <span class="simselect-option cpointer ${loading}" data-id="${this.#_idGenerator()}">&nbsp;</span>
                        </div>
                    </article>
                `
            }
        } else {
            // Si ya no es modo preview genera todo el contenido del Dropdown con los datos [this._data]
            containDropDown = this.#_createGroupContainer();
        }
        return containDropDown;
    }
    #_getContainNoGroups(params) {
        const { loading = '', } = params;
        let containDropDown = '';
        if (this._mode === 'preview' || this._mode === 'loading') {
            console.log('PREVIEW OPTIONS');
            containDropDown = `
                <!-- Cada <div> es una option compuesta por un icono <svg> de check/uncheck y un span para texto-->
                <div class="simselect-option-container">
                    ${this._icons.svgEmpty}
                    <span class="simselect-option cpointer ${loading}" data-value="&nbsp;" data-id="${this.#_idGenerator()}">${"&nbsp;".repeat(8)}</span>
                </div>
                <div class="simselect-option-container">
                    ${this._icons.svgEmpty}
                    <span class="simselect-option cpointer ${loading}" data-value="&nbsp;" data-id="${this.#_idGenerator()}">${"&nbsp;".repeat(8)}</span>
                </div>
            `
        } else {
            // Si ya no es modo preview genera todo el contenido del Dropdown con los datos [this._data]
            const FRAGMENT = document.createDocumentFragment();
            const DIV_TEMPLATE = document.createElement("div");
            DIV_TEMPLATE.className = "simselect-option-container";
            DIV_TEMPLATE.innerHTML = `
                ${this._icons.svgEmpty}
                <span class="simselect-option cpointer" data-value=""></span>
            `;
            this._data.forEach(registry => {
                const DIV_CONTAINER = DIV_TEMPLATE.cloneNode(true);
                const SPAN_OPTION = DIV_CONTAINER.querySelector(".simselect-option");
                SPAN_OPTION.textContent = registry.value;
                SPAN_OPTION.dataset.value = registry.value;
                SPAN_OPTION.dataset.id = this.#_idGenerator();
                FRAGMENT.appendChild(DIV_CONTAINER);
            });
            containDropDown = FRAGMENT.outerHTML;
            // Convertir el FRAGMEN a una cadena de texto
            const CONTAINER_OPTIONS = Array.from(FRAGMENT.querySelectorAll(".simselect-option-container"));
            containDropDown = CONTAINER_OPTIONS.map(containerOption => containerOption.outerHTML).join("");
        }
        return containDropDown;
    }
    #_findTextInput(event) {
        // [Muestra la caja de opciones (dropDown) al dar click sobre alguna parte del SimSelect]
        if (event.key !== 'Escape' && event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt') {
            this.shadowRoot.querySelector('.simselect-collapse').classList.remove('rotate180');
            this.shadowRoot.querySelector('.simselect-dropdown').classList.remove('hide');
            // Buscamos la coincidencia
            let searchResults = [];
            this.shadowRoot.querySelectorAll('.simselect-option').forEach(option => {
                const regex = new RegExp(event.target.value, 'i');
                if (regex.test(option.textContent)) {
                    option.parentNode.classList.remove('hide-element');
                    searchResults.push(option);
                    if (option.parentNode.parentNode.nodeName === 'ARTICLE') {
                        option.parentNode.parentNode.classList.remove('hide-element');
                    }
                } else {
                    option.parentNode.classList.add('hide-element');
                }
            })
            // Ocultamos grupos sin coincidencias
            const NUMBER_GROUPS = this.shadowRoot.querySelectorAll('.simselect-group-container').length;
            this.shadowRoot.querySelectorAll('.simselect-group-container').forEach(group => {
                group.querySelectorAll('.simselect-group-container .simselect-option-container.hide-element').forEach((optionHide, index) => {
                    if (NUMBER_GROUPS === (index + 1)) {
                        optionHide.parentNode.classList.add('hide-element');
                    }
                });
            });
            // Mostramos resultados
            this.shadowRoot.querySelector('.simselect-usermessage').textContent = `Se encontraron: ${searchResults.length} resultados`;;
        }
    }
    #_getStyles() {
        const ZINDEXNOW = numberComponents;  // Controla el Z-index de los simselects con respecto a otros SimSelects
        if (this._zIndex === undefined) {
            this._zIndex = ZINDEXNOW;
        }
        numberComponents -= 1;
        return `
            :host {
                --color-primary: ${this._colors.primary};
                --color-textprimary: ${this._colors.textprimary};
                --color-textSecundary: ${this._colors.textSecundary};
                --color-optionBg: ${this._colors.optionBg};
                --color-white: ${this._colors.white};
                --color-shadowColor: ${this._colors.shadowColor};
                --color-optionGroupBg: ${this._colors.optionGroupBg};
                --color-disable: ${this._colors.disable};
                --font-size-normal: ${this._size.normal};
                --font-size-title: ${this._size.title};
                --font-size-mini: ${this._size.mini};
                --padding-left-right: ${this._size["padding-left-right"]};
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 62.5%;
                margin: 0;
                padding: 0;
            }
            .simselect-container {
                height: 100%;
                position: relative;
                width: calc(100% - calc(var(--padding-left-right)*2));
                z-index: ${this._zIndex * 10};
            }
            .simselect-title{
                font-size: var(--font-size-title);
                color: var(--color-textSecundary);
                padding-left: 1em;
                display:inline-block;
                user-select: none;
                width: 100%;
            }
            .simselect-header {
                align-items: center;
                border-bottom: .1em solid var(--color-primary);
                cursor: text;
                display: flex;
                height: 100%;
                justify-content: space-evenly;
                padding: .5em var(--padding-left-right);
                width: 100%;
            }
            .simselect-selectedOptions {
                align-items: flex-end;
                color: var(--color-textprimary);
                display: flex;
                flex-wrap: wrap;
                gap: .5em;
                height: 100%;
                justify-content: flex-start;
                width: 100%;
            }
            .selectedOption {
                background-color: var(--color-optionBg);
                border-radius: 1em;
                font-size: var(--font-size-normal);
                height: 100%;
                padding-bottom: .3em;
                padding-left: 1em;
                padding-right: 1.5em;
                padding-top: .2em;
                position: relative;
                overflow: hidden;
                user-select: none;
                width: max-content;
                max-width: 20em;
            }
            .simselect-input {
                background-color: transparent;
                border: none;
                color: var(--color-textprimary);
                flex-grow: 1;
                font-size: var(--font-size-normal);
                margin: 0;
                min-width: 180px;
                max-width: calc(100%-15px);
                outline: none;
                word-wrap: break-word;
            }
            .simselect-input:placeholder-shown{
                background-color: transparent;
            }
            .loading {
                overflow: hidden;
            }
            .loading:before {
                animation: shimmer 2s infinite;
                background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
                bottom: 0;
                content: '';
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                transform: translateX(-100%);
                z-index: 10;
            }
            @keyframes shimmer {
                100% {
                    transform: translateX(100%);
                }
            }
            .simselect-buttomclean {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 20;
            }
            .simselect-collapse {
                transition: all 150ms ease-in-out;
            }
            .simselect-dropdown {
                background-color: var(--color-white);
                border-radius: .2em;
                box-shadow: 0px 1px 3px 2px var(--color-shadowColor);
                height: max-content;
                max-height: 20em;
                overflow: hidden;
                overflow-y: auto;
                left: 0;
                scroll-behavior: smooth;
                padding: .5em 1.5em;
                padding-bottom: 0;
                position: absolute;
                transition: all 150ms ease-in-out;
                top: 100%;
                width: 100%;
            }
            .simselect-group-container {
                margin-bottom: .5em;
            }
            .simselect-group {
                background-color: var(--color-optionGroupBg);
                border-radius: .2em;
                color: var(--color-white);
                display: inline-block;
                font-size: var(--font-size-normal);
                font-weight: bold;
                height: 100%;
                line-height: var(--font-size-normal);
                padding: .2em;
                position: relative;
                text-align: center;
                user-select: none;
                width: 100%;
            }
            .simselect-option-container {
                align-items: center;
                display: flex;
                gap: .5em;
                height: 100%;
                justify-content: flex-start;
                padding-top: .8em;
                width: 100%;
            }
            .simselect-option{
                ${(this.loading) ? 'background-color: var(--color-shadowColor);' : ''}
                color: var(--color-textprimary);
                font-size: var(--font-size-normal);
                height: 100%;
                position: relative;
                user-select: none;
                width: 100%;
            }
            .simselect-footer{
                ${(this.loading) ? 'background-color: var(--color-shadowColor);' : ''}
                align-items: center;
                background-color: var(--color-white);
                bottom: 0;
                box-shadow: inset 0px 5px 5px -5px var(--color-disable);
                color: var(--color-textSecundary);
                display: flex;
                font-size: var(--font-size-mini);
                gap: .5em;
                height: 100%;
                justify-content: center;
                left: 0;
                padding: .5em;
                position: sticky;
                text-align: center;
                user-select: none;
                width: 100%;
                z-index: 33;                    
            }
            .cpointer {
                cursor:pointer;
            }
            .cnormal {
                cursor: default;
            }
            .rotate180 {
                transform: rotate(180deg);
            }
            .hide {
                opacity: 0;
                visibility: hidden;
            }
            .hide-element {
                opacity: 0;
                visibility: hidden;
                display: none;
            }
            .bye {
                animation: bye 0.4s linear both
            }
            @keyframes bye {
                0% {
                    transform: scale(1);
                    filter: blur(.01px);
                }
                
                100% {
                    transform: scale(0);
                    filter: blur(12px);
                    opacity: 0
                }
            }
        `;
    }
    #_getTemplate() {
        let loading = 'loading';
        if (!this._loading) {
            loading = '';
        }
        // Identificamos si la data contiene grupos o solo options
        let containDropdown = undefined;
        let formatData = undefined;
        if (this._data !== undefined && this._data !== null) {
            formatData = (this._data[0].group) ? true : false;
        } else {
            formatData = (this._mode === 'preview' || this._mode === 'loading' ? true : false);
        }
        // Creamos el contenido dependiendo del tipo de Data
        if (formatData) {
            if (this._mode === 'preview') {
                console.warn('Simselect - Preview mode');
            }
            if (this._mode === 'loading') {
                console.warn('Simselect - Loading mode');
            }
            if (this._mode === 'data') {
                console.warn('Group Format');
            }
            // Crea contenido para grupos/options
            containDropdown = this.#_getContainDropdown({ loading });
        } else {
            console.warn('Options Format');
            // Crea contenido para options sin grupos
            containDropdown = this.#_getContainNoGroups({ loading });
        }
        return `
            <style>
                ${this.#_getStyles()}
            </style>
            <section class="simselect-container" data-id="${this._idSimSelect}">
                <span class="simselect-title cnormal">simSelect</span>
                <!-- Desplegable -->
                <header class="simselect-header">
                    <section class="simselect-selectedOptions">
                        <input class="simselect-input" type="text" placeholder="${this._placeHolder}">
                    </section>
                    ${this._icons.svgCollapseDown}
                </header>
                <!-- OPTIONS SECTION -->
                <section class="simselect-dropdown hide">
                    <section class="simselect-maxoptions">
                        ${containDropdown}
                    </section>
                    <!-- Footer -->
                    <footer class="simselect-footer">
                        <svg fill="${this._colors.primary}" width="20" height="20" viewBox="0 0 30 30"> <g stroke-width="0"></g> <g stroke-linecap="round" stroke-linejoin="round"></g> <g> <path d="M.5 16h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm0-5h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm0-5h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3C.223 7 0 6.777 0 6.5S.223 6 .5 6zm7-4C6.678 2 6 2.677 6 3.5v17c0 .822.678 1.5 1.5 1.5H10v4.5c0 .347.052.647.184.908.132.26.374.48.658.555.57.148 1.076-.164 1.516-.614 1.524-1.56 4.227-4.237 5.35-5.35H28.5c.822 0 1.5-.678 1.5-1.5v-17c0-.823-.678-1.5-1.5-1.5zm0 1h21c.286 0 .5.214.5.5v17c0 .285-.214.5-.5.5h-11c-.13 0-.257.052-.35.144-1.06 1.05-3.928 3.89-5.507 5.506-.552.552-.643.197-.643-.15v-5c0-.276-.223-.5-.5-.5h-3c-.286 0-.5-.215-.5-.5v-17c0-.286.214-.5.5-.5z"> </path> </g></svg>
                        <span class="simselect-usermessage">${this._userMessage}</span>
                    </footer>
                </section>
            </section>
        `;
    }
    #_removeAllEvents() {
        // [Eliminamos todos los eventos para disconnectedCallBack y para (_render)]
        // Ubicamos la instance correspondiente a this para eliminar los eventos,los datos y la instance
        const INSTANCE_SIMSELECT = simselectInstances.filter(instance => {
            if (instance.id === this._idSimSelect) {
                return instance;
            }
        });
        //Eliminamos instancias
        this._toggleDropDown = null;
        this._hideDropDown = null;
        this._hideDropDownKey = null;
        this._deleOptionKey = null;
        this._focusInput = null;
        this._findTextInput = null;
        // Eliminamos los eventos click
        INSTANCE_SIMSELECT[0].eventosclick.forEach(eventoClick => {
            eventoClick.elemento.removeEventListener('click', eventoClick.evento);
        });
        INSTANCE_SIMSELECT[0].eventosclick = []; // Eliminamos los datos
        // Eliminamos los eventos eventoskeys
        INSTANCE_SIMSELECT[0].eventoskeys.forEach(eventoKey => {
            eventoKey.elemento.removeEventListener('keydown', eventoKey.evento);
        });
        INSTANCE_SIMSELECT[0].eventoskeys = []; // Eliminamos los datos
    }
    disconnectedCallback() {
        console.log('DISCONNECTED');
        this.#_removeAllEvents();
        this.onclick = null;
        INSTANCE_SIMSELECT[0].simselect = null;
        INSTANCE_SIMSELECT[0].id = null;
        simselectInstances.splice(simselectInstances.indexOf(INSTANCE_SIMSELECT[0]), 1);
        // Eliminamos todos los elementos html del shadowRoot
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        this.remove();
        // Sugerimos por consola que se elimine la instancia de memoría
        if (navigator.language.includes('es')) {
            console.warn(`**Remueva la instancia de este componente asignando un valor null al elemento del DOM.**
            Ejemplo: let SELECT1 = document.getElementById("select1");
            SELECT1 = null;`);
        } else {
            console.warn(`**Remove the instance of this component by assigning a null value to the DOM element.**
            Example: let SELECT1 = document.getElementById("select1");
            SELECT1 = null;`);
        }
    }
    #_toggleDropDown() {
        // [Muestra la caja de opciones (dropDown) al dar click sobre alguna parte del SimSelect]
        this.shadowRoot.querySelector('.simselect-collapse').classList.toggle('rotate180');
        this.shadowRoot.querySelector('.simselect-dropdown').classList.toggle('hide');
    };
    #_hideDropDown(event) {
        // [Oculta el dropDown que no es el de la instancia. Se usa para ocultar los dropDowns que no son target.]
        if (!this.contains(event.target)) {
            this.shadowRoot.querySelector('.simselect-collapse').classList.remove('rotate180');
            this.shadowRoot.querySelector('.simselect-dropdown').classList.add('hide');
        }
    }
    #_hideDropDownKey(event) {
        // [Oculta todos los dropDowns al presionar ESC.]
        if (event.key === "Escape") {
            this.shadowRoot.querySelector('.simselect-collapse').classList.remove('rotate180');
            this.shadowRoot.querySelector('.simselect-dropdown').classList.add('hide');
        }
    }
    #_addEvents() {
        // [Añade todos los eventos y guarda estos mismos al array de INSTANCE_SIMSELECT]
        // Ubicamos la instance correspondiente a this para guardar los datos
        const INSTANCE_SIMSELECT = simselectInstances.filter(instance => {
            if (instance.id === this._idSimSelect) {
                return instance;
            }
        });
        // Evento para eliminar las opciones con el botón de clean
        this.shadowRoot.querySelectorAll('.simselect-buttomclean').forEach(element => {
            element.addEventListener('click', this.#_cleanSelectedOption.bind(this));
            INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: element, evento: this.#_cleanSelectedOption.bind(this) });
        });
        // Atamos las instancias a la clase para el manejador de eventos.
        if (this._toggleDropDown === undefined) {
            this._toggleDropDown = this.#_toggleDropDown.bind(this);
            this._hideDropDown = this.#_hideDropDown.bind(this);
            this._hideDropDownKey = this.#_hideDropDownKey.bind(this);
            this._deleOptionKey = this.#_deleteLastOptionSelected.bind(this);
            this._focusInput = this.#_focusInput.bind(this);
            this._findTextInput = this.#_findTextInput.bind(this);
        } else {
            // Eliminamos los eventos para ser refrescados
            this.#_removeAllEvents();
            this._toggleDropDown = this.#_toggleDropDown.bind(this);
            this._hideDropDown = this.#_hideDropDown.bind(this);
            this._hideDropDownKey = this.#_hideDropDownKey.bind(this);
            this._deleOptionKey = this.#_deleteLastOptionSelected.bind(this);
            this._focusInput = this.#_focusInput.bind(this);
            this._findTextInput = this.#_findTextInput.bind(this);
        }
        // Evento para mostrar/ocultar dropdown
        this.shadowRoot.querySelector('.simselect-collapse').addEventListener('click', this._toggleDropDown);
        INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: this.shadowRoot.querySelector('.simselect-collapse'), evento: this._toggleDropDown });
        this.shadowRoot.querySelector('.simselect-input').addEventListener('click', this._toggleDropDown);
        INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: this.shadowRoot.querySelector('.simselect-input'), evento: this._toggleDropDown });
        this.shadowRoot.querySelector('.simselect-title').addEventListener('click', this._toggleDropDown);
        INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: this.shadowRoot.querySelector('.simselect-title'), evento: this._toggleDropDown });
        // Agregar evento CLICK al documento para ocultar el SIMSELECT que no esté en el evento click
        document.addEventListener('click', this._hideDropDown);
        INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: document, evento: this._hideDropDown });
        // Agregar evento ESC al documento para ocultar todos los SIMSELECT
        document.addEventListener('keydown', this._hideDropDownKey);
        INSTANCE_SIMSELECT[0].eventoskeys.push({ elemento: document, evento: this._hideDropDownKey });
        // Agregar evento CLICK a cada option
        this.shadowRoot.querySelectorAll('.simselect-option-container').forEach(option => {
            option.addEventListener('click', this.#_createSelectedOption.bind(this));
        });
        // Agregar evento KEY(Borrar <-) al input
        this.shadowRoot.querySelector('.simselect-input').addEventListener('keydown', this._deleOptionKey);
        INSTANCE_SIMSELECT[0].eventoskeys.push({ elemento: this.shadowRoot.querySelector('.simselect-input'), evento: this._deleOptionKey });
        // Agregamos evento focus al SimSelect
        this.addEventListener('click', this._focusInput);
        INSTANCE_SIMSELECT[0].eventosclick.push({ elemento: this, evento: this._focusInput });
        // Agregar evento KEY(findTExt) al input
        this.shadowRoot.querySelector('.simselect-input').addEventListener('keyup', this._findTextInput);
        INSTANCE_SIMSELECT[0].eventoskeys.push({ elemento: this.shadowRoot.querySelector('.simselect-input'), evento: this._findTextInput });
        // Creamos las SelectedOptions via Scripts
        this.#_createFirstSelectedOptions();
    }
    #_render() {
        // [Renderiza el componente cuando se modifica alguna propiedad]
        if (this.shadowRoot.innerHTML.length > 0) {
            // Eliminamos todo el contenido del shadowRoot
            while (this.shadowRoot.firstChild) {
                this.shadowRoot.removeChild(this.shadowRoot.firstChild);
            }
            // Nuevo contenido
            const TEMPLATE_STRING = this.#_getTemplate();
            let tempRange = document.createRange();
            let templateSimselect = tempRange.createContextualFragment(TEMPLATE_STRING);
            this.shadowRoot.appendChild(templateSimselect);
            this.#_addEvents();
        }
    }
    connectedCallback() {
        // [Se ejecuta cuando el componente es añadido al DOM, usualmente cuando se carga la página]
        console.log('SimSelect Connected');
        if (this._idSimSelect === '') {
            this._idSimSelect = this.#_idGenerator();
        }
        // Eliminamos todo el contenido del shadowRoot [Se deja por prevencion]
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        // Nuevo contenido
        const TEMPLATE_STRING = this.#_getTemplate();
        let tempRange = document.createRange();
        let templateSimselect = tempRange.createContextualFragment(TEMPLATE_STRING);
        this.shadowRoot.appendChild(templateSimselect);
        simselectInstances.push({ simselect: this, id: this._idSimSelect, eventosclick: [], eventoskeys: [] })
        this.#_addEvents();
    }
}
// NUMERO DE COMPONENTES [sim-select] en DOM. Se reduce a 0 para el manejo del z-index
let numberComponents = document.querySelectorAll('sim-select').length;
// INSTANCIAS DE LOS COMPONENTES [{simselect:$,id:swism223, eventosclick:[{elemento:event}],eventoskeys:[{elemento:event}]},...]
let simselectInstances = [];
customElements.define("sim-select", SimSelect);