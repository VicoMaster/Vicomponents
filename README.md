# Vicomponents - Componentes Personalizados
Componentes reutilizables usando la API <a href="https://www.webcomponents.org/introduction" target="_blank">Web Components</a> creada por el equipo de desarrolladores de Google, liderado por Alex Russell y Dimitri Glazkov.


Actualmente es soportada por todos los navegadores y busca crear componentes reutilizables, consistentes y con posibilidad de implementar reactividad sin ningún framework o librería. Solo es necesario saber su ciclo de vida y [HTML, CSS y JS].


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

* Constructor():
    Se debe extender de la clase (HTMLElement) para poder utilizar los metodos de su ciclo de vida.
    ```<javascript>
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

* Connected Callback():
    Cuando el elemento que seria nuestro componente ya hace parte del dom y aqui es cuando podemos realizar cierta actividad importante del componente como empezar a renderizar todo el html y css.
    Es mala practica pintar el template directamente esto es malo ya que en el constructor debemos asegurarnos que todo lo que tiene que estar en memoria exista en ese momento para cuando queramos pintar el elemento en el dom

* Disconected Callback():
    El momento en que quitamos un elemento lo estamos desconectando del dom, esto es importante ya que en el momento de eliminar estos elementos pueden tener cierta funcionalidad que también tenemos que desconectar para liberar memoria.
    Eliminar cada nodo dentro del padre antes de eliminar el componente con .remove();

* AttributeChangedCallback():
    Es importante porque es la forma en la cual dentro del componente vamos a ver los atributos de nuestra etiqueta html, que viene siendo el componente creado. Si tenemos ciertos cambios en los atributos este nos lo va a indicar para poder hacer cambios adentro del componente.

* AdoptedCallback()
    Cuando se ocupa un componente dentro de un iframe por ejemplo. Es mala practica utilizarlo por performance y por mala experiencia para el usuario.
* STYLES:
    // Metodo para construir el css
    // :host se usa para meter estilos generales al componente
    // :host(.blue) para meter estilos especificos al componente cuando contiene la clase .blue
    // :host([yellow]) para meter estilo especificos cuando el componente tiene el atributo yellow
    // :host-context(article.card) para meter estilos en el componente cuando está contenido en un article con clase .card [NO USAR]
    ```<javascript>
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