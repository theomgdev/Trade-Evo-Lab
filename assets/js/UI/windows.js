var defaultWinOpt = {
    theme: 'dark',
    position: 'center',
    setStatus: 'minimized',
    contentSize: {
        width: function() {
            return Math.min(window.innerWidth * 0.8, 800);
        },
        height: function() {
            return window.innerHeight * 0.8;
        }
    },
    headerControls: {
        close: 'remove'
    }
};

// ########## DATA MANAGEMENT WINDOW ##########
//data management window for evo-chart using JSPanel
let dataManWindow = jsPanel.create({
    theme: defaultWinOpt.theme,
    headerTitle: 'Data Manager',
    position: defaultWinOpt.position,
    setStatus: defaultWinOpt.setStatus,
    contentSize: defaultWinOpt.contentSize,
    headerControls: defaultWinOpt.headerControls,
    content: `
        <div class="p-3">
            <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2" for="grid-symbol">
                    Symbol
                </label>
                <input class="appearance-none block w-full bg-slate-200 text-slate-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-symbol" type="text" placeholder="BTC">
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2" for="grid-interval">
                    Interval
                </label>
                <select class="block appearance-none w-full bg-slate-200 border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-slate-500" id="grid-interval">
                    <option>1m</option>
                    <option>5m</option>
                    <option>15m</option>
                    <option>30m</option>
                    <option>1h</option>
                    <option>1d</option>
                </select>
            </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2" for="grid-start-date">
                        Start Date
                    </label>
                    <input class="appearance-none block w-full bg-slate-200 text-slate-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-start-date" type="date">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2" for="grid-end-date">
                        End Date
                    </label>
                    <input class="appearance-none block w-full bg-slate-200 text-slate-700 border border-slate-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-end-date" type="date">
                </div>
            </div>
            <!-- Data Source -->
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2" for="grid-data-source">
                        Data Source
                    </label>
                    <select class="block appearance-none w-full bg-slate-200 border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-slate-500" id="grid-data-source">
                        <option>Binance</option>
                        <option disabled>Yahoo Finance (WIP)</option>
                        <option disabled>Alpha Vantage (WIP)</option>
                    </select>
                </div>
            </div>
            <button id="get-data" class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded w-full mb-3" onclick="getData()">
                Get Data
            </button>
            <div id="evo-chart-data" style="overflow-y: auto; height: 100%;">
            </div>
        </div>
    `,
    callback: function() {
        //Show data array(array (time, open, high, low, close)) in a jQuery datatable
        $('#evo-chart-data').html(`
            <style>
                #evo-chart-data-table {
                    width: 100%;
                }
            </style>
            <table id="evo-chart-data-table" style="width: 100%;">
            </table>
        `);
        $('#evo-chart-data-table').DataTable({
            //enable horizontal scrolling
            data: data.map((d) => {
                return [
                    //d[0] is time so we need to convert it to datetime string
                    new Date(d[0]).toLocaleString(),
                    d[1],
                    d[2],
                    d[3],
                    d[4]
                ];
            }),
            columns: [
                { title: "Time" },
                { title: "Open" },
                { title: "High" },
                { title: "Low" },
                { title: "Close" }
            ]
        });
        $('#evo-chart-data-table').addClass('text-center');
    }
});
// ########## DATA MANAGEMENT WINDOW END ##########