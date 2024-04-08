//let's init evo-chart
//scale evo-chart canvas to window size
var canvas = document.getElementById("evo-chart");

var data_template = [
    [0, 100, 200, 50, 150],
    [1, 150, 250, 100, 200],
    [2, 200, 300, 150, 250],
    [3, 250, 350, 200, 300],
    [4, 300, 400, 200, 250],
    [5, 250, 300, 200, 225],
    [6, 225, 275, 100, 150],
    [7, 150, 200, 100, 175],
    [8, 175, 225, 150, 200],
    [9, 200, 250, 150, 225],
    [10, 225, 275, 200, 250],
    [11, 250, 300, 200, 275],
    //fall!
    [12, 275, 325, 200, 250],
    [13, 250, 300, 100, 100],
    [14, 100, 150, 50, 75]
];

var data = data_template;

//OHLC (time, open, high, low, close) data
var evoChart = new EvoChart("evo-chart", data);

//Scale canvas to window size for every 500ms
setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    evoChart.refresh();
}, 10);

function getData() {
    var symbol = document.getElementById("grid-symbol").value;
    var interval = document.getElementById("grid-interval").value;
    var start_date = document.getElementById("grid-start-date").value;
    var end_date = document.getElementById("grid-end-date").value;
    var data_source = document.getElementById("grid-data-source").value;

    //Get data from data source
    //For now, we will use a template data
    data = data_template;

    evoChart.setData(data);
    evoChart.refresh();
}