# Vicomponents - SimSelect
> Un simple select Aesthetic con caja de busqueda, filtro y generador de grupos (opcional).


## Init SimSelect
Es tan simple como crear una etiqueta vacia en el html <sim-select></sim-select> y luego llamar el script SimSelect.js
```html
    <sim-select></sim-select>
    <script src="SimSelect.js"></script>
```


## Funciones / Metodos de Acceso-Modificación
> Para hacer uso de las siguientes funciones/metodos es necesario especificar el SimSelect a manipular. Ejemplo:
```JavaScript
    const MY_SIMSELECT = document.getElementById('mySimSelect');
    MY_SIMSELECT.title = "New Title";
```
|Metodo|Description|Comments|
|---|---|---|
|**00_ComponentBase**|Implementación en JavaScript para empezar a construir un WebComponent|Versión sin CSS|
|**SimSelect**|Un select aesthetic con filtro y generador de grupos|En desarrollo...|
|**chartUI**|Generador de gráficos de barras y lineas con filtros tipo select|Versión sin estándar WebComponent|


Componentes reutilizables usando la API <a href="https://www.webcomponents.org/introduction" target="_blank">Web Components</a> creada por el equipo de desarrolladores de Google, liderado por Alex Russell y Dimitri Glazkov.


Actualmente es soportada por todos los navegadores y busca crear componentes reutilizables, consistentes y con posibilidad de implementar reactividad sin ningún framework o librería. Solo es necesario saber su ciclo de vida y [HTML, CSS y JS]. Al usar WebComponents se puede implementar en todos los proyectos independiente del framework o librería que se use, ya que esta arquitectura encapsula todo el código, estilos y estructura dentro del ShadowDOM


**En el siguiente enlace se pueden descargar componentes reutilizables diseñados por la comunidad:**
<a href="https://www.webcomponents.org/" target="_blank">COMPONENTES</a>

## CICLO DE VIDA DE UN WEBCOMPONENT
```
-----------------------------------------------------------------------------------------------------------
contructor() -> connectedCallback() ->  AttributeChangedCallback()    || Casos raros: AdoptedCallbac()
                                    |-> disconectedCallback()
-----------------------------------------------------------------------------------------------------------

```
El ciclo de vida de un componente está 100% ligado al DOM ya que son estándares del navegador y son parte fundamental del critical renderig path. Para que todo el código [html,css y js] esté encapsulado se usa **(this.attachShadow({ mode: "open" });)**

---
* Constructor():


    Se debe extender de la clase (HTMLElement) para poder utilizar los metodos de su ciclo de vida.
    ```javascript
    class componenteBase extends HTMLElement {
    constructor() {
        super();
        this.data = '';
        this.instanceComponent = undefined;
        // Inicializamos el modo shadowDOM
        this.attachShadow({ mode: "open" });
    }
    ...
    }
    ```
**Para saber más sobre ShadowDOM:** [MDN: ShadowDOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM)

---
* Connected Callback():


    Cuando el componente ya hace parte del DOM podemos utilizar este metodo para crear cierta lógica especifica.
    ```javascript
    connectedCallback() {
        if (this.data === '') {
            // Si el elemento no contiene parametros se manda a renderizar de igual manera
            this.render();
        }
    }
    ```
---
* Disconected Callback():


    El momento en que quitamos un elemento lo estamos desconectando del dom, esto es importante ya que en el momento de eliminar estos elementos pueden tener cierta funcionalidad que también tenemos que desconectar para liberar memoria.
    Eliminar cada nodo dentro del padre antes de eliminar el componente con .remove();
---
* AttributeChangedCallback():


    Es la forma en la cual dentro del componente vamos a observar los atributos de nuestro componente. Si tenemos ciertos cambios en los atributos este nos lo va a indicar para poder hacer cambios dentro del componente.

    ```javascript
    // Si existen cambios en los atributos se acciona este metodo
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (attrName === "data") {
                this.data = newVal;
                this.render();
            }
        }
    }
    ```
---
* AdoptedCallback()


    Se acciona cuando se ocupa un componente dentro de un iframe por ejemplo. Es mala practica utilizarlo por performance y por mala experiencia para el usuario.
---
* getStyles() **NO HACE PARTE DE LA API**:


    Metodo para construir el css.

    
    :host se usa para meter estilos generales al componente


    :host(.blue) para meter estilos especificos al componente cuando contiene la clase .blue


    :host([yellow]) para meter estilo especificos cuando el componente tiene el atributo yellow


    :host-context(article.card) para meter estilos en el componente cuando está contenido en un article con clase .card [NO USAR]
    ```javascript
        getStyles() {
        return `
        <style>
        :host {
            display: inline-block;
            width: 100%;
            min-width: 300px;
            max-width: 450px;
            font-size: 20px;
            background: grey;
        }
        :host(.blue) {
            background: blue; 
        }
        :host([yellow]) {
            background: yellow;
        }
        :host([yellow]) h1{
            color: grey;
        }
        :host([yellow]) p {
            color: red;
        }
        :host-context(article.card) {
            display: block;
            max-width: 100%;
        }

        .clasesNormales {
            /* CSS NORMAL */
        }
        </style>
      `;
    }
    ```