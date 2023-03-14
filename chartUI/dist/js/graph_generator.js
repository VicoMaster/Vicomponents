// [HTML INJECTION]
const $HTML_INJECTION = '<main class="graph-generator"> <header class="graph-generator__header"> <section class="graph-generator__header-section"> <div class="input-field col s12 graph-generator__select"> <select id="graphRegion"> </select> <label class="graph-generator__select-label">Región</label> </div><div class="input-field col s12 graph-generator__select"> <select multiple id="graphItems"></select> <label class="graph-generator__select-label">Items</label> </div><div class="input-field col s12 graph-generator__select"> <select multiple id="graphPeriodos"></select> <label class="graph-generator__select-label">Periodos</label> </div><section class="graph-generator__section-icons"> <article id="buttomBarChart" class="material-symbols-outlined bg-l-grey c-l-blue" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Gráfico de barras">bar_chart </article> <article id="buttomLineChart" class="material-symbols-outlined bg-l-grey" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Gráfico de línea">show_chart</article> <article id="tableBarChart" class="material-symbols-outlined bg-l-grey" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tabla de datos">table_chart</article> </section> </section> <section class="graph-generator__header-section"> <div class="graph-generator__container-flex"> <article class="graph-generator__title"> <span>Titulo Principal</span> </article> <article id="buttomFullScreen" class="fullScreen material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Pantalla completa">fullscreen</article> </div></section> </header> <section class="graph-generator__body" id="myChart"></section> <footer class="graph-generator__footer"> <section class="graph-generator__container-flex w-max-c position-relative"> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cambiar Vista">visibility</article> <span class="text-abs-right">Vista #1</span> </section> <section class="graph-generator__section-icons"> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Imprima/Guarde el gráfico">print</article> <article class="material-symbols-outlined" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Descargue los datos">download</article> </section> </footer> </main>';
const $CONTAINER_GRAPH_INJECTION = document.getElementById('graphInjection');
$CONTAINER_GRAPH_INJECTION.innerHTML = $HTML_INJECTION;
// [VARIABLES]
let graphChart = undefined;  // Instancia del Graph
let instancesMaterializeSelects = undefined;  // Instancias de los Selects Materialize
// [COMPONENTES HTML]
const $PRINCIPAL_TITLE = document.querySelector('.graph-generator__title span');
// [ACTIVAMOS TOOLTIPS DE BOOTSTRAPS]
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
// [FUNCTIONS]
function removeChildsContainer(contenedorPadre) {
    //Eliminamos los hijos si existen
    while (contenedorPadre.firstChild) {
        contenedorPadre.removeChild(contenedorPadre.firstChild);
    }
}
function destroyInstances() {
    instancesMaterializeSelects.forEach(instance => {
        instance.destroy();
    });
}
function resetInstancesMaterialize() {
    let elems = document.querySelectorAll('select');
    instancesMaterializeSelects = M.FormSelect.init(elems);
}
async function buildData(params) {
    // retorna formato de datos para pintar en [graphChart]
    const DATA = params.data,
        ITEMS = params.items,
        REGION = params.region;
    let dataSet = [];
    ITEMS.forEach(item => {
        let dataItems = [];
        Object.keys(DATA).forEach(dataObject => {
            if (DATA[dataObject].region === REGION && DATA[dataObject].item === item) {
                dataItems.push(DATA[dataObject].$)
            }
        });
        dataSet.push({
            label: item,
            data: dataItems
        });
    });
    return dataSet;
}
function fillSelectItems(params) {
    // Re llenado de [SELECT=items] y retorna set de Items
    const DATA = params.data,
        REGION = params.region,
        $SELECT_ITEMS = params.select;
    let itemSet = new Set(),
        countFill = 0;
    Object.keys(DATA).forEach(element => {
        if (DATA[element].region === REGION && !itemSet.has(DATA[element].item)) {
            const ELEMENT = DATA[element],
                $OPTION = document.createElement('option');
            if (countFill <= 3) {
                $OPTION.setAttribute('selected', '');
                countFill += 1;
            }
            $OPTION.setAttribute('value', ELEMENT.item);
            $OPTION.textContent = DATA[element].item;
            itemSet.add(DATA[element].item);
            $SELECT_ITEMS.appendChild($OPTION);
        }
    });
    return itemSet;
}
function fillSelectPeriodos(params) {
    // Re llenado de [SELECT=periodos] y retorna set de Periodos
    const DATA = params.data,
        REGION = params.region,
        $SELECT_PERIODOS = params.select;
    let periodoSet = new Set();
    Object.keys(DATA).forEach(element => {
        if (DATA[element].region === REGION && DATA[element].periodo !== '' && DATA[element].periodo !== undefined && !periodoSet.has(DATA[element].periodo)) {
            const ELEMENT = DATA[element];
            const $OPTION = document.createElement('option');
            $OPTION.setAttribute('selected', '');
            $OPTION.setAttribute('value', ELEMENT.periodo);
            $OPTION.textContent = DATA[element].periodo;
            periodoSet.add(DATA[element].periodo);
            $SELECT_PERIODOS.appendChild($OPTION);
        }
    });
    return periodoSet;
}
async function firstFillSelect() {
    // Primer llenado (Se ejecuta 1 vez) de [SELECTS], formateo de Data  y pintado de [graphChart]
    const $SELECT_REGION = document.getElementById('graphRegion'),
        $SELECT_ITEMS = document.getElementById('graphItems'),
        $SELECT_PERIODOS = document.getElementById('graphPeriodos'),
        DATA = DATA_JSON,
        PRIMERA_REGION = DATA[0].region;
    let regionSet = new Set(),
        itemSet = undefined,
        periodoSet = undefined;
    // Select Region
    Object.keys(DATA).forEach(element => {
        if (DATA[element].region !== '' && DATA[element].region !== undefined && !regionSet.has(DATA[element].region)) {
            const ELEMENT = DATA[element];
            const $OPTION = document.createElement('option');
            $OPTION.setAttribute('value', ELEMENT.region);
            $OPTION.textContent = DATA[element].region;
            regionSet.add(DATA[element].region);
            $SELECT_REGION.appendChild($OPTION);
        }
    });
    // Select Items
    itemSet = fillSelectItems({ data: DATA, region: PRIMERA_REGION, select: $SELECT_ITEMS });
    // Select Periodos
    periodoSet = fillSelectPeriodos({ data: DATA, region: PRIMERA_REGION, select: $SELECT_PERIODOS });
    // Generamos la data inicial para los graficos (primera carga)
    // La estructura de datos será [{label: item, data:[valueItem, ValueItem...]},{label: item, data:[valueItem, ValueItem...]}]
    // Para categorizar los datos por Región se usara la key:labels que contendrá un array con los periodos
    const LABELS = Array.from(periodoSet);
    const DATA_GRAPH = await buildData({ data: DATA, items: Array.from(itemSet), region: PRIMERA_REGION });
    const $SECTION_CHART = document.getElementById('myChart');
    graphChart = new MyChart({ datasets: DATA_GRAPH, parent: $SECTION_CHART, labels: LABELS });
    graphChart.create();
    $PRINCIPAL_TITLE.textContent = `${document.getElementById('graphRegion').value} - ${graphChart.type}`;
}
async function changeDataSelects(event) {
    // Cambia los datos de los [SELECTS=items,periodos] según su trigger
    const DATA = DATA_JSON,
        $SELECT_REGION = document.getElementById('graphRegion'),
        $SELECT_ITEMS = document.getElementById('graphItems'),
        $SELECT_PERIODOS = document.getElementById('graphPeriodos');
    let valueRegion = $SELECT_REGION.value,
        itemSets = undefined,
        periodoSet = undefined,
        typeChart = ($PRINCIPAL_TITLE.textContent.includes('Tabla')) ? 'Tabla' : graphChart.type;
    $PRINCIPAL_TITLE.textContent = `${valueRegion} - ${typeChart}`;
    switch (event.target.id) {
        case 'graphRegion':
            // Destruimos instancias de [Materialize] para manipular las options
            destroyInstances();
            // Eliminamos las options de los [SELECTS=items, periodos] y los volvemos a llenar con datos según selección
            removeChildsContainer($SELECT_ITEMS);
            removeChildsContainer($SELECT_PERIODOS);
            itemSets = Array.from(fillSelectItems({ data: DATA, region: valueRegion, select: $SELECT_ITEMS }));
            periodoSet = fillSelectPeriodos({ data: DATA, region: valueRegion, select: $SELECT_PERIODOS });
            // Reiniciamos todas las instancias de Materialize
            resetInstancesMaterialize();
            break;
        case 'graphItems':
            itemSets = instancesMaterializeSelects[1].getSelectedValues();
            periodoSet = instancesMaterializeSelects[2].getSelectedValues()
            break;
        case 'graphPeriodos':
            itemSets = instancesMaterializeSelects[1].getSelectedValues();
            periodoSet = instancesMaterializeSelects[2].getSelectedValues()
            break;
    }
    // Se vuelve a construir la data para el Graph
    const DATA_GRAPH = await buildData({ data: DATA, items: itemSets, region: valueRegion });
    graphChart.datasets = DATA_GRAPH;
    graphChart.labels = Array.from(periodoSet);
}
// Ejecutamos primer llenado de options en los [SELECTS]
firstFillSelect();
function createTable() {
    graphChart.hiddenGraph = true;
    //console.log(graphChart.datasets);
    //console.log(graphChart.labels);
    //const $SECTION_CHART = document.getElementById('myChart');
    //const TEST = document.createElement('p');
    //TEST.textContent = 'Aquí vá una tabla...'
    //$SECTION_CHART.appendChild(TEST);
}
// [EVENTOS]
const $BUTTON_BAR_CHART = document.getElementById('buttomBarChart');
const $BUTTON_LINE_CHART = document.getElementById('buttomLineChart');
const $BUTTON_TABLE = document.getElementById('tableBarChart');
const $BUTTON_FULLSCREEN = document.getElementById('buttomFullScreen');
$BUTTON_BAR_CHART.addEventListener('click', event => {
    graphChart.hiddenGraph = false;
    $BUTTON_LINE_CHART.classList.remove('c-l-blue');
    $BUTTON_TABLE.classList.remove('c-l-blue');
    event.target.classList.add('c-l-blue');
    graphChart.type = 'bar';
    $PRINCIPAL_TITLE.textContent = `${document.getElementById('graphRegion').value} - ${graphChart.type}`;
});
$BUTTON_LINE_CHART.addEventListener('click', event => {
    graphChart.hiddenGraph = false;
    $BUTTON_BAR_CHART.classList.remove('c-l-blue');
    $BUTTON_TABLE.classList.remove('c-l-blue');
    event.target.classList.add('c-l-blue');
    graphChart.type = 'line';
    $PRINCIPAL_TITLE.textContent = `${document.getElementById('graphRegion').value} - ${graphChart.type}`;
});
$BUTTON_TABLE.addEventListener('click', event => {
    createTable();
    $BUTTON_BAR_CHART.classList.remove('c-l-blue');
    $BUTTON_LINE_CHART.classList.remove('c-l-blue');
    event.target.classList.add('c-l-blue');
    $PRINCIPAL_TITLE.textContent = `${document.getElementById('graphRegion').value} - Tabla`;
});
$BUTTON_FULLSCREEN.addEventListener('click', () => {
    let containerGraphGenerator = document.getElementById('graphInjection');
    let graphGenerator = containerGraphGenerator.firstChild;
    if (!document.fullscreenElement) {
        graphGenerator.requestFullscreen().then(() => { /**console.log('Ok')**/ }).catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
})
document.querySelectorAll('.graph-generator__select').forEach(select => {
    select.addEventListener('change', changeDataSelects);
});
// [MATERIALIZE]
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('select');
    instancesMaterializeSelects = M.FormSelect.init(elems);
});