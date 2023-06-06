# Component Base | Componente Base

|Function|Description|
|----------------|----------------|
|Constructor:| Inicializa las variables que guardaran los datos de instancia de la clase. Se debe especificar attachShadow({ mode: "open" }) para permitir modificaciones con JS del component|
|static observedAttributes:|[Obligatorio] Es parte de la API. Es un observador de atributos del componente. Se deben especificar cada uno de los atributos para hacer seguimiento si existe un cambio|

Devuelve un array de los nombres de los atributos observados por el componente.
get data():

Devuelve el valor de la propiedad _data.
get mode():

Devuelve el valor de la propiedad _mode.
get selectedOptions():

Devuelve el valor de la propiedad _options.
set data(newData):

Establece el valor de la propiedad _data y actualiza el atributo "data" del componente.
set mode(newMode):

Establece el valor de la propiedad _mode y actualiza el atributo "mode" del componente.
attributeChangedCallback(attrName, oldVal, newVal):

Se llama cuando cambia un atributo observado en el componente.
Realiza diferentes acciones según el nombre del atributo cambiado.
#_idGenerator():

Genera y retorna un ID aleatorio utilizado para identificar componentes y opciones.
#_getStyles():

Devuelve una cadena de texto que representa los estilos CSS del componente.
#_getTemplate():

Devuelve una cadena de texto que representa el contenido del componente y sus elementos HTML.
#_removeAllEvents():

Elimina todos los eventos y datos asociados a eventos del componente.
disconnectedCallback():

Se llama cuando el componente se desconecta del DOM.
Realiza acciones de limpieza y sugiere eliminar la instancia del componente.
#_addEvents():

Agrega todos los eventos necesarios para el componente y guarda los datos de los eventos en componentBaseInstances.
#_render():

Renderiza el componente cuando se modifica alguna propiedad.
Actualiza el contenido del shadow DOM y agrega eventos.
connectedCallback():

Se llama cuando el componente se conecta al DOM.
Realiza acciones de inicialización, renderizado y agrega eventos.