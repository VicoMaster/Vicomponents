# Vicomponents - SimSelect
> Un simple select Aesthetic con caja de busqueda, filtro y generador de grupos (opcional).

*NOTA:* Actualmente esta versión de componente no maneja una correcta creación de `sim-select` luego de la primera carga de la clase. Para siguientes versiones se implementará carga en caliente.


## Simple Implementación
Es tan simple como crear una etiqueta vacia en el html <sim-select></sim-select> y luego llamar el script SimSelect.js
```html
    <sim-select></sim-select>
    <script src="SimSelect.js"></script>
```

Para hacer uso de las funciones/metodos internos es necesario especificar el SimSelect a manipular. Ejemplo:
```JavaScript
    const MY_SIMSELECT = document.getElementById('mySimSelect');
    MY_SIMSELECT.title = "New Title";
```


## Metodos / Funciones

Cada uno de los siguientes metodos hacen parte fundamental del funcionamiento del componente. Lea atentamente su descripción/comentarios si desea hacer alguna modificación o mejora. Si desea agregar un nuevo metodo recuerde limpiar la memoría de instancias/variables utilizada en el metodo `disconnectedCallback()` tal cual como se empecifica en su descripción.

|Metodo|Description|Comments|
|---|---|---|
|constructor()| | |
|static get observedAttributes()| | |
|get dataExample() | | |
|get dataExampleOptions() | | |
|get data()| | |
|get mode() | | |
|get selectedOptions()| | |
|get userMessage()| | |
|get id()| | |
|get maxSelectedOptions()| | |
|get colors() | | |
|get placeHolder()| | |
|get title()| | |
|set data(newData)| | |
|set mode(newMode)| | |
|set userMessage(message)| | |
|set maxSelectedOptions(newMaxSelectedOptions) | | |
|set colors(params) | | |
|set placeHolder(placeHolder) | | |
|set title(newTitle) | | |
|attributeChangedCallback(attrName, oldVal, newVal)| | |
|#_focusInput()| | |
|#_idGenerator() | | |
|#_removeChildsParent($ELEMENT) | | |
|#_markUnmarkOptions(dataId)| | |
|#_deleteLastOptionSelected(event) | | |
|#_cleanSelectedOption(event)| | |
|#_createSelectedOption(event)| | |
|#_createFirstSelectedOptions()| | |
|#_createGroupContainer()| | |
|#_getContainDropdown(params)| | |
|#_getContainNoGroups(params) | | |
|#_findTextInput(event) | | |
|#_getStyles() | | |
|#_getTemplate() | | |
|#_removeAllEvents() | | |
|disconnectedCallback()| | |
|#_toggleDropDown() | | |
|#_hideDropDown(event) | | |
|#_hideDropDownKey(event) | | |
|#_addEvents()| | |
|#_render() | | |
|connectedCallback() | | |


*IMPORTANTE:* El siguiente código se ubica luego de la declaración de la clase `SimSelect`. Este código permite controlar correctamente las instancias de cada componente creado en el documento.

```JavaScript
    // NUMERO DE COMPONENTES [sim-select] en DOM. Se reduce a 0 para el manejo del z-index
    let numberComponents = document.querySelectorAll('sim-select').length;
    // INSTANCIAS DE LOS COMPONENTES [{simselect:$,id:swism223, eventosclick:[{elemento:event}],eventoskeys:[{elemento:event}]},...]
    let simselectInstances = [];
    customElements.define("sim-select", SimSelect);
```

Cada componente se guarda en el array `simselectInstances` que contiene un Objeto por cada componente creado. Este objeto contiene la instancia del objeto HTML, el id, los eventos click y eventos del teclado. Este array se declara de manera global. Dentro de la clase `SimSelect` es usado para crear los datos, controlar la interfaz y limpieza de memoría de cada componente dentro del DOM. Si modifica este array es necesario comprobar que cada instancia de cada componente sea manejada correctamente.

La variable `numberComponents` guarda el numero de elementos creados en el DOM en la primera carga de la clase. Se usa para manejar el `z-index` de cada componente. Si no se maneja el `z-index` al momento de tener varios `sim-select` cerca uno del otro su visualización no será correcta.
