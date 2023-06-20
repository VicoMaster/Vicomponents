# Component Base | Componente Base
![Base Component](http://drive.google.com/uc?export=view&id=1rX6JnVceCoGCadUA84FP8Ywzacd8y90f)

A continuación se especifican los metodos (funciones) que se usan en la plantilla de un ComponentBase usando estandares WebComponents. Las unicas funciones obligatorias son [connectedCallback(),AttributeChangedCallback(), disconectedCallback()] por ser parte del ciclo de vida del WebComponent. El resto de funciones son opcionales, se pueden crear más a necesidad o eliminarse. 

>*Nota:* Las funciones detalladas a continuación son las aconsejadas para implementar correctamente un webcomponent con correcto manejo de instancia y desarrollo escalable, se recomienda desarrollar el componente dejando las funciones listadas a continuación.

|Function|Description|
|----------------|----------------|
|Constructor:| Inicializa las variables que guardaran los datos de instancia de la clase. Se debe especificar attachShadow({ mode: "open" }) para permitir modificaciones con JS del component|
|static observedAttributes:|[Obligatorio] Es parte de la API. Es un observador de atributos del componente. Se deben especificar cada uno de los atributos para hacer seguimiento si existe un cambio y su lógica se declara en la función AttributeChangedCallback()|
|get data():|Retorna la data actual del componente en instancia|
|get mode():|Retorna el estado actual del componente. (loading, preview,state1, state2,etc...)|
|set data(newData):|Modifica el atributo "data" del componente. Con esta actualización se activa el metodo attributeChangedCallback()|
|set mode(newMode):|Modifica el atributo "mode" del componente. Con esta actualización se activa el metodo attributeChangedCallback()|
|attributeChangedCallback(attrName, oldVal, newVal):|Cada vez que se actualice alguno de los atributos en seguimiento se ejecuta este metodo|
|#_ idGenerator():| Retorna un id de 10 caracteres de longitud compuesto aleatoriamente por los caracteres ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'). Genera un id unico para cada instancia del componente, esto se usará para saber con que instancias/datos manejar dentro de los metodos del componente.|
|#_getStyles():| Retorna String con los estilos para el componente. Aquí se debe crear todo lo relacionado con estilos dinamicos, condiciones etc.|
|#_getTemplate():| Retorna String con todo el html del componente. Este debe contener a su vez en una etiqueta <style></style> con todos los estilos del componente antes que todo el contenido del html del mismo.|
|#_removeAllEvents():|Elimina todos los eventos y datos asociados a eventos del componente. Controlamos la limpieza de la memoria y datos por instancias|
|disconnectedCallback():|Realiza acciones de limpieza y sugiere eliminar/blanquear la instancia del componente.|
|#_addEvents():|Agrega todos los eventos necesarios para el componente y guarda los datos de los eventos en componentBaseInstances.|
|#_render():|Renderiza el componente cuando se modifica alguna propiedad. Actualiza el contenido del shadow DOM y agrega eventos.|
|connectedCallback():|Se llama cuando el componente se conecta al DOM. Realiza acciones de inicialización, renderizado y agrega eventos.|