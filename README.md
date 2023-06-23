# Vicomponents
* [ENGLISH](#custom-components---english) 
* [ESPAÑOL](#componentes-personalizados---español) 


## Componentes Personalizados - ESPAÑOL
> **TIP:** Usa el componente **00_ComponentBase** para crear un WebComponent de forma más rápida.


|Component|Description|Version|Comments|
|---|---|---|---|
|**00_ComponentBase**|Implementación en JavaScript para empezar a construir un WebComponent|v.1.0|Plantilla base para crear components|
|**SimSelect**|Un select aesthetic con filtro y generador de grupos|V.1.0|Operativo. Contiene data de prueba para modo grupo y options|


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


    Metodo para construir el css. Las siguientes pseudo-clases se usan para agregar estilos directamente al componente directamente dentro del shadow-dom. **Para saber más sobre ShadowDOM:** [MDN: ShadowDOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM)

    
    :host se usa para agregar estilos generales al componente


    :host(.blue) para agregar estilos especificos al componente cuando contiene la clase .blue


    :host([yellow]) para agregar estilo especificos cuando el componente tiene el atributo yellow


    :host-context(article.card) para agregar estilos en el componente cuando está contenido en un article con clase .card [NO USAR]
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


## Custom Components - English

Hi Docs in English