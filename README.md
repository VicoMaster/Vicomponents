# Vicomponents
* [ENGLISH](#custom-components---english) 
* [ESPAÑOL](#componentes-personalizados---español) 


## Componentes Personalizados - ESPAÑOL
> **TIP:** Usa el componente **00_ComponentBase** para crear un WebComponent de forma más rápida.

Los siguientes componentes usan la API de Web Components para crear componentes simples, reutilizables y ligeros. Se pueden implementar en cualquier Framework o tecnología que use html y javascript.


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

> **TIP:** Use the 00_ComponentBase component to create a web component more quickly.

The following components use the Web Components API to create simple, reusable, and lightweight components. They can be implemented in any framework or technology that uses HTML and JavaScript.


|Component|Description|Version|Comments|
|---|---|---|---|
|**00_ComponentBase**|JavaScript Implementation to start building a Web Component.|v.1.0|Base template for creating components.|
|**SimSelect**|An aesthetic select with filter and group generator.|V.1.0|Operational. It contains sample data for group mode and options.|


Reusable components using the API. <a href="https://www.webcomponents.org/introduction" target="_blank">Web Components</a> Created by the team of developers at Google, led by Alex Russell and Dimitri Glazkov.


Currently, it is supported by all browsers and aims to create reusable components that are consistent and allow for reactivity without any specific framework or library. All you need to know is its lifecycle and have knowledge of HTML, CSS, and JavaScript. By using Web Components, you can implement them in any project, regardless of the framework or library being used, as this architecture encapsulates all the code, styles, and structure within the Shadow DOM.


**In the following link, you can download reusable components designed by the community:**
<a href="https://www.webcomponents.org/" target="_blank">COMPONENTS</a>


## LIFECYCLE OF A WEB COMPONENT
```
-----------------------------------------------------------------------------------------------------------
contructor() -> connectedCallback() ->  AttributeChangedCallback()    || Unusual Cases: AdoptedCallbac()
                                    |-> disconectedCallback()
-----------------------------------------------------------------------------------------------------------

```
The lifecycle of a component is 100% tied to the DOM as it is a standard feature of the browser and an essential part of the critical rendering path. To encapsulate all the code [HTML, CSS, and JS] the method is used. **(this.attachShadow({ mode: "open" });)**

---
* Constructor():


    To utilize the lifecycle methods, the component must extend the (HTMLElement) class.
    ```javascript
    class componenteBase extends HTMLElement {
        constructor() {
            super();
            this.data = '';
            this.instanceComponent = undefined;
            // We initialize the shadow DOM mode.
            this.attachShadow({ mode: "open" });
        }
    ...
    }
    ```
**To learn more about Shadow DOM:** [MDN: ShadowDOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM)

---
* Connected Callback():


    Once the component is part of the DOM, we can use this method to implement specific logic.
    ```javascript
    connectedCallback() {
        if (this.data === '') {
            // If the element does not contain any parameters, it is still rendered in the same way.
            this.render();
        }
    }
    ```
---
* Disconected Callback():


    When we remove an element, we are disconnecting it from the DOM. This is important because when we delete these elements, they may have certain functionality that also needs to be disconnected to free up memory.To properly remove the component, it's recommended to remove each child node within the parent element before deleting the component using the `.remove()` method.
---
* AttributeChangedCallback():


    This is the way we observe the attributes of our component. If there are any changes in the attributes, it will notify us so that we can make appropriate changes within the component.

    ```javascript
    // If there are changes in the attributes, this method is triggered.
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


    It is triggered when a component is used within an iframe, for example. However, it is considered a bad practice due to performance implications and a poor user experience.
---
* getStyles() **IT'S NOT PART OF THE API.**:


    Method for constructing CSS. The following pseudo-classes are used to add styles directly to the component within the shadow DOM. **To learn more about Shadow DOM:** [MDN: ShadowDOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM)

    
    :host is used to add general styles to the component.

    :host(.blue) is used to add specific styles to the component when it contains the class .blue.

    :host([yellow]) is used to add specific styles when the component has the yellow attribute.

    :host-context(article.card) is used to add styles to the component when it is contained within an article with the class .card [DO NOT USE].

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

        .normalClass {
            /* USUALLY CSS */
        }
        </style>
      `;
    }
    ```