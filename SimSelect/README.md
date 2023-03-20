# SIMSELECT (Simple Select)
- Solo necesitas crear un componente [select] con la clase [simSelect]. Puedes agregar los [simSelect] que desees, al igual que las [option] que necesites. Si una opción está marcada con [selected] el valor del input será el de la opción seleccionada.
```
<select class="simSelect">
    <option value="" selected>Seleccione una opci&oacute;n</option>
    <option value=0>Cero</option>
    <option value=1>Uno</option>
    <option value=2>Dos</option>
    <option value=3>Tres</option>
</select>
```
**ADVERTENCIA**: No soporta grupos o estructuras complejas. En esta versión solo admite [option].<br>

- Carga la hoja de estilos en tu [head] usando la siguiente linea:

```
<link rel="stylesheet" href="assets/simSelect.css">
```

- También necesitas agregar la siguiente linea [script] al final de tu body:

```
<script src="assets/simSelect.js"></script>
```
# ESTRUCTURA DE ARCHIVOS
La estructura de archivos es muy simple, se compone de 2 archivos [simSelect.css, simSelect.js]. Puedes cargar estos mismos en cualquier parte de tu proyecto, solo no olvides llamar a estos en el archivo [HTML] donde quieras crear el [simSelect]

# ESTRUCTURA CREADA (remplaza los [select])
La siguiente estructura se crea remplazando el [select] por medio de la función "transformSelect()". Esta función es extensa ya que creamos elemento por elemento usando código JavaScript.
```
<main class="simSelect" data-simselect-index="1">
    <header class="simSelect-header" tabindex="0">
        <input type="text" class="simSelect-input" placeholder="Seleccione una opci&oacute;n" disabled>
        <span class="iconify-inline simSelect-icon" data-icon="akar-icons:chevron-down"
            style="color: rgb(31, 31, 31);" data-width="15"></span>
        <span class="iconify-inline simSelect-icon simSelect-hidden" data-icon="akar-icons:chevron-up"
            style="color: rgb(31, 31, 31);" data-width="15"></span>
    </header>
    <section class="simSelect-options simSelect-hidden">
        <header class="simSelect-filter-header">
            <input class="simSelect-filter" type="text" tabindex="0" placeholder="¿Qu&eacute; busca?">
            <section class="simSelect-icon-search">
                <span class="iconify-inline" data-icon="codicon:search" style="color: #36c;" data-width="16"></span>
            </section>
            <section class="simSelect-icon-close">
                <span class="iconify-inline" data-icon="codicon:chrome-close" data-width="18"></span>
            </section>
        </header>
        <section class="simSelect-option-container">
            <article class="simSelect__option" tabindex="0" value="">Seleccione una opci&oacute;n</article>
            <article class="simSelect__option" tabindex="0" value="1">Uno</article>
            <article class="simSelect__option" tabindex="0" value="2">Dos</article>
            <article class="simSelect__option" tabindex="0" value="3">Tres</article>
        </section>
    </section>
</main
```

# PLANTILLA SIMPLE CREANDO UN SIMSELECT
El siguiente código muestra una plantilla muy simple donde el componente SIMSELECT es llamado usando la clase[simSelect]. 
```
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/simSelect.css">
    <title>SimSelect | Simple Select</title>
</head>

<body style="padding: 20px;">
    
    <select class="simSelect">
        <option value="" selected>Seleccione una opci&oacute;n</option>
        <option value=0>Cero</option>
        <option value=1>Uno</option>
        <option value=2>Dos</option>
        <option value=3>Tres</option>
    </select>

    <!-- JS -->
    <script src="assets/simSelect.js"></script>
</body>

</html>
```
**Aclaración**: el body tiene un padding de 20px por simple estética unicamente.

# PREVIEW
Permite navegación por medio de las flechas del teclado, al igual que la tabulación.

![simSelect, SIMPLE SELECT](https://github.com/VicoMaster/Practicas/blob/main/SimSelect/assets/img/screenshot.png?raw=true)