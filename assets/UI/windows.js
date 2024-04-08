
// ########## DATA MANAGEMENT WINDOW ##########
//data management window for evo-chart using JSPanel
let evoChartWindow = jsPanel.create({
    theme: 'bootstrap-primary',
    headerTitle: 'Data',
    position: 'center-top',
    setStatus: 'minimized',
    contentSize: '600 600',
    headerControls: {
        close: 'remove'
    },
    content: '<div id="evo-chart-data" style="overflow-y: auto; height: 100%;"></div>',
    callback: function() {
        //Show data array(array (time, open, high, low, close)) in a jQuery datatable
        $('#evo-chart-data').html(`
            <style>
                #evo-chart-data-table {
                    width: 100%;
                }

                #evo-chart-data {
                    margin: 5px;
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