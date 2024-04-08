//let's init evo-chart
//scale evo-chart canvas to window size
var canvas = document.getElementById("evo-chart");

var evoChart = new EvoChart("evo-chart", [
    //for each TOHLC (time, open, high, low, close) data
    [0, 10, 20, 5, 15],
    [1, 15, 25, 10, 20],
    [2, 20, 30, 15, 25],
    [3, 25, 35, 20, 30],
    //fall
    [4, 30, 40, 20, 15],
    [5, 15, 35, 5, 10],
    [6, 10, 30, 5, 20],
    [7, 20, 40, 15, 30],
], window.innerWidth, window.innerHeight, "#ff0000", "#00ff00");

//Scale canvas to window size for every 500ms
setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    evoChart.refresh();
}, 10);