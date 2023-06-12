/**
 * Autor: Andres Rivera (github.com/VicoMaster)
 * Description: Plantilla base(ejemplo) para crear cualquier componente usando estándar Web Components
 */
class ComponentBase extends HTMLElement {
    constructor() {
        super();
        this._idComponentBase = '';
        this._loading = true;
        this._mode = 'loading';
        this._options = [];
        this._data = undefined;
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        return ["data", "primarycolor", "sizeicons", "sizetextnormal", "age", "mode", "colors", "placeholder", "title",];
    }
    // [FUNCTIONS]
    get data() {
        return this._data;
    }
    get mode() {
        return this._mode;
    }
    get id() {
        return this._idComponentBase;
    }
    set data(newData) {
        this.setAttribute('data', JSON.stringify(newData));
    }
    set mode(newMode) {
        this.setAttribute('mode', newMode);
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            let atributeCallback = attrName;
            let reRender = true;
            if (attrName === 'data') {
                if (JSON.parse(newVal) !== '') {
                    if (typeof (JSON.parse(newVal)) === 'object') {
                        if ((JSON.parse(newVal)[0].group || JSON.parse(newVal)[0].option) && JSON.parse(newVal)[0].value) {
                            // Se valida el formato de la data ingresada
                            this._data = JSON.parse(newVal);
                            this._loading = false;
                            this._mode = 'data';
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
            if (attrName === "mode") {
                if (newVal === "preview" || newVal === "loading") {
                    this._mode = newVal;
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
            if (reRender) {
                console.log(`New Render on ComponentBase:${this._idComponentBase} - Attribute Changed: ${atributeCallback}`);
                this.#_render();
            }
        }
    }
    #_idGenerator() {
        // [crea un id aleatorio y lo retorna (usado para cada ComponentBase y cada option)]
        const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        let newId = '';
        for (let i = 0; i < 5; i++) {
            newId += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
            newId += Math.floor(Math.random() * 10);
        }
        return newId;
    }
    #_getStyles() {
        const ZINDEXNOW = numberComponents;  // Controla el Z-index de los ComponentBase con respecto a otros ComponentBase
        if (this._zIndex === undefined) {
            this._zIndex = ZINDEXNOW;
        }
        numberComponents -= 1;
        let styleVariable = "dinamicStyle"
        return `
            :host {
                --color-primary: ${styleVariable};
                --color-textprimary: ${styleVariable};
                --color-textSecundary: ${styleVariable};
                --color-optionBg: ${styleVariable};
                --color-white: ${styleVariable};
                --color-shadowColor: ${styleVariable};
                --color-optionGroupBg: ${styleVariable};
                --color-disable: ${styleVariable};
                --font-size-normal: ${styleVariable};
                --font-size-title: ${styleVariable};
                --font-size-mini: ${styleVariable};
                --padding-left-right: ${styleVariable};
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 62.5%;
                margin: 0;
                padding: 0;
            }
            .component {
                height: 100%;
                position: relative;
                width: calc(100% - calc(var(--padding-left-right)*2));
                z-index: ${this._zIndex * 10};
            }
        `;
    }
    #_getTemplate() {
        let loading = 'loading';
        if (!this._loading) {
            loading = '';
        }
        // Validaciones para la creación del template 
        let formatData = undefined;
        let containDropdown = undefined;
        if (this._data !== undefined && this._data !== null) {
            formatData = (this._data[0].group) ? true : false;
        } else {
            formatData = (this._mode === 'preview' || this._mode === 'loading' ? true : false);
        }
        if (formatData) {
            if (this._mode === 'preview') {
                console.warn('ComponentBase - Preview mode');
            }
            if (this._mode === 'loading') {
                console.warn('ComponentBase - Loading mode');
            }
            if (this._mode === 'data') {
                console.warn('Group Format');
            }
            // Crea contenido para grupos/options
            containDropdown = 'this.#_getContainDropdown({ loading })';
        } else {
            console.warn('Options Format');
            // Crea contenido para options sin grupos
            containDropdown = 'this.#_getContainNoGroups({ loading })';
        }
        return `
            <style>
                ${this.#_getStyles()}
            </style>
            <section class="component-container" data-id="${this._idComponentBase}">
                <p>Base Component</p>
            </section>
        `;
    }
    #_removeAllEvents() {
        // [Eliminamos todos los eventos para disconnectedCallBack y para (_render)]
        // Ubicamos la instance correspondiente a this para eliminar los eventos,los datos y la instance
        const INSTANCE_COMPONENT_BASE = componentBaseInstances.filter(instance => {
            if (instance.id === this._idComponentBase) {
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
        INSTANCE_COMPONENT_BASE[0].eventosclick.forEach(eventoClick => {
            eventoClick.elemento.removeEventListener('click', eventoClick.evento);
        });
        INSTANCE_COMPONENT_BASE[0].eventosclick = []; // Eliminamos los datos
        // Eliminamos los eventos eventoskeys
        INSTANCE_COMPONENT_BASE[0].eventoskeys.forEach(eventoKey => {
            eventoKey.elemento.removeEventListener('keydown', eventoKey.evento);
        });
        INSTANCE_COMPONENT_BASE[0].eventoskeys = []; // Eliminamos los datos
    }
    disconnectedCallback() {
        console.log('DISCONNECTED');
        this.#_removeAllEvents();
        this.onclick = null;
        // Ubicamos la instance correspondiente a this
        const INSTANCE_COMPONENT_BASE = componentBaseInstances.filter(instance => {
            if (instance.id === this._idComponentBase) {
                return instance;
            }
        });
        INSTANCE_COMPONENT_BASE[0].componentBase = null;
        INSTANCE_COMPONENT_BASE[0].id = null;
        componentBaseInstances.splice(componentBaseInstances.indexOf(INSTANCE_COMPONENT_BASE[0]), 1);
        // Eliminamos todos los elementos html del shadowRoot
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        this.remove();
        // Sugerimos por consola que se elimine la instancia de memoría
        if (navigator.language.includes('es')) {
            console.warn(`**Remueva la instancia de este componente asignando un valor null al elemento del DOM.**
            Ejemplo: let COMPONENT_1 = document.getElementById("component1");
            COMPONENT_1 = null;`);
        } else {
            console.warn(`**Remove the instance of this component by assigning a null value to the DOM element.**
            Example: let COMPONENT_1 = document.getElementById("component1");
            COMPONENT_1 = null;`);
        }
    }
    #_addEvents() {
        // [Añade todos los eventos y guarda estos mismos al array de INSTANCE_COMPONENT_BASE]
        // Ubicamos la instance correspondiente a this para guardar los datos
        const INSTANCE_COMPONENT_BASE = componentBaseInstances.filter(instance => {
            if (instance.id === this._idComponentBase) {
                return instance;
            }
        });
        // Atamos las instancias a la clase para el manejador de eventos.
        if (this._toggleDropDown === undefined) {
            this._toggleDropDown = 'this.#_toggleDropDown.bind(this)';
            this._hideDropDown = 'this.#_hideDropDown.bind(this)';
            this._hideDropDownKey = 'this.#_hideDropDownKey.bind(this)';
            this._deleOptionKey = 'this.#_deleteLastOptionSelected.bind(this)';
            this._focusInput = 'this.#_focusInput.bind(this)';
            this._findTextInput = 'this.#_findTextInput.bind(this)';
        } else {
            // Eliminamos los eventos para ser refrescados
            this.#_removeAllEvents();
            this._toggleDropDown = 'this.#_toggleDropDown.bind(this)';
            this._hideDropDown = 'this.#_hideDropDown.bind(this)';
            this._hideDropDownKey = 'this.#_hideDropDownKey.bind(this)';
            this._deleOptionKey = 'this.#_deleteLastOptionSelected.bind(this)';
            this._focusInput = 'this.#_focusInput.bind(this)';
            this._findTextInput = 'this.#_findTextInput.bind(this)';
        }
        // Eventos Click
        // Eventos Key
        // Eventos Touch
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
            let templateComponentBase = tempRange.createContextualFragment(TEMPLATE_STRING);
            this.shadowRoot.appendChild(templateComponentBase);
            this.#_addEvents();
        }
    }
    connectedCallback() {
        // [Se ejecuta cuando el componente es añadido al DOM, usualmente cuando se carga la página]
        console.log('component-base Connected - OK');
        if (this._idComponentBase === '') {
            this._idComponentBase = this.#_idGenerator();
        }
        // Eliminamos todo el contenido del shadowRoot [Prevencion]
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        // Nuevo contenido
        const TEMPLATE_STRING = this.#_getTemplate();
        let tempRange = document.createRange();
        let templateComponentBase = tempRange.createContextualFragment(TEMPLATE_STRING);
        this.shadowRoot.appendChild(templateComponentBase);
        componentBaseInstances.push({ componentBase: this, id: this._idComponentBase, eventosclick: [], eventoskeys: [] })
        this.#_addEvents();
    }
}
// NUMERO DE COMPONENTES [component-base] en DOM. Se reduce a 0 para el manejo del z-index
let numberComponents = document.querySelectorAll('component-base').length;
// INSTANCIAS DE LOS COMPONENTES [{componentBase:$,id:swism223, eventosclick:[{elemento:event}],eventoskeys:[{elemento:event}]},...]
let componentBaseInstances = [];
customElements.define("component-base", ComponentBase);