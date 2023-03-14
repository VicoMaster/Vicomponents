# ChartUI (***Version Alpha, memorará en futuras versiones***)
Componente para manipular y visualizar datos de una forma sencilla y rápida usando la librería Chart.js.
## Librerías externas
Se añaden librerías externas: [Chart.js](https://www.chartjs.org/docs/latest/), Bootstraps y Materialize.css para dar estilos y funcionalidad a la UI.
## Integración
Para usar correctamente este componente se deberá incluir en el html donde se requiera los siguientes scripts:


***Esto mejorará con el tiempo para que solo sea necesario llamar 1 solo script***
```<html>
<!-- Bootstrap 5.2.3 -->
<script src="js/library/bootstrap-5.2.3-dist/js/bootstrap.bundle.min.js"></script>
<!-- Materialize -->
<script type="text/javascript" src="js/library/materialize/materialize.min.js"></script>
<!-- Chart.js -->
<script src="js/library/chart.js/dist/chart.min.js"></script>
<!-- DATA -->
<script src="js/data.js"></script>
<!-- MyChart.js -->
<script src="js/MyChart.js"></script>
<!-- graph_generator.html -->
<script src="js/graph_generator.js" type="module"></script>
```

y los siguientes estilos CSS:
```<html>
<!-- CSS -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0" />
<link href="css/library/bootstrap-5.2.3-dist/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" rel="stylesheet" href="css/library/materialize/materialize.min.css" media="screen,projection" />
<link rel="stylesheet" href="css/graph_generator.css">
```

Chart.js, Bootstraps y Materialize ya están incluidas dentro de la carpeta *dist/* en sus respectivas subcarpetas *css/library/* y *js/library/*


Para crear una nueva instancia del componente se deberá llamar con un ID:

``` <html>
<!-- INIT: INJECTION GRAPH -->
<section id="graphInjection"></section>
<!-- CLOSE: INJECTION GRAPH -->
```
***Este código mejorará en futuras versiones***

## Entendimiento librerias / Clases / Scripts
+ [Chart.js](https://www.chartjs.org/docs/latest/): Contiene el código externo para el funcionamiento de los gráficos.
+ **Materialize**: Se usa el componente Select.
+ **Bootstraps**: Tooltips de información al pasar el cursor.
+ data.js: Estructura de datos en formato JSON para alimentar el gráfico.
+ MyChart.js: Clase donde se hace la implementación simple de chart.js
+ graph_generator.js: Script principal para la creación de la UI.