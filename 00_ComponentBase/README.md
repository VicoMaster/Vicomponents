# Base Component | Componente Base

<a name="sectionEnglish">* English</a>
<a name="sectionSpanish">* Español</a>

## [Implementación Simple](#sectionSpanish)
El siguiente componente crea un elemento "p" con algunos metodos de utilidad para crear un webComponent con un código que ya tiene un control de instancias y limpieza de memoria. Para crear un componente personalizado remplace el html y estilos necesarios, cree la lógica correspondiente usando los metodos de la plantilla y agregue o modifique a gusto cualquier parte del código.


![Base Component](http://drive.google.com/uc?export=view&id=1qOm2xrXlGVMjm5RMqw76Pcfqi5e-ElcL)


## Metodos

A continuación se especifican los metodos (funciones) que se usan en la plantilla de un ComponentBase usando estandares WebComponents. Las unicas funciones obligatorias son [connectedCallback(),AttributeChangedCallback(), disconectedCallback()] por ser parte del ciclo de vida del WebComponent. El resto de funciones son opcionales, se pueden crear más a necesidad o eliminarse. 

>*Nota:* Las funciones detalladas a continuación son las aconsejadas para implementar correctamente un webcomponent con correcto manejo de instancia y desarrollo escalable, se recomienda desarrollar el componente dejando las funciones listadas a continuación.

|Funciones|Descripción|
|----------------|----------------|
|Constructor:|[Obligatorio] Inicializa las variables que guardaran los datos de instancia de la clase. Se debe especificar attachShadow({ mode: "open" }) para permitir modificaciones con JS del component|
|static observedAttributes:|[Obligatorio] Es parte de la API. Es un observador de atributos del componente. Se deben especificar cada uno de los atributos para hacer seguimiento si existe un cambio y su lógica se declara en la función AttributeChangedCallback()|
|get data():|Retorna la data actual del componente en instancia|
|get mode():|Retorna el estado actual del componente. (loading, preview,state1, state2,etc...)|
|set data(newData):|Modifica el atributo "data" del componente. Con esta actualización se activa el metodo attributeChangedCallback()|
|set mode(newMode):|Modifica el atributo "mode" del componente. Con esta actualización se activa el metodo attributeChangedCallback()|
|attributeChangedCallback(attrName, oldVal, newVal):|[Obligatorio] Cada vez que se actualice alguno de los atributos en seguimiento se ejecuta este metodo|
|#_ idGenerator():| Retorna un id de 10 caracteres de longitud compuesto aleatoriamente por los caracteres ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'). Genera un id unico para cada instancia del componente, esto se usará para saber con que instancias/datos manejar dentro de los metodos del componente.|
|#_getStyles():| Retorna String con los estilos para el componente. Aquí se debe crear todo lo relacionado con estilos dinamicos, condiciones etc.|
|#_getTemplate():| Retorna String con todo el html del componente. Este debe contener a su vez en una etiqueta <style></style> con todos los estilos del componente antes que todo el contenido del html del mismo.|
|#_removeAllEvents():|Elimina todos los eventos y datos asociados a eventos del componente. Controlamos la limpieza de la memoria y datos por instancias|
|disconnectedCallback():|[Obligatorio] Realiza acciones de limpieza y sugiere eliminar/blanquear la instancia del componente.|
|#_addEvents():|Agrega todos los eventos necesarios para el componente y guarda los datos de los eventos en componentBaseInstances.|
|#_render():|Renderiza el componente cuando se modifica alguna propiedad. Actualiza el contenido del shadow DOM y agrega eventos.|
|connectedCallback():|[Obligatorio] Se llama cuando el componente se conecta al DOM. Realiza acciones de inicialización, renderizado y agrega eventos.|


## [Simple implementation](#sectionEnglish)


The following component creates a "p" element with some utility methods for creating a web component that already has instance control and memory cleanup. To create a custom component, replace the necessary HTML and styles, create the corresponding logic using the template methods, and add or modify any part of the code as desired.


![Base Component](http://drive.google.com/uc?export=view&id=1qOm2xrXlGVMjm5RMqw76Pcfqi5e-ElcL)


## Methods


The following are the methods (functions) used in the template of a ComponentBase using WebComponents standards. The only mandatory functions are [connectedCallback(), attributeChangedCallback(), disconnectedCallback()] as they are part of the WebComponent lifecycle. The remaining functions are optional; you can create additional functions as needed or remove them.

>*Note:* The functions detailed below are recommended for correctly implementing a web component with proper instance management and scalable development. It is advisable to develop the component by including the listed functions.


|Function|Description|
|----------------|----------------|
|Constructor:|[Mandatory] Initializes the variables that will store the instance data of the class. Specify attachShadow({ mode: "open" }) to allow modifications with JS on the component.|
|static observedAttributes:|[Mandatory] Part of the API. It is an attribute observer for the component. Each attribute must be specified to track changes, and its logic is declared in the attributeChangedCallback() function.|
|get data():|Returns the current data of the component instance.|
|get mode():|Returns the current state of the component (loading, preview, state1, state2, etc...)|
|set data(newData):|Modifies the "data" attribute of the component. This update triggers the attributeChangedCallback() method.|
|set mode(newMode):|Modifies the "mode" attribute of the component. This update triggers the attributeChangedCallback() method.|
|attributeChangedCallback(attrName, oldVal, newVal):|[Mandatory] This method is executed every time one of the tracked attributes is updated.|
|#_ idGenerator():| Returns a randomly generated ID of 10 characters in length, composed of the characters ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'). It generates a unique ID for each instance of the component, which will be used to handle instances/data within the component's methods.|
|#_getStyles():| Returns a string with the styles for the component. Here, all dynamic styles, conditions, etc., should be created.|
|#_getTemplate():| Returns a string with the entire HTML structure of the component. It should include a <style></style> tag with all the component's styles before the actual HTML content.|
|#_removeAllEvents():|Removes all events and associated event data from the component. It ensures memory and data cleanup per instance.|
|disconnectedCallback():|[Mandatory] Performs cleanup actions and suggests removing/clearing the component instance.|
|#_addEvents():|Adds all the necessary events for the component and stores the event data in componentBaseInstances.|
|#_render():|Renders the component when a property is modified. Updates the content of the shadow DOM and adds events.|
|connectedCallback():|[Mandatory] Called when the component is connected to the DOM. Performs initialization actions, rendering, and adds events.|