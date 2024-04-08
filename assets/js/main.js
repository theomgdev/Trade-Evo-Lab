//let's init evo-chart
//scale evo-chart canvas to window size
var canvas = document.getElementById("evo-chart");

//OHLC (time, open, high, low, close) data
var evoChart = new EvoChart("evo-chart", [
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
], window.innerWidth, window.innerHeight, "#ff0000", "#00ff00");

//Scale canvas to window size for every 500ms
setInterval(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    evoChart.refresh();
}, 10);