/*
    Autor: AndrésR.Dev 21-12-2022
    Description: Construye un gráfico [Chart()] usando librería chart.js en un contenedor padre. 
    Comments: La clase provee todos los metodos necesarios para manipular la librería[Chart.js] de manera simple usando 2 estructuras de datos.
    Important: Se debe inicializar la librería[chart.js] en el html antes de llamar esta clase, luego se deberá llamar [Bootstrap] para los tooltips

    Data Structure: Se puede implementar de 2 formas:
        1. DATA_GRAPH = [{x:'item', y: itemValue}, {x:'item', y: itemValue}...] 
        2. DATA_GRAPH = [{label: item, data:[valueItem, ValueItem, ...]},{label: item, data:[valueItem, ValueItem, ...]} ...] 
    Use: 
        1. Implementación simple donde [X] son los items-articulos del graph y [Y] son los valores.
           Constructor: graphChart = new MyChart({ datasets: DATA_GRAPH, parent: $CHART_INJECTION});
        2. Implementación para multiples items categorizados. Se deberá crear 2 estructuras de datos. Un [ARRAY] y un Array de Objects [{},{},{}...].
           En el [ARRAY] se deberán agregar las categorías y en el Array de Objects los valores a categorizar.
           Constructor: graphChart = new MyChart({ datasets: DATA_GRAPH, labels: LABELS, parent: $SECTION_CHART });
    Use-Important: Para la implementación-2 la longitud del [ARRAY] debe ser la misma que la cantidad de Objetos en el Array de Objects ya que,
           cada elemento en el [ARRAY] es igual a una categoría y cada Object dentro del Array son los items:valores a categorizar.
*/
class MyChart {
    constructor(params = {}) {
        try {
            this._datasets = params.datasets;
            this._labels = params.labels;
            this._datalabels = params.datalabels;
            this._titleDataSet = params.titleDataSet || 'Title dataSet';
            this._type = params.type || 'bar';
            this._parent = params.parent;
            this._width = params.width || `${this._parent.clientWidth}px`;
            this._height = params.height || `${this._parent.clientHeight}px`;
            this._reSize = true;
            this._hiddenGraph = false;
            this._backgroundColors = [
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
                'rgba(255, 0, 16, x)',
                'rgba(80, 76, 76, x)',
                'rgba(177, 177, 177, x)',
                'rgba(216, 216, 216, x)',
            ];
        } catch (error) {
            console.error('MyChart: error en constructor');
        }
    }
    // [GETTERS]
    get datasets() {
        return this._datasets;
    }
    get datalabels() {
        return this._datalabels;
    }
    get labels() {
        return this._labels;
    }
    get titleDataSet() {
        return this._titleDataSet;
    }
    get type() {
        return this._type;
    }
    get parent() {
        return this._parent;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get backgroundColors() {
        return this._backgroundColors;
    }
    get hiddenGraph(){
        return this._hiddenGraph;
    }
    // [SETTERS]
    set datasets(datasets) {
        this._datasets = datasets;
        this.#reCreate();
    }
    set datalabels(datalabels) {
        this._datalabels = datalabels;
        this.#reCreate();
    }
    set labels(labels) {
        this._labels = labels;
        this.#reCreate();
    }
    set titleDataSet(titleDataSet) {
        this._titleDataSet = titleDataSet;
        this.#reCreate();
    }
    set type(type) {
        this._type = type;
        this.#reCreate();
    }
    set parent(parent) {
        this._parent = parent;
        this.#reCreate();
    }
    set width(width) {
        // width max 740px for performance
        if (String(width).search('px') !== -1) {
            let tempWidth = parseInt(width.split('px')[0]);
            if (tempWidth > 740) {
                width = `740px`;
                console.warn('Max width: 740');
            };
            this._width = width;
            this.#reCreate();
        } else {
            console.error('Unidad requerida [px]');
        }
    }
    set height(height) {
        // height max 550px for performance
        if (String(height).search('px') !== -1) {
            let tempheight = parseInt(height.split('px')[0]);
            if (tempheight > 550) {
                height = `550px`;
                console.warn('Max height: 550px');
            };
            this._height = height;
            this.#reCreate();
        } else {
            console.error('Unidad requerida [px]');
        }
    }
    set backgroundColors(backgroundColors) {
        this._backgroundColors = backgroundColors;
        this.#reCreate();
    }
    set hiddenGraph(hiddenGraph = true){
        this._hiddenGraph = hiddenGraph;
        let hidden = (hiddenGraph) ? 'none' : 'flex';
        this._parent.firstChild.style.display = hidden;
    }
    // [METHODS]
    #reSizeWitdh() {
        //timeOut para evitar ejecución desmedida de reSize
        if (this._reSize) {
            this._reSize = false;
            this._width = `${this._parent.clientWidth}px`;
            this.#reCreate();
            setTimeout(() => {
                this._reSize = true;
            }, 200);
        }
    }
    #reCreate() {
        this._parent.removeChild(this._parent.firstChild);
        this.create();
    }
    create() {
        try {
            if (this._datasets !== undefined && this._parent !== undefined) {
                let dataGraph = {};
                // Validamos si el dataSet se construye apartir de ejes [X-Y] data: [{x: 'Sales', y: 20}, {x: 'Revenue', y: 10}]
                // o por Objetos: [{label: item, data:[valueItem, ValueItem...]},{label: item, data:[valueItem, ValueItem...]}]
                if (Object.keys(this._datasets[0]).indexOf('x') !== -1 && Object.keys(this._datasets[0]).indexOf('y') !== -1) {
                    dataGraph = {
                        ...{
                            datasets: [{
                                label: this._titleDataSet,
                                data: this._datasets,
                                borderWidth: 1,
                                backgroundColor: this._backgroundColors,
                            }]
                        }
                    }
                } else {
                    // DataSet con objetos
                    if (this._labels === undefined) {
                        console.error(`Se necesita parametro: labels`);
                        throw new Error('labels no es definido');
                    }
                    let tempData = [];
                    let contadorColores = 0;
                    Object.keys(this.datasets).forEach((data, index) => {
                        const DATASET = this.datasets[data]
                        let color = undefined;
                        if (index < this._backgroundColors.length) {
                            color = this._backgroundColors[contadorColores];
                            contadorColores += 1;
                        } else {
                            contadorColores = 0;
                            color = this._backgroundColors[contadorColores];
                        }
                        tempData.push(
                            {
                                data: this.datasets[index].data,
                                label: this.datasets[index].label,
                                borderColor: color.replace('x', '.5'),
                                backgroundColor: color.replace('x', '1'),
                            }
                        );
                    });
                    dataGraph = {
                        ...{
                            labels: this._labels,
                            datasets: tempData,
                        }
                    };
                }

                // Creamos el canvas dentro del <article>
                const $CONTAINER_CANVAS = document.createElement('section');
                $CONTAINER_CANVAS.style.width = this._width;
                $CONTAINER_CANVAS.style.height = this._height;
                $CONTAINER_CANVAS.style.display = (this._hiddenGraph) ? 'none' : 'flex';
                const $CANVAS = document.createElement('canvas');
                $CANVAS.setAttribute('id', 'canvasChart');
                $CONTAINER_CANVAS.appendChild($CANVAS);
                this._parent.appendChild($CONTAINER_CANVAS);
                // Creamos la configuración
                const configChart = {
                    type: this._type,
                    data: { ...dataGraph },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                //max: 100
                            }
                        },
                        indexAxis: 'x',
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    fillStyle: 'rgb(222, 195, 0)',
                                    usePointStyle: false,
                                    font: {
                                        size: 14,
                                    }
                                }
                            }
                        }
                    }
                }

                // Pintamos el Chart
                new Chart($CANVAS, configChart);
                // Añadimos evento al documento para resizeWidth
                window.addEventListener('resize', this.#reSizeWitdh.bind(this));

            } else {
                let parameter = undefined;
                if (this._datasets === undefined) parameter = 'datasets';
                if (this._datalabels === undefined) parameter = 'datalabels';
                if (this._parent === undefined) parameter = 'parent';
                console.error(`Se necesita parametro: ${parameter}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
// Carga de clase como objeto del documento
if (typeof window !== 'undefined') window.MyChart = MyChart;
// Carga de clase como modulo
//export { MyChart };