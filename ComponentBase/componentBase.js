class componenteBase extends HTMLElement {
    constructor() {
        super();
        this.data = '';
        this.instanceComponent = undefined;
        // Inicializamos el modo shadowDOM
        this.attachShadow({ mode: "open" });
    }
    // Metodo obligatorio para saber que atributos se deben observar en attributeChangedCallback
    static get observedAttributes() {
        return ["data",];
    }
    // Si existen cambios en los atributos se acciona este metodo
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (attrName === "data") {
                this.data = newVal;
                this.render();
            }
        }
    }
    // Metodo para construir el css
    getStyles() {
        const STYLES = document.createElement('style');
        STYLES.innerHTML = ``;
        return STYLES;
    }
    // Se usa para crear la estructura del DOM que se vaya a pintar, debe retornar al final el componente
    getTemplate() {
        if (this.instanceComponent === undefined) {
            this.instanceComponent = document.createElement('p');
            if (this.data !== '') {
                this.instanceComponent.textContent = `${this.data}`
            } else {
                this.instanceComponent.innerHTML = `<em>Componente cargado con éxito -  SIN DATA</em>`;
            }
        } else {
            if (this.data !== '') {
                this.instanceComponent.textContent = `${this.data}`
            } else {
                this.instanceComponent.innerHTML = `<em>Componente cargado con éxito -  SIN DATA</em>`;
            }
        }
        this.instanceComponent.appendChild(this.getStyles());
        return this.instanceComponent;
    }
    // Pinta el componente en el DOM usando shadowRoot dentro de la instancia de la clase (componente)
    render() {
        this.shadowRoot.append(this.getTemplate());
    }
    // Esto se ejecuta tan luego de que nuestro componente se pinte en el DOM
    connectedCallback() {
        if (this.data === '') {
            // Si el elemento no contiene parametros se manda a renderizar de igual manera
            this.render();
        }
    }
}
customElements.define("new-component", componenteBase);